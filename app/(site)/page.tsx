import Header from "@/components/site/Header";
import ToolCategories from "@/components/site/ToolCategories";
import Footer from "@/components/site/Footer";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="container py-12 md:py-20 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="flex flex-col space-y-6">
            <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              简洁高效的 <span className="text-primary">在线工具箱</span>
            </h1>
            <p className="text-muted-foreground max-w-[600px] text-base md:text-xl">
              VVen Tools 提供各种实用的在线工具，助您提高工作效率。无需安装，随时随地使用。
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button asChild size="lg" className="gap-2">
                <Link href="#features">
                  浏览工具
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#about">
                  了解更多
                </Link>
              </Button>
            </div>
            <div className="flex flex-col space-y-2 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <p className="text-sm text-muted-foreground">完全免费，无需注册</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <p className="text-sm text-muted-foreground">支持明亮与暗黑模式</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <p className="text-sm text-muted-foreground">所有操作在本地完成，保护您的隐私</p>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            {/* You can add an illustration here if needed */}
            <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/20 via-muted/20 to-background border border-border/50 flex items-center justify-center">
              <h3 className="text-2xl font-semibold text-primary">智能工具集</h3>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="border-t bg-muted/50">
        <ToolCategories />
      </section>
      
      {/* About Section */}
      <section id="about" className="container py-12 md:py-20 border-t">
        <div className="mx-auto max-w-[58rem] space-y-6 text-center">
          <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-4xl">
            关于 VVen Tools
          </h2>
          <p className="text-muted-foreground leading-normal sm:text-lg sm:leading-7">
            VVen Tools 是一个免费的在线工具集合，旨在帮助用户解决日常工作中的各种问题。
            我们提供的所有工具都是纯前端实现，您的数据永远不会离开您的浏览器，确保了最大程度的隐私保护。
          </p>
          <p className="text-muted-foreground leading-normal sm:text-lg sm:leading-7">
            如果您有任何建议或反馈，欢迎通过 GitHub 联系我们。
          </p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
