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
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResumeData, ProjectInfo } from "@/data/resume";
import Header from "@/components/site/header";
import Footer from "@/components/site/footer";

interface FeatureCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	badge?: string;
}

const FeatureCard = ({ icon, title, description, badge }: FeatureCardProps) => (
	<Card className="group h-full border-0 bg-white/50 backdrop-blur-sm hover:bg-white/80 dark:bg-zinc-900/50 dark:hover:bg-zinc-900/80 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg">
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
			<CardTitle className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
				{title}
			</CardTitle>
		</CardHeader>
		<CardContent>
			<CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
				{description}
			</CardDescription>
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
	size?: 'normal' | 'large';
}

const ToolCategoryCard = ({ title, icon, tools, size = 'normal' }: ToolCategoryProps) => (
	<Card className={`group h-full border-0 transition-all duration-300 hover:-translate-y-1 ${
		size === 'large' ? 'md:col-span-2' : ''
	}`}>
		<CardContent className="p-6 h-full">
			<div className="flex items-center space-x-4 mb-6">
				<div className="text-3xl">{icon}</div>
				<div>
					<h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
					<p className="text-sm text-gray-500 dark:text-gray-400">{tools.length} 个工具</p>
				</div>
			</div>
			
			<div className="space-y-2">
				{tools.slice(0, size === 'large' ? 6 : 4).map((tool, index) => (
					<a
						key={index}
						href={tool.href}
						className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors group/tool"
					>
						{tool.icon && <span className="text-gray-400">{tool.icon}</span>}
						<span className="text-sm text-gray-700 dark:text-gray-300 group-hover/tool:text-blue-600 dark:group-hover/tool:text-blue-400 transition-colors">
							{tool.name}
						</span>
						<ArrowRight className="h-3 w-3 text-gray-400 opacity-0 group-hover/tool:opacity-100 transition-opacity ml-auto" />
					</a>
				))}
			</div>
		</CardContent>
	</Card>
);

const HomePage = () => {
	
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
			<Header />

			{/* Hero Section */}
			<section className="relative py-24 px-6 overflow-hidden">
				{/* 背景装饰 */}
				<div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5" />
				<div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
				<div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
				
				<div className="container mx-auto max-w-4xl text-center relative z-10">
					<div className="inline-flex items-center space-x-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 px-4 py-2 text-sm mb-8">
						<Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
						<span className="text-blue-700 dark:text-blue-300 font-medium">{ProjectInfo.slogan}</span>
					</div>

					<h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
						<span className="text-gray-900 dark:text-white">实用的</span>
						<br />
						<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
							在线工具集
						</span>
					</h1>

					<p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
						{ProjectInfo.description}
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
						<Button
							size="lg"
							onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
							className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
						>
							<Wrench className="mr-2 h-5 w-5" />
							开始使用
							<ArrowRight className="ml-2 h-5 w-5" />
						</Button>

						<Button
							variant="outline"
							size="lg"
							onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
							className="border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800"
						>
							<ExternalLink className="mr-2 h-5 w-5" />
							了解更多
						</Button>
					</div>

					{/* 统计信息 */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						{[
							{ label: "实用工具", value: "20+", icon: <Wrench className="h-5 w-5" /> },
							{ label: "本地处理", value: "100%", icon: <Shield className="h-5 w-5" /> },
							{ label: "在线可用", value: "24/7", icon: <Clock className="h-5 w-5" /> },
							{ label: "完全免费", value: "开源", icon: <Star className="h-5 w-5" /> }
						].map((stat, index) => (
							<div key={index} className="text-center">
								<div className="flex justify-center mb-2 text-blue-600 dark:text-blue-400">
									{stat.icon}
								</div>
								<div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
								<div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Features */}
			<section className="py-20 px-6 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
				<div className="container mx-auto max-w-6xl">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
							为什么选择 VVen Tools
						</h2>
						<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
							简单、安全、高效的在线工具平台
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
			<section id="tools" className="py-20 px-6">
				<div className="container mx-auto max-w-6xl">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
							工具分类
						</h2>
						<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
							四大核心功能分类，满足不同场景需求
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
			<section className="py-20 px-6 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
				<div className="container mx-auto max-w-4xl">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
							使用方法
						</h2>
						<p className="text-xl text-gray-600 dark:text-gray-300">
							简单三步，即可开始使用
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
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
							<Card key={item.step} className="text-center border-0 bg-white/50 backdrop-blur-sm dark:bg-zinc-900/50">
								<CardContent className="p-8">
									<div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white">
										{item.icon}
									</div>
									<div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
										STEP {item.step}
									</div>
									<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
										{item.title}
									</h3>
									<p className="text-gray-600 dark:text-gray-300">
										{item.description}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* About */}
			<section id="about" className="py-20 px-6">
				<div className="container mx-auto max-w-4xl text-center">
					<h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
						关于 VVen Tools
					</h2>
					<Card className="border-0 bg-white/50 backdrop-blur-sm dark:bg-zinc-900/50 shadow-xl">
						<CardContent className="p-12">
							<p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
								VVen Tools 是一个现代化的在线工具集合平台，专注为用户提供高效便捷的工具服务。
								我们采用纯前端技术实现，确保您的数据在本地浏览器中处理，完全保护隐私安全。
							</p>
							<p className="text-lg text-gray-500 dark:text-gray-400 mb-12">
								项目持续更新中，如果您有工具需求或建议，欢迎通过 GitHub 与我们交流。
							</p>
							
							<Button
								asChild
								size="lg"
								className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl"
							>
								<a href={ResumeData.contact.social.GitHub.url} target="_blank" rel="noopener noreferrer">
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
