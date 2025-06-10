"use client";

import React from "react";
import {
  ArrowRight,
  ExternalLink,
  Github,
  Globe,
  Shield,
  Sparkles,
  Wrench,
  Zap,
  Settings,
  Users,
  Clock,
  Star,
  FileText,
  Code,
  Palette,
  Upload,
  Download,
  Hash,
  Type
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProjectInfo } from "@/data/resume";
import { ModeToggle } from "@/components/mode-toggle";
import Footer from "@/components/site/footer";
import Link from "next/link";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}

const FeatureCard = ({ icon, title, description, badge }: FeatureCardProps) => (
  <Card className="group h-full border-0 bg-white/50 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/80 hover:shadow-lg dark:bg-zinc-900/50 dark:hover:bg-zinc-900/80">
    <CardHeader className="pb-4">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm">
          {icon}
        </div>
        {badge && (
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
            {badge}
          </Badge>
        )}
      </div>
      <CardTitle className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="leading-relaxed text-gray-600 dark:text-gray-300">{description}</CardDescription>
    </CardContent>
  </Card>
);

interface ToolCategoryProps {
  title: string;
  icon: string;
  tools: Array<{
    name: string;
    href: string;
    icon?: React.ReactNode;
  }>;
  color: string;
  size?: "normal" | "large";
}

const ToolCategoryCard = ({ title, icon, tools, size = "normal" }: ToolCategoryProps) => (
  <Card
    className={`group h-full border-0 transition-all duration-300 hover:-translate-y-1 ${
      size === "large" ? "md:col-span-2" : ""
    }`}
  >
    <CardContent className="h-full p-6">
      <div className="mb-6 flex items-center space-x-4">
        <div className="text-3xl">{icon}</div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{tools.length} 个工具</p>
        </div>
      </div>

      <div className="space-y-2">
        {tools.slice(0, size === "large" ? 6 : 4).map((tool, index) => (
          <a
            key={index}
            href={tool.href}
            className="group/tool flex items-center space-x-3 rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-zinc-800/50"
          >
            {tool.icon && <span className="text-gray-400">{tool.icon}</span>}
            <span className="text-sm text-gray-700 transition-colors group-hover/tool:text-blue-600 dark:text-gray-300 dark:group-hover/tool:text-blue-400">
              {tool.name}
            </span>
            <ArrowRight className="ml-auto h-3 w-3 text-gray-400 opacity-0 transition-opacity group-hover/tool:opacity-100" />
          </a>
        ))}
      </div>
    </CardContent>
  </Card>
);

const HomePage = () => {
  // 平滑滚动到指定section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
  };

  const highlights = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "即开即用",
      description: "无需安装任何软件，打开浏览器即可使用所有工具，零配置启动",
      badge: "零配置"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "数据安全",
      description: "所有数据处理在本地浏览器完成，不会上传到服务器，保护隐私安全",
      badge: "本地处理"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "跨平台兼容",
      description: "完美支持桌面、平板、手机等各种设备，适配所有主流浏览器",
      badge: "全兼容"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "开源免费",
      description: "基于MIT开源协议，完全免费使用，无任何功能限制和付费墙",
      badge: "MIT"
    }
  ];

  const toolCategories = [
    {
      title: "文本处理",
      icon: "📝",
      color: "#1A73E8",
      tools: [
        { name: "字数统计", href: "/tools/text/word-count", icon: <Type className="h-3 w-3" /> },
        { name: "XML转JSON", href: "/tools/text/xml-to-json", icon: <Code className="h-3 w-3" /> },
        { name: "去除重复", href: "/tools/text/remove-duplicate", icon: <FileText className="h-3 w-3" /> },
        { name: "中英文加空格", href: "/tools/text/text-autospace", icon: <Type className="h-3 w-3" /> },
        { name: "HTML转Markdown", href: "/tools/text/html-to-markdown", icon: <Code className="h-3 w-3" /> },
        { name: "数字转中文", href: "/tools/text/number-to-chinese", icon: <Type className="h-3 w-3" /> },
        { name: "Base64编解码", href: "/tools/text/base64-encoder-decoder", icon: <Hash className="h-3 w-3" /> }
      ]
    },
    {
      title: "文件处理",
      icon: "📁",
      color: "#00B588",
      tools: [
        { name: "HTML转PDF", href: "/tools/file/html-to-pdf", icon: <Download className="h-3 w-3" /> },
        { name: "SVG优化器", href: "/tools/file/svg-optimizer", icon: <Settings className="h-3 w-3" /> },
        { name: "哈希生成器", href: "/tools/file/hash-generator", icon: <Hash className="h-3 w-3" /> }
      ]
    },
    {
      title: "开发工具",
      icon: "💻",
      color: "#FF6B6B",
      tools: [
        { name: "时间戳转换", href: "/tools/dev/timestamp-converter", icon: <Clock className="h-3 w-3" /> },
        { name: "URL格式化", href: "/tools/dev/url-formatter", icon: <Globe className="h-3 w-3" /> },
        { name: "密码强度检测", href: "/tools/dev/password-strength", icon: <Shield className="h-3 w-3" /> },
        { name: "正则表达式库", href: "/tools/dev/regex-collection", icon: <Code className="h-3 w-3" /> }
      ]
    },
    {
      title: "设计工具",
      icon: "🎨",
      color: "#9B5DE5",
      tools: [
        { name: "渐变生成器", href: "/tools/colors/gradient-generator", icon: <Palette className="h-3 w-3" /> },
        { name: "新拟态生成器", href: "/tools/colors/neumorphism-generator", icon: <Settings className="h-3 w-3" /> },
        { name: "中国传统色", href: "/tools/colors/china-colors", icon: <Palette className="h-3 w-3" /> },
        { name: "颜色转换器", href: "/tools/colors/color-converter", icon: <Palette className="h-3 w-3" /> }
      ]
    }
  ];

  // 移除了不再使用的特性轮播效果

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800">
      {/* Header */}
      <header className="relative z-10 border-b border-gray-200/50 bg-white/80 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="group flex items-center space-x-3 transition-opacity hover:opacity-80">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                <Wrench className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  VVen Tools
                </span>
                <span className="hidden text-xs text-gray-500 transition-colors duration-300 group-hover:text-blue-500 sm:block dark:text-gray-400">
                  实用在线工具
                </span>
              </div>
            </Link>

            <div className="flex items-center space-x-6">
              <button
                onClick={() => scrollToSection("features")}
                className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                功能
              </button>
              <button
                onClick={() => scrollToSection("tools")}
                className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                工具
              </button>
              <Button
                onClick={() => scrollToSection("about")}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
              >
                关于项目
              </Button>

              {/* Theme Toggle */}
              <ModeToggle />
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden px-6 py-24">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5" />
        <div className="absolute top-1/4 left-1/4 h-72 w-72 animate-pulse rounded-full bg-blue-500/10 blur-3xl" />
        <div
          className="absolute right-1/4 bottom-1/4 h-72 w-72 animate-pulse rounded-full bg-indigo-500/10 blur-3xl"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative z-10 container mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center space-x-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm dark:border-blue-800 dark:bg-blue-900/20">
            <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="font-medium text-blue-700 dark:text-blue-300">{ProjectInfo.slogan}</span>
          </div>

          <h1 className="mb-6 text-5xl leading-tight font-bold lg:text-6xl">
            <span className="text-gray-900 dark:text-white">实用的</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              在线工具集
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
            {ProjectInfo.description}
          </p>

          <div className="mb-16 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={() => {
                const element = document.getElementById("tools");
                if (element) {
                  const headerHeight = 80;
                  const elementPosition = element.offsetTop - headerHeight;
                  window.scrollTo({
                    top: elementPosition,
                    behavior: "smooth"
                  });
                }
              }}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl"
            >
              <Wrench className="mr-2 h-5 w-5" />
              开始使用
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const element = document.getElementById("about");
                if (element) {
                  const headerHeight = 80;
                  const elementPosition = element.offsetTop - headerHeight;
                  window.scrollTo({
                    top: elementPosition,
                    behavior: "smooth"
                  });
                }
              }}
              className="border-gray-200 hover:bg-gray-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              了解更多
            </Button>
          </div>

          {/* 统计信息 */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: "实用工具", value: "20+", icon: <Wrench className="h-5 w-5" /> },
              { label: "本地处理", value: "100%", icon: <Shield className="h-5 w-5" /> },
              { label: "在线可用", value: "24/7", icon: <Clock className="h-5 w-5" /> },
              { label: "完全免费", value: "开源", icon: <Star className="h-5 w-5" /> }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 flex justify-center text-blue-600 dark:text-blue-400">{stat.icon}</div>
                <div className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-white/50 px-6 py-20 backdrop-blur-sm dark:bg-zinc-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">为什么选择 VVen Tools</h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">简单、安全、高效的在线工具平台</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {highlights.map((highlight) => (
              <FeatureCard
                key={highlight.title}
                icon={highlight.icon}
                title={highlight.title}
                description={highlight.description}
                badge={highlight.badge}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section id="tools" className="px-6 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">工具分类</h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
              四大核心功能分类，满足不同场景需求
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* 大卡片 - 文本工具 */}
            <ToolCategoryCard {...toolCategories[0]} size="large" />

            {/* 其他工具 */}
            {toolCategories.slice(1).map((category) => (
              <ToolCategoryCard key={category.title} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white/50 px-6 py-20 backdrop-blur-sm dark:bg-zinc-900/50">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">使用方法</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">简单三步，即可开始使用</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "选择工具",
                description: "从多个分类中选择您需要的功能工具",
                icon: <Wrench className="h-6 w-6" />
              },
              {
                step: "02",
                title: "输入数据",
                description: "在浏览器中直接输入文本或上传文件",
                icon: <Upload className="h-6 w-6" />
              },
              {
                step: "03",
                title: "获取结果",
                description: "快速获得处理结果，支持预览和下载",
                icon: <Download className="h-6 w-6" />
              }
            ].map((item) => (
              <Card key={item.step} className="border-0 bg-white/50 text-center backdrop-blur-sm dark:bg-zinc-900/50">
                <CardContent className="p-8">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                    {item.icon}
                  </div>
                  <div className="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">STEP {item.step}</div>
                  <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">关于 VVen Tools</h2>
          <Card className="border-0 bg-white/50 shadow-xl backdrop-blur-sm dark:bg-zinc-900/50">
            <CardContent className="p-12">
              <p className="mb-8 text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                VVen Tools 是一个现代化的在线工具集合平台，专注为用户提供高效便捷的工具服务。
                我们采用纯前端技术实现，确保您的数据在本地浏览器中处理，完全保护隐私安全。
              </p>
              <p className="mb-12 text-lg text-gray-500 dark:text-gray-400">
                项目持续更新中，如果您有工具需求或建议，欢迎通过 GitHub 与我们交流。
              </p>

              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl"
              >
                <a href={ProjectInfo.repository.url} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  查看源代码
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
