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

若需要构建用于生产的静态包，运行：

```bash
npm run build
```

---

## 业务项目如何引入并使用

在您的业务项目中，只需将 `src/theme/` 目录复制到项目中，并通过 `a-config-provider` 将对应主题配置注入您的应用。

### 单一浅色主题引入 (默认)

```vue
<script setup lang="ts">
import { spacemitLightTheme } from '@/theme'
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
import { spacemitLightTheme, spacemitDarkTheme } from '@/theme'

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
4. **完全避免全局 CSS Hack**：所有主题覆盖均在 `componentTokens.ts` 中基于 Ant Design Vue 的 CSS-in-JS Token 规范进行扩展，避免直接覆盖 `.ant-xxx` 全局样式以破坏组件稳定性。
