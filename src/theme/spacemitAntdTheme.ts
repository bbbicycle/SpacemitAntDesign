/**
 * spacemitAntdTheme.ts
 *
 * 负责组装最终给 Ant Design Vue ConfigProvider 使用的主题对象。
 *
 * 职责：
 * - 组装 lightTheme 和 darkTheme（支持通过色系名动态组装）
 * - 关联 Spacemit 基础 token 到 Ant Design Vue 的全局 Seed / Alias Token
 * - 关联组件级 Token
 * - 设置默认的 theme algorithm
 */

import { theme } from 'ant-design-vue'
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import { spacemitLightTokens, spacemitDarkTokens, getDynamicTokens } from './spacemitTokens'
import type { ColorThemeName, SpacemitBaseTokens } from './spacemitTokens'
import { buildLightComponentTokens, buildDarkComponentTokens } from './componentTokens'

function buildGlobalOverrideCss(tokens: SpacemitBaseTokens) {
  const primaryColor = `var(--ant-color-primary, ${tokens.brand})`
  const primaryTextColor = `var(--ant-color-primary-text, ${tokens.onBrandContainer})`
  const textColor = `var(--ant-color-text, ${tokens.onSurface})`
  const successColor = `var(--ant-color-success, ${tokens.colorGreen})`

  return `
    /* 自动桥接全局 :root CSS 变量，确保非 ConfigProvider 作用域也能使用标准的品牌变量 */
    :root {
      /* 1. 品牌主色 (Primary) */
      --ant-color-primary: ${tokens.brand};
      --ant-color-primary-hover: ${tokens.brandHover || tokens.brand};
      --ant-color-primary-active: ${tokens.onBrandContainer || tokens.brand};
      --ant-color-primary-outline: transparent;
      --ant-color-primary-bg: ${tokens.brandContainer};
      --ant-color-primary-bg-hover: ${tokens.brandContainer};
      --ant-color-primary-border: ${tokens.brand};
      --ant-color-primary-border-hover: ${tokens.brandHover || tokens.brand};
      --ant-color-primary-text: ${tokens.onBrandContainer};
      --ant-color-primary-text-hover: ${tokens.onBrandContainer};
      --ant-color-primary-text-active: ${tokens.onBrandContainer};

      /* 2. 成功色 (Success) */
      --ant-color-success: ${tokens.colorGreen};
      --ant-color-success-hover: ${tokens.colorGreen};
      --ant-color-success-active: ${tokens.colorGreen};
      --ant-color-success-bg: ${tokens.colorGreenBg};
      --ant-color-success-bg-hover: ${tokens.colorGreenBg};
      --ant-color-success-border: ${tokens.colorGreen};

      /* 3. 警告色 (Warning) */
      --ant-color-warning: ${tokens.colorOrange};
      --ant-color-warning-hover: ${tokens.colorOrange};
      --ant-color-warning-active: ${tokens.colorOrange};
      --ant-color-warning-bg: ${tokens.colorOrangeBg};
      --ant-color-warning-bg-hover: ${tokens.colorOrangeBg};
      --ant-color-warning-border: ${tokens.colorOrange};

      /* 4. 错误色 (Error) */
      --ant-color-error: ${tokens.error};
      --ant-color-error-hover: ${tokens.error};
      --ant-color-error-active: ${tokens.error};
      --ant-color-error-bg: ${tokens.errorContainer};
      --ant-color-error-bg-hover: ${tokens.errorContainer};
      --ant-color-error-border: ${tokens.error};

      /* 5. 信息色 (Info) */
      --ant-color-info: ${tokens.colorBlue};
      --ant-color-info-hover: ${tokens.colorBlue};
      --ant-color-info-active: ${tokens.colorBlue};
      --ant-color-info-bg: ${tokens.colorBlueBg};
      --ant-color-info-bg-hover: ${tokens.colorBlueBg};
      --ant-color-info-border: ${tokens.colorBlue};

      /* 6. 中性背景 */
      --ant-color-bg-base: ${tokens.surfaceBright};
      --ant-color-bg-layout: ${tokens.surface};
      --ant-color-bg-container: ${tokens.surfaceContainerLowest};
      --ant-color-bg-elevated: ${tokens.surfaceContainerLowest};
      --ant-color-bg-spotlight: ${tokens.inverseSurface};
      --ant-color-bg-mask: ${tokens.scrim};

      /* 7. 中性文本 */
      --ant-color-text: ${tokens.onSurface};
      --ant-color-text-secondary: ${tokens.onSurfaceVariant};
      --ant-color-text-tertiary: ${tokens.onSurfaceVariant};
      --ant-color-text-quaternary: ${tokens.stateDisabled};
      --ant-color-text-light-solid: ${tokens.onBrand};

      /* 8. 中性描边 */
      --ant-color-border: ${tokens.outline};
      --ant-color-border-secondary: ${tokens.outlineVariant};
      --ant-color-split: ${tokens.outlineVariant};

      /* 9. 中性填充 */
      --ant-color-fill: ${tokens.surfaceContainerHighest};
      --ant-color-fill-secondary: ${tokens.surfaceContainer};
      --ant-color-fill-tertiary: ${tokens.surfaceContainerLow};
      --ant-color-fill-quaternary: ${tokens.surfaceContainerLowest};

      /* 10. 链接 */
      --ant-color-link: ${tokens.colorBlue};
      --ant-color-link-hover: ${tokens.colorBlue};
      --ant-color-link-active: ${tokens.colorBlue};
    }

    /* AntDV 部分文本状态默认直接读取 colorPrimary，这里统一映射为主色文本色。 */
    .ant-anchor-link-active > .ant-anchor-link-title,
    .ant-anchor-link-title-active,
    .ant-radio-button-wrapper:hover,
    .ant-tabs-tab:hover,
    .ant-tabs-tab:hover .ant-tabs-tab-btn,
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn,
    .ant-tabs-tab-btn:active,
    .ant-tabs-tab-btn:focus:not(:focus-visible),
    .ant-tabs-nav-add:hover,
    .ant-tabs-nav-add:active,
    .ant-tabs-nav-add:focus:not(:focus-visible),
    .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active,
    .ant-tabs-card > div > .ant-tabs-nav .ant-tabs-tab-active,
    .ant-dropdown-menu-item-selected,
    .ant-dropdown-menu-submenu-selected .ant-dropdown-menu-submenu-title,
    .ant-picker-calendar.ant-picker-calendar-full .ant-picker-cell-selected .ant-picker-calendar-date-value,
    .ant-picker-calendar.ant-picker-calendar-full .ant-picker-cell-selected:hover .ant-picker-calendar-date-value,
    .ant-picker-header-view button:hover,
    .ant-picker-preset > .ant-tag-blue,
    .ant-tag-checkable:not(.ant-tag-checkable-checked):hover,
    .ant-card-actions > li > span:hover,
    .ant-card-actions > li > span a:not(.ant-btn):hover,
    .ant-card-actions > li > span > .anticon:hover,
    .ant-form-item-feedback-icon-validating,
    .ant-input-group-addon .ant-select-open .ant-select-selector,
    .ant-input-group-addon .ant-select-focused .ant-select-selector,
    .ant-input-search-button:not(.ant-btn-primary):hover,
    .ant-input-search-button:not(.ant-btn-primary):active,
    .ant-input-number-handler:hover .ant-input-number-handler-up-inner,
    .ant-input-number-handler:hover .ant-input-number-handler-down-inner,
    .ant-list-item-meta-title > a:hover,
    .ant-pagination-jump-prev .ant-pagination-item-link-icon,
    .ant-pagination-jump-next .ant-pagination-item-link-icon,
    .ant-pagination-prev:hover .ant-pagination-item-link,
    .ant-pagination-next:hover .ant-pagination-item-link,
    .ant-pagination-item:hover:not(.ant-pagination-item-active) a,
    .ant-table-filter-trigger.active,
    .ant-table-thead th.ant-table-column-has-sorters:focus-visible,
    .ant-table-column-sorter-up.active,
    .ant-table-column-sorter-down.active,
    .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role='button']:hover .ant-steps-item-title,
    .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role='button']:hover .ant-steps-item-subtitle,
    .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role='button']:hover .ant-steps-item-description,
    .ant-tour-primary .ant-tour-next-btn {
      color: ${primaryTextColor} !important;
    }

    .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role='button']:hover .ant-steps-item-icon,
    .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role='button']:hover .ant-steps-item-icon > .ant-steps-icon {
      color: ${textColor} !important;
    }

    /* Steps 步骤条 finish 与 success 状态使用成功状态色代替品牌色 */
    .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-icon,
    .ant-steps-item-success > .ant-steps-item-container > .ant-steps-item-icon {
      border-color: ${successColor} !important;
    }
    .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-icon > .ant-steps-icon,
    .ant-steps-item-success > .ant-steps-item-container > .ant-steps-item-icon > .ant-steps-icon,
    .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-icon > .ant-steps-icon .anticon,
    .ant-steps-item-success > .ant-steps-item-container > .ant-steps-item-icon > .ant-steps-icon .anticon {
      color: ${successColor} !important;
    }
    .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after,
    .ant-steps-item-success > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after,
    .ant-steps-item-finish > .ant-steps-item-tail::after,
    .ant-steps-item-success > .ant-steps-item-tail::after {
      background-color: ${successColor} !important;
    }
    .ant-steps-item-finish .ant-steps-icon-dot,
    .ant-steps-item-success .ant-steps-icon-dot {
      background-color: ${successColor} !important;
    }

    .ant-radio-button-wrapper:hover a {
      color: ${primaryTextColor} !important;
    }

    /* Radio.Button 选中态文字颜色统一为 --ant-color-text */
    .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled),
    .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) a {
      color: ${textColor} !important;
    }

    .ant-select-item-option-selected:not(.ant-select-item-option-disabled) .ant-select-item-option-state {
      color: ${primaryTextColor} !important;
    }

    /* 默认与虚线按钮 hover 态文字颜色统一使用 --ant-color-text */
    .ant-btn-default:not(:disabled):not(.ant-btn-disabled):not(.ant-btn-dangerous):hover,
    .ant-btn-default:not(:disabled):not(.ant-btn-disabled):not(.ant-btn-dangerous):active,
    .ant-btn-dashed:not(:disabled):not(.ant-btn-disabled):not(.ant-btn-dangerous):hover,
    .ant-btn-dashed:not(:disabled):not(.ant-btn-disabled):not(.ant-btn-dangerous):active {
      color: ${textColor} !important;
    }

    /* 危险次/虚线按钮 hover 与 active 状态自定义 */
    .ant-btn-default.ant-btn-dangerous:not(:disabled):not(.ant-btn-disabled):hover,
    .ant-btn-dashed.ant-btn-dangerous:not(:disabled):not(.ant-btn-disabled):hover {
      background-color: var(--ant-color-error-bg-hover) !important;
      border-color: var(--ant-color-error-hover) !important;
      color: var(--ant-color-error) !important;
    }
    .ant-btn-default.ant-btn-dangerous:not(:disabled):not(.ant-btn-disabled):active,
    .ant-btn-dashed.ant-btn-dangerous:not(:disabled):not(.ant-btn-disabled):active {
      background-color: var(--ant-color-error-bg-hover) !important;
      border-color: var(--ant-color-error-active) !important;
      color: var(--ant-color-error) !important;
    }

    /* 确保 input-affix-wrapper 内部的 input 背景透明，避免背景色双重叠加 */
    .ant-input-affix-wrapper > input.ant-input {
      background-color: transparent !important;
    }

    /* Pagination 选中态保持主题化输出：主色背景、正文文字、无描边 */
    .ant-pagination .ant-pagination-item-active,
    .ant-pagination .ant-pagination-item-active:hover {
      background-color: ${primaryColor} !important;
      border-color: transparent !important;
    }

    .ant-pagination .ant-pagination-item-active a,
    .ant-pagination .ant-pagination-item-active:hover a {
      color: ${textColor} !important;
    }

    /* Slider 滑块 hover 时轨道背景色保持为主色而不使用 hover 浅色 */
    .ant-slider:not(.ant-slider-disabled):hover .ant-slider-track {
      background-color: ${primaryColor} !important;
    }

    /* Tooltip 气泡提示内部文字强制改为白色 */
    .ant-tooltip .ant-tooltip-inner {
      color: #ffffff !important;
    }

    /* Timeline 自定义图标的背景色设为 none，避免出现背景色遮挡 */
    .ant-timeline-item-head-custom {
      background: none !important;
    }
  `
}

/**
 * 清除之前注入的全局样式覆盖标签（切换到 antd-default 时调用）。
 * 若不清除，旧的 !important 规则会继续覆盖 AntD 官方默认颜色。
 */
function clearGlobalOverrides() {
  if (typeof document !== 'undefined') {
    const style = document.getElementById('spacemit-antd-theme-global-overrides')
    if (style) {
      style.innerHTML = ''
    }
  }
}

/**
 * 动态注入全局样式覆盖，解决部分组件 antd 默认样式不一致的问题
 */
function injectGlobalOverrides(tokens: SpacemitBaseTokens) {
  if (typeof document !== 'undefined') {
    const styleId = 'spacemit-antd-theme-global-overrides'
    const nextCss = buildGlobalOverrideCss(tokens)
    const style = document.getElementById(styleId) as HTMLStyleElement | null

    if (style) {
      if (style.innerHTML !== nextCss) {
        style.innerHTML = nextCss
      }
      return
    }

    const nextStyle = document.createElement('style')
    nextStyle.id = styleId
    nextStyle.innerHTML = nextCss
    document.head.appendChild(nextStyle)
  }
}

/**
 * 动态组装 Spacemit 浅色主题配置
 */
export function getSpacemitLightTheme(themeName: ColorThemeName = 'base'): ThemeConfig {
  // 'antd-default'：不注入任何 Spacemit token，完全使用 AntD 官方默认主题
  // 同时必须清除之前注入的全局 !important 覆盖规则，否则旧的颜色会残留
  if (themeName === 'antd-default') {
    clearGlobalOverrides()
    return { algorithm: theme.defaultAlgorithm }
  }

  const tokens = getDynamicTokens(spacemitLightTokens, themeName)
  injectGlobalOverrides(tokens)
  return {
    algorithm: theme.defaultAlgorithm,
    token: {
      // 全局控制聚焦组件的虚化彩色发光，设为透明以使焦点展示极简化
      controlOutline: 'transparent',

      // 控件高度配置，与 Button 的高度保持一致
      controlHeight: 36,
      controlHeightSM: 24,
      controlHeightLG: 44,

      // 品牌色
      colorPrimary: tokens.brand,
      colorInfo: tokens.colorBlue,
      colorSuccess: tokens.colorGreen,
      colorWarning: tokens.colorOrange,
      colorError: tokens.error,
      colorErrorHover: tokens.error,
      colorErrorActive: tokens.error,
      colorErrorBg: tokens.errorContainer,
      colorErrorBgHover: tokens.errorContainer,
      colorErrorBorder: tokens.error,
      colorLink: tokens.colorBlue,

      // 基础背景
      colorBgBase: tokens.surfaceBright,
      colorBgLayout: tokens.surface,
      colorBgContainer: tokens.surfaceContainerLowest,
      colorBgElevated: tokens.surfaceContainerLowest,

      // 基础文字
      colorText: tokens.onSurface,
      colorTextSecondary: tokens.onSurfaceVariant,
      colorTextTertiary: tokens.onSurfaceVariant,
      colorTextDisabled: tokens.stateDisabled,
      colorTextLightSolid: tokens.onBrand,

      // 边框
      colorBorder: tokens.outline,
      colorBorderSecondary: tokens.outlineVariant,
      colorSplit: tokens.outlineVariant,

      // 圆角与字号
      borderRadius: tokens.radiusBase,
      borderRadiusSM: tokens.radiusSmall,
      borderRadiusLG: tokens.radiusLarge,
      borderRadiusXS: tokens.radiusXSmall,
      fontSize: tokens.fontSizeBase,

      // 状态填充与辅助色
      colorFillSecondary: tokens.surfaceContainer,
      colorFillTertiary: tokens.surfaceContainerLow,

      // 派生状态色定义，确保组件默认样式能正确反映 Spacemit 品牌
      colorPrimaryBg: tokens.brandContainer,
      colorPrimaryBgHover: tokens.brandContainer,
      colorPrimaryBorder: tokens.brand,
      colorPrimaryHover: tokens.brandHover,
      colorPrimaryActive: tokens.onBrandContainer,
      colorPrimaryText: tokens.onBrandContainer,

      // 绑定影子与动效 Token
      motionDurationMid: tokens.motionDurationMid,
      motionEaseInOut: tokens.motionEaseInOut,
    },
    components: buildLightComponentTokens(tokens),
  }
}

/**
 * 动态组装 Spacemit 深色主题配置
 */
export function getSpacemitDarkTheme(themeName: ColorThemeName = 'base'): ThemeConfig {
  // 'antd-default'：不注入任何 Spacemit token，完全使用 AntD 官方默认深色主题
  // 同时必须清除之前注入的全局 !important 覆盖规则，否则旧的颜色会残留
  if (themeName === 'antd-default') {
    clearGlobalOverrides()
    return { algorithm: theme.darkAlgorithm }
  }

  const tokens = getDynamicTokens(spacemitDarkTokens, themeName)
  injectGlobalOverrides(tokens)
  return {
    algorithm: theme.darkAlgorithm,
    token: {
      // 全局控制聚焦组件的虚化彩色发光，设为透明以使焦点展示极简化
      controlOutline: 'transparent',

      // 控件高度配置，与 Button 的高度保持一致
      controlHeight: 36,
      controlHeightSM: 24,
      controlHeightLG: 44,

      // 品牌色
      colorPrimary: tokens.brand,
      colorInfo: tokens.colorBlue,
      colorSuccess: tokens.colorGreen,
      colorWarning: tokens.colorOrange,
      colorError: tokens.error,
      colorErrorHover: tokens.error,
      colorErrorActive: tokens.error,
      colorErrorBg: tokens.errorContainer,
      colorErrorBgHover: tokens.errorContainer,
      colorErrorBorder: tokens.error,
      colorLink: tokens.colorBlue,

      // 基础背景
      colorBgBase: tokens.surfaceBright,
      colorBgLayout: tokens.surface,
      colorBgContainer: tokens.surfaceContainerLowest,
      colorBgElevated: tokens.surfaceContainerLowest,

      // 基础文字
      colorText: tokens.onSurface,
      colorTextSecondary: tokens.onSurfaceVariant,
      colorTextTertiary: tokens.onSurfaceVariant,
      colorTextDisabled: tokens.stateDisabled,
      colorTextLightSolid: tokens.onBrand,

      // 边框
      colorBorder: tokens.outline,
      colorBorderSecondary: tokens.outlineVariant,
      colorSplit: tokens.outlineVariant,

      // 圆角与字号
      borderRadius: tokens.radiusBase,
      borderRadiusSM: tokens.radiusSmall,
      borderRadiusLG: tokens.radiusLarge,
      borderRadiusXS: tokens.radiusXSmall,
      fontSize: tokens.fontSizeBase,

      // 状态填充与辅助色
      colorFillSecondary: tokens.surfaceContainer,
      colorFillTertiary: tokens.surfaceContainerLow,

      // 派生状态色定义
      colorPrimaryBg: tokens.brandContainer,
      colorPrimaryBgHover: tokens.brandContainer,
      colorPrimaryBorder: tokens.brand,
      colorPrimaryHover: tokens.brandHover,
      colorPrimaryActive: tokens.onBrandContainer,
      colorPrimaryText: tokens.onBrandContainer,

      // 绑定影子与动效 Token
      motionDurationMid: tokens.motionDurationMid,
      motionEaseInOut: tokens.motionEaseInOut,
    },
    components: buildDarkComponentTokens(tokens),
  }
}

/**
 * 向后兼容的静态浅色与深色主题常量（默认使用 base 品牌色系）
 */
export const spacemitLightTheme: ThemeConfig = getSpacemitLightTheme('base')
export const spacemitDarkTheme: ThemeConfig = getSpacemitDarkTheme('base')
