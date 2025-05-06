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
      { name: "XML 转 JSON", href: "/tools/text/xml-to-json" }
    ]
  },
  {
    title: "图像工具",
    description: "编辑和转换图像文件。",
    tools: [
      { name: "图片压缩", href: "/tools/image/compressor" },
      { name: "格式转换", href: "/tools/image/converter" }
    ]
  },
  {
    title: "开发工具",
    description: "辅助开发的实用工具。",
    tools: [
      { name: "时间戳转换", href: "/tools/dev/timestamp" },
      { name: "URL 编码/解码", href: "/tools/dev/url-codec" }
    ]
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
