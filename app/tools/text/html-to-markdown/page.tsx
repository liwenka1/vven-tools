"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileCode, ClipboardCopy } from "lucide-react";
import ToolLayout from "@/components/tools/tool-layout";
import { Label } from "@/components/ui/label";

import TurndownService from "turndown";

const convertHtmlToMarkdown = (htmlString: string): string => {
  if (typeof window === "undefined") {
    // Turndown relies on DOM APIs, so it should only run client-side.
    return "Conversion can only be done in the browser.";
  }
  if (!htmlString.trim()) {
    return "";
  }
  try {
    const turndownService = new TurndownService({
      headingStyle: "atx",
      hr: "---",
      bulletListMarker: "-",
      codeBlockStyle: "fenced",
      emDelimiter: "_"
    });
    // You can add rules for specific tags if needed
    // turndownService.addRule('strikethrough', {
    //   filter: ['del', 's', 'strike'],
    //   replacement: function (content) {
    //     return '~~' + content + '~~';
    //   }
    // });
    const markdown = turndownService.turndown(htmlString);
    return markdown;
  } catch (error) {
    if (error instanceof Error) {
      return `Error converting HTML to Markdown: ${error.message}`;
    }
    return "Unknown error converting HTML to Markdown";
  }
};

export default function HtmlToMarkdownPage() {
  const [htmlInput, setHtmlInput] = useState<string>("");
  const [markdownOutput, setMarkdownOutput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const handleConvert = () => {
    if (!htmlInput.trim()) {
      setMarkdownOutput("HTML input cannot be empty.");
      return;
    }
    const result = convertHtmlToMarkdown(htmlInput);
    setMarkdownOutput(result);
  };

  const handleClear = () => {
    setHtmlInput("");
    setMarkdownOutput("");
  };

  const handleCopy = async () => {
    if (!markdownOutput) return;
    try {
      await navigator.clipboard.writeText(markdownOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <ToolLayout
      title="HTML 转 MarkDown"
      description="将 HTML 代码快速转换为 MarkDown 格式"
      icon={<FileCode className="h-6 w-6 text-blue-500" />}
      category={{
        name: "文本工具",
        href: "/#text-tools",
        color: "bg-blue-50 dark:bg-blue-950/30"
      }}
    >
      <div className="space-y-6 p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="html-input" className="font-medium">
              输入 HTML
            </Label>
            <Textarea
              id="html-input"
              placeholder="在此处粘贴您的 HTML..."
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              className="min-h-[300px] resize-y font-mono text-sm"
              aria-label="HTML Input"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="markdown-output" className="font-medium">
                输出 MarkDown
              </Label>
              {markdownOutput && (
                <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8">
                  <ClipboardCopy className="mr-2 h-4 w-4" />
                  复制
                </Button>
              )}
            </div>
            <Textarea
              id="markdown-output"
              placeholder="转换后的 MarkDown 将显示在此处..."
              value={markdownOutput}
              readOnly
              className="bg-muted/30 min-h-[300px] resize-y font-mono text-sm"
              aria-label="Markdown Output"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Button onClick={handleConvert} className="bg-blue-600 hover:bg-blue-700" disabled={!htmlInput.trim()}>
            转换
          </Button>
          <Button onClick={handleClear} variant="outline" disabled={!htmlInput && !markdownOutput}>
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
