"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileOutput, FileUp } from "lucide-react";
import ToolLayout from "@/components/tools/tool-layout";
import JsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Badge } from "@/components/ui/badge";

export default function HtmlToPdfPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "info" | "success" | "error"; message: string } | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === "text/html") {
        setSelectedFile(file);
        setStatusMessage({ type: "success", message: `已选择文件: ${file.name}` });
      } else {
        setStatusMessage({ type: "error", message: "请选择一个 HTML 文件 (.html)" });
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // 重置文件输入
        }
      }
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      setStatusMessage({ type: "error", message: "请先选择一个 HTML 文件" });
      return;
    }

    setIsConverting(true);
    setStatusMessage({ type: "info", message: "正在转换 HTML 为 PDF..." });

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const htmlContent = e.target?.result as string;
        if (!htmlContent) {
          setStatusMessage({ type: "error", message: "无法读取文件内容" });
          setIsConverting(false);
          return;
        }

        // 预处理 HTML 内容，替换 oklch() 颜色函数
        const processedHtmlContent = htmlContent.replace(/oklch\s*\([^)]*\)/gi, "transparent");

        // 创建一个临时的 iframe 来渲染 HTML 内容，以便 html2canvas 捕获
        const iframe = document.createElement("iframe");
        iframe.style.position = "absolute";
        iframe.style.left = "-9999px"; // 移出屏幕外
        iframe.style.width = "210mm"; // A4 宽度
        iframe.style.height = "297mm"; // A4 高度，可根据内容调整
        iframe.style.border = "none";
        document.body.appendChild(iframe);

        try {
          await new Promise<void>((resolve, reject) => {
            if (!iframe.contentWindow) {
              reject(new Error("Iframe contentWindow is null"));
              return;
            }
            iframe.srcdoc = processedHtmlContent;
            iframe.onload = () => {
              try {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
                if (!iframeDoc) {
                  reject(new Error("Iframe document is null"));
                  return;
                }

                // 进一步处理 iframe DOM中的oklch
                const oklchRegex = /oklch\s*\([^)]*\)/gi;
                const elements = iframeDoc.querySelectorAll("*");
                elements.forEach((element) => {
                  if (element instanceof HTMLElement) {
                    // 处理内联样式
                    for (const propertyName of Array.from(element.style)) {
                      const propertyValue = element.style.getPropertyValue(propertyName);
                      if (oklchRegex.test(propertyValue)) {
                        element.style.setProperty(propertyName, propertyValue.replace(oklchRegex, "transparent"));
                      }
                    }
                    // 检查是否有 style 属性本身包含 oklch
                    const styleAttribute = element.getAttribute("style");
                    if (styleAttribute && oklchRegex.test(styleAttribute)) {
                      element.setAttribute("style", styleAttribute.replace(oklchRegex, "transparent"));
                    }
                  }
                });

                // 处理 <style> 标签中的 oklch
                const styleTags = iframeDoc.querySelectorAll("style");
                styleTags.forEach((styleTag) => {
                  if (styleTag.innerHTML && oklchRegex.test(styleTag.innerHTML)) {
                    styleTag.innerHTML = styleTag.innerHTML.replace(oklchRegex, "transparent");
                  }
                });
                resolve();
              } catch (e) {
                reject(e);
              }
            };
            iframe.onerror = reject;
          });

          const canvas = await html2canvas(iframe.contentDocument!.body, {
            scale: 2, // 提高分辨率
            useCORS: true, // 如果 HTML 包含跨域图片
            logging: false
          });
          const imgData = canvas.toDataURL("image/png");
          const pdf = new JsPDF("p", "mm", "a4");
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const imgProps = pdf.getImageProperties(imgData);
          const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
          let heightLeft = imgHeight;
          let position = 0;

          pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
          heightLeft -= pdfHeight;

          while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;
          }

          const fileName = selectedFile.name.replace(/\.html$/i, ".pdf");
          pdf.save(fileName);
          setStatusMessage({ type: "success", message: "PDF 文件已成功生成并下载！" });
        } catch (canvasError) {
          console.error("html2canvas error:", canvasError);
          setStatusMessage({ type: "error", message: "将 HTML 转换为图像时出错。请检查控制台获取更多信息。" });
        } finally {
          document.body.removeChild(iframe); // 清理临时 iframe
        }
      };

      reader.onerror = () => {
        setStatusMessage({ type: "error", message: "读取文件时出错。" });
      };

      reader.readAsText(selectedFile);
    } catch (error) {
      console.error("PDF conversion error:", error);
      setStatusMessage({ type: "error", message: "转换过程中发生错误。请确保已安装 jspdf 和 html2canvas。" });
    } finally {
      setIsConverting(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setStatusMessage({ type: "info", message: "已清空选择。" });
  };

  return (
    <ToolLayout
      title="HTML 转 PDF"
      description="选择本地 HTML 文件并将其转换为 PDF 文档"
      icon={<FileOutput className="h-6 w-6 text-amber-500" />}
      category={{
        name: "文件工具",
        href: "/#file-tools",
        color: "bg-amber-50 dark:bg-amber-950/30"
      }}
    >
      <div className="space-y-6 p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="htmlFile" className="font-medium">
              选择 HTML 文件
            </Label>
            <div className="mt-2 flex flex-col items-center justify-center rounded-lg border border-dashed border-amber-300 bg-amber-50/50 p-6 dark:border-amber-700 dark:bg-amber-950/20">
              <FileUp className="mb-3 h-10 w-10 text-amber-400" />
              <p className="text-muted-foreground mb-4 text-center text-sm">拖放 HTML 文件到此处，或点击下方按钮上传</p>
              <Input
                id="htmlFile"
                type="file"
                accept=".html, .htm"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="w-full max-w-xs cursor-pointer text-sm"
              />
            </div>
            {selectedFile && (
              <div className="mt-3 flex items-center gap-2">
                <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                  已选择文件
                </Badge>
                <span className="text-sm">{selectedFile.name}</span>
              </div>
            )}
          </div>

          {statusMessage && (
            <div
              className={`rounded-md p-3 text-sm ${
                statusMessage.type === "error"
                  ? "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                  : statusMessage.type === "success"
                    ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
              }`}
            >
              {statusMessage.message}
            </div>
          )}

          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button
              onClick={handleConvert}
              disabled={!selectedFile || isConverting}
              className="bg-amber-600 hover:bg-amber-700"
            >
              {isConverting ? "转换中..." : "转换为 PDF"}
            </Button>
            <Button onClick={handleClear} variant="outline" disabled={isConverting || !selectedFile}>
              清空选择
            </Button>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
