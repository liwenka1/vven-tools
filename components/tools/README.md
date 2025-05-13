# VVen Tools 工具页面设计规范

本文档描述了 VVen Tools 工具页面的设计规范和组件使用指南。

## 设计原则

我们的工具页面设计遵循以下原则：

1. **一致性** - 所有工具页面使用统一的布局和交互模式
2. **可用性** - 界面简洁明了，操作流程直观
3. **美观性** - 遵循现代设计趋势，使用适当的色彩心理学原则
4. **响应式** - 在各种设备上都能提供良好的用户体验

## 页面结构

每个工具页面应包含以下结构：

```
ToolLayout
├── 面包屑导航
├── 工具标题栏
│   ├── 图标
│   ├── 标题
│   └── 描述
├── 工具内容
│   ├── 输入区域
│   ├── 操作选项
│   ├── 操作按钮
│   └── 结果显示
└── 相关工具推荐
```

## 颜色系统

工具页面使用与工具类别相对应的颜色：

- **文本工具**: 蓝色 (`blue`)
  - 主色：`text-blue-500`, `bg-blue-600`
  - 背景：`bg-blue-50`, `dark:bg-blue-950/30`
  - 边框：`border-blue-200`, `dark:border-blue-800`

- **颜色工具**: 绿色 (`emerald`)
  - 主色：`text-emerald-500`, `bg-emerald-600`
  - 背景：`bg-emerald-50`, `dark:bg-emerald-950/30`
  - 边框：`border-emerald-200`, `dark:border-emerald-800`

- **开发工具**: 紫色 (`purple`)
  - 主色：`text-purple-500`, `bg-purple-600`
  - 背景：`bg-purple-50`, `dark:bg-purple-950/30`
  - 边框：`border-purple-200`, `dark:border-purple-800`

- **文件工具**: 琥珀色 (`amber`)
  - 主色：`text-amber-500`, `bg-amber-600`
  - 背景：`bg-amber-50`, `dark:bg-amber-950/30`
  - 边框：`border-amber-200`, `dark:border-amber-800`

## 组件使用

### 工具布局组件

使用 `ToolLayout` 组件作为工具页面的容器：

```tsx
<ToolLayout
  title="工具名称"
  description="工具描述"
  icon={<Icon className="h-6 w-6 text-blue-500" />}
  category={{
    name: "文本工具",
    href: "/#text-tools",
    color: "bg-blue-50 dark:bg-blue-950/30"
  }}
>
  {/* 工具内容 */}
</ToolLayout>
```

### 表单元素

- 使用 `Label` 为输入元素添加标签
- 为复杂表单添加帮助文本（`text-xs text-muted-foreground`）
- 在按钮上使用与类别匹配的颜色

### 结果显示

使用一致的结果显示区域：

```tsx
<div className="mt-6 border rounded-lg p-4 bg-muted/30">
  <div className="mb-3 flex items-center justify-between">
    <h3 className="text-base font-medium">处理结果</h3>
    <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8">
      <ClipboardCopy className="mr-2 h-4 w-4" />
      复制
    </Button>
  </div>
  <div className="bg-card rounded-md border p-4 text-sm">
    {result}
  </div>
</div>
```

## 响应式设计

- 使用 `flex-col` 在小屏幕上纵向排列元素
- 使用 `sm:flex-row` 在较大屏幕上横向排列元素
- 使用 `min-h-[200px]` 和 `resize-y` 让文本区域可调整大小

## 无障碍性

- 为所有输入元素添加 `id` 和相应的 `htmlFor` 标签
- 使用语义化的 HTML 元素（如 `<label>`、`<button>`）
- 确保色彩对比度符合 WCAG 标准

## 工具化设计

为保持设计一致性，新工具页面应遵循现有模式，并使用 `ToolLayout` 组件进行布局。
