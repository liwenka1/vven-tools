"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { categories } from "@/components/site/ToolCategories";

interface ToolProps {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface CategoryProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  tools: ToolProps[];
}

interface ToolLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: {
    name: string;
    href: string;
    color: string;
  };
}

export default function ToolLayout({ children, title, description, icon, category }: ToolLayoutProps) {
  const pathname = usePathname();

  // Find related tools from the same category
  const relatedTools = useMemo(() => {
    // Find current category
    const currentCategory = categories.find((cat: CategoryProps) => cat.title === category.name);

    if (!currentCategory) {
      return [];
    }

    // Find current tool index
    const currentToolIndex = currentCategory.tools.findIndex((tool: ToolProps) => tool.href === pathname);

    if (currentToolIndex === -1) {
      return currentCategory.tools.slice(0, 3);
    }

    // Get 3 related tools (excluding current one)
    const otherTools = [...currentCategory.tools];
    otherTools.splice(currentToolIndex, 1);

    // If we have less than 3 tools in this category (after removing current one)
    if (otherTools.length <= 3) {
      return otherTools;
    }

    // Create an ordered array of tools, starting from the next tools after current one
    const result: ToolProps[] = [];
    let nextIndex = currentToolIndex;

    while (result.length < 3 && result.length < otherTools.length) {
      nextIndex = (nextIndex + 1) % currentCategory.tools.length;

      // Skip the current tool
      if (nextIndex === currentToolIndex) {
        continue;
      }

      result.push(currentCategory.tools[nextIndex]);
    }

    return result;
  }, [pathname, category.name]);

  return (
    <div className="container mx-auto pt-8 pb-16">
      {/* 面包屑导航 */}
      <div className="text-muted-foreground mb-6 flex items-center space-x-2 text-sm">
        <Link href="/" className="hover:text-foreground flex items-center">
          <Home className="mr-1 h-4 w-4" />
          <span>首页</span>
        </Link>
        <span>/</span>
        <Link href={category.href} className="hover:text-foreground">
          {category.name}
        </Link>
        <span>/</span>
        <span className="text-foreground">{title}</span>
      </div>

      {/* 工具标题栏 */}
      <div className="mb-8 flex flex-col space-y-4 md:flex-row md:items-start md:justify-between md:space-y-0">
        <div className="flex items-center">
          <div className={`${category.color} mr-4 rounded-full p-3`}>{icon}</div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
        <Button asChild variant="outline" size="sm" className="w-full md:w-auto">
          <Link href="/#features" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回工具列表
          </Link>
        </Button>
      </div>

      {/* 工具内容 */}
      <Card className="border shadow-sm">
        <CardContent className="p-0">{children}</CardContent>
      </Card>

      {/* 相关工具推荐 */}
      {relatedTools.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 text-xl font-medium">相关工具</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {relatedTools.map((tool: ToolProps) => (
              <Card key={tool.href} className="transition-all duration-200 hover:shadow-md">
                <CardHeader className="p-4">
                  <Link href={tool.href} className="hover:text-primary transition-colors">
                    <CardTitle className="flex items-center text-base">
                      {tool.icon}
                      <span>{tool.name}</span>
                    </CardTitle>
                  </Link>
                  <CardDescription>{category.name}类工具</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
