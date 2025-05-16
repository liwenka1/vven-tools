"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { ClipboardCopy } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface GradientStop {
  color: string;
  position: number;
}

interface GradientState {
  type: "linear" | "radial";
  angle: number;
  stops: GradientStop[];
  shape: "circle" | "ellipse";
  position: string;
}

const DEFAULT_GRADIENT: GradientState = {
  type: "linear",
  angle: 90,
  stops: [
    { color: "#ff0000", position: 0 },
    { color: "#0000ff", position: 100 }
  ],
  shape: "circle",
  position: "center"
};

const RADIAL_POSITIONS = [
  "center",
  "top",
  "top right",
  "right",
  "bottom right",
  "bottom",
  "bottom left",
  "left",
  "top left"
];

export default function GradientGeneratorPage() {
  const [gradient, setGradient] = useState<GradientState>(DEFAULT_GRADIENT);
  const [copyStatus, setCopyStatus] = useState<boolean>(false);

  const generateGradientCSS = () => {
    const stops = gradient.stops.map((stop) => `${stop.color} ${stop.position}%`).join(", ");

    if (gradient.type === "linear") {
      return `background: linear-gradient(${gradient.angle}deg, ${stops});`;
    } else {
      return `background: radial-gradient(${gradient.shape} at ${gradient.position}, ${stops});`;
    }
  };

  const copyToClipboard = () => {
    const css = generateGradientCSS();
    navigator.clipboard.writeText(css).then(() => {
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2000);
    });
  };

  const updateStop = (index: number, color: string) => {
    const newStops = [...gradient.stops];
    newStops[index] = { ...newStops[index], color };
    setGradient({ ...gradient, stops: newStops });
  };

  const updateStopPosition = (index: number, position: number) => {
    const newStops = [...gradient.stops];
    newStops[index] = { ...newStops[index], position };
    setGradient({ ...gradient, stops: newStops });
  };

  const addStop = () => {
    if (gradient.stops.length < 5) {
      const newPosition = 50;
      const newColor = "#00ff00";
      setGradient({
        ...gradient,
        stops: [...gradient.stops, { color: newColor, position: newPosition }]
      });
    }
  };

  const removeStop = (index: number) => {
    if (gradient.stops.length > 2) {
      const newStops = gradient.stops.filter((_, i) => i !== index);
      setGradient({ ...gradient, stops: newStops });
    }
  };

  return (
    <ToolLayout
      title="渐变色生成器"
      description="生成线性或径向渐变的CSS代码，支持多个颜色节点"
      icon={<Palette className="h-6 w-6 text-purple-500" />}
      category={{
        name: "颜色工具",
        href: "/#color-tools",
        color: "bg-purple-50 dark:bg-purple-950/30"
      }}
    >
      <div className="space-y-8 p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <RadioGroup
              value={gradient.type}
              onValueChange={(value: "linear" | "radial") => setGradient({ ...gradient, type: value })}
              className="flex items-center space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="linear" id="linear" />
                <Label htmlFor="linear">线性渐变</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="radial" id="radial" />
                <Label htmlFor="radial">径向渐变</Label>
              </div>
            </RadioGroup>
          </div>

          {gradient.type === "linear" ? (
            <div className="space-y-4">
              <Label>角度: {gradient.angle}°</Label>
              <input
                type="range"
                value={gradient.angle}
                onChange={(e) => setGradient({ ...gradient, angle: Number(e.target.value) })}
                min="0"
                max="360"
                step="1"
                className="w-full"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-1/2">
                  <Label>形状</Label>
                  <select
                    value={gradient.shape}
                    onChange={(e) => setGradient({ ...gradient, shape: e.target.value as "circle" | "ellipse" })}
                    className="w-full rounded-md border px-3 py-2"
                  >
                    <option value="circle">圆形</option>
                    <option value="ellipse">椭圆</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <Label>位置</Label>
                  <select
                    value={gradient.position}
                    onChange={(e) => setGradient({ ...gradient, position: e.target.value })}
                    className="w-full rounded-md border px-3 py-2"
                  >
                    {RADIAL_POSITIONS.map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>颜色节点</Label>
              {gradient.stops.length < 5 && (
                <Button variant="outline" size="sm" onClick={addStop}>
                  添加节点
                </Button>
              )}
            </div>
            {gradient.stops.map((stop, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Input
                  type="color"
                  value={stop.color}
                  onChange={(e) => updateStop(index, e.target.value)}
                  className="h-10 w-20"
                />
                <div className="flex-1">
                  <input
                    type="range"
                    value={stop.position}
                    onChange={(e) => updateStopPosition(index, Number(e.target.value))}
                    min="0"
                    max="100"
                    step="1"
                    className="w-full"
                  />
                </div>
                <div className="w-12 text-sm">{stop.position}%</div>
                {gradient.stops.length > 2 && (
                  <Button variant="ghost" size="icon" onClick={() => removeStop(index)} className="h-8 w-8">
                    ×
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label>预览</Label>
          <div className="h-32 rounded-lg border" style={{ background: generateGradientCSS().split(":")[1].trim() }} />
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
          <div className="bg-muted/30 overflow-x-auto rounded-md border p-4 font-mono">{generateGradientCSS()}</div>
          {copyStatus && <div className="text-sm text-purple-600">✓ 已复制到剪贴板</div>}
        </div>
      </div>
    </ToolLayout>
  );
}
