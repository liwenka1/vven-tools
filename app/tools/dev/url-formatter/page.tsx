"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Code, ClipboardCopy } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";

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

  const handleCopy = async () => {
    if (!outputUrl) return;
    try {
      await navigator.clipboard.writeText(outputUrl);
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <ToolLayout
      title="URL 格式化"
      description="对 URL 进行编码、解码或提取参数"
      icon={<Code className="h-6 w-6 text-purple-500" />}
      category={{
        name: "开发工具",
        href: "/#dev-tools",
        color: "bg-purple-50 dark:bg-purple-950/30"
      }}
    >
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="inputUrl" className="mb-2 block font-medium text-sm">
              输入 URL
            </Label>
            <Textarea
              id="inputUrl"
              placeholder="在此处粘贴您的 URL..."
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="min-h-[150px] resize-y font-mono text-sm"
              aria-label="Input URL"
            />
          </div>

          <div className="bg-muted/40 p-4 rounded-lg">
            <h3 className="text-sm font-medium mb-2">格式化选项</h3>
            <RadioGroup 
              defaultValue="decode" 
              value={formatType}
              onValueChange={setFormatType} 
              className="flex flex-col gap-3 sm:flex-row sm:gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="decode" id="decode" />
                <Label htmlFor="decode" className="cursor-pointer font-normal text-sm">解码 (Decode)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="encodeComponent" id="encodeComponent" />
                <Label htmlFor="encodeComponent" className="cursor-pointer font-normal text-sm">编码组件 (Encode Component)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="encodeFull" id="encodeFull" />
                <Label htmlFor="encodeFull" className="cursor-pointer font-normal text-sm">完整编码 (Encode Full URI)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="extractParams" id="extractParams" />
                <Label htmlFor="extractParams" className="cursor-pointer font-normal text-sm">提取参数 (Extract Params)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button 
              onClick={handleFormat}
              className="bg-purple-600 hover:bg-purple-700"
            >
              格式化
            </Button>
            <Button onClick={handleClear} variant="outline">
              清空
            </Button>
          </div>
        </div>

        {outputUrl && (
          <div className="mt-6 border rounded-lg p-4 bg-muted/30">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-medium">输出结果</h3>
              <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8">
                <ClipboardCopy className="mr-2 h-4 w-4" />
                复制
              </Button>
            </div>
            <div className="bg-card rounded-md border">
              <Textarea
                value={outputUrl}
                readOnly
                className="min-h-[150px] resize-y border-0 bg-transparent p-4 font-mono text-sm"
                aria-label="Output URL"
              />
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
