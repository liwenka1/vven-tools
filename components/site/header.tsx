"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Wrench } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { ResumeData } from "@/data/resume";

const Header = () => {
	const [activeSection, setActiveSection] = useState("home");
	
	const navigation = [
		{ name: "首页", href: "#home", id: "home" },
		{ name: "工具", href: "#features", id: "features" },
		{ name: "关于", href: "#about", id: "about" }
	];

	useEffect(() => {
		const handleScroll = () => {
			const sections = navigation.map(nav => nav.id);
			const scrollPosition = window.scrollY + 100; // 添加偏移量

			for (let i = sections.length - 1; i >= 0; i--) {
				const section = document.getElementById(sections[i]);
				if (section && section.offsetTop <= scrollPosition) {
					setActiveSection(sections[i]);
					break;
				}
			}
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll(); // 初始调用

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleNavClick = (href: string, id: string) => {
		setActiveSection(id);
		if (href.startsWith('#')) {
			const element = document.getElementById(id);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}
	};

	return (
		<header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-zinc-900/80 border-b border-gray-200 dark:border-zinc-800 transition-all duration-300">
			<div className="container mx-auto px-6 py-4">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<Link 
						href="/" 
						className="flex items-center space-x-3 group"
						onClick={() => setActiveSection("home")}
					>
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
							<Wrench className="h-5 w-5" />
						</div>
						<div className="flex flex-col">
							<span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
								VVen Tools
							</span>
							<span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-500 transition-colors duration-300 hidden sm:block">
								实用在线工具
							</span>
						</div>
					</Link>

					{/* Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						{navigation.map((item) => {
							const isActive = activeSection === item.id;
							return (
								<button
									key={item.name}
									onClick={() => handleNavClick(item.href, item.id)}
									className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 ${
										isActive
											? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
											: "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
									}`}
								>
									{item.name}
									{isActive && (
										<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
									)}
								</button>
							);
						})}
					</nav>

					{/* Right side */}
					<div className="flex items-center space-x-4">
						{/* GitHub Link */}
						<Link
							href={ResumeData.contact.social.GitHub.url}
							target="_blank"
							rel="noopener noreferrer"
							className="hidden sm:flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300"
						>
							<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
							</svg>
							<span className="hidden lg:inline">GitHub</span>
						</Link>

						{/* Theme Toggle */}
						<ModeToggle />

						{/* Mobile menu button */}
						<button className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300">
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
