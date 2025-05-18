"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

interface StrengthCheck {
  hasLower: boolean;
  hasUpper: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  isLongEnough: boolean;
}

const PasswordStrengthAnalyzer = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [checks, setChecks] = useState<StrengthCheck>({
    hasLower: false,
    hasUpper: false,
    hasNumber: false,
    hasSpecial: false,
    isLongEnough: false
  });
  const [crackTime, setCrackTime] = useState("");

  const calculateStrength = (pass: string) => {
    const newChecks = {
      hasLower: /[a-z]/.test(pass),
      hasUpper: /[A-Z]/.test(pass),
      hasNumber: /[0-9]/.test(pass),
      hasSpecial: /[^A-Za-z0-9]/.test(pass),
      isLongEnough: pass.length >= 8
    };

    setChecks(newChecks);

    const strengthScore = Object.values(newChecks).filter(Boolean).length * 20;
    setStrength(strengthScore);

    // Estimate crack time
    let possibleChars = 0;
    if (newChecks.hasLower) possibleChars += 26;
    if (newChecks.hasUpper) possibleChars += 26;
    if (newChecks.hasNumber) possibleChars += 10;
    if (newChecks.hasSpecial) possibleChars += 32;

    if (pass.length > 0) {
      // Assume 10 billion guesses per second for modern hardware
      const combinations = Math.pow(possibleChars, pass.length);
      const seconds = combinations / (10 * Math.pow(10, 9));

      if (seconds < 1) {
        setCrackTime("瞬间");
      } else if (seconds < 60) {
        setCrackTime(`${Math.round(seconds)} 秒`);
      } else if (seconds < 3600) {
        setCrackTime(`${Math.round(seconds / 60)} 分钟`);
      } else if (seconds < 86400) {
        setCrackTime(`${Math.round(seconds / 3600)} 小时`);
      } else if (seconds < 31536000) {
        setCrackTime(`${Math.round(seconds / 86400)} 天`);
      } else {
        setCrackTime(`${Math.round(seconds / 31536000)} 年`);
      }
    } else {
      setCrackTime("");
    }
  };

  useEffect(() => {
    calculateStrength(password);
  }, [password]);

  const getStrengthText = () => {
    if (strength === 0) return "未输入";
    if (strength <= 20) return "非常弱";
    if (strength <= 40) return "弱";
    if (strength <= 60) return "中等";
    if (strength <= 80) return "强";
    return "非常强";
  };

  const getStrengthColor = () => {
    if (strength <= 20) return "bg-red-500";
    if (strength <= 40) return "bg-orange-500";
    if (strength <= 60) return "bg-yellow-500";
    if (strength <= 80) return "bg-blue-500";
    return "bg-green-500";
  };

  return (
    <div className="container max-w-3xl py-10">
      <h1 className="mb-8 text-3xl font-bold">密码强度分析器</h1>
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium">输入密码</label>
            <Input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入要分析的密码"
              className="w-full"
            />
          </div>

          <div>
            <div className="mb-2 flex justify-between">
              <span className="text-sm font-medium">密码强度</span>
              <span className="text-sm">{getStrengthText()}</span>
            </div>
            <Progress value={strength} className={getStrengthColor()} />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">强度检查项</h3>
            <ul className="space-y-1 text-sm">
              <li className={checks.hasLower ? "text-green-600" : "text-red-600"}>✓ 包含小写字母</li>
              <li className={checks.hasUpper ? "text-green-600" : "text-red-600"}>✓ 包含大写字母</li>
              <li className={checks.hasNumber ? "text-green-600" : "text-red-600"}>✓ 包含数字</li>
              <li className={checks.hasSpecial ? "text-green-600" : "text-red-600"}>✓ 包含特殊字符</li>
              <li className={checks.isLongEnough ? "text-green-600" : "text-red-600"}>✓ 长度至少8位</li>
            </ul>
          </div>

          {crackTime && (
            <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <h3 className="mb-2 font-medium">预估破解时间</h3>
              <p className="text-sm">{crackTime}</p>
              <p className="mt-2 text-xs text-gray-500">* 基于现代硬件每秒100亿次猜测的估算</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PasswordStrengthAnalyzer;
