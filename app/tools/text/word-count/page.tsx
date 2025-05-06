"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
    <div className="container mx-auto py-10">
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle>字数统计</CardTitle>
          <CardDescription>输入文本以统计字数和字符数。</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full gap-4">
            <Textarea placeholder="在此处输入文本..." value={text} onChange={handleTextChange} rows={10} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>字数</CardDescription>
                  <CardTitle className="text-4xl">{wordCount}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>字符数 (无空格)</CardDescription>
                  <CardTitle className="text-4xl">{charCount}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>字符数 (含空格)</CardDescription>
                  <CardTitle className="text-4xl">{charCountWithSpaces}</CardTitle>
                </CardHeader>
              </Card>
            </div>
            <Button onClick={() => setText("")} variant="outline" className="w-full sm:w-auto">
              清空内容
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WordCountPage;
