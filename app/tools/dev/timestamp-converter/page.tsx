"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, ClipboardCopy } from "lucide-react";
import ToolLayout from "@/components/tools/tool-layout";
import { Badge } from "@/components/ui/badge";
// We'll need to install react-datepicker and date-fns
// npm install react-datepicker date-fns
// npm install --save-dev @types/react-datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, fromUnixTime, getTime, getUnixTime } from "date-fns";

const TimestampConverterPage = () => {
  const [timestampInput, setTimestampInput] = useState<string>("");
  const [unit, setUnit] = useState<"s" | "ms">("ms");
  const [useManualDate, setUseManualDate] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [result, setResult] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (useManualDate) {
      if (selectedDate) {
        const newTimestamp = unit === "s" ? getUnixTime(selectedDate) : getTime(selectedDate);
        setResult(`时间戳 (${unit}): ${newTimestamp}`);
        // Also update timestampInput to reflect the selected date for consistency when switching modes
        setTimestampInput(newTimestamp.toString());
      } else {
        setResult("");
      }
    } else {
      if (timestampInput) {
        const tsNumber = parseInt(timestampInput, 10);
        if (!isNaN(tsNumber)) {
          try {
            const date = unit === "s" ? fromUnixTime(tsNumber) : new Date(tsNumber);
            setResult(`转换结果: ${format(date, "yyyy-MM-dd HH:mm:ss")}`);
          } catch (error) {
            console.log(error);
            setResult("无效的时间戳或单位");
          }
        } else {
          setResult("请输入有效的时间戳数字");
        }
      } else {
        setResult("");
      }
    }
  }, [timestampInput, unit, useManualDate, selectedDate]);

  const handleSetCurrentTime = () => {
    const now = new Date();
    setSelectedDate(now); // Keep date picker in sync
    const currentTimestamp = unit === "s" ? getUnixTime(now) : getTime(now);
    setTimestampInput(currentTimestamp.toString());
    if (useManualDate) {
      setResult(`时间戳 (${unit}): ${currentTimestamp}`);
    } else {
      setResult(`转换结果: ${format(now, "yyyy-MM-dd HH:mm:ss")}`);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <ToolLayout
      title="时间戳转换"
      description="在时间戳和人类可读的日期时间格式之间进行转换"
      icon={<Clock className="h-6 w-6 text-purple-500" />}
      category={{
        name: "开发工具",
        href: "/#dev-tools",
        color: "bg-purple-50 dark:bg-purple-950/30"
      }}
    >
      <div className="space-y-6 p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="manualDateMode"
              checked={useManualDate}
              onCheckedChange={(checked) => setUseManualDate(Boolean(checked))}
            />
            <Label htmlFor="manualDateMode" className="text-sm font-medium">
              手动选择日期/时间 (优先)
            </Label>
          </div>

          <div className="bg-muted/40 text-muted-foreground rounded-lg p-4 text-xs">
            {useManualDate ? "选择日期和时间将生成对应的时间戳" : "输入时间戳将转换为人类可读的日期和时间"}
          </div>

          {useManualDate ? (
            <div className="space-y-2">
              <Label htmlFor="date-picker" className="font-medium">
                选择日期和时间:
              </Label>
              <DatePicker
                id="date-picker"
                selected={selectedDate}
                onChange={(date: Date | null) => setSelectedDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="yyyy-MM-dd HH:mm"
                className="bg-background text-foreground focus:ring-ring focus:border-ring w-full rounded-md border p-2"
                wrapperClassName="w-full"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="timestamp" className="font-medium">
                输入时间戳:
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="timestamp"
                  type="number"
                  value={timestampInput}
                  onChange={(e) => setTimestampInput(e.target.value)}
                  placeholder={`在此输入时间戳 (${unit})`}
                  className="flex-grow"
                />
                <Button onClick={handleSetCurrentTime} className="bg-purple-600 hover:bg-purple-700">
                  当前时间
                </Button>
              </div>
              <RadioGroup
                defaultValue="ms"
                value={unit}
                onValueChange={(value: "s" | "ms") => setUnit(value)}
                className="mt-2 flex items-center space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ms" id="ms" />
                  <Label htmlFor="ms" className="cursor-pointer font-normal">
                    毫秒 (ms)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="s" id="s" />
                  <Label htmlFor="s" className="cursor-pointer font-normal">
                    秒 (s)
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </div>

        {result && (
          <div className="bg-muted/30 mt-6 rounded-lg border p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-medium">结果:</h3>
              <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8">
                <ClipboardCopy className="mr-2 h-4 w-4" />
                复制
              </Button>
            </div>
            <div className="bg-card rounded-md border p-4 font-mono text-sm break-all whitespace-pre-wrap">
              {result}
            </div>
          </div>
        )}

        {copied && (
          <div className="fixed right-4 bottom-4 z-50">
            <Badge className="bg-purple-100 px-3 py-2 text-purple-800 shadow-lg dark:bg-purple-900 dark:text-purple-200">
              <ClipboardCopy className="mr-2 h-4 w-4" />
              已复制到剪贴板
            </Badge>
          </div>
        )}

        <div className="bg-muted/40 space-y-2 rounded-lg p-4 text-sm">
          <h3 className="font-medium">使用说明:</h3>
          <ul className="text-muted-foreground list-inside list-disc space-y-1 text-xs">
            <li>
              <span className="font-medium">手动选择日期/时间模式:</span>{" "}
              勾选此选项后，使用日期选择器选择特定日期和时间，显示对应的时间戳。
            </li>
            <li>
              <span className="font-medium">时间戳输入模式:</span> 直接输入时间戳，并选择单位
              (秒或毫秒)，转换为人类可读的日期时间格式。
            </li>
            <li>点击&ldquo;当前时间&rdquo;按钮可将输入设置为当前系统时间。</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
};

export default TimestampConverterPage;
