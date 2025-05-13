"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ClipboardCopy, Text } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";

export default function TextAutospacePage() {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");

  // Function to add spaces between Chinese and English text
  const addSpaces = (text: string): string => {
    // Create a new variable instead of modifying the parameter
    let processedText = text;

    // Add space between Chinese and English
    processedText = processedText.replace(/([\u4e00-\u9fa5\u3040-\u30FF])([a-zA-Z0-9])/g, "$1 $2");
    processedText = processedText.replace(/([a-zA-Z0-9])([\u4e00-\u9fa5\u3040-\u30FF])/g, "$1 $2");

    // Add space between numbers and units
    processedText = processedText.replace(/([a-zA-Z])(\d)/g, "$1 $2");
    processedText = processedText.replace(/(\d)([a-zA-Z])/g, "$1 $2");

    // Remove extra spaces
    processedText = processedText.replace(/\s+/g, " ");

    return processedText;
  };

  const handleProcess = () => {
    if (!inputText.trim()) return;
    const result = addSpaces(inputText);
    setOutputText(result);
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <ToolLayout
      title="中英文自动加空格"
      description="自动为中英文之间添加合适的空格，提高文本的可读性"
      icon={<Text className="h-6 w-6 text-blue-500" />}
      category={{
        name: "文本工具",
        href: "/#text-tools",
        color: "bg-blue-50 dark:bg-blue-950/30"
      }}
    >
      <div className="space-y-6 p-6">
        <div>
          <label htmlFor="input-text" className="mb-2 block text-sm font-medium">
            输入文本
          </label>
          <Textarea
            id="input-text"
            placeholder="请输入需要处理的文本..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[200px] resize-y"
          />
          <p className="text-muted-foreground mt-1 text-xs">例如：在中文和English之间添加空格，使文本更易读。</p>
        </div>

        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Button onClick={handleProcess} disabled={!inputText.trim()} className="bg-blue-600 hover:bg-blue-700">
            自动添加空格
          </Button>
          <Button onClick={handleClear} variant="outline">
            清空
          </Button>
        </div>

        {outputText && (
          <div className="bg-muted/30 mt-6 rounded-lg border p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-medium">处理结果</h3>
              <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8">
                <ClipboardCopy className="mr-2 h-4 w-4" />
                复制
              </Button>
            </div>
            <div className="bg-card rounded-md border p-4 font-mono text-sm break-all whitespace-pre-wrap">
              {outputText}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
