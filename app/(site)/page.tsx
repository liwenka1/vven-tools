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
  Type,
  CheckCircle,
  Award
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
  colorScheme: "trust" | "security" | "innovation" | "growth";
}

const FeatureCard = ({ icon, title, description, badge, colorScheme }: FeatureCardProps) => {
  const colorClasses = {
    trust: {
      bg: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30",
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
      badge: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      title: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
      border: "border-blue-200/50 dark:border-blue-800/30"
    },
    security: {
      bg: "bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30",
      iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
      title: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
      border: "border-emerald-200/50 dark:border-emerald-800/30"
    },
    innovation: {
      bg: "bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30",
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
      badge: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      title: "group-hover:text-orange-600 dark:group-hover:text-orange-400",
      border: "border-orange-200/50 dark:border-orange-800/30"
    },
    growth: {
      bg: "bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30",
      iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
      badge: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      title: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
      border: "border-purple-200/50 dark:border-purple-800/30"
    }
  };

  const colors = colorClasses[colorScheme];

  return (
    <Card
      className={`group h-full ${colors.bg} ${colors.border} border shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl`}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${colors.iconBg} text-white shadow-md transition-transform duration-300 group-hover:scale-110`}
          >
            {icon}
          </div>
          {badge && <Badge className={`${colors.badge} border-0 font-medium`}>{badge}</Badge>}
        </div>
        <CardTitle
          className={`text-xl font-bold text-gray-900 transition-colors duration-300 ${colors.title} dark:text-white`}
        >
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

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
  colorScheme: "primary" | "secondary" | "accent" | "neutral";
}

const ToolCategoryCard = ({ title, icon, tools, size = "normal", colorScheme }: ToolCategoryProps) => {
  const colorClasses = {
    primary: {
      bg: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
      border: "border-blue-200/50 dark:border-blue-800/30",
      accent: "text-blue-600 dark:text-blue-400"
    },
    secondary: {
      bg: "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20",
      border: "border-emerald-200/50 dark:border-emerald-800/30",
      accent: "text-emerald-600 dark:text-emerald-400"
    },
    accent: {
      bg: "bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20",
      border: "border-violet-200/50 dark:border-violet-800/30",
      accent: "text-violet-600 dark:text-violet-400"
    },
    neutral: {
      bg: "bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950/20 dark:to-gray-950/20",
      border: "border-slate-200/50 dark:border-slate-800/30",
      accent: "text-slate-600 dark:text-slate-400"
    }
  };

  const colors = colorClasses[colorScheme];

  return (
    <Card
      className={`group h-full ${colors.bg} ${colors.border} border transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${size === "large" ? "md:col-span-2" : ""}`}
    >
      <CardContent className="h-full p-8">
        <div className="mb-8 flex items-center space-x-4">
          <div className="text-4xl">{icon}</div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{tools.length} 个专业工具</p>
          </div>
        </div>

        <div className={`grid gap-3 ${size === "large" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
          {tools.slice(0, size === "large" ? 6 : 4).map((tool, index) => (
            <a
              key={index}
              href={tool.href}
              className="group/tool flex items-center space-x-3 rounded-xl p-4 transition-all duration-300 hover:bg-white/60 hover:shadow-sm dark:hover:bg-white/5"
            >
              {tool.icon && <span className={`${colors.accent} transition-colors`}>{tool.icon}</span>}
              <span className="flex-1 text-sm font-medium text-gray-700 transition-colors group-hover/tool:text-gray-900 dark:text-gray-300 dark:group-hover/tool:text-white">
                {tool.name}
              </span>
              <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 transition-all duration-300 group-hover/tool:translate-x-1 group-hover/tool:opacity-100" />
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

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

  // 基于色彩心理学的特性配置
  const highlights = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "即开即用",
      description: "无需安装任何软件，打开浏览器即可使用所有工具，零配置启动",
      badge: "零配置",
      colorScheme: "innovation" as const // 橙色：活力、效率
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "数据安全",
      description: "所有数据处理在本地浏览器完成，不会上传到服务器，保护隐私安全",
      badge: "本地处理",
      colorScheme: "security" as const // 绿色：安全、信任
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "跨平台兼容",
      description: "完美支持桌面、平板、手机等各种设备，适配所有主流浏览器",
      badge: "全兼容",
      colorScheme: "trust" as const // 蓝色：可靠、专业
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "开源免费",
      description: "基于MIT开源协议，完全免费使用，无任何功能限制和付费墙",
      badge: "MIT",
      colorScheme: "growth" as const // 紫色：开放、创新
    }
  ];

  const toolCategories = [
    {
      title: "文本处理",
      icon: "📝",
      color: "#1A73E8",
      colorScheme: "primary" as const,
      tools: [
        { name: "字数统计", href: "/tools/text/word-count", icon: <Type className="h-4 w-4" /> },
        { name: "XML转JSON", href: "/tools/text/xml-to-json", icon: <Code className="h-4 w-4" /> },
        { name: "去除重复", href: "/tools/text/remove-duplicate", icon: <FileText className="h-4 w-4" /> },
        { name: "中英文加空格", href: "/tools/text/text-autospace", icon: <Type className="h-4 w-4" /> },
        { name: "HTML转Markdown", href: "/tools/text/html-to-markdown", icon: <Code className="h-4 w-4" /> },
        { name: "数字转中文", href: "/tools/text/number-to-chinese", icon: <Type className="h-4 w-4" /> },
        { name: "Base64编解码", href: "/tools/text/base64-encoder-decoder", icon: <Hash className="h-4 w-4" /> }
      ]
    },
    {
      title: "文件处理",
      icon: "📁",
      color: "#00B588",
      colorScheme: "secondary" as const,
      tools: [
        { name: "HTML转PDF", href: "/tools/file/html-to-pdf", icon: <Download className="h-4 w-4" /> },
        { name: "SVG优化器", href: "/tools/file/svg-optimizer", icon: <Settings className="h-4 w-4" /> },
        { name: "哈希生成器", href: "/tools/file/hash-generator", icon: <Hash className="h-4 w-4" /> }
      ]
    },
    {
      title: "开发工具",
      icon: "💻",
      color: "#FF6B6B",
      colorScheme: "neutral" as const,
      tools: [
        { name: "时间戳转换", href: "/tools/dev/timestamp-converter", icon: <Clock className="h-4 w-4" /> },
        { name: "URL格式化", href: "/tools/dev/url-formatter", icon: <Globe className="h-4 w-4" /> },
        { name: "密码强度检测", href: "/tools/dev/password-strength", icon: <Shield className="h-4 w-4" /> },
        { name: "正则表达式库", href: "/tools/dev/regex-collection", icon: <Code className="h-4 w-4" /> }
      ]
    },
    {
      title: "设计工具",
      icon: "🎨",
      color: "#9B5DE5",
      colorScheme: "accent" as const,
      tools: [
        { name: "渐变生成器", href: "/tools/colors/gradient-generator", icon: <Palette className="h-4 w-4" /> },
        { name: "新拟态生成器", href: "/tools/colors/neumorphism-generator", icon: <Settings className="h-4 w-4" /> },
        { name: "中国传统色", href: "/tools/colors/china-colors", icon: <Palette className="h-4 w-4" /> },
        { name: "颜色转换器", href: "/tools/colors/color-converter", icon: <Palette className="h-4 w-4" /> }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 shadow-sm backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/80">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="group flex items-center space-x-3 transition-opacity hover:opacity-80">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                <Wrench className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  VVen Tools
                </span>
                <span className="hidden text-xs font-medium text-gray-500 transition-colors duration-300 group-hover:text-blue-500 sm:block dark:text-gray-400">
                  专业在线工具平台
                </span>
              </div>
            </Link>

            <div className="flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("features")}
                className="font-medium text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                功能特性
              </button>
              <button
                onClick={() => scrollToSection("tools")}
                className="font-medium text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                工具分类
              </button>
              <Button
                onClick={() => scrollToSection("about")}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
              >
                关于项目
              </Button>

              {/* Theme Toggle */}
              <ModeToggle />
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section - 认知心理学优化：清晰的视觉层次 */}
      <section id="home" className="relative overflow-hidden px-6 py-32">
        {/* 背景装饰 - 降低认知负荷 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-transparent to-indigo-500/3" />
        <div className="absolute top-1/3 left-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500/5 blur-3xl" />
        <div
          className="absolute right-1/3 bottom-1/3 h-96 w-96 animate-pulse rounded-full bg-indigo-500/5 blur-3xl"
          style={{ animationDelay: "2s" }}
        />

        <div className="relative z-10 container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* 主要内容 - 认知焦点区域 */}
            <div className="space-y-8 lg:col-span-7">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 rounded-full border border-blue-200 bg-blue-50 px-6 py-3 text-sm shadow-sm dark:border-blue-800 dark:bg-blue-900/20">
                  <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="font-semibold text-blue-700 dark:text-blue-300">{ProjectInfo.slogan}</span>
                </div>

                <h1 className="text-5xl leading-tight font-black lg:text-7xl">
                  <span className="text-gray-900 dark:text-white">专业的</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    在线工具集
                  </span>
                </h1>

                <p className="max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                  {ProjectInfo.description}
                </p>

                {/* CTA按钮 - 基于色彩心理学的橙色激发行动 */}
                <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                  <Button
                    size="lg"
                    onClick={() => scrollToSection("tools")}
                    className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 text-lg text-white shadow-lg transition-all duration-300 hover:from-orange-600 hover:to-red-600 hover:shadow-xl"
                  >
                    <Wrench className="mr-2 h-5 w-5" />
                    开始使用工具
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => scrollToSection("about")}
                    className="border-gray-300 px-8 py-4 text-lg text-gray-700 hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    了解更多
                  </Button>
                </div>
              </div>
            </div>

            {/* 统计信息卡片 - 视觉证明 */}
            <div className="grid grid-cols-2 gap-6 lg:col-span-5">
              {[
                {
                  label: "专业工具",
                  value: "20+",
                  icon: <Wrench className="h-6 w-6" />,
                  color: "from-blue-500 to-blue-600",
                  bgColor: "from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30"
                },
                {
                  label: "隐私保护",
                  value: "100%",
                  icon: <Shield className="h-6 w-6" />,
                  color: "from-emerald-500 to-emerald-600",
                  bgColor: "from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30"
                },
                {
                  label: "在线可用",
                  value: "24/7",
                  icon: <Clock className="h-6 w-6" />,
                  color: "from-orange-500 to-orange-600",
                  bgColor: "from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30"
                },
                {
                  label: "开源免费",
                  value: "MIT",
                  icon: <Star className="h-6 w-6" />,
                  color: "from-purple-500 to-purple-600",
                  bgColor: "from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30"
                }
              ].map((stat, index) => (
                <Card
                  key={index}
                  className={`border bg-gradient-to-br p-6 text-center shadow-sm ${stat.bgColor} border-gray-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-700/50`}
                >
                  <div
                    className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-sm`}
                  >
                    {stat.icon}
                  </div>
                  <div className="mb-1 text-3xl font-black text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - 色彩心理学应用 */}
      <section id="features" className="bg-white/70 px-6 py-24 backdrop-blur-sm dark:bg-slate-900/70">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl dark:text-white">
              为什么选择
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}
                VVen Tools
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
              基于用户体验设计和认知心理学打造的专业工具平台
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {highlights.map((highlight) => (
              <FeatureCard
                key={highlight.title}
                icon={highlight.icon}
                title={highlight.title}
                description={highlight.description}
                badge={highlight.badge}
                colorScheme={highlight.colorScheme}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="px-6 py-24">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl dark:text-white">
              工具
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">分类</span>
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
              四大核心功能分类，满足不同场景需求
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* 文本处理 - 大卡片突出重要性 */}
            <ToolCategoryCard {...toolCategories[0]} size="large" />

            {/* 其他工具 */}
            {toolCategories.slice(1).map((category) => (
              <ToolCategoryCard key={category.title} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white/70 px-6 py-24 backdrop-blur-sm dark:bg-slate-900/70">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl dark:text-white">
              使用
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">方法</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">简单三步，轻松上手</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "选择工具",
                description: "从多个分类中选择您需要的功能工具",
                icon: <Wrench className="h-8 w-8" />,
                color: "from-blue-500 to-blue-600"
              },
              {
                step: "02",
                title: "输入数据",
                description: "在浏览器中直接输入文本或上传文件",
                icon: <Upload className="h-8 w-8" />,
                color: "from-emerald-500 to-emerald-600"
              },
              {
                step: "03",
                title: "获取结果",
                description: "快速获得处理结果，支持预览和下载",
                icon: <Download className="h-8 w-8" />,
                color: "from-orange-500 to-orange-600"
              }
            ].map((item) => (
              <Card
                key={item.step}
                className="border-0 bg-white/90 text-center shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:bg-slate-800/90"
              >
                <CardContent className="p-10">
                  <div
                    className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${item.color} text-white shadow-lg`}
                  >
                    {item.icon}
                  </div>
                  <div className="mb-4 text-sm font-bold text-blue-600 dark:text-blue-400">STEP {item.step}</div>
                  <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="leading-relaxed text-gray-600 dark:text-gray-300">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-24">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="mb-12 text-4xl font-bold text-gray-900 lg:text-5xl dark:text-white">
            关于
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              VVen Tools
            </span>
          </h2>

          <Card className="border-0 bg-white/90 shadow-2xl backdrop-blur-sm dark:bg-slate-800/90">
            <CardContent className="p-12 lg:p-16">
              <div className="mb-8 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
                  <Award className="h-8 w-8" />
                </div>
              </div>

              <p className="mb-8 text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                VVen Tools 是一个现代化的在线工具集合平台，专注为用户提供高效便捷的工具服务。
                我们采用纯前端技术实现，确保您的数据在本地浏览器中处理，完全保护隐私安全。
              </p>

              <div className="mb-12 grid gap-6 md:grid-cols-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span className="text-gray-600 dark:text-gray-300">本地处理</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span className="text-gray-600 dark:text-gray-300">开源免费</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span className="text-gray-600 dark:text-gray-300">持续更新</span>
                </div>
              </div>

              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
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
