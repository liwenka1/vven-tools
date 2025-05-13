"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClipboardCopy, Code } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";
import ToolLayout from "@/components/tools/ToolLayout";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

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
    regex: String.raw`^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$`,
    description: "匹配HTTP和HTTPS URL。",
    tags: ["url", "web", "validation"]
  },
  {
    name: "手机号码 (中国大陆)",
    regex: String.raw`^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$`,
    description: "匹配中国大陆常见的手机号码格式。",
    tags: ["phone", "mobile", "china"]
  },
  {
    name: "身份证号码 (中国大陆, 18位)",
    regex: String.raw`^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$`,
    description: "匹配中国大陆18位身份证号码。",
    tags: ["id", "identity", "china"]
  },
  {
    name: "IPv4 地址",
    regex: String.raw`^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$`,
    description: "匹配IPv4地址格式。",
    tags: ["ip", "network", "ipv4"]
  },
  {
    name: "日期 (YYYY-MM-DD)",
    regex: String.raw`^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$`,
    description: "匹配 YYYY-MM-DD 格式的日期。",
    tags: ["date", "time"]
  }
];

export default function RegexCollectionPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [regexData] = useState<RegexEntry[]>(initialRegexData);
  const [testInputs, setTestInputs] = useState<Record<number, string>>({});
  const [matchResults, setMatchResults] = useState<Record<number, MatchResultStatus>>({});
  const [copyStatus, setCopyStatus] = useState<number | null>(null);

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

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopyStatus(index);
        setTimeout(() => setCopyStatus(null), 2000);
      })
      .catch((err) => {
        console.error("无法复制文本: ", err);
      });
  };

  const parseRegex = (regexString: string): RegExp | null => {
    try {
      return new RegExp(regexString);
    } catch (e) {
      console.error("Error creating RegExp:", e);
      return null;
    }
  };

  const handleTestInputChange = (index: number, regexStr: string, value: string) => {
    setTestInputs((prev) => ({ ...prev, [index]: value }));

    if (!value.trim()) {
      setMatchResults((prev) => ({ ...prev, [index]: null }));
      return;
    }

    const regex = parseRegex(regexStr);
    if (regex) {
      setMatchResults((prev) => ({ ...prev, [index]: regex.test(value) ? "success" : "fail_text_mismatch" }));
    } else {
      setMatchResults((prev) => ({ ...prev, [index]: "fail_regex_invalid" }));
    }
  };

  return (
    <ToolLayout
      title="正则表达式大全"
      description="常用正则表达式集合，方便查询、测试和复制"
      icon={<Code className="h-6 w-6 text-purple-500" />}
      category={{
        name: "开发工具",
        href: "/#dev-tools",
        color: "bg-purple-50 dark:bg-purple-950/30"
      }}
    >
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <Label htmlFor="search-regex" className="font-medium">
            搜索正则表达式
          </Label>
          <Input
            id="search-regex"
            type="text"
            placeholder="搜索名称、描述、标签或正则表达式..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        <TooltipProvider>
          <ScrollArea className="h-[600px] w-full rounded-md border">
            {filteredRegexData.length > 0 ? (
              <div className="space-y-4 p-4">
                {filteredRegexData.map((item, index) => (
                  <Card key={index} className="overflow-hidden shadow-sm">
                    <CardHeader className="bg-purple-50/50 pb-3 dark:bg-purple-950/30">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg font-semibold">{item.name}</CardTitle>
                        <div className="flex gap-2">
                          {item.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      {item.description && <p className="text-muted-foreground mb-3 text-sm">{item.description}</p>}

                      <div className="mb-4">
                        <Label htmlFor={`test-input-${index}`} className="mb-1 block text-sm font-medium">
                          测试输入
                        </Label>
                        <Textarea
                          id={`test-input-${index}`}
                          placeholder="在此输入测试文本..."
                          value={testInputs[index] || ""}
                          onChange={(e) => handleTestInputChange(index, item.regex, e.target.value)}
                          className="min-h-[60px] font-mono text-sm"
                        />
                        {testInputs[index] && testInputs[index].trim() !== "" && matchResults[index] !== null && (
                          <div className="mt-1">
                            {matchResults[index] === "success" ? (
                              <span className="text-xs font-medium text-green-500 dark:text-green-400">✓ 匹配成功</span>
                            ) : matchResults[index] === "fail_text_mismatch" ? (
                              <span className="text-xs font-medium text-red-500 dark:text-red-400">
                                ✗ 匹配失败 (文本不符)
                              </span>
                            ) : (
                              <span className="text-xs font-medium text-yellow-500 dark:text-yellow-400">
                                ⚠ 匹配失败 (正则无效)
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="relative">
                        <div className="bg-muted/30 overflow-x-auto rounded-md border p-3 pr-10 font-mono text-sm whitespace-pre-wrap">
                          {item.regex}
                        </div>
                        <div className="absolute top-2 right-2">
                          <Tooltip delayDuration={300}>
                            <TooltipTrigger asChild>
                              <Button
                                onClick={() => copyToClipboard(item.regex, index)}
                                variant="ghost"
                                size="icon"
                                className="hover:bg-muted h-7 w-7"
                                aria-label="复制正则表达式"
                              >
                                <ClipboardCopy className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>复制到剪贴板</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>

                      {copyStatus === index && (
                        <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">✓ 已复制到剪贴板</div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center p-10">
                <p className="text-muted-foreground text-center">未找到匹配的正则表达式。</p>
              </div>
            )}
          </ScrollArea>
        </TooltipProvider>
      </div>
    </ToolLayout>
  );
}
