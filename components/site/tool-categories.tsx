import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  FileText,
  Clock,
  Code,
  FileOutput,
  AlignJustify,
  Palette,
  Hash,
  Text,
  FileCode,
  FileJson,
  Eraser,
  Binary,
  Box,
  Droplet,
  Shield
} from "lucide-react";

// Only include tools that are actually implemented
export const categories = [
  {
    title: "文本工具",
    description: "处理和转换文本内容。",
    icon: <FileText className="h-5 w-5 text-blue-500" />,
    color: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-800",
    tools: [
      {
        name: "字数统计",
        href: "/tools/text/word-count",
        icon: <AlignJustify className="mr-2 h-4 w-4 text-blue-500" />
      },
      {
        name: "XML 转 JSON",
        href: "/tools/text/xml-to-json",
        icon: <FileJson className="mr-2 h-4 w-4 text-blue-500" />
      },
      {
        name: "HTML 转 MarkDown",
        href: "/tools/text/html-to-markdown",
        icon: <FileCode className="mr-2 h-4 w-4 text-blue-500" />
      },
      {
        name: "Base64 编码/解码",
        href: "/tools/text/base64-encoder-decoder",
        icon: <Binary className="mr-2 h-4 w-4 text-blue-500" />
      },
      {
        name: "中英文自动加空格",
        href: "/tools/text/text-autospace",
        icon: <Text className="mr-2 h-4 w-4 text-blue-500" />
      },
      {
        name: "数字转中文",
        href: "/tools/text/number-to-chinese",
        icon: <Hash className="mr-2 h-4 w-4 text-blue-500" />
      },
      {
        name: "文本去重",
        href: "/tools/text/remove-duplicate",
        icon: <Eraser className="mr-2 h-4 w-4 text-blue-500" />
      }
    ]
  },
  {
    title: "颜色工具",
    description: "探索和使用色彩。",
    icon: <Palette className="h-5 w-5 text-emerald-500" />,
    color: "bg-emerald-50 dark:bg-emerald-950/30",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    tools: [
      {
        name: "中国传统色",
        href: "/tools/colors/china-colors",
        icon: <Palette className="mr-2 h-4 w-4 text-emerald-500" />
      },
      {
        name: "颜色转换器",
        href: "/tools/colors/color-converter",
        icon: <Droplet className="mr-2 h-4 w-4 text-emerald-500" />
      },
      {
        name: "渐变色生成器",
        href: "/tools/colors/gradient-generator",
        icon: <Palette className="mr-2 h-4 w-4 text-emerald-500" />
      },
      {
        name: "新拟态生成器",
        href: "/tools/colors/neumorphism-generator",
        icon: <Box className="mr-2 h-4 w-4 text-emerald-500" />
      }
    ]
  },
  {
    title: "开发工具",
    description: "辅助开发的实用工具。",
    icon: <Code className="h-5 w-5 text-purple-500" />,
    color: "bg-purple-50 dark:bg-purple-950/30",
    borderColor: "border-purple-200 dark:border-purple-800",
    tools: [
      {
        name: "时间戳转换",
        href: "/tools/dev/timestamp-converter",
        icon: <Clock className="mr-2 h-4 w-4 text-purple-500" />
      },
      { name: "URL 格式化", href: "/tools/dev/url-formatter", icon: <Code className="mr-2 h-4 w-4 text-purple-500" /> },
      {
        name: "正则表达式大全",
        href: "/tools/dev/regex-collection",
        icon: <Code className="mr-2 h-4 w-4 text-purple-500" />
      },
      {
        name: "密码强度分析器",
        href: "/tools/dev/password-strength",
        icon: <Shield className="mr-2 h-4 w-4 text-purple-500" />
      }
    ]
  },
  {
    title: "文件工具",
    description: "处理和转换各类文件。",
    icon: <FileOutput className="h-5 w-5 text-amber-500" />,
    color: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-800",
    tools: [
      {
        name: "HTML 转 PDF",
        href: "/tools/file/html-to-pdf",
        icon: <FileOutput className="mr-2 h-4 w-4 text-amber-500" />
      },
      {
        name: "SVG 优化器",
        href: "/tools/file/svg-optimizer",
        icon: <FileCode className="mr-2 h-4 w-4 text-amber-500" />
      },
      {
        name: "文件哈希生成器",
        href: "/tools/file/hash-generator",
        icon: <Hash className="mr-2 h-4 w-4 text-amber-500" />
      }
    ]
  }
];

const ToolCategories = () => {
  return (
    <section className="container py-8 md:py-12 lg:py-16">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <span className="bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium">高效便捷</span>
        <h2 className="font-heading text-3xl leading-[1.1] font-bold sm:text-3xl md:text-5xl">易用的在线工具箱</h2>
        <p className="text-muted-foreground max-w-[85%] leading-normal sm:text-lg sm:leading-7">
          为您提供简洁、高效、免费的在线工具集合，无需安装，即开即用。
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => (
          <Card
            key={category.title}
            className={`border ${category.borderColor} pt-0 transition-all duration-200 hover:shadow-md`}
          >
            <CardHeader className={`${category.color} flex flex-row items-center gap-2 rounded-t-lg p-4`}>
              <div className="rounded-full bg-white p-2 shadow-sm dark:bg-gray-800">{category.icon}</div>
              <div>
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {category.tools.map((tool) => (
                  <li key={tool.name} className="transition-all duration-200 hover:translate-x-1">
                    <Link
                      href={tool.href}
                      className="text-muted-foreground hover:text-foreground flex items-center text-sm transition-colors"
                    >
                      {tool.icon}
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ToolCategories;
