import { Wrench } from "lucide-react";
import Link from "next/link";
import { ResumeData } from "@/data/resume";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { social } = ResumeData.contact;

  return (
    <footer className="bg-background border-t">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Wrench className="text-primary h-6 w-6" />
              <span className="text-lg font-bold">VVen Tools</span>
            </div>
            <p className="text-muted-foreground max-w-xs text-sm">
              提供简洁高效的在线工具，致力于提升您的工作效率。免费使用，无需安装，随时可用。
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-base font-medium">快速导航</h3>
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                首页
              </Link>
              <Link href="#features" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                全部工具
              </Link>
              <Link href="#about" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                关于本站
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-base font-medium">工具推荐</h3>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/tools/text/text-autospace"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                中英文自动加空格
              </Link>
              <Link
                href="/tools/text/number-to-chinese"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                数字转中文
              </Link>
              <Link
                href="/tools/date-time/timestamp-converter"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                时间戳转换
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between border-t pt-8 md:flex-row">
          <p className="text-muted-foreground text-sm">© {currentYear} VVen Tools. 保留所有权利。</p>

          <div className="mt-4 flex items-center space-x-4 md:mt-0">
            {Object.values(social).map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={item.name}
              >
                <item.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
