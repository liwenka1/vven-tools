# VVen Tools - 简洁高效的在线工具箱

VVen Tools 是一个基于 Next.js 开发的在线工具集合网站，提供各种实用的工具，帮助用户提高工作效率。所有工具均在浏览器端运行，无需安装，保护用户隐私。

## 🚀 特性

- ✅ **丰富的工具集**: 包含文本处理、开发工具、颜色工具、文件转换等多种实用工具
- ✅ **纯前端实现**: 所有工具在浏览器中执行，数据不会离开本地
- ✅ **响应式设计**: 完美适配桌面和移动设备
- ✅ **暗色模式**: 支持明亮与暗黑主题切换
- ✅ **无需登录**: 所有工具免费使用，无需注册或登录

## 📂 项目结构

```
VVen Tools
├── app/                # 主应用目录
│   ├── (site)/         # 网站主页
│   ├── tools/          # 工具页面
│   └── layout.tsx      # 全局布局
├── components/         # 共享组件
│   ├── site/           # 网站相关组件
│   ├── tools/          # 工具相关组件
│   └── ui/             # UI组件库
├── data/               # 数据文件
├── lib/                # 工具函数
├── public/             # 静态资源
└── styles/             # 样式文件
```

## 🧰 工具类别

- **文本工具**: 字数统计、XML转JSON、HTML转Markdown、Base64编解码、中英文自动加空格、数字转中文、文本去重等
- **颜色工具**: 中国传统色、颜色转换器、渐变色生成器、新拟态生成器等
- **开发工具**: 时间戳转换、URL格式化、正则表达式大全、密码强度分析器等
- **文件工具**: HTML转PDF、SVG 优化器、文件哈希生成器等

## 🛠️ 技术栈

- [Next.js 14](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件库
- [Lucide Icons](https://lucide.dev/) - 图标库

## 🚀 开始使用

```bash
# 克隆项目
git clone https://github.com/liwenka1/vven-tools.git
cd vven-tools

# 安装依赖
npm install
# 或使用 pnpm
pnpm install

# 运行开发服务器
npm run dev
# 或使用 pnpm
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📝 开发规范

- 遵循 [components/tools/README.md](./components/tools/README.md) 中的设计规范
- 使用 TypeScript 确保类型安全
- 使用 ESLint 和 Prettier 保持代码风格一致

## 📄 许可证

本项目基于 [MIT 许可证](./LICENSE) 开源。

## 🔗 相关链接

- [GitHub](https://github.com/liwenka1)
- [X (Twitter)](https://x.com/liwenka1)
