"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClipboardCopy, Hash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ToolLayout from "@/components/tools/tool-layout";

export default function NumberToChinesePage() {
  const [number, setNumber] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [type, setType] = useState<"normal" | "rmb">("normal");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Configuration for normal Chinese numbers
  const cnNums = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  const cnIntRadice = ["", "十", "百", "千"];
  const cnIntUnits = ["", "万", "亿", "兆"];

  // Configuration for RMB format (formal characters)
  const rmbNums = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
  const rmbIntRadice = ["", "拾", "佰", "仟"];
  const rmbIntUnits = ["", "万", "亿", "兆"];
  const cnDecUnits = ["角", "分", "毫", "厘"];
  const cnInteger = "整";
  const cnIntLast = "元";
  const maxNum = 999999999999999; // Adjusted to avoid precision loss

  // Convert integer part
  const integerToChinese = (num: number, isMoney: boolean): string => {
    let integerNum = Math.floor(Math.abs(num));
    let result = "";
    let unitPos = 0;
    let strIns = "";
    let zeroCount = 0;

    // Choose the appropriate character set based on format
    const nums = isMoney ? rmbNums : cnNums;
    const intRadice = isMoney ? rmbIntRadice : cnIntRadice;
    const intUnits = isMoney ? rmbIntUnits : cnIntUnits;

    if (integerNum === 0) {
      if (isMoney) return cnIntLast;
      return nums[0];
    }

    while (integerNum > 0) {
      const quotient = Math.floor(integerNum / 10);
      const remainder = integerNum % 10;
      const p = unitPos % 4;
      const q = Math.floor(unitPos / 4);

      if (remainder === 0) {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          strIns = nums[0] + strIns;
          zeroCount = 0;
        }
        strIns = nums[remainder] + intRadice[p] + strIns;
      }

      // Add units
      if (p === 0 && zeroCount < 4 && q > 0) {
        strIns = intUnits[q] + strIns;
      }

      // Special case for "十"/"拾"
      if (quotient < 1 && p === 1 && q === 0) {
        if (!isMoney && strIns.startsWith("一十")) {
          strIns = strIns.substring(1);
        }
      }

      unitPos++;
      integerNum = quotient;
    }

    if (isMoney) {
      result = strIns + cnIntLast;
    } else {
      result = strIns;
    }

    return result;
  };

  // Convert decimal part for money
  const decimalToChinese = (num: number, isMoney: boolean): string => {
    const decimalNum = Math.abs(num) - Math.floor(Math.abs(num));
    let result = "";

    if (decimalNum === 0) {
      return isMoney ? cnInteger : "";
    }

    const roundedDecimal = Math.round(decimalNum * 10000) / 10000;
    const decimalStr = roundedDecimal.toString().substring(2);

    // Choose number characters based on format
    const nums = isMoney ? rmbNums : cnNums;

    for (let i = 0; i < decimalStr.length; i++) {
      if (i >= cnDecUnits.length) break; // Only process up to available units

      const digit = parseInt(decimalStr[i], 10);
      if (digit !== 0) {
        result += nums[digit] + (isMoney ? cnDecUnits[i] : "");
      } else if (result !== "" && isMoney) {
        result += nums[digit];
      }
    }

    return result;
  };

  // Main conversion function
  const convertToChinese = () => {
    setErrorMsg("");

    if (!number.trim()) {
      setErrorMsg("请输入一个数字");
      setResult("");
      return;
    }

    const num = parseFloat(number.replace(/,/g, ""));

    if (isNaN(num)) {
      setErrorMsg("请输入有效的数字");
      setResult("");
      return;
    }

    if (num > maxNum) {
      setErrorMsg(`数字不能超过 ${maxNum}`);
      setResult("");
      return;
    }

    const sign = num < 0 ? "负" : "";

    if (type === "rmb") {
      // RMB format - formal currency characters
      const integerPart = integerToChinese(num, true);
      const decimalPart = decimalToChinese(num, true);
      setResult(sign + integerPart + decimalPart);
    } else {
      // Normal Chinese numbers
      const integerPart = integerToChinese(num, false);
      const decimalNum = Math.abs(num) - Math.floor(Math.abs(num));

      if (decimalNum === 0) {
        setResult(sign + integerPart);
      } else {
        const decimalStr = decimalNum.toString().substring(2);
        let decimalPart = "点";

        for (const digit of decimalStr) {
          decimalPart += cnNums[parseInt(digit, 10)];
        }

        setResult(sign + integerPart + decimalPart);
      }
    }
  };

  const handleClear = () => {
    setNumber("");
    setResult("");
    setErrorMsg("");
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleTypeChange = (value: string) => {
    setType(value as "normal" | "rmb");
  };

  return (
    <ToolLayout
      title="数字转中文"
      description="将数字转换为中文大写形式，支持普通数字和人民币金额"
      icon={<Hash className="h-6 w-6 text-blue-500" />}
      category={{
        name: "文本工具",
        href: "/#text-tools",
        color: "bg-blue-50 dark:bg-blue-950/30"
      }}
    >
      <div className="space-y-6 p-6">
        <div className="mb-6">
          <h3 className="mb-3 text-base font-medium">转换类型</h3>
          <RadioGroup
            defaultValue="normal"
            onValueChange={handleTypeChange}
            className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="normal" id="normal" />
              <Label htmlFor="normal" className="cursor-pointer font-normal">
                普通数字
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rmb" id="rmb" />
              <Label htmlFor="rmb" className="cursor-pointer font-normal">
                人民币金额
              </Label>
            </div>
          </RadioGroup>

          <div className="text-muted-foreground bg-muted mt-2 rounded-lg p-3 text-xs">
            {type === "normal" ? (
              <p>将阿拉伯数字转换为中文数字，例如：123 → 一百二十三</p>
            ) : (
              <p>将数字转换为人民币大写金额，例如：123.45 → 壹佰贰拾叁元肆角伍分</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="number" className="font-medium">
            输入数字
          </Label>
          <Input
            id="number"
            type="text"
            placeholder="请输入数字..."
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="font-mono"
          />
          {errorMsg && <p className="mt-1 text-sm text-red-500">{errorMsg}</p>}
          <p className="text-muted-foreground mt-1 text-xs">支持整数和小数，最大支持15位数字</p>
        </div>

        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Button onClick={convertToChinese} className="bg-blue-600 hover:bg-blue-700">
            转换
          </Button>
          <Button onClick={handleClear} variant="outline">
            清空
          </Button>
        </div>

        {result && (
          <div className="bg-muted/30 mt-6 rounded-lg border p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-medium">转换结果</h3>
              <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8">
                <ClipboardCopy className="mr-2 h-4 w-4" />
                复制
              </Button>
            </div>
            <div className="bg-card rounded-md border p-4 text-sm break-all">{result}</div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
