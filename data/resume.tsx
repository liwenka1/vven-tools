import type { Metadata } from "next";
import { Github, Mail, Twitter, Wrench, Hammer, Settings, Zap } from "lucide-react";

// 网站元数据配置
export const SiteMetadata: Metadata = {
  title: "VVen Tools - 简洁高效的在线工具箱",
  description:
    "专业的在线工具集合平台，提供文本处理、开发工具、颜色工具、文件转换等50+实用工具。无需安装，数据本地处理，保护隐私安全",
  keywords: [
    "在线工具",
    "工具箱",
    "文本处理",
    "开发工具",
    "颜色工具",
    "文件转换",
    "效率工具",
    "免费工具",
    "前端工具",
    "实用工具"
  ],
  authors: [{ name: "liwenka1" }],
  creator: "liwenka1",
  publisher: "liwenka1",
  openGraph: {
    title: "VVen Tools - 简洁高效的在线工具箱",
    description: "专业的在线工具集合平台，50+实用工具，数据本地处理，保护隐私安全",
    type: "website",
    locale: "zh_CN",
    siteName: "VVen Tools"
  },
  twitter: {
    card: "summary_large_image",
    title: "VVen Tools - 简洁高效的在线工具箱",
    description: "专业的在线工具集合平台，50+实用工具，数据本地处理，保护隐私安全",
    creator: "@liwenka1"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
};

// 工具箱主题配置
export const ToolboxTheme = {
  colors: {
    primary: "amber", // 工具箱主色调：琥珀色/橙色
    secondary: "orange",
    accent: "yellow",
    neutral: "zinc"
  },
  icons: {
    primary: Wrench,
    secondary: Hammer,
    accent: Settings,
    special: Zap
  }
} as const;

// 项目信息配置
export const ProjectInfo = {
  name: "VVen Tools",
  tagline: "专业在线工具箱",
  slogan: "效率工具，触手可及",
  description:
    "专业的在线工具集合平台，提供文本处理、开发工具、颜色工具、文件转换等50+实用工具。纯前端实现，数据本地处理，保护隐私安全，无需安装即可使用",
  version: "2.0.0",
  repository: {
    type: "github",
    url: "https://github.com/liwenka1/vven-tools",
    name: "vven-tools"
  },
  features: [
    "50+ 实用工具",
    "数据本地处理",
    "隐私安全保护",
    "无需安装使用",
    "响应式设计",
    "工具分类清晰",
    "一键操作体验",
    "开源免费"
  ],
  categories: [
    { name: "文本工具", icon: "📝", count: 15 },
    { name: "颜色工具", icon: "🎨", count: 8 },
    { name: "开发工具", icon: "💻", count: 12 },
    { name: "文件工具", icon: "📄", count: 10 },
    { name: "转换工具", icon: "🔄", count: 7 },
    { name: "实用工具", icon: "🛠️", count: 8 }
  ],
  technologies: ["TypeScript", "Next.js 14", "Tailwind CSS", "Shadcn/ui", "Lucide Icons", "React Hooks"],
  license: "MIT"
} as const;

// 个人信息配置
export const ResumeData = {
  personal: {
    name: "liwenka1",
    title: "Frontend Developer & Tool Creator",
    bio: "专注于现代化 Web 技术开发，致力于打造高效实用的在线工具，提升开发者和用户的工作效率",
    location: "China"
  },
  contact: {
    email: "2020583117@qq.com",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/liwenka1",
        icon: Github,
        username: "@liwenka1"
      },
      X: {
        name: "Twitter",
        url: "https://x.com/liwenka1",
        icon: Twitter,
        username: "@liwenka1"
      },
      email: {
        name: "Send Email",
        url: "mailto:2020583117@qq.com",
        icon: Mail
      }
    }
  },
  projects: {
    featured: {
      name: ProjectInfo.name,
      description: ProjectInfo.description,
      url: ProjectInfo.repository.url,
      icon: Wrench,
      technologies: ProjectInfo.technologies,
      features: ProjectInfo.features,
      categories: ProjectInfo.categories
    }
  }
} as const;

// 导出类型定义
export type ToolboxThemeType = typeof ToolboxTheme;
export type ProjectInfoType = typeof ProjectInfo;
export type ResumeDataType = typeof ResumeData;
