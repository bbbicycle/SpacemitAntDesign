/**
 * componentTokens.ts
 *
 * 存放 Ant Design Vue 组件级 token 配置。
 *
 * 职责：
 * - 基于 Spacemit 基础 token，为关键组件生成组件级 token
 * - 针对通用、布局、导航、数据录入、数据展示等大类的核心组件提供规范性样式定制
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
      colorPrimaryHover: tokens.brandHover,
    },

    Input: {
      // 输入框背景使用最亮的容器色（白色），与表面形成对比
      colorBgContainer: tokens.surfaceContainerLowest,
    },

    InputNumber: {
      colorBgContainer: tokens.surfaceContainerLowest,
    },

    Select: {
      // 下拉选择器与 Input 保持一致的背景色
      colorBgContainer: tokens.surfaceContainerLowest,
    },

    Cascader: {
      colorBgContainer: tokens.surfaceContainerLowest,
    },

    TreeSelect: {
      colorBgContainer: tokens.surfaceContainerLowest,
    },

    AutoComplete: {
      colorBgContainer: tokens.surfaceContainerLowest,
    },

    Mentions: {
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

    // ---- 新增组件定制 ----

    Layout: {
      // 布局主体背景色
      bodyBg: tokens.surface,
      headerBg: tokens.surfaceContainerLowest,
      siderBg: tokens.surfaceContainerLowest,
      triggerBg: tokens.surfaceContainer,
      triggerColor: tokens.onSurface,
    },

    Slider: {
      railBg: tokens.outlineVariant,
      railHoverBg: tokens.outline,
      trackBg: tokens.onBrandContainer,
      trackHoverBg: tokens.brandHover,
      handleColor: tokens.brand,
      handleColorHover: tokens.brandHover,
      handleActiveColor: tokens.onBrandContainer,
      dotBorderColor: tokens.outline,
      dotActiveBorderColor: tokens.brand,
    },

    Steps: {
      colorPrimary: tokens.onBrandContainer,
      colorTextLightSolid: '#ffffff',
      iconSize: 32,
      customIconSize: 32,
    },

    DatePicker: {
      colorBgContainer: tokens.surfaceContainerLowest,
      activeBg: tokens.brand,
      cellActiveWithRangeBg: tokens.brandContainer,
      cellHoverWithRangeBg: tokens.surfaceContainerHigh,
      cellRangeBorderColor: tokens.brand,
    },

    TimePicker: {
      colorBgContainer: tokens.surfaceContainerLowest,
      activeBg: tokens.brand,
    },

    Rate: {
      starColor: tokens.colorYellow,
      starBg: tokens.outlineVariant,
    },

    Upload: {
      colorBorder: tokens.outline,
      colorBgContainer: tokens.surfaceContainerLowest,
    },

    Divider: {
      colorSplit: tokens.outlineVariant,
    },

    Dropdown: {
      colorBgContainer: tokens.surfaceContainerLowest,
      controlItemBgHover: tokens.surfaceContainerLow,
      controlItemBgActive: tokens.brandContainer,
    },

    Breadcrumb: {
      colorTextDescription: tokens.onSurfaceVariant,
      colorText: tokens.onSurface,
      separatorColor: tokens.outline,
    },

    Anchor: {
      colorPrimary: tokens.onBrandContainer,
    },

    Transfer: {
      colorBgContainer: tokens.surfaceContainerLowest,
      colorFillAlter: tokens.surface,
    },

    // ---- 数据展示组件定制 ----

    Segmented: {
      // 选中项背景使用最亮容器色，与轨道形成高对比
      itemSelectedBg: tokens.surfaceContainerLowest,
      // 选中项文字使用高对比品牌文字色，增强统一感
      itemSelectedColor: tokens.onBrandContainer,
      // 轨道背景色使用容器填充灰
      trackBg: tokens.surfaceContainer,
      trackPadding: 4,
    },

    Collapse: {
      headerBg: tokens.surfaceContainerLow,
      contentBg: tokens.surfaceContainerLowest,
      colorBorder: tokens.outlineVariant,
    },

    Timeline: {
      // 连线颜色使用次级边框色，防止突兀
      tailColor: tokens.outlineVariant,
      tailWidth: 2,
    },

    Drawer: {
      colorBgContainer: tokens.surfaceContainerLowest,
    },

    Modal: {
      colorBgContainer: tokens.surfaceContainerLowest,
    },

    FloatButton: {
      colorBgContainer: tokens.surfaceContainerLowest,
      colorPrimary: tokens.onBrandContainer,
    },
  }
}

/**
 * 基于 Spacemit 基础 token 生成深色主题的组件级 token
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
      colorPrimaryHover: tokens.brandHover,
    },

    Input: {
      colorBgContainer: tokens.surfaceContainerLowest,
    },

    InputNumber: {
      colorBgContainer: tokens.surfaceContainerLowest,
    },

    Select: {
      colorBgContainer: tokens.surfaceContainerLowest,
    },

    Cascader: {
      colorBgContainer: tokens.surfaceContainerLowest,
    },

    TreeSelect: {
      colorBgContainer: tokens.surfaceContainerLowest,
    },

    AutoComplete: {
      colorBgContainer: tokens.surfaceContainerLowest,
    },

    Mentions: {
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
      colorPrimaryHover: tokens.brandHover,
    },

    Switch: {
      colorPrimary: tokens.onBrandContainer,
      colorPrimaryHover: tokens.brandHover,
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

    // ---- 新增组件定制 ----

    Layout: {
      bodyBg: tokens.surface,
      headerBg: tokens.surfaceContainerLowest,
      siderBg: tokens.surfaceContainerLowest,
      siderDarkBg: tokens.surfaceContainerLowest,
      triggerBg: tokens.surfaceContainer,
      triggerColor: tokens.onSurface,
    },

    Slider: {
      railBg: tokens.outlineVariant,
      railHoverBg: tokens.outline,
      trackBg: tokens.brand,
      trackHoverBg: tokens.brandHover,
      handleColor: tokens.brand,
      handleColorHover: tokens.brandHover,
      handleActiveColor: tokens.onBrandContainer,
      dotBorderColor: tokens.outline,
      dotActiveBorderColor: tokens.brand,
    },

    Steps: {
      colorPrimary: tokens.onBrandContainer,
      colorTextLightSolid: '#000000',
      iconSize: 32,
      customIconSize: 32,
    },

    DatePicker: {
      colorBgContainer: tokens.surfaceContainerLowest,
      activeBg: tokens.brand,
      cellActiveWithRangeBg: tokens.brandContainer,
      cellHoverWithRangeBg: tokens.surfaceContainerHigh,
      cellRangeBorderColor: tokens.brand,
    },

    TimePicker: {
      colorBgContainer: tokens.surfaceContainerLowest,
      activeBg: tokens.brand,
    },

    Rate: {
      starColor: tokens.colorYellow,
      starBg: tokens.outlineVariant,
    },

    Upload: {
      colorBorder: tokens.outline,
      colorBgContainer: tokens.surfaceContainerLowest,
    },

    Divider: {
      colorSplit: tokens.outlineVariant,
    },

    Dropdown: {
      colorBgContainer: tokens.surfaceContainerLowest,
      controlItemBgHover: tokens.surfaceContainerLow,
      controlItemBgActive: tokens.brandContainer,
    },

    Breadcrumb: {
      colorTextDescription: tokens.onSurfaceVariant,
      colorText: tokens.onSurface,
      separatorColor: tokens.outline,
    },

    Anchor: {
      colorPrimary: tokens.onBrandContainer,
    },

    Transfer: {
      colorBgContainer: tokens.surfaceContainerLowest,
      colorFillAlter: tokens.surface,
    },

    // ---- 数据展示组件定制 ----

    Segmented: {
      itemSelectedBg: tokens.surfaceContainerLowest,
      itemSelectedColor: tokens.onBrandContainer,
      trackBg: tokens.surfaceContainer,
      trackPadding: 4,
    },

    Collapse: {
      headerBg: tokens.surfaceContainerLow,
      contentBg: tokens.surfaceContainerLowest,
      colorBorder: tokens.outlineVariant,
    },

    Timeline: {
      tailColor: tokens.outlineVariant,
      tailWidth: 2,
    },

    Drawer: {
      colorBgContainer: tokens.surfaceContainerLowest,
    },

    Modal: {
      colorBgContainer: tokens.surfaceContainerLowest,
    },

    FloatButton: {
      colorBgContainer: tokens.surfaceContainerLowest,
      colorPrimary: tokens.onBrandContainer,
    },
  }
}
