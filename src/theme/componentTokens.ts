/**
 * componentTokens.ts
 *
 * 存放 Ant Design Vue 组件级 token 配置。
 *
 * 职责：
 * - 基于 Spacemit 基础 token，为关键组件生成组件级 token
 * - 遵循 Ant Design Vue 4.x 官方组件专属 Token 规范，不使用大量 .ant-xxx CSS 覆盖
 * - 精简冗余配置，充分利用全局 Seed/Alias Token 的自动级联派生机制
 */

import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import type { SpacemitBaseTokens } from './spacemitTokens'

type ComponentThemeConfig = NonNullable<ThemeConfig['components']>

/**
 * 基于 Spacemit 基础 token 生成浅色主题的组件级 token
 */
export function buildLightComponentTokens(tokens: SpacemitBaseTokens): ComponentThemeConfig {
  return {
    Button: {
      // 通过官方 Alias Token 取消按钮默认轮廓阴影
      controlOutline: 'transparent',
      lineWidth: 1,
    },

    Table: {
      // 在 Ant Design Vue 4.x 中，Table 暂无专属 headerBg Token，
      // 表头背景色通过局部覆盖 Alias Token 'colorFillAlter' 实现
      colorFillAlter: tokens.surface,
    },

    Menu: {
      // 子菜单背景色设为透明，修正原空字符串的非标准解析隐患
      colorSubItemBg: 'transparent',
      // 选中菜单项使用品牌色
      colorItemTextSelected: tokens.onBrandContainer,
      // 菜单项使用次级文字色
      colorItemText: tokens.onSurfaceVariant,
      // 禁用状态使用 disabled 色
      colorItemTextDisabled: tokens.stateDisabled,
      // 选中项使用轻微的品牌容器色背景
      colorItemBgSelected: tokens.surfaceContainerLow,
    },

    Tabs: {
      // 选中 Tab 文字与滑动指示条由于在样式中直接使用 colorPrimary 控制，在此局部覆盖
      colorPrimary: tokens.onBrandContainer,
      // Tab hover 状态由 colorPrimaryHover 控制
      colorPrimaryHover: tokens.brandHover,
    },

    Switch: {
      // 开启态使用品牌绿色
      colorPrimary: tokens.onBrandContainer,
      colorPrimaryHover: tokens.brandHover,
    },

    Checkbox: {
      // Checkbox 选中后内部勾的颜色（在品牌色背景上应为深色以确保可读）
      colorWhite: tokens.onBrand,
    },

    Layout: {
      // 布局专属的官方组件 Token
      colorBgBody: tokens.surface,
      colorBgHeader: tokens.surfaceContainerLowest,
      colorBgTrigger: tokens.surfaceContainer,
    },

    Slider: {
      // 针对 Slider 组件特有的微调配置
      colorFillTertiary: tokens.outlineVariant,
      colorFillSecondary: tokens.outline,
      colorBorderSecondary: tokens.outline,
    },

    Steps: {
      colorPrimary: tokens.onBrandContainer,
      // 步骤条圆形数字，亮色模式下使用纯白色以确保辨识度
      colorTextLightSolid: '#ffffff',
    },

    Rate: {
      // 注意：Ant Design Vue 4.x 官方未开放 Rate 的星色组件 Token，
      // 此处覆盖底层的预设色彩，在后续大版本升级时需特别注意此处的兼容性。
      'yellow-6': tokens.colorYellow,
      colorFillContent: tokens.outlineVariant,
    },

    Dropdown: {
      controlItemBgHover: tokens.surfaceContainerLow,
    },

    Transfer: {
      colorFillAlter: tokens.surface,
    },

    Segmented: {
      // 针对分段控制器的局部视觉微调
      colorBgLayout: tokens.surfaceContainer,
      colorBgElevated: tokens.surfaceContainerLowest,
      colorTextLabel: tokens.onSurfaceVariant,
      colorText: tokens.onBrandContainer,
      colorFillSecondary: tokens.surfaceContainerHigh,
    },

    Collapse: {
      colorFillAlter: tokens.surfaceContainerLow,
      colorBorder: tokens.outlineVariant,
    },

    Timeline: {
      lineWidthBold: 2,
    },
  }
}

/**
 * 基于 Spacemit 基础 token 生成深色主题的组件级 token
 */
export function buildDarkComponentTokens(tokens: SpacemitBaseTokens): ComponentThemeConfig {
  return {
    Button: {
      controlOutline: 'transparent',
      lineWidth: 1,
    },

    Table: {
      colorFillAlter: tokens.surfaceBright,
    },

    Menu: {
      colorSubItemBg: 'transparent',
      colorItemTextSelected: tokens.onBrandContainer,
      colorItemText: tokens.onSurfaceVariant,
      colorItemTextDisabled: tokens.stateDisabled,
      colorItemBgSelected: tokens.surfaceContainerLow,
    },

    Tabs: {
      colorPrimary: tokens.onBrandContainer,
      colorPrimaryHover: tokens.brandHover,
    },

    Switch: {
      colorPrimary: tokens.onBrandContainer,
      colorPrimaryHover: tokens.brandHover,
    },

    Checkbox: {
      colorWhite: tokens.onBrand,
    },

    Layout: {
      colorBgBody: tokens.surface,
      colorBgHeader: tokens.surfaceContainerLowest,
      colorBgTrigger: tokens.surfaceContainer,
    },

    Slider: {
      colorFillTertiary: tokens.outlineVariant,
      colorFillSecondary: tokens.outline,
      colorBorderSecondary: tokens.outline,
    },

    Steps: {
      colorPrimary: tokens.onBrandContainer,
      // 步骤条圆形数字，深色模式下使用纯黑色以保证亮绿主色背景上的清晰度
      colorTextLightSolid: '#000000',
    },

    Rate: {
      'yellow-6': tokens.colorYellow,
      colorFillContent: tokens.outlineVariant,
    },

    Dropdown: {
      controlItemBgHover: tokens.surfaceContainerLow,
    },

    Transfer: {
      colorFillAlter: tokens.surface,
    },

    Segmented: {
      colorBgLayout: tokens.surfaceContainer,
      colorBgElevated: tokens.surfaceContainerLowest,
      colorTextLabel: tokens.onSurfaceVariant,
      colorText: tokens.onBrandContainer,
      colorFillSecondary: tokens.surfaceContainerHigh,
    },

    Collapse: {
      colorFillAlter: tokens.surfaceContainerLow,
      colorBorder: tokens.outlineVariant,
    },

    Timeline: {
      lineWidthBold: 2,
    },
  }
}
