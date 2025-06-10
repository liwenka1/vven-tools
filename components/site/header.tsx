"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Wrench } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { ResumeData } from "@/data/resume";
const navigation = [
  { name: "首页", href: "#home", id: "home" },
  { name: "工具", href: "#tools", id: "tools" },
  { name: "关于", href: "#about", id: "about" }
];

const Header = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map((nav) => nav.id);
      const scrollPosition = window.scrollY + 120; // 增加偏移量以适应sticky header
      let currentSection = "home"; // 默认section

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionBottom = sectionTop + sectionHeight;

          // 如果当前滚动位置在这个section范围内
          if (scrollPosition >= sectionTop - 200 && scrollPosition < sectionBottom - 200) {
            currentSection = sectionId;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初始调用

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string, id: string) => {
    setActiveSection(id);
    if (href.startsWith("#")) {
      const element = document.getElementById(id);
      if (element) {
        // 考虑到sticky header的高度，添加偏移量
        const headerHeight = 80;
        const elementPosition = element.offsetTop - headerHeight;

        window.scrollTo({
          top: elementPosition,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-900/80">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center space-x-3" onClick={() => setActiveSection("home")}>
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

          {/* Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            {navigation.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href, item.id)}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 transform rounded-full bg-blue-500" />
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
              className="hidden items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 sm:flex dark:text-gray-300 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="hidden lg:inline">GitHub</span>
            </Link>

            {/* Theme Toggle */}
            <ModeToggle />

            {/* Mobile menu button */}
            <button className="rounded-lg p-2 text-gray-700 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 md:hidden dark:text-gray-300 dark:hover:bg-blue-900/20 dark:hover:text-blue-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
