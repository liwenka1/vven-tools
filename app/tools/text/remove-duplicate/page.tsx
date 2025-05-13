"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClipboardCopy } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function RemoveDuplicatePage() {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [ignoreCase, setIgnoreCase] = useState<boolean>(false);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState<boolean>(false);
  const [stats, setStats] = useState<{ original: number; processed: number } | null>(null);

  const handleProcess = () => {
    if (!inputText.trim()) {
      return;
    }

    // Split by newlines
    let lines = inputText.split("\n");
    const originalCount = lines.length;
    
    // Preprocess lines if needed
    if (ignoreWhitespace) {
      lines = lines.map(line => line.trim());
    }
    
    // Remove duplicates
    let uniqueLines: string[];
    if (ignoreCase) {
      // Case-insensitive deduplication
      const caseMap = new Map<string, string>();
      for (const line of lines) {
        if (line.trim() !== '') {
          caseMap.set(line.toLowerCase(), line);
        }
      }
      uniqueLines = Array.from(caseMap.values());
    } else {
      // Case-sensitive deduplication
      uniqueLines = Array.from(new Set(lines));
    }
    
    // Remove empty lines from the final result
    uniqueLines = uniqueLines.filter(line => line.trim() !== '');
    
    // Set the result
    const processedCount = uniqueLines.length;
    setOutputText(uniqueLines.join("\n"));
    setStats({ original: originalCount, processed: processedCount });
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setStats(null);
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
    <div className="container mx-auto p-4">
      <Card className="mx-auto w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">文本去重</CardTitle>
          <CardDescription>移除文本中的重复行，每行文本作为一个单位</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="inputText" className="mb-2 block">输入文本</Label>
            <Textarea
              id="inputText"
              placeholder="请输入需要去重的文本，每行作为一个单位..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[200px]"
            />
          </div>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="ignoreCase" 
                checked={ignoreCase}
                onCheckedChange={(checked) => setIgnoreCase(checked as boolean)}
              />
              <Label htmlFor="ignoreCase">忽略大小写</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="ignoreWhitespace" 
                checked={ignoreWhitespace} 
                onCheckedChange={(checked) => setIgnoreWhitespace(checked as boolean)}
              />
              <Label htmlFor="ignoreWhitespace">忽略首尾空格</Label>
            </div>
          </div>

          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button onClick={handleProcess} disabled={!inputText.trim()}>
              去除重复行
            </Button>
            <Button onClick={handleClear} variant="outline">
              清空
            </Button>
          </div>

          {outputText && (
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-medium">处理结果</h3>
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  <ClipboardCopy className="mr-2 h-4 w-4" />
                  复制
                </Button>
              </div>
              {stats && (
                <div className="mb-2 text-sm">
                  原始行数: {stats.original}, 去重后行数: {stats.processed}, 移除了 {stats.original - stats.processed} 行重复内容
                </div>
              )}
              <Textarea
                value={outputText}
                readOnly
                className="min-h-[200px] rounded-md border bg-secondary/20 p-4 font-mono"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 