"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AlignJustify } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

const WordCountPage = () => {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [charCountWithSpaces, setCharCountWithSpaces] = useState(0);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setText(newText);
    setCharCountWithSpaces(newText.length);
    setCharCount(newText.replace(/\s/g, "").length);
    const words = newText.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length === 1 && words[0] === "" ? 0 : words.length);
  };

  return (
    <ToolLayout
      title="字数统计"
      description="快速统计文本的字数、字符数和行数"
      icon={<AlignJustify className="h-6 w-6 text-blue-500" />}
      category={{
        name: "文本工具",
        href: "/#text-tools",
        color: "bg-blue-50 dark:bg-blue-950/30"
      }}
    >
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <Label htmlFor="input-text" className="font-medium">
            输入文本
          </Label>
          <Textarea
            id="input-text"
            placeholder="在此处输入或粘贴文本..."
            value={text}
            onChange={handleTextChange}
            className="min-h-[200px] resize-y font-mono text-sm"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="bg-card rounded-lg border p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">字数</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                Words
              </Badge>
            </div>
            <p className="mt-2 text-3xl font-semibold">{wordCount}</p>
          </div>

          <div className="bg-card rounded-lg border p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">字符数 (无空格)</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                Chars
              </Badge>
            </div>
            <p className="mt-2 text-3xl font-semibold">{charCount}</p>
          </div>

          <div className="bg-card rounded-lg border p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">字符数 (含空格)</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                Total
              </Badge>
            </div>
            <p className="mt-2 text-3xl font-semibold">{charCountWithSpaces}</p>
          </div>
        </div>

        <Button onClick={() => setText("")} variant="outline" className="w-full sm:w-auto">
          清空内容
        </Button>
      </div>
    </ToolLayout>
  );
};

export default WordCountPage;
