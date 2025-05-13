"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Binary, ClipboardCopy } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { Label } from "@/components/ui/label";

const encodeToBase64 = (text: string): string => {
  if (typeof window === "undefined") {
    return "操作只能在浏览器中执行。";
  }
  try {
    return window.btoa(unescape(encodeURIComponent(text)));
  } catch (error) {
    if (error instanceof Error) {
      return `Base64 编码错误: ${error.message}`;
    }
    return "未知的 Base64 编码错误";
  }
};

const decodeFromBase64 = (base64String: string): string => {
  if (typeof window === "undefined") {
    return "操作只能在浏览器中执行。";
  }
  try {
    return decodeURIComponent(escape(window.atob(base64String)));
  } catch (error) {
    if (error instanceof Error) {
      return `Base64 解码错误: ${error.message}`;
    }
    return "未知的 Base64 解码错误，请确保输入的是有效的Base64字符串。";
  }
};

export default function Base64EncoderDecoderPage() {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const handleEncode = () => {
    if (!inputText.trim()) {
      setErrorText("输入内容不能为空。");
      setOutputText("");
      return;
    }
    setErrorText("");
    const result = encodeToBase64(inputText);
    setOutputText(result);
  };

  const handleDecode = () => {
    if (!inputText.trim()) {
      setErrorText("输入内容不能为空。");
      setOutputText("");
      return;
    }
    setErrorText("");
    const result = decodeFromBase64(inputText);
    setOutputText(result);
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setErrorText("");
  };

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <ToolLayout
      title="Base64 编码/解码"
      description="对文本进行 Base64 编码或解码，支持各种字符编码"
      icon={<Binary className="h-6 w-6 text-blue-500" />}
      category={{
        name: "文本工具",
        href: "/#text-tools",
        color: "bg-blue-50 dark:bg-blue-950/30"
      }}
    >
      <div className="space-y-6 p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="input-text" className="font-medium">
              输入文本
            </Label>
            <Textarea
              id="input-text"
              placeholder="在此处粘贴您的文本..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[300px] resize-y font-mono text-sm"
              aria-label="Input Text"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="output-text" className="font-medium">
                输出结果
              </Label>
              {outputText && (
                <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8">
                  <ClipboardCopy className="mr-2 h-4 w-4" />
                  复制
                </Button>
              )}
            </div>
            <Textarea
              id="output-text"
              placeholder="编码/解码后的结果将显示在此处..."
              value={outputText}
              readOnly
              className="bg-muted/30 min-h-[300px] resize-y font-mono text-sm"
              aria-label="Output Result"
            />
          </div>
        </div>

        {errorText && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
            {errorText}
          </div>
        )}

        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Button onClick={handleEncode} className="bg-blue-600 hover:bg-blue-700">
            编码
          </Button>
          <Button onClick={handleDecode} className="bg-blue-600 hover:bg-blue-700">
            解码
          </Button>
          <Button onClick={handleClear} variant="outline" disabled={!inputText && !outputText}>
            清空
          </Button>
        </div>

        {copied && (
          <div className="fixed right-4 bottom-4 z-50">
            <div className="flex items-center rounded-full bg-blue-100 px-3 py-2 text-sm text-blue-800 shadow-lg dark:bg-blue-900 dark:text-blue-200">
              <ClipboardCopy className="mr-2 h-4 w-4" />
              已复制到剪贴板
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
