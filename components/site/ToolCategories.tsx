import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";

// Placeholder data for tool categories
const categories = [
  {
    title: "文本工具",
    description: "处理和转换文本内容。",
    tools: [
      { name: "字数统计", href: "/tools/text/word-count" },
      { name: "JSON 格式化", href: "/tools/text/json-formatter" },
      { name: "XML 转 JSON", href: "/tools/text/xml-to-json" },
      { name: "HTML 转 MarkDown", href: "/tools/text/html-to-markdown" },
      { name: "Base64 编码/解码", href: "/tools/text/base64-encoder-decoder" },
      { name: "中英文自动加空格", href: "/tools/text/text-autospace" },
      { name: "数字转中文", href: "/tools/text/number-to-chinese" },
      { name: "文本去重", href: "/tools/text/remove-duplicate" }
    ]
  },
  {
    title: "图像工具",
    description: "编辑和转换图像文件。",
    tools: [
      { name: "图片压缩", href: "/tools/image/compressor" },
      { name: "格式转换", href: "/tools/image/converter" },
      { name: "中国传统色", href: "/tools/colors/china-colors" }
    ]
  },
  {
    title: "开发工具",
    description: "辅助开发的实用工具。",
    tools: [
      { name: "时间戳转换", href: "/tools/date-time/timestamp-converter" },
      { name: "URL 编码/解码", href: "/tools/dev/url-codec" },
      { name: "URL 格式化", href: "/tools/dev/url-formatter" },
      { name: "正则大全", href: "/tools/dev/regex-collection" }
    ]
  },
  {
    title: "文件工具",
    description: "处理和转换各类文件。",
    tools: [{ name: "HTML 转 PDF", href: "/tools/file/html-to-pdf" }]
  }
  // Add more categories as needed
];

const ToolCategories = () => {
  return (
    <section className="container py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">在线工具箱</h2>
        <p className="text-muted-foreground max-w-[85%] leading-normal sm:text-lg sm:leading-7">
          一个简洁、高效的在线工具集合。
        </p>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.title}>
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {category.tools.map((tool) => (
                  <li key={tool.name}>
                    <Link
                      href={tool.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
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
