"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClipboardCopy } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea"; // Added import

interface RegexEntry {
  name: string;
  regex: string;
  description: string;
  tags: string[];
}

type MatchResultStatus = "success" | "fail_text_mismatch" | "fail_regex_invalid" | null;

const initialRegexData: RegexEntry[] = [
  {
    name: "邮箱地址",
    regex: String.raw`^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`,
    description: "匹配标准邮箱地址格式。",
    tags: ["email", "validation"]
  },
  {
    name: "URL链接",
    regex: String.raw`/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/`,
    description: "匹配HTTP和HTTPS URL。",
    tags: ["url", "web", "validation"]
  },
  {
    name: "手机号码 (中国大陆)",
    regex: String.raw`/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/`,
    description: "匹配中国大陆常见的手机号码格式。",
    tags: ["phone", "mobile", "china"]
  },
  {
    name: "身份证号码 (中国大陆, 18位)",
    regex: String.raw`/^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/`,
    description: "匹配中国大陆18位身份证号码。",
    tags: ["id", "identity", "china"]
  },
  {
    name: "IPv4 地址",
    regex: String.raw`/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/`,
    description: "匹配IPv4地址格式。",
    tags: ["ip", "network", "ipv4"]
  },
  {
    name: "日期 (YYYY-MM-DD)",
    regex: String.raw`/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/`,
    description: "匹配 YYYY-MM-DD 格式的日期。",
    tags: ["date", "time"]
  }
];

export default function RegexCollectionPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [regexData] = useState<RegexEntry[]>(initialRegexData);
  const [testInputs, setTestInputs] = useState<Record<number, string>>({}); // Added state for test inputs
  const [matchResults, setMatchResults] = useState<Record<number, MatchResultStatus>>({}); // Added state for match results

  const filteredRegexData = useMemo(() => {
    if (!searchTerm.trim()) {
      return regexData;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return regexData.filter(
      (item) =>
        item.name.toLowerCase().includes(lowercasedFilter) ||
        item.description.toLowerCase().includes(lowercasedFilter) ||
        item.tags.some((tag) => tag.toLowerCase().includes(lowercasedFilter)) ||
        item.regex.toLowerCase().includes(lowercasedFilter)
    );
  }, [searchTerm, regexData]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Optional: Show a toast or notification for successful copy
        alert("已复制到剪贴板!");
      })
      .catch((err) => {
        console.error("无法复制文本: ", err);
        alert("复制失败!");
      });
  };

  const parseRegex = (regexString: string): RegExp | null => {
    try {
      // 直接使用字符串创建正则（已去掉多余的符号）
      return new RegExp(regexString);
    } catch (e) {
      console.error("Error creating RegExp:", e);
      return null;
    }
  };

  // Handler for test input changes
  const handleTestInputChange = (index: number, regexStr: string, value: string) => {
    setTestInputs((prev) => ({ ...prev, [index]: value }));

    if (!value.trim()) {
      setMatchResults((prev) => ({ ...prev, [index]: null }));
      return;
    }

    const regex = parseRegex(regexStr);
    if (regex) {
      console.log("Valid regex created:", {
        pattern: regex.source,
        flags: regex.flags,
        testInput: value
      });
      setMatchResults((prev) => ({ ...prev, [index]: regex.test(value) ? "success" : "fail_text_mismatch" }));
    } else {
      console.error("Failed to parse regex:", regexStr);
      setMatchResults((prev) => ({ ...prev, [index]: "fail_regex_invalid" }));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mx-auto w-full max-w-5xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">正则大全</CardTitle>
          <CardDescription>常用正则表达式集合，方便查询和复制。</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Input
              type="text"
              placeholder="搜索名称、描述、标签或正则表达式..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border p-2 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <TooltipProvider>
            <ScrollArea className="h-[600px] w-full rounded-md border p-4">
              {filteredRegexData.length > 0 ? (
                <div className="space-y-4">
                  {filteredRegexData.map((item, index) => (
                    <Card key={index} className="shadow-sm">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg font-semibold">{item.name}</CardTitle>
                          <a
                            href={`https://github.com/any86/any-rule/issues/new?title=我有更好的正则：${encodeURIComponent(item.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-3 shrink-0 text-xs whitespace-nowrap text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            反馈
                          </a>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {/* Display description */}
                        {item.description && <p className="text-muted-foreground mb-2 text-sm">{item.description}</p>}

                        {/* Interactive Test Area */}
                        <Textarea
                          placeholder="在此输入测试文本..."
                          value={testInputs[index] || ""}
                          onChange={(e) => handleTestInputChange(index, item.regex, e.target.value)}
                          className="mt-1 min-h-[60px] w-full rounded-md border p-2 focus-visible:ring-1 focus-visible:ring-blue-500 dark:bg-gray-700 dark:text-white dark:focus-visible:ring-blue-400"
                          aria-label={`测试 ${item.name}`}
                        />
                        <div className="mt-1 mb-3 text-xs">
                          {testInputs[index] && testInputs[index].trim() !== "" && matchResults[index] !== null ? (
                            matchResults[index] === "success" ? (
                              <span className="font-medium text-green-500 dark:text-green-400">匹配成功</span>
                            ) : matchResults[index] === "fail_text_mismatch" ? (
                              <span className="font-medium text-red-500 dark:text-red-400">匹配失败 (文本不符)</span>
                            ) : matchResults[index] === "fail_regex_invalid" ? (
                              <span className="font-medium text-yellow-500 dark:text-yellow-400">
                                匹配失败 (正则无效)
                              </span>
                            ) : null
                          ) : (
                            <span className="text-gray-500 dark:text-gray-400">输入文本进行测试</span>
                          )}
                        </div>

                        {/* Regex display and copy button */}
                        <div className="relative">
                          {" "}
                          {/* Parent container for positioning */}
                          <div className="rounded-md border bg-gray-100 p-3 pr-10 dark:bg-gray-800">
                            {" "}
                            {/* Added pr-10 for padding for the button */}
                            <pre className="overflow-x-auto break-words">
                              <code className="font-mono text-sm whitespace-pre-wrap">{item.regex}</code>
                            </pre>
                          </div>
                          <div className="absolute top-1 right-1">
                            {" "}
                            {/* Positioned copy button */}
                            <Tooltip delayDuration={300}>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => copyToClipboard(item.regex)}
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 hover:bg-gray-200 dark:hover:bg-gray-700"
                                  aria-label="复制正则表达式"
                                >
                                  <ClipboardCopy className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>复制</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground text-center">未找到匹配的正则表达式。</p>
                </div>
              )}
            </ScrollArea>
          </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  );
}
