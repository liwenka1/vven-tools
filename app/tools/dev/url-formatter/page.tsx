"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function UrlFormatterPage() {
  const [inputUrl, setInputUrl] = useState<string>("");
  const [outputUrl, setOutputUrl] = useState<string>("");
  const [formatType, setFormatType] = useState<string>("decode"); // 'decode', 'encodeComponent', 'encodeFull', 'extractParams'

  const handleFormat = () => {
    if (!inputUrl.trim()) {
      setOutputUrl("URL input cannot be empty.");
      return;
    }
    try {
      let result = "";
      switch (formatType) {
        case "decode":
          result = decodeURIComponent(inputUrl);
          break;
        case "encodeComponent":
          result = encodeURIComponent(inputUrl);
          break;
        case "encodeFull":
          result = encodeURI(inputUrl);
          break;
        case "extractParams":
          try {
            const url = new URL(inputUrl);
            const params = new URLSearchParams(url.search);
            let paramsString = "";
            if (params.toString() === "") {
              paramsString = "No query parameters found.";
            } else {
              for (const [key, value] of params) {
                paramsString += `${key}: ${value}\n`;
              }
            }
            result = paramsString.trim();
          } catch {
            result = "Invalid URL for parameter extraction.";
          }
          break;
        default:
          result = "Invalid format type";
      }
      setOutputUrl(result);
    } catch (error) {
      setOutputUrl("Invalid URL or formatting error.");
      console.error("URL formatting error:", error);
    }
  };

  const handleClear = () => {
    setInputUrl("");
    setOutputUrl("");
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mx-auto w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">URL 格式化</CardTitle>
          <CardDescription>对 URL 进行编码、解码或提取参数。</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="inputUrl" className="mb-2 block text-lg font-medium">
                输入 URL
              </Label>
              <Textarea
                id="inputUrl"
                placeholder="在此处粘贴您的 URL..."
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="min-h-[150px] rounded-md border p-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                aria-label="Input URL"
              />
            </div>

            <div>
              <Label className="mb-2 block text-lg font-medium">格式化选项</Label>
              <RadioGroup defaultValue="decode" onValueChange={setFormatType} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="decode" id="decode" />
                  <Label htmlFor="decode">解码 (Decode)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="encodeComponent" id="encodeComponent" />
                  <Label htmlFor="encodeComponent">编码组件 (Encode Component)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="encodeFull" id="encodeFull" />
                  <Label htmlFor="encodeFull">完整编码 (Encode Full URI)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="extractParams" id="extractParams" />
                  <Label htmlFor="extractParams">提取参数 (Extract Params)</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="outputUrl" className="mb-2 block text-lg font-medium">
                输出结果
              </Label>
              <Textarea
                id="outputUrl"
                placeholder="格式化后的 URL 将显示在此处..."
                value={outputUrl}
                readOnly
                className="min-h-[150px] rounded-md border bg-gray-50 p-2 dark:bg-gray-800 dark:text-white"
                aria-label="Output URL"
              />
            </div>
          </div>
          <div className="mt-6 flex flex-col justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button onClick={handleFormat} className="w-full sm:w-auto">
              格式化
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
