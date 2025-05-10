"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import JsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function HtmlToPdfPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === "text/html") {
        setSelectedFile(file);
        // toast.success(`已选择文件: ${file.name}`);
      } else {
        // toast.error('请选择一个 HTML 文件 (.html)');
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // 重置文件输入
        }
      }
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      // toast.error('请先选择一个 HTML 文件。');
      return;
    }

    setIsConverting(true);
    // toast.info('正在转换 HTML 为 PDF...');

    try {
      // 动态导入库，因为它们可能只在客户端使用
      // const { default: jsPDF } = await import('jspdf');
      // const { default: html2canvas } = await import('html2canvas');

      const reader = new FileReader();
      reader.onload = async (e) => {
        const htmlContent = e.target?.result as string;
        if (!htmlContent) {
          // toast.error('无法读取文件内容。');
          setIsConverting(false);
          return;
        }

        // 预处理 HTML 内容，替换 oklch() 颜色函数
        const processedHtmlContent = htmlContent.replace(/oklch\s*\([^)]*\)/gi, "transparent");

        // 创建一个临时的 div 来渲染 HTML 内容，以便 html2canvas 捕获
        const tempDiv = document.createElement("div");
        tempDiv.style.position = "absolute";
        tempDiv.style.left = "-9999px"; // 移出屏幕外
        tempDiv.style.width = "210mm"; // A4 宽度
        tempDiv.innerHTML = processedHtmlContent;
        document.body.appendChild(tempDiv);

        // 进一步处理DOM中的oklch
        const oklchRegex = /oklch\s*\([^)]*\)/gi;
        const elements = tempDiv.querySelectorAll("*");
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
        const styleTags = tempDiv.querySelectorAll("style");
        styleTags.forEach((styleTag) => {
          if (styleTag.innerHTML && oklchRegex.test(styleTag.innerHTML)) {
            styleTag.innerHTML = styleTag.innerHTML.replace(oklchRegex, "transparent");
          }
        });

        try {
          const canvas = await html2canvas(tempDiv, {
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
          // toast.success('PDF 文件已成功生成并下载！');
        } catch (canvasError) {
          console.error("html2canvas error:", canvasError);
          // toast.error('将 HTML 转换为图像时出错。请检查控制台获取更多信息。');
        } finally {
          document.body.removeChild(tempDiv); // 清理临时 div
        }
      };

      reader.onerror = () => {
        // toast.error('读取文件时出错。');
      };

      reader.readAsText(selectedFile);
    } catch (error) {
      console.error("PDF conversion error:", error);
      // toast.error('转换过程中发生错误。请确保已安装 jspdf 和 html2canvas。');
    } finally {
      setIsConverting(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // toast.info('已清空选择。');
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">HTML 转 PDF</CardTitle>
          <CardDescription>选择一个本地 HTML 文件并将其转换为 PDF 文档。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="htmlFile" className="mb-2 block text-lg font-medium">
              选择 HTML 文件
            </Label>
            <Input
              id="htmlFile"
              type="file"
              accept=".html, .htm"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
            />
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">已选择: {selectedFile.name}</p>
            )}
          </div>

          <div className="flex flex-col justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button onClick={handleConvert} disabled={!selectedFile || isConverting} className="w-full sm:w-auto">
              {isConverting ? "转换中..." : "转换为 PDF"}
            </Button>
            <Button onClick={handleClear} variant="outline" className="w-full sm:w-auto" disabled={isConverting}>
              清空选择
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
