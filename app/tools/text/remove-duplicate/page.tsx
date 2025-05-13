"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ClipboardCopy, Eraser } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import ToolLayout from "@/components/tools/ToolLayout";
import { Badge } from "@/components/ui/badge";

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
    <ToolLayout
      title="文本去重"
      description="移除文本中的重复行，每行文本作为一个单位"
      icon={<Eraser className="h-6 w-6 text-blue-500" />}
      category={{
        name: "文本工具",
        href: "/#text-tools",
        color: "bg-blue-50 dark:bg-blue-950/30"
      }}
    >
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="inputText" className="font-medium">输入文本</Label>
          <Textarea
            id="inputText"
            placeholder="请输入需要去重的文本，每行作为一个单位..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[200px] resize-y font-mono text-sm"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            每行文本将被视为一个单独的项目，相同的行将被合并。
          </p>
        </div>
        
        <div className="bg-muted/40 p-4 rounded-lg space-y-2">
          <h3 className="text-sm font-medium mb-2">设置选项</h3>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="ignoreCase" 
                checked={ignoreCase}
                onCheckedChange={(checked) => setIgnoreCase(checked as boolean)}
              />
              <Label 
                htmlFor="ignoreCase" 
                className="cursor-pointer font-normal text-sm"
              >
                忽略大小写
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="ignoreWhitespace" 
                checked={ignoreWhitespace} 
                onCheckedChange={(checked) => setIgnoreWhitespace(checked as boolean)}
              />
              <Label 
                htmlFor="ignoreWhitespace" 
                className="cursor-pointer font-normal text-sm"
              >
                忽略首尾空格
              </Label>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Button 
            onClick={handleProcess} 
            disabled={!inputText.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            去除重复行
          </Button>
          <Button onClick={handleClear} variant="outline">
            清空
          </Button>
        </div>

        {outputText && (
          <div className="mt-6 border rounded-lg p-4 bg-muted/30">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-medium">处理结果</h3>
              <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8">
                <ClipboardCopy className="mr-2 h-4 w-4" />
                复制
              </Button>
            </div>
            
            {stats && (
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-card">
                  原始行数: {stats.original}
                </Badge>
                <Badge variant="outline" className="bg-card">
                  去重后行数: {stats.processed}
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  减少: {stats.original - stats.processed} 行 ({Math.round((stats.original - stats.processed) / stats.original * 100)}%)
                </Badge>
              </div>
            )}
            
            <div className="bg-card rounded-md border">
              <Textarea
                value={outputText}
                readOnly
                className="min-h-[200px] resize-y border-0 bg-transparent p-4 font-mono text-sm"
              />
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
} 