/**
 * componentTokens.ts
 *
 * 存放 Ant Design Vue 组件级 token 配置。
 *
 * 职责：
 * - 基于 Spacemit 基础 token，为关键组件生成组件级 token
 * - 第一版优先处理：Button, Input, Select, Card, Table, Menu, Tabs, Switch
 * - 后续可扩展更多组件
 *
 * 注意：
 * - 使用 Ant Design Vue 官方 component token API 以及局部覆盖 Alias Token 机制
 * - 不使用大量 .ant-xxx CSS 覆盖
 */

import type { SpacemitBaseTokens } from './spacemitTokens'

/**
 * 基于 Spacemit 基础 token 生成浅色主题的组件级 token
 */
export function buildLightComponentTokens(tokens: SpacemitBaseTokens) {
  return {
    Button: {
      // 主按钮文字使用 OnBrand（黑色），保证在亮绿色品牌色上的可读性
      colorTextLightSolid: tokens.onBrand,
      // 取消默认阴影，保持简洁风格
      defaultShadow: '',
      primaryShadow: '',
      dangerShadow: '',
      lineWidth: 1,
      // hover 状态使用稍亮的品牌色
      colorPrimaryHover: tokens.onBrandContainer,
    },

    Input: {
      // 输入框背景使用最亮的容器色（白色），与表面形成对比
      colorBgContainer: tokens.surfaceContainerLowest,
    },

    Select: {
      // 下拉选择器与 Input 保持一致的背景色
      colorBgContainer: tokens.surfaceContainerLowest,
    },

    Card: {
      // 卡片使用最亮的容器色，在浅色 layout 背景上清晰可辨
      colorBgContainer: tokens.surfaceContainerLowest,
    },

    Table: {
      // 表头背景 tableHeaderBg 在 hook 内部由 colorFillAlter 计算得出，在此进行局部重写
      colorFillAlter: tokens.surface,
    },

    Menu: {
      // 子菜单背景透明
      colorSubItemBg: '',
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
      colorPrimaryHover: tokens.onBrandContainer,
    },

    Switch: {
      // 开启态使用品牌绿色
      colorPrimary: tokens.onBrandContainer,
      colorPrimaryHover: tokens.brand,
    },

    // 以下组件做基础适配，后续可精修

    Checkbox: {
      // Checkbox 选中后内部勾的颜色（在品牌色背景上应为深色以确保可读）
      colorWhite: tokens.onBrand,
    },

    Radio: {
      // Radio 的实色选中态文字颜色局部覆盖全局 colorTextLightSolid，确保对比度
      colorTextLightSolid: tokens.onBrand,
    },

    Alert: {
      // Info Alert 使用蓝色系
      colorInfo: tokens.colorBlue,
      colorInfoBg: tokens.colorBlueBg,
      colorInfoBorder: 'transparent',
    },

    Spin: {
      // 加载指示器使用品牌色
      colorPrimary: tokens.onBrandContainer,
    },

    Pagination: {
      borderRadius: tokens.radiusSmall,
    },
  }
}

/**
 * 基于 Spacemit 基础 token 生成深色主题 of the组件级 token
 */
export function buildDarkComponentTokens(tokens: SpacemitBaseTokens) {
  return {
    Button: {
      // 深色模式下主按钮文字使用 OnBrand（黑色），品牌色本身足够亮
      colorTextLightSolid: tokens.onBrand,
      defaultShadow: '',
      primaryShadow: '',
      dangerShadow: '',
      lineWidth: 1,
      colorPrimaryHover: tokens.brand,
    },

    Input: {
      colorBgContainer: tokens.surfaceContainerLowest,
    },

    Select: {
      colorBgContainer: tokens.surfaceContainerLowest,
    },

    Card: {
      colorBgContainer: tokens.surfaceContainerLowest,
    },

    Table: {
      // 深色模式下局部覆盖表头的背景计算源
      colorFillAlter: tokens.surfaceBright,
    },

    Menu: {
      colorSubItemBg: '',
      colorItemTextSelected: tokens.onBrandContainer,
      colorItemText: tokens.onSurfaceVariant,
      colorItemTextDisabled: tokens.stateDisabled,
      colorItemBgSelected: tokens.surfaceContainerLow,
    },

    Tabs: {
      colorPrimary: tokens.onBrandContainer,
      colorPrimaryHover: tokens.onBrandContainer,
    },

    Switch: {
      colorPrimary: tokens.onBrandContainer,
      colorPrimaryHover: tokens.brand,
    },

    Checkbox: {
      colorWhite: tokens.onBrand,
    },

    Radio: {
      colorTextLightSolid: tokens.onBrand,
    },

    Alert: {
      colorInfo: tokens.colorBlue,
      colorInfoBg: tokens.colorBlueBg,
      colorInfoBorder: 'transparent',
    },

    Spin: {
      colorPrimary: tokens.onBrandContainer,
    },

    Pagination: {
      borderRadius: tokens.radiusSmall,
    },
  }
}
