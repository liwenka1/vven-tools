"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
      <div className="mt-12">
        <h2 className="mb-4 text-xl font-medium">相关工具</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {/* 这里可以根据当前工具类别动态推荐相关工具 */}
          <Card className="transition-all duration-200 hover:shadow-md">
            <CardHeader className="p-4">
              <CardTitle className="text-base">{title} 相关工具 1</CardTitle>
              <CardDescription>相关工具描述</CardDescription>
            </CardHeader>
          </Card>
          <Card className="transition-all duration-200 hover:shadow-md">
            <CardHeader className="p-4">
              <CardTitle className="text-base">{title} 相关工具 2</CardTitle>
              <CardDescription>相关工具描述</CardDescription>
            </CardHeader>
          </Card>
          <Card className="transition-all duration-200 hover:shadow-md">
            <CardHeader className="p-4">
              <CardTitle className="text-base">{title} 相关工具 3</CardTitle>
              <CardDescription>相关工具描述</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
