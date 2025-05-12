"use client";

import React, { useState, useMemo } from "react";
import { chinaColorsData } from "./china-colors-data";
import { Input } from "@/components/ui/input"; // Assuming Input component exists
import { Button } from "@/components/ui/button"; // Assuming Button component exists

const ChinaColorsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

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
    } catch (err) {
      console.error("Failed to copy text: ", err, type);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-bold">中国传统色</h1>
        <p className="text-muted-foreground text-lg">探索美丽的中国传统颜色，支持按名称或拼音搜索。</p>
      </header>

      <div className="mx-auto mb-8 max-w-md">
        <Input
          type="text"
          placeholder="查找传统色 (例如: 淡菽红 / danshuhong)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-md border p-2 shadow-sm"
        />
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
        <div className="py-12 text-center">
          <p className="text-muted-foreground text-xl">未找到匹配的颜色。</p>
        </div>
      )}
    </div>
  );
};

export default ChinaColorsPage;
