import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeData } from "@/data/resume";

const Header = () => {
  const { GitHub } = ResumeData.contact.social;
  const GitHubIcon = GitHub.icon;
  
  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Wrench className="text-primary h-6 w-6" />
            <span className="hidden text-lg font-bold sm:inline-block">VVen Tools</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link href="/" className="hover:text-primary transition-colors">
              首页
            </Link>
            <Link href="#features" className="text-foreground/60 hover:text-foreground transition-colors">
              工具导航
            </Link>
            <Link href="#about" className="text-foreground/60 hover:text-foreground transition-colors">
              关于
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button asChild variant="ghost" size="icon">
              <a
                href={GitHub.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={GitHub.name}
              >
                <GitHubIcon className="h-5 w-5" />
              </a>
            </Button>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
