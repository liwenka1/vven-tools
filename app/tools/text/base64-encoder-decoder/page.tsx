"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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

  return (
    <div className="container mx-auto p-4">
      <Card className="mx-auto w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Base64 编码/解码</CardTitle>
          <CardDescription>对文本进行 Base64 编码或解码。</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-medium">输入文本</h3>
              <Textarea
                placeholder="在此处粘贴您的文本..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[200px] rounded-md border p-2 focus:ring-2 focus:ring-blue-500 md:min-h-[300px] dark:bg-gray-700 dark:text-white"
                aria-label="Input Text"
              />
            </div>
            <div>
              <h3 className="mb-2 text-lg font-medium">输出结果</h3>
              <Textarea
                placeholder="编码/解码后的结果将显示在此处..."
                value={outputText}
                readOnly
                className="min-h-[200px] rounded-md border bg-gray-50 p-2 md:min-h-[300px] dark:bg-gray-800 dark:text-white"
                aria-label="Output Result"
              />
            </div>
          </div>
          {errorText && <p className="mt-4 text-sm text-red-600 dark:text-red-400">{errorText}</p>}
          <div className="mt-6 flex flex-col justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button onClick={handleEncode} className="w-full sm:w-auto">
              编码
            </Button>
            <Button onClick={handleDecode} className="w-full sm:w-auto">
              解码
            </Button>
            <Button onClick={handleClear} variant="outline" className="w-full sm:w-auto">
              清空
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
