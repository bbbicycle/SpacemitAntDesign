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

// ==========================================
// Button (按钮) 集中控制配置区
// 您可以在此处方便地修改按钮尺寸高度和内边距（Padding）
// ==========================================
const sharedHeightConfig = {
  // ---- 尺寸高度配置 ----
  // 默认高度（Middle）
  controlHeight: 36,
  // 小号高度 (Small)
  controlHeightSM: 24,
  // 大号高度 (Large)
  controlHeightLG: 44,
}

const sharedButtonConfig = {
  // 取消按钮聚焦时的默认轮廓外虚影发光
  controlOutline: 'transparent',
  // 边框粗细
  lineWidth: 1,
  // 压缩按钮阴影厚度为 0（彻底消除主按钮、次按钮等所有按钮的底部 1px/2px 物理投影）
  controlOutlineWidth: 0,

  // ---- 尺寸高度配置 ----
  // 默认按钮高度（Middle）
  controlHeight: 36,
  // 小号按钮高度 (Small)
  controlHeightSM: 24,
  // 大号按钮高度 (Large)
  controlHeightLG: 44,

  // ---- 左右内边距配置 (Padding Inline) ----
  // 默认按钮左右 padding
  paddingInline: 16,
  // 小号按钮左右 padding
  paddingInlineSM: 8,
  // 大号按钮左右 padding
  paddingInlineLG: 28,
}

const sharedPaginationConfig = {
  // Pagination 与主题圆角体系保持一致，便于业务项目直接复用
  borderRadius: 8,
}

/**
 * 基于 Spacemit 基础 token 生成浅色主题的组件级 token
 */
export function buildLightComponentTokens(tokens: SpacemitBaseTokens): ComponentThemeConfig {
  return {
    Button: {
      ...sharedButtonConfig,
    },

    Select: {
      ...sharedHeightConfig,
      // Ant Design Vue 4.2.x Select 下拉项选中背景实际读取 controlItemBgActive。
      controlItemBgActive: tokens.surfaceContainer,
      controlItemBgHover: tokens.surfaceContainerLow,
    },

    Input: {
      ...sharedHeightConfig,
    },

    Cascader: {
      controlItemBgActive: tokens.surfaceContainer,
      controlItemBgHover: tokens.surfaceContainerLow,
    },

    Tree: {
      controlItemBgActive: tokens.surfaceContainer,
      controlItemBgHover: tokens.surfaceContainerLow,
    },

    TreeSelect: {
      controlItemBgActive: tokens.surfaceContainer,
      controlItemBgHover: tokens.surfaceContainerLow,
    },

    Table: {
      // 在 Ant Design Vue 4.x 中，Table 暂无专属组件级表头背景 Token，
      // 必须通过覆盖 Alias Token 'colorFillAlter' 来实现表头底色定制。
      colorFillAlter: tokens.surface,
      borderRadius: 0,
    },

    Menu: {
      // 子菜单背景色设为透明，修正原空字符串的非标准解析隐患
      colorSubItemBg: 'transparent',
      // 统一菜单 hover / selected 文本色，确保各模式下交互反馈一致
      colorItemTextHover: tokens.onBrandContainer,
      colorItemTextHoverHorizontal: tokens.onBrandContainer,
      colorItemTextSelected: tokens.onBrandContainer,
      colorItemTextSelectedHorizontal: tokens.onBrandContainer,
      // 菜单项使用次级文字色
      colorItemText: tokens.onSurfaceVariant,
      // 禁用状态使用 disabled 色
      colorItemTextDisabled: tokens.stateDisabled,
      // 选中项背景色对齐 --ant-color-fill-tertiary（colorFillTertiary = surfaceContainerLow）
      colorItemBgSelected: tokens.surfaceContainerLow,
      // 移除选中项右侧/底部的激活色边条，改用整块背景激活展示极简质感
      colorActiveBarWidth: 0,
    },

    Tabs: {
      // Tab 指示条保持品牌主色，文字态由主题覆盖统一映射到主色文本色
      colorPrimary: tokens.brand,
      // Tab hover 指示态由 colorPrimaryHover 控制
      colorPrimaryHover: tokens.brandHover,
    },

    Switch: {
      // 开启态使用品牌色
      colorPrimary: tokens.brand,
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
      colorPrimary: tokens.brand,
      // 步骤条圆形数字使用品牌底色上的前景色，确保辨识度
      colorTextLightSolid: tokens.onBrand,
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

    Pagination: {
      ...sharedPaginationConfig,
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

    Tag: {
      // 微缩 Tag 圆角，营造精巧科技质感
      borderRadiusSM: 4,
    },

    Card: {
      // 卡片背景与悬浮投影配置
      colorBgContainer: tokens.surfaceContainerLowest,
      ...({ boxShadowCard: tokens.boxShadowCardHover } as any),
    },
  }
}

/**
 * 基于 Spacemit 基础 token 生成深色主题的组件级 token
 */
export function buildDarkComponentTokens(tokens: SpacemitBaseTokens): ComponentThemeConfig {
  return {
    Button: {
      ...sharedButtonConfig,
    },

    Select: {
      ...sharedHeightConfig,
      controlItemBgActive: tokens.surfaceContainer,
      controlItemBgHover: tokens.surfaceContainerLow,
    },

    Input: {
      ...sharedHeightConfig,
    },

    Cascader: {
      controlItemBgActive: tokens.surfaceContainer,
      controlItemBgHover: tokens.surfaceContainerLow,
    },

    Tree: {
      controlItemBgActive: tokens.surfaceContainer,
      controlItemBgHover: tokens.surfaceContainerLow,
    },

    TreeSelect: {
      controlItemBgActive: tokens.surfaceContainer,
      controlItemBgHover: tokens.surfaceContainerLow,
    },

    Table: {
      // 在 Ant Design Vue 4.x 中，Table 暂无专属组件级表头背景 Token，
      // 必须通过覆盖 Alias Token 'colorFillAlter' 来实现表头底色定制。
      colorFillAlter: tokens.surfaceBright,
      borderRadius: 0,
    },

    Menu: {
      colorSubItemBg: 'transparent',
      colorItemTextHover: tokens.onBrandContainer,
      colorItemTextHoverHorizontal: tokens.onBrandContainer,
      colorItemTextSelected: tokens.onBrandContainer,
      colorItemTextSelectedHorizontal: tokens.onBrandContainer,
      colorItemText: tokens.onSurfaceVariant,
      colorItemTextDisabled: tokens.stateDisabled,
      // 选中项背景色对齐 --ant-color-fill-tertiary（colorFillTertiary = surfaceContainerLow）
      colorItemBgSelected: tokens.surfaceContainerLow,
      colorActiveBarWidth: 0,
    },

    Tabs: {
      colorPrimary: tokens.brand,
      colorPrimaryHover: tokens.brandHover,
    },

    Switch: {
      colorPrimary: tokens.brand,
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
      colorPrimary: tokens.brand,
      // 步骤条圆形数字使用品牌底色上的前景色，确保辨识度
      colorTextLightSolid: tokens.onBrand,
    },

    Rate: {
      'yellow-6': tokens.colorYellow,
      colorFillContent: tokens.outlineVariant,
    },

    Dropdown: {
      controlItemBgHover: tokens.surfaceContainerLow,
    },

    Pagination: {
      ...sharedPaginationConfig,
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

    Tag: {
      borderRadiusSM: 4,
    },

    Card: {
      colorBgContainer: tokens.surfaceContainerLowest,
      ...({ boxShadowCard: tokens.boxShadowCardHover } as any),
    },
  }
}
