"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
	ArrowRight,
	ExternalLink,
	Github,
	Globe,
	Shield,
	Sparkles,
	Wrench,
	Zap,
	Hammer,
	Settings,
	Users,
	Clock,
	Star,
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
	<Card className="group relative overflow-hidden border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-zinc-900 dark:to-zinc-800 hover:shadow-lg hover:shadow-blue-200/20 dark:hover:shadow-blue-900/20">
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
					{icon}
				</div>
				{badge && (
					<Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
						{badge}
					</Badge>
				)}
			</div>
			<CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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

const StatCard = ({ icon, number, label }: { icon: React.ReactNode; number: string; label: string }) => (
	<div className="text-center p-6 rounded-2xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all duration-300">
		<div className="flex justify-center mb-3">
			<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
				{icon}
			</div>
		</div>
		<div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{number}</div>
		<div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
	</div>
);

const CategoryCard = ({ category }: { category: { name: string; icon: string; tools: { name: string; href: string }[] } }) => (
	<Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-gray-200 dark:border-zinc-700 hover:border-blue-400 dark:hover:border-blue-600 bg-white dark:bg-zinc-800">
		<CardContent className="p-6">
			<div className="text-center mb-4">
				<div className="text-4xl mb-3">{category.icon}</div>
				<h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
					{category.name}
				</h3>
			</div>
			<div className="space-y-2">
				{category.tools.map((tool, index) => (
					<Link 
						key={index} 
						href={tool.href}
						className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 p-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/10"
					>
						<div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
						<span>{tool.name}</span>
					</Link>
				))}
			</div>
		</CardContent>
	</Card>
);

const HomePage = () => {
	const [currentFeature, setCurrentFeature] = useState(0);

	const features = ProjectInfo.categories.map(cat => cat.name);
	const highlights = [
		{
			icon: <Zap className="h-6 w-6" />,
			title: "即开即用",
			description: "无需安装任何软件，打开浏览器即可使用工具",
			badge: "零配置"
		},
		{
			icon: <Shield className="h-6 w-6" />,
			title: "数据安全",
			description: "所有处理在本地完成，数据不会上传到服务器",
			badge: "本地处理"
		},
		{
			icon: <Globe className="h-6 w-6" />,
			title: "跨平台兼容",
			description: "支持桌面、平板、手机等各种设备和浏览器",
			badge: "全兼容"
		},
		{
			icon: <Users className="h-6 w-6" />,
			title: "开源免费",
			description: "完全开源的项目，免费使用，无任何限制",
			badge: "MIT"
		}
	];

	const stats = [
		{ icon: <Wrench className="h-6 w-6" />, number: "工具", label: "实用为主" },
		{ icon: <Users className="h-6 w-6" />, number: "本地", label: "数据处理" },
		{ icon: <Clock className="h-6 w-6" />, number: "随时", label: "在线使用" },
		{ icon: <Star className="h-6 w-6" />, number: "开源", label: "完全免费" }
	];

	// 展示项目中实际存在的所有工具
	const toolCategories = [
		{ 
			name: "文本工具", 
			icon: "📝", 
			tools: [
				{ name: "字数统计", href: "/tools/text/word-count" },
				{ name: "XML转JSON", href: "/tools/text/xml-to-json" },
				{ name: "去除重复", href: "/tools/text/remove-duplicate" },
				{ name: "中英文加空格", href: "/tools/text/text-autospace" },
				{ name: "HTML转Markdown", href: "/tools/text/html-to-markdown" },
				{ name: "数字转中文", href: "/tools/text/number-to-chinese" },
				{ name: "Base64编解码", href: "/tools/text/base64-encoder-decoder" }
			]
		},
		{ 
			name: "文件工具", 
			icon: "📁", 
			tools: [
				{ name: "HTML转PDF", href: "/tools/file/html-to-pdf" },
				{ name: "SVG优化器", href: "/tools/file/svg-optimizer" },
				{ name: "哈希生成器", href: "/tools/file/hash-generator" }
			]
		},
		{ 
			name: "开发工具", 
			icon: "💻", 
			tools: [
				{ name: "时间戳转换", href: "/tools/dev/timestamp-converter" },
				{ name: "URL格式化", href: "/tools/dev/url-formatter" },
				{ name: "密码强度检测", href: "/tools/dev/password-strength" },
				{ name: "正则表达式库", href: "/tools/dev/regex-collection" }
			]
		},
		{ 
			name: "颜色工具", 
			icon: "🎨", 
			tools: [
				{ name: "渐变生成器", href: "/tools/colors/gradient-generator" },
				{ name: "新拟态生成器", href: "/tools/colors/neumorphism-generator" },
				{ name: "中国传统色", href: "/tools/colors/china-colors" },
				{ name: "颜色转换器", href: "/tools/colors/color-converter" }
			]
		}
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentFeature((prev) => (prev + 1) % features.length);
		}, 3000);
		return () => clearInterval(interval);
	}, [features.length]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-zinc-950 dark:to-zinc-900 transition-colors duration-300">
			{/* Header */}
			<Header />

			{/* Hero Section */}
			<section id="home" className="relative py-20 px-6">
				<div className="container mx-auto max-w-6xl">
					<div className="text-center mb-16">
						<div className="inline-flex items-center space-x-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 px-4 py-2 text-sm mb-6">
							<Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
							<span className="text-blue-700 dark:text-blue-300">{ProjectInfo.slogan}</span>
						</div>

						<h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
							<span className="text-gray-900 dark:text-white">实用的</span>
							<br />
							<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
								在线工具集
							</span>
						</h1>

						<p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
							{ProjectInfo.description}
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
							<button
								onClick={() => {
									const element = document.getElementById('features');
									if (element) element.scrollIntoView({ behavior: 'smooth' });
								}}
								className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 rounded-lg text-lg font-medium flex items-center justify-center"
							>
								<Wrench className="mr-2 h-5 w-5" />
								探索工具
								<ArrowRight className="ml-2 h-5 w-5" />
							</button>

							<button
								onClick={() => {
									const element = document.getElementById('about');
									if (element) element.scrollIntoView({ behavior: 'smooth' });
								}}
								className="border-2 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-6 py-3 rounded-lg text-lg font-medium flex items-center justify-center transition-all duration-300"
							>
								<ExternalLink className="mr-2 h-5 w-5" />
								了解更多
							</button>
						</div>

						<div className="text-sm text-gray-500 dark:text-gray-400">
							当前工具类别: 
							<span className="ml-2 text-blue-600 dark:text-blue-400 font-medium">{features[currentFeature]}</span>
						</div>
					</div>

					{/* 统计数据卡片 */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
						{stats.map((stat) => (
							<StatCard key={stat.label} {...stat} />
						))}
					</div>
				</div>
			</section>

			{/* Features Grid */}
			<section className="py-20 px-6 bg-white dark:bg-zinc-900 transition-colors duration-300">
				<div className="container mx-auto max-w-6xl">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
							为什么选择
							<span className="text-blue-600 dark:text-blue-400"> VVen Tools</span>
						</h2>
						<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
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

			{/* Tool Categories */}
			<section id="features" className="py-20 px-6">
				<div className="container mx-auto max-w-6xl">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
							工具分类
						</h2>
						<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
							四大核心功能，满足日常使用需求
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
						{toolCategories.map((category) => (
							<CategoryCard key={category.name} category={category} />
						))}
					</div>
				</div>
			</section>

			{/* How It Works */}
			<section id="how-it-works" className="py-20 px-6 bg-white dark:bg-zinc-900 transition-colors duration-300">
				<div className="container mx-auto max-w-4xl">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">使用方法</h2>
						<p className="text-xl text-gray-600 dark:text-gray-300">
							简单三步，开始使用工具
						</p>
					</div>

					<div className="space-y-8">
						{[
							{
								step: "1",
								title: "选择工具",
								description: "从多个分类中选择您需要的功能",
								icon: <Wrench className="h-6 w-6" />
							},
							{
								step: "2", 
								title: "输入数据",
								description: "在浏览器中直接输入或上传您的数据文件",
								icon: <Hammer className="h-6 w-6" />
							},
							{
								step: "3",
								title: "获取结果",
								description: "快速获得处理结果，支持下载或复制",
								icon: <Settings className="h-6 w-6" />
							}
						].map((item) => (
							<div key={item.step} className="flex items-center gap-8">
								<div className="flex-shrink-0">
									<div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-2xl font-bold">
										{item.step}
									</div>
								</div>
								<Card className="flex-1 border-2 border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
									<CardContent className="p-6">
										<div className="flex items-center gap-4 mb-3">
											<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
												{item.icon}
											</div>
											<CardTitle className="text-xl text-gray-900 dark:text-white">
												{item.title}
											</CardTitle>
										</div>
										<CardDescription className="text-gray-600 dark:text-gray-300">
											{item.description}
										</CardDescription>
									</CardContent>
								</Card>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* About Section */}
			<section id="about" className="py-20 px-6">
				<div className="container mx-auto max-w-4xl text-center">
					<h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">关于 VVen Tools</h2>
					<Card className="border-2 border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
						<CardContent className="p-8">
							<p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
								VVen Tools 是一个实用的在线工具集合平台，专注为用户提供高效便捷的工具服务。
								我们采用纯前端技术实现，确保您的数据在本地浏览器中处理，保护隐私安全。
							</p>
							<p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
								项目持续更新中，如果您有工具需求或建议，欢迎通过 GitHub 联系我们。
							</p>
							
							<Button
								asChild
								size="lg"
								className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg"
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
