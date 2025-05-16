"use client";

import { useState, useCallback, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { ClipboardCopy } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// CSS颜色名称映射表（部分常用颜色）
const CSS_COLOR_NAMES: Record<string, string> = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  black: "#000000",
  blue: "#0000ff",
  brown: "#a52a2a",
  coral: "#ff7f50",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkred: "#8b0000",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  indigo: "#4b0082",
  lime: "#00ff00",
  magenta: "#ff00ff",
  maroon: "#800000",
  navy: "#000080",
  olive: "#808000",
  orange: "#ffa500",
  pink: "#ffc0cb",
  purple: "#800080",
  red: "#ff0000",
  silver: "#c0c0c0",
  teal: "#008080",
  violet: "#ee82ee",
  white: "#ffffff",
  yellow: "#ffff00"
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

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function rgbToHsl(red: number, green: number, blue: number): { h: number; s: number; l: number } {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

function hslToRgb(hue: number, saturation: number, lightness: number): { r: number; g: number; b: number } {
  const h = hue / 360;
  const s = saturation / 100;
  const l = lightness / 100;

  let r = 0;
  let g = 0;
  let b = 0;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, temp: number) => {
      let t = temp;
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

export default function ColorConverterPage() {
  const [color, setColor] = useState("#1e90ff");
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const copyToClipboard = useCallback((text: string, format: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyStatus(format);
      setTimeout(() => setCopyStatus(null), 2000);
    });
  }, []);

  const colorInfo = useMemo(() => {
    // 处理HEX
    let hex = color.startsWith("#") ? color : `#${color}`;
    if (hex.length === 4) {
      hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
    }

    // 处理RGB
    const rgb = hexToRgb(hex);
    if (!rgb) return null;

    // 处理HSL
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    // 查找CSS颜色名称
    const cssColorName = Object.entries(CSS_COLOR_NAMES).find(
      ([, value]) => value.toLowerCase() === hex.toLowerCase()
    )?.[0];

    return {
      hex,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      cssName: cssColorName || null
    };
  }, [color]);

  const handleColorChange = (inputValue: string) => {
    // 移除所有空格
    const value = inputValue.replace(/\s/g, "");

    // 处理CSS颜色名称
    if (CSS_COLOR_NAMES[value.toLowerCase()]) {
      setColor(CSS_COLOR_NAMES[value.toLowerCase()]);
      return;
    }

    // 处理RGB格式
    const rgbMatch = value.match(/^rgb\((\d+),(\d+),(\d+)\)$/i);
    if (rgbMatch) {
      const [, r, g, b] = rgbMatch;
      setColor(rgbToHex(Number(r), Number(g), Number(b)));
      return;
    }

    // 处理HSL格式
    const hslMatch = value.match(/^hsl\((\d+),(\d+)%,(\d+)%\)$/i);
    if (hslMatch) {
      const [, h, s, l] = hslMatch;
      const rgb = hslToRgb(Number(h), Number(s), Number(l));
      setColor(rgbToHex(rgb.r, rgb.g, rgb.b));
      return;
    }

    // 处理HEX格式
    setColor(value);
  };

  return (
    <ToolLayout
      title="颜色格式转换器"
      description="在HEX、RGB、HSL和CSS颜色名称之间转换，支持实时预览"
      icon={<Palette className="h-6 w-6 text-purple-500" />}
      category={{
        name: "开发工具",
        href: "/#dev-tools",
        color: "bg-purple-50 dark:bg-purple-950/30"
      }}
    >
      <div className="space-y-8 p-6">
        <div className="flex flex-col space-y-4">
          <Label htmlFor="color-input">输入颜色值（支持HEX、RGB、HSL或CSS颜色名称）</Label>
          <div className="flex gap-4">
            <Input
              id="color-input"
              value={color}
              onChange={(e) => handleColorChange(e.target.value)}
              className="font-mono"
              placeholder="#HEX, rgb(), hsl() 或颜色名称"
            />
            <div className="h-10 w-20 rounded-md border" style={{ backgroundColor: colorInfo?.hex || "#000000" }} />
          </div>
        </div>

        {colorInfo && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>HEX 格式</Label>
              <div className="relative">
                <div className="bg-muted/30 overflow-x-auto rounded-md border p-3 pr-10 font-mono">{colorInfo.hex}</div>
                <div className="absolute top-2 right-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-muted h-7 w-7"
                          onClick={() => copyToClipboard(colorInfo.hex, "hex")}
                        >
                          <ClipboardCopy className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>复制到剪贴板</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {copyStatus === "hex" && <div className="mt-1 text-xs text-purple-600">✓ 已复制</div>}
              </div>
            </div>

            <div className="space-y-2">
              <Label>RGB 格式</Label>
              <div className="relative">
                <div className="bg-muted/30 overflow-x-auto rounded-md border p-3 pr-10 font-mono">{colorInfo.rgb}</div>
                <div className="absolute top-2 right-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-muted h-7 w-7"
                          onClick={() => copyToClipboard(colorInfo.rgb, "rgb")}
                        >
                          <ClipboardCopy className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>复制到剪贴板</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {copyStatus === "rgb" && <div className="mt-1 text-xs text-purple-600">✓ 已复制</div>}
              </div>
            </div>

            <div className="space-y-2">
              <Label>HSL 格式</Label>
              <div className="relative">
                <div className="bg-muted/30 overflow-x-auto rounded-md border p-3 pr-10 font-mono">{colorInfo.hsl}</div>
                <div className="absolute top-2 right-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-muted h-7 w-7"
                          onClick={() => copyToClipboard(colorInfo.hsl, "hsl")}
                        >
                          <ClipboardCopy className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>复制到剪贴板</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {copyStatus === "hsl" && <div className="mt-1 text-xs text-purple-600">✓ 已复制</div>}
              </div>
            </div>

            {colorInfo.cssName && (
              <div className="space-y-2">
                <Label>CSS 颜色名称</Label>
                <div className="relative">
                  <div className="bg-muted/30 overflow-x-auto rounded-md border p-3 pr-10 font-mono">
                    {colorInfo.cssName}
                  </div>
                  <div className="absolute top-2 right-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-muted h-7 w-7"
                            onClick={() => copyToClipboard(colorInfo.cssName!, "css")}
                          >
                            <ClipboardCopy className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>复制到剪贴板</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  {copyStatus === "css" && <div className="mt-1 text-xs text-purple-600">✓ 已复制</div>}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
