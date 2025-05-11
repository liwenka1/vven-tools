"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
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

  return (
    <div className="container mx-auto space-y-6 p-4">
      <h1 className="text-2xl font-bold">时间戳转换工具</h1>

      <div className="space-y-4 rounded-lg border p-6 shadow-sm">
        <div className="mb-4 flex items-center space-x-2">
          <Checkbox
            id="manualDateMode"
            checked={useManualDate}
            onCheckedChange={(checked) => setUseManualDate(Boolean(checked))}
          />
          <Label htmlFor="manualDateMode" className="text-sm font-medium">
            手动选择日期/时间 (优先)
          </Label>
        </div>

        {useManualDate ? (
          <div className="space-y-2">
            <Label htmlFor="date-picker">选择日期和时间:</Label>
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
            <Label htmlFor="timestamp">输入时间戳:</Label>
            <div className="flex space-x-2">
              <Input
                id="timestamp"
                type="number"
                value={timestampInput}
                onChange={(e) => setTimestampInput(e.target.value)}
                placeholder={`在此输入时间戳 (${unit})`}
                className="flex-grow"
              />
              <Button onClick={handleSetCurrentTime}>当前时间</Button>
            </div>
            <RadioGroup
              defaultValue="ms"
              value={unit}
              onValueChange={(value: "s" | "ms") => setUnit(value)}
              className="mt-2 flex items-center space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ms" id="ms" />
                <Label htmlFor="ms">毫秒 (ms)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="s" id="s" />
                <Label htmlFor="s">秒 (s)</Label>
              </div>
            </RadioGroup>
          </div>
        )}
      </div>

      {result && (
        <div className="bg-muted rounded-lg border p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold">结果:</h2>
          <pre className="bg-background rounded-md p-3 text-sm break-all whitespace-pre-wrap">{result}</pre>
        </div>
      )}

      <div className="bg-secondary/50 text-secondary-foreground mt-6 rounded-lg border p-4 text-sm">
        <p className="font-semibold">使用说明:</p>
        <ul className="mt-2 ml-4 list-inside list-disc space-y-1">
          <li>
            <strong>手动选择日期/时间模式:</strong>{" "}
            勾选此选项后，您可以使用日期选择器来选择一个特定的日期和时间，系统将显示其对应的时间戳 (根据所选单位)。
          </li>
          <li>
            <strong>时间戳输入模式:</strong> 取消勾选手动选择后，您可以直接输入时间戳，并选择单位
            (秒或毫秒)，系统将把它转换为人类可读的日期和时间格式。
          </li>
          <li>点击 当前时间 按钮可以将输入框或日期选择器设置为当前的系统时间。</li>
        </ul>
      </div>
    </div>
  );
};

export default TimestampConverterPage;
