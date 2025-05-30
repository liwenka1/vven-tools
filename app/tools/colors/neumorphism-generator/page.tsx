"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Box } from "lucide-react";
import ToolLayout from "@/components/tools/tool-layout";
import { ClipboardCopy } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface NeumorphismState {
  type: "flat" | "pressed" | "concave";
  size: number;
  radius: number;
  distance: number;
  intensity: number;
  blur: number;
  color: string;
}

const DEFAULT_STATE: NeumorphismState = {
  type: "flat",
  size: 200,
  radius: 30,
  distance: 20,
  intensity: 15,
  blur: 30,
  color: "#e0e0e0"
};

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

function generateNeumorphismCSS(state: NeumorphismState): string {
  const rgb = hexToRgb(state.color);
  if (!rgb) return "";

  const { r, g, b } = rgb;
  const darkenAmount = state.intensity;
  const lightenAmount = state.intensity;

  const darkShadow = `rgba(${Math.max(0, r - darkenAmount)}, ${Math.max(0, g - darkenAmount)}, ${Math.max(
    0,
    b - darkenAmount
  )}, 1)`;
  const lightShadow = `rgba(${Math.min(255, r + lightenAmount)}, ${Math.min(255, g + lightenAmount)}, ${Math.min(
    255,
    b + lightenAmount
  )}, 1)`;

  let boxShadow = "";
  switch (state.type) {
    case "flat":
      boxShadow = `${state.distance}px ${state.distance}px ${state.blur}px ${darkShadow},
                   -${state.distance}px -${state.distance}px ${state.blur}px ${lightShadow}`;
      break;
    case "pressed":
      boxShadow = `inset ${state.distance}px ${state.distance}px ${state.blur}px ${darkShadow},
                   inset -${state.distance}px -${state.distance}px ${state.blur}px ${lightShadow}`;
      break;
    case "concave":
      boxShadow = `${state.distance}px ${state.distance}px ${state.blur}px ${darkShadow},
                   -${state.distance}px -${state.distance}px ${state.blur}px ${lightShadow},
                   inset ${state.distance / 2}px ${state.distance / 2}px ${state.blur / 2}px ${lightShadow},
                   inset -${state.distance / 2}px -${state.distance / 2}px ${state.blur / 2}px ${darkShadow}`;
      break;
  }

  return `background: ${state.color};
border-radius: ${state.radius}px;
box-shadow: ${boxShadow};`;
}

export default function NeumorphismGeneratorPage() {
  const [state, setState] = useState<NeumorphismState>(DEFAULT_STATE);
  const [copyStatus, setCopyStatus] = useState<boolean>(false);

  const copyToClipboard = () => {
    const css = generateNeumorphismCSS(state);
    navigator.clipboard.writeText(css).then(() => {
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2000);
    });
  };

  return (
    <ToolLayout
      title="新拟态生成器"
      description="生成新拟态（Neumorphism）风格的CSS代码，支持多种效果"
      icon={<Box className="h-6 w-6 text-purple-500" />}
      category={{
        name: "颜色工具",
        href: "/#color-tools",
        color: "bg-purple-50 dark:bg-purple-950/30"
      }}
    >
      <div className="space-y-8 p-6">
        <div className="flex flex-col space-y-6">
          <div className="space-y-4">
            <Label>效果类型</Label>
            <RadioGroup
              value={state.type}
              onValueChange={(value: "flat" | "pressed" | "concave") => setState({ ...state, type: value })}
              className="flex items-center space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="flat" id="flat" />
                <Label htmlFor="flat">凸起</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pressed" id="pressed" />
                <Label htmlFor="pressed">凹陷</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="concave" id="concave" />
                <Label htmlFor="concave">双重效果</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <Label htmlFor="color">背景颜色</Label>
              <div className="flex gap-4">
                <Input
                  id="color"
                  type="color"
                  value={state.color}
                  onChange={(e) => setState({ ...state, color: e.target.value })}
                  className="h-10 w-20"
                />
                <Input
                  type="text"
                  value={state.color}
                  onChange={(e) => setState({ ...state, color: e.target.value })}
                  className="flex-1 font-mono"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label htmlFor="size">元素大小</Label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  id="size"
                  min="50"
                  max="400"
                  value={state.size}
                  onChange={(e) => setState({ ...state, size: Number(e.target.value) })}
                  className="flex-1"
                />
                <div className="w-16 text-right">{state.size}px</div>
              </div>
            </div>

            <div className="space-y-4">
              <Label htmlFor="radius">圆角半径</Label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  id="radius"
                  min="0"
                  max="100"
                  value={state.radius}
                  onChange={(e) => setState({ ...state, radius: Number(e.target.value) })}
                  className="flex-1"
                />
                <div className="w-16 text-right">{state.radius}px</div>
              </div>
            </div>

            <div className="space-y-4">
              <Label htmlFor="distance">阴影距离</Label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  id="distance"
                  min="5"
                  max="50"
                  value={state.distance}
                  onChange={(e) => setState({ ...state, distance: Number(e.target.value) })}
                  className="flex-1"
                />
                <div className="w-16 text-right">{state.distance}px</div>
              </div>
            </div>

            <div className="space-y-4">
              <Label htmlFor="intensity">阴影强度</Label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  id="intensity"
                  min="5"
                  max="30"
                  value={state.intensity}
                  onChange={(e) => setState({ ...state, intensity: Number(e.target.value) })}
                  className="flex-1"
                />
                <div className="w-16 text-right">{state.intensity}</div>
              </div>
            </div>

            <div className="space-y-4">
              <Label htmlFor="blur">模糊半径</Label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  id="blur"
                  min="0"
                  max="100"
                  value={state.blur}
                  onChange={(e) => setState({ ...state, blur: Number(e.target.value) })}
                  className="flex-1"
                />
                <div className="w-16 text-right">{state.blur}px</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label>预览</Label>
          <div className="flex items-center justify-center rounded-lg border bg-gray-50 p-8">
            <div
              style={{
                width: `${state.size}px`,
                height: `${state.size}px`,
                ...Object.fromEntries(
                  generateNeumorphismCSS(state)
                    .split(";")
                    .filter(Boolean)
                    .map((line) => {
                      const [prop, value] = line.split(":");
                      return [prop.trim(), value.trim()];
                    })
                )
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>CSS 代码</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyToClipboard}>
                    <ClipboardCopy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>复制到剪贴板</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="bg-muted/30 overflow-x-auto rounded-md border p-4 font-mono whitespace-pre">
            {generateNeumorphismCSS(state)}
          </div>
          {copyStatus && <div className="text-sm text-purple-600">✓ 已复制到剪贴板</div>}
        </div>
      </div>
    </ToolLayout>
  );
}
