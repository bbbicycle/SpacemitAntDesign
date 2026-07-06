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

### 推荐的 CSS 变量全局桥接 (最佳实践)

如果您的业务项目中包含手写的自定义 HTML 组件，或者需要直接在 CSS 中调用标准的 CSS 变量，我们强烈建议在您的业务主入口（如 `App.vue`）中，使用 `watchEffect` 实时将 Spacemit Token 桥接映射为标准的全局 `--ant-color-*` 变量。

这也是本主题包的默认设计理念：**例如默认按钮 hover 态的文字颜色，默认会尝试从全局的 `var(--ant-color-primary-text)` 变量中动态拉取**。如果不配置该桥接，默认按钮悬浮时将使用预设色作为兜底。

**桥接配置代码示例（在您的业务项目 `App.vue` 中配置）：**

```vue
<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useSpacemitToken } from 'spacemit-antd-theme'

const tokens = useSpacemitToken()

watchEffect(() => {
  if (typeof document !== 'undefined') {
    const root = document.documentElement
    const t = tokens.value

    // 1. 桥接品牌主色
    root.style.setProperty('--ant-color-primary', t.brand)
    root.style.setProperty('--ant-color-primary-hover', t.brandHover)
    root.style.setProperty('--ant-color-primary-active', t.onBrandContainer)

    // 2. 桥接中性文本（极其关键：默认按钮 hover 态字色会以此为基准）
    root.style.setProperty('--ant-color-text', t.onSurface)
    root.style.setProperty('--ant-color-text-secondary', t.onSurfaceVariant)
    root.style.setProperty('--ant-color-text-disabled', t.stateDisabled)

    // 3. 桥接中性背景
    root.style.setProperty('--ant-color-bg-layout', t.surface)
    root.style.setProperty('--ant-color-bg-container', t.surfaceContainerLow)
    root.style.setProperty('--ant-color-bg-elevated', t.surfaceContainerLowest)

    // 4. 桥接中性描边与线
    root.style.setProperty('--ant-color-border', t.outline)
    root.style.setProperty('--ant-color-border-secondary', t.outlineVariant)
    root.style.setProperty('--ant-color-split', t.outlineVariant)
  }
})
</script>
```

---

## 主题适配要求与第一阶段限制

1. **浅色适配为主**：第一阶段主要深度精修了浅色主题，确保品牌绿色（`#B2E40D`）及衍生语义色正确应用。
2. **深色基础结构**：深色主题（`spacemitDarkTheme`）已建立好基础架构，并引入了原始的 `color.dark.json` 进行浅色映射，但暂未进行细节的像素级精修。
3. **首批组件精修**：针对 `Button`、`Input`、`Select`、`Card`、`Table`、`Menu`、`Tabs`、`Switch` 进行了组件级 Token 自定义。
4. **主题层避免全局 CSS Hack**：所有可交付主题覆盖均在 `componentTokens.ts` 中基于 Ant Design Vue 的 CSS-in-JS Token 规范进行扩展，避免直接覆盖 `.ant-xxx` 全局样式以破坏组件稳定性。
5. **预览页与主题包分离**：预览站页面外壳、说明文字、布局容器与少量演示块存在自定义样式，仅用于展示和调试；业务项目接入的只有 `dist/theme` 中导出的主题对象。
6. **默认按钮 Hover 态文字处理**：针对 `Button` 组件，在该版本组件库底层无法通过 Token 区分配置默认按钮 hover 字色与主按钮背景色 hover 的限制下，主题入口内置了样式自动注入逻辑（通过优先读取全局 `--ant-color-primary-text` 变量进行映射，并以 `--ant-color-text` 变量进行兜底），实现了默认按钮在 hover 时文字颜色呈现品牌深文本色（`onBrandContainer`）的微调，且对业务项目免配置生效。
