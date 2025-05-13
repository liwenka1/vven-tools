"use client";

import React, { useState, useMemo } from "react";
import { chinaColorsData } from "./china-colors-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Palette, ClipboardCopy } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { Badge } from "@/components/ui/badge";

const ChinaColorsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const filteredColors = useMemo(() => {
    if (!searchTerm) {
      return chinaColorsData;
    }
    const lowerSearchTerm = searchTerm.toLowerCase();
    return chinaColorsData.filter(
      (color) =>
        color.name.toLowerCase().includes(lowerSearchTerm) || color.pinyin.toLowerCase().includes(lowerSearchTerm)
    );
  }, [searchTerm]);

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(`${type}: ${text}`);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err, type);
    }
  };

  return (
    <ToolLayout
      title="中国传统色"
      description="探索美丽的中国传统颜色，支持按名称或拼音搜索"
      icon={<Palette className="h-6 w-6 text-emerald-500" />}
      category={{
        name: "颜色工具",
        href: "/#color-tools",
        color: "bg-emerald-50 dark:bg-emerald-950/30"
      }}
    >
      <div className="space-y-6 p-6">
        <div className="mx-auto max-w-md">
          <label htmlFor="search-colors" className="mb-2 block text-sm font-medium">
            查找传统色
          </label>
          <Input
            id="search-colors"
            type="text"
            placeholder="输入名称或拼音 (例如: 淡菽红 / danshuhong)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full shadow-sm"
          />
        </div>

        {copiedText && (
          <div className="fixed right-4 bottom-4 z-50">
            <Badge className="bg-emerald-100 px-3 py-2 text-emerald-800 shadow-lg dark:bg-emerald-900 dark:text-emerald-200">
              <ClipboardCopy className="mr-2 h-4 w-4" />
              已复制: {copiedText}
            </Badge>
          </div>
        )}

        <div className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-medium">传统色卡 ({filteredColors.length})</h3>
          </div>

          {filteredColors.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredColors.map((color) => (
                <div
                  key={color.hex}
                  className="bg-card overflow-hidden rounded-lg border shadow-lg transition-all hover:shadow-xl"
                >
                  <div
                    className="h-40 w-full"
                    style={{
                      backgroundColor: color.hex,
                      boxShadow: `0px 10px 20px 0px rgba(${color.RGB.join(",")}, 0.6)`
                    }}
                  />
                  <div className="p-4">
                    <h3 className="mb-2 truncate text-center text-xl font-semibold" title={color.name}>
                      {color.name}
                    </h3>
                    <p className="text-muted-foreground mb-3 text-center text-xs">{color.pinyin}</p>
                    <div className="space-y-2 text-sm">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handleCopy(color.hex, "HEX")}
                        title={`复制 HEX: ${color.hex}`}
                      >
                        HEX: {color.hex}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handleCopy(`rgb(${color.RGB.join(",")})`, "RGB")}
                        title={`复制 RGB: rgb(${color.RGB.join(",")})`}
                      >
                        RGB: {color.RGB.join(", ")}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handleCopy(color.CMYK.join(","), "CMYK")}
                        title={`复制 CMYK: ${color.CMYK.join(",")}`}
                      >
                        CMYK: {color.CMYK.join(", ")}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-muted/30 rounded-lg border py-12 text-center">
              <p className="text-muted-foreground text-xl">未找到匹配的颜色。</p>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
};

export default ChinaColorsPage;
