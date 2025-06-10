import Link from "next/link";
import { Wrench, Heart } from "lucide-react";
import { ProjectInfo } from "@/data/resume";

const Footer = () => {
	const currentYear = new Date().getFullYear();
	
	const footerLinks = [
		{
			title: "工具分类",
			links: [
				{ name: "文本工具", href: "#text-tools" },
				{ name: "开发工具", href: "#dev-tools" },
				{ name: "图片工具", href: "#image-tools" },
				{ name: "格式转换", href: "#format-tools" }
			]
		},
		{
			title: "关于项目",
			links: [
				{ name: "项目介绍", href: "#about" },
				{ name: "使用方法", href: "#how-it-works" },
				{ name: "开源协议", href: "#license" },
				{ name: "贡献指南", href: "#contribute" }
			]
		},
		{
			title: "联系方式",
			links: [
				{ name: "GitHub", href: ProjectInfo.repository.url },
				{ name: "反馈建议", href: `${ProjectInfo.repository.url}/issues` },
				{ name: "功能请求", href: `${ProjectInfo.repository.url}/discussions` }
			]
		}
	];

	return (
		<footer className="bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 transition-colors duration-300">
			<div className="container mx-auto px-6 py-12">
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Brand Section */}
					<div className="lg:col-span-1">
						<Link href="/" className="flex items-center space-x-3 group mb-4">
							<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
								<Wrench className="h-5 w-5" />
							</div>
							<span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
								VVen Tools
							</span>
						</Link>
						<p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
							实用的在线工具集合平台，为用户提供高效便捷的工具服务。
						</p>
						<p className="text-sm text-gray-500 dark:text-gray-500">
							数据本地处理，隐私安全保障
						</p>
					</div>

					{/* Links Sections */}
					{footerLinks.map((section) => (
						<div key={section.title}>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
								{section.title}
							</h3>
							<ul className="space-y-3">
								{section.links.map((link) => (
									<li key={link.name}>
										<Link
											href={link.href}
											className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-sm"
											target={link.href.startsWith('http') ? '_blank' : undefined}
											rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
										>
											{link.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Bottom Section */}
				<div className="mt-12 pt-8 border-t border-gray-200 dark:border-zinc-800">
					<div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
						<div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
							<span>© {currentYear} VVen Tools. 基于</span>
							<Heart className="h-4 w-4 text-red-500 mx-1" />
							<span>构建，采用 MIT 协议开源</span>
						</div>
						
						<div className="flex items-center space-x-6">
							<Link
								href={ProjectInfo.repository.url}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
							>
								<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
								</svg>
								<span>开源仓库</span>
							</Link>
							
							<div className="text-sm text-gray-500 dark:text-gray-500">
								v2.0.0
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
