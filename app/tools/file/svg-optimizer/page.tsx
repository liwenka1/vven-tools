"use client";

import { useState } from "react";
import { FileUp, FileCode } from "lucide-react";
import { optimize } from "svgo/dist/svgo.browser";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ToolLayout from "@/components/tools/ToolLayout";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SvgOptimizerPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [stats, setStats] = useState<{ original: number; optimized: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOptimize = () => {
    try {
      if (!input.trim()) {
        setError("请输入SVG代码");
        return;
      }

      const originalSize = new Blob([input]).size;

      const result = optimize(input, {
        multipass: true,
        plugins: [
          "preset-default",
          "removeDimensions",
          {
            name: "removeAttrs",
            params: {
              attrs: "(data-.*)"
            }
          }
        ]
      });

      const optimizedSize = new Blob([result.data]).size;

      setOutput(result.data);
      setStats({
        original: originalSize,
        optimized: optimizedSize
      });
      setError(null);
    } catch (err) {
      setError("SVG优化失败，请检查输入是否为有效的SVG代码");
      console.error(err);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setInput(content);
    };
    reader.readAsText(file);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <ToolLayout
      title="SVG优化器"
      description="优化SVG文件，去除冗余元数据，减小文件体积"
      icon={<FileCode className="h-6 w-6 text-blue-500" />}
      category={{
        name: "文件工具",
        href: "/#file-tools",
        color: "bg-blue-50 dark:bg-blue-950/30"
      }}
    >
      <div className="space-y-6 p-6">
        <div className="flex flex-col space-y-4">
          <div>
            <Label htmlFor="svg-input">SVG输入</Label>
            <div className="mt-2 flex gap-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <FileUp className="mr-2 h-4 w-4" />
                上传SVG文件
              </Button>
              <input id="file-upload" type="file" accept=".svg" className="hidden" onChange={handleFileUpload} />
            </div>
            <Textarea
              id="svg-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="在此粘贴SVG代码..."
              className="mt-2 min-h-[200px] font-mono"
            />
          </div>

          <Button onClick={handleOptimize} className="w-full">
            优化SVG
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {stats && (
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm">
                原始大小: {(stats.original / 1024).toFixed(2)} KB
                <br />
                优化后: {(stats.optimized / 1024).toFixed(2)} KB
                <br />
                压缩率: {((1 - stats.optimized / stats.original) * 100).toFixed(1)}%
              </p>
            </div>
          )}

          {output && (
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="svg-output">优化结果</Label>
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  复制到剪贴板
                </Button>
              </div>
              <Textarea id="svg-output" value={output} readOnly className="mt-2 min-h-[200px] font-mono" />
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
