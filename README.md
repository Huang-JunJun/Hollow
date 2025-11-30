# Hollow

> 你可以不用很坚强，也可以不说完整。

Hollow 是一个面向 INFJ / 内向敏感人群的匿名心事树洞。提供一个极简、安全、安静的地方，让用户可以写下心事、浏览他人心事，获得一点点「被理解」的感觉，但不做重社交。

## ✨ 功能特性

### 核心功能

- **心事发布**：写下你的心事，选择情绪标签，设置可见范围和回应权限
- **公共树洞**：浏览他人的公开心事，按情绪标签筛选
- **轻互动**：通过「我懂」按钮表达理解，不展示具体数字，保持安静的氛围
- **轻回应**：每条心事下可以添加简短回应（最多 50 字），匿名展示
- **我的空间**：查看自己写下的所有心事，以及点亮的「我懂」
- **安全提示**：提供心理求助信息和产品使用边界说明

### 设计理念

- **安静、柔和**：低饱和配色，充足留白，不做花哨视觉
- **极简交互**：减少不必要的功能，专注情绪表达
- **隐私保护**：匿名机制，数据仅存储在本地
- **安全边界**：敏感词过滤，心理求助信息提示

## 🛠 技术栈

- **框架**：Next.js 14 (App Router)
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **数据存储**：LocalStorage（前端 mock，预留后端接口结构）
- **时间处理**：date-fns

## 📁 项目结构

```
Hollow/
├── app/                    # Next.js App Router 页面
│   ├── page.tsx           # 首页/欢迎页
│   ├── feed/              # 心事列表页（公共树洞）
│   │   └── page.tsx
│   ├── write/             # 写心事页
│   │   └── page.tsx
│   ├── me/                # 我的空间页
│   │   └── page.tsx
│   ├── safety/            # 安全与说明页
│   │   └── page.tsx
│   ├── layout.tsx         # 根布局
│   └── globals.css        # 全局样式
├── components/            # 组件
│   ├── Layout.tsx        # 统一布局组件（品牌区+主内容+底部）
│   ├── PostCard.tsx      # 心事卡片组件
│   ├── MoodTagFilter.tsx # 情绪标签筛选组件
│   ├── ReplySection.tsx  # 轻回应组件
│   └── EmptyState.tsx    # 空状态组件
├── lib/                  # 工具函数
│   ├── storage.ts        # LocalStorage 数据管理
│   └── utils.ts          # 工具函数（时间格式化、敏感词过滤等）
├── types/                # TypeScript 类型定义
│   └── index.ts          # 数据结构定义
└── ...config files       # 配置文件
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 📖 功能说明

### 页面路由

- `/` - 首页：展示品牌名和 Slogan，提供两个入口按钮
- `/feed` - 公共树洞：浏览公开心事，支持按情绪标签筛选
- `/write` - 写心事：发布新心事，设置情绪标签、可见范围和回应权限
- `/me` - 我的空间：查看自己的心事和点亮的「我懂」
- `/safety` - 安全与说明：产品说明、隐私说明、心理求助信息

### 数据结构

```typescript
// 心事
interface HollowPost {
	id: string;
	content: string; // 内容（最多 1000 字）
	mood: MoodTag; // 情绪标签
	visibility: 'public' | 'private'; // 可见范围
	allowReply: boolean; // 是否允许回应
	createdAt: string; // 创建时间
	stats?: {
		understandCount: number; // 「我懂」数量
	};
}

// 回应
interface HollowReply {
	id: string;
	postId: string;
	content: string; // 内容（最多 50 字）
	createdAt: string;
}

// 用户状态（本地）
interface LocalUserState {
	understoodPostIds: string[]; // 点亮的「我懂」ID 列表
}
```

### 情绪标签

- `anxious` - 焦虑
- `confused` - 迷茫
- `angry` - 愤怒
- `grateful` - 感恩
- `justWrite` - 只是想写写

## 🎨 设计规范

### 配色

- **主色**：低饱和雾蓝（`#627d98`）
- **背景**：暖灰色（`#f5f5f5`）
- **文本**：柔和的灰色系

### 交互

- **卡片**：圆角 16px，轻微阴影
- **按钮**：圆角 12px，点击缩放 0.95
- **动画**：淡入 + 轻微上移（0.3s）

### 文案风格

- 使用「你」，不用「您」
- 不说教、不喊口号，多用描述式语气
- 关键文案示例：
  - 「今天也可以只对自己诚实。」
  - 「有些话，不一定要说给别人听。」
  - 「好了，今天就先写到这儿。」

## 🔒 安全与隐私

- 本产品采用匿名机制，不收集个人信息
- 所有数据仅存储在本地（LocalStorage）
- 敏感词过滤（前端简单版本）
- 提供心理求助热线信息

## 📝 开发说明

### 数据存储

当前版本使用 LocalStorage 进行数据存储，所有数据保存在浏览器本地。数据结构已预留接口，方便后续接入后端 API。

### Mock 数据

首次访问时会自动初始化一些示例数据，便于开发和演示。

### 后续扩展

- 接入后端 API
- 用户认证系统
- 更完善的敏感词过滤
- 数据同步功能

## 📄 License

Private

---

**重要提示**：本产品仅作为情绪记录与表达空间，不提供专业医疗建议。如有强烈自杀/自伤念头，请联系本地专业机构或热线。
