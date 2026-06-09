# Spacemit Ant Design Vue Theme (第一版)

本项目是 Spacemit 团队的首版 Ant Design Vue 主题适配项目。基于 Spacemit 颜色系统，实现了可复用的主题适配层，并提供了一个现代化的组件预览页面，以便设计师与开发人员检查、调试组件细节。

---

## 目录结构与主题职责

主题代码均存放在 `src/theme/` 目录下，文件及各自职责如下：

```txt
src/theme/
  ├── color.light.json      # 原始浅色 Spacemit 设计 Token 源文件（不可修改结构）
  ├── color.dark.json       # 原始深色 Spacemit 设计 Token 源文件（不可修改结构）
  ├── spacemitTokens.ts     # 基础适配层：提取 JSON 为扁平化的 SpacemitBaseTokens，定义圆角与字号基准
  ├── componentTokens.ts    # 组件适配层：基于基础 Token，深度定制 Button、Input、Select、Card、Table、Menu、Tabs、Switch 等组件样式
  ├── spacemitAntdTheme.ts  # 主题组装层：装配全局 Seed/Alias 变量与组件变量，绑定 antdv 官方 Default/Dark 算法
  └── index.ts              # 统一的对外导出入口
```

---

## 快速开始

### 1. 安装依赖

在项目根目录下，执行以下命令安装运行所需的依赖：

```bash
npm install
```

### 2. 启动本地预览

运行以下命令启动 Vite 开发服务器：

```bash
npm run dev
```

启动后，在浏览器中打开提示的本地地址（默认为 `http://localhost:5173/`），即可访问主题组件预览页面。

### 3. 构建打包

若需要同时构建预览站与可交付主题包，运行：

```bash
npm run build
```

构建后会生成两类产物：

```txt
dist/              # 组件预览站静态产物
dist/theme/        # 可交付给业务项目的主题包产物
```

若只需要构建主题包，运行：

```bash
npm run build:theme
```

---

## 业务项目如何引入并使用

业务项目继续使用官方 Ant Design Vue 4 架构，只需要安装本主题包，并通过 `a-config-provider` 将主题配置注入应用。

```bash
npm install spacemit-antd-theme ant-design-vue vue
```

业务项目仍需按 Ant Design Vue 4 官方要求引入 reset 样式：

```ts
import 'ant-design-vue/dist/reset.css'
```

### 单一浅色主题引入 (默认)

```vue
<script setup lang="ts">
import { spacemitLightTheme } from 'spacemit-antd-theme'
</script>

<template>
  <a-config-provider :theme="spacemitLightTheme">
    <a-app>
      <router-view />
    </a-app>
  </a-config-provider>
</template>
```

### 动态深浅色切换引入

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { spacemitLightTheme, spacemitDarkTheme } from 'spacemit-antd-theme'

// 控制主题模式的状态
const isDark = ref(false)

// 派生出当前主题对象
const currentTheme = computed(() =>
  isDark.value ? spacemitDarkTheme : spacemitLightTheme
)
</script>

<template>
  <a-config-provider :theme="currentTheme">
    <a-app>
      <!-- 页面容器绑定相应的 class 以匹配背景色 -->
      <div :class="{ 'dark-theme-wrapper': isDark }">
        <router-view />
      </div>
    </a-app>
  </a-config-provider>
</template>
```

> [!TIP]
> 推荐使用 `a-app` 包裹您的业务主页面，这将使得 Ant Design Vue 的静态方法（如 `message`、`notification`、`Modal.confirm` 等）能够正确继承 `ConfigProvider` 配置的主题样式。

---

## 主题适配要求与第一阶段限制

1. **浅色适配为主**：第一阶段主要深度精修了浅色主题，确保品牌绿色（`#B2E40D`）及衍生语义色正确应用。
2. **深色基础结构**：深色主题（`spacemitDarkTheme`）已建立好基础架构，并引入了原始的 `color.dark.json` 进行浅色映射，但暂未进行细节的像素级精修。
3. **首批组件精修**：针对 `Button`、`Input`、`Select`、`Card`、`Table`、`Menu`、`Tabs`、`Switch` 进行了组件级 Token 自定义。
4. **主题层避免全局 CSS Hack**：所有可交付主题覆盖均在 `componentTokens.ts` 中基于 Ant Design Vue 的 CSS-in-JS Token 规范进行扩展，避免直接覆盖 `.ant-xxx` 全局样式以破坏组件稳定性。
5. **预览页与主题包分离**：预览站页面外壳、说明文字、布局容器与少量演示块存在自定义样式，仅用于展示和调试；业务项目接入的只有 `dist/theme` 中导出的主题对象。
