"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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

  return (
    <div className="container mx-auto p-4">
      <Card className="mx-auto w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">HTML 转 MarkDown</CardTitle>
          <CardDescription>将您的 HTML 代码快速转换为 MarkDown 格式。</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-medium">输入 HTML</h3>
              <Textarea
                placeholder="在此处粘贴您的 HTML..."
                value={htmlInput}
                onChange={(e) => setHtmlInput(e.target.value)}
                className="min-h-[200px] rounded-md border p-2 focus:ring-2 focus:ring-blue-500 md:min-h-[300px] dark:bg-gray-700 dark:text-white"
                aria-label="HTML Input"
              />
            </div>
            <div>
              <h3 className="mb-2 text-lg font-medium">输出 MarkDown</h3>
              <Textarea
                placeholder="转换后的 MarkDown 将显示在此处..."
                value={markdownOutput}
                readOnly
                className="min-h-[200px] rounded-md border bg-gray-50 p-2 md:min-h-[300px] dark:bg-gray-800 dark:text-white"
                aria-label="Markdown Output"
              />
            </div>
          </div>
          <div className="mt-6 flex flex-col justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button onClick={handleConvert} className="w-full sm:w-auto">
              转换
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
