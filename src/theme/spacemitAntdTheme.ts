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
import type { ColorThemeName } from './spacemitTokens'
import { buildLightComponentTokens, buildDarkComponentTokens } from './componentTokens'

/**
 * 动态注入局部样式覆盖默认按钮 hover 态文字颜色
 */
function injectButtonHoverStyle() {
  if (typeof document !== 'undefined') {
    const styleId = 'spacemit-override-default-button-hover'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.innerHTML = `
        /* 默认按钮 hover 态文字颜色绑定全局主色文本变量 */
        .ant-btn-default:not(:disabled):not(.ant-btn-disabled):hover {
          color: var(--ant-color-primary-text, var(--ant-color-text, rgba(0, 0, 0, 0.88))) !important;
        }
      `
      document.head.appendChild(style)
    }
  }
}

/**
 * 动态组装 Spacemit 浅色主题配置
 */
export function getSpacemitLightTheme(themeName: ColorThemeName = 'base'): ThemeConfig {
  injectButtonHoverStyle()
  const tokens = getDynamicTokens(spacemitLightTokens, themeName)
  return {
    algorithm: theme.defaultAlgorithm,
    token: {
      // 全局控制聚焦组件的虚化彩色发光，设为透明以使焦点展示极简化
      controlOutline: 'transparent',

      // 品牌色
      colorPrimary: tokens.brand,
      colorInfo: tokens.colorBlue,
      colorSuccess: tokens.colorGreen,
      colorWarning: tokens.colorOrange,
      colorError: tokens.error,
      colorLink: tokens.colorBlue,

      // 基础背景
      colorBgBase: tokens.surfaceBright,
      colorBgLayout: tokens.surface,
      colorBgContainer: tokens.surfaceContainerLow,
      colorBgElevated: tokens.surfaceContainerLowest,

      // 基础文字
      colorText: tokens.onSurface,
      colorTextSecondary: tokens.onSurfaceVariant,
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
  injectButtonHoverStyle()
  const tokens = getDynamicTokens(spacemitDarkTokens, themeName)
  return {
    algorithm: theme.darkAlgorithm,
    token: {
      // 全局控制聚焦组件的虚化彩色发光，设为透明以使焦点展示极简化
      controlOutline: 'transparent',

      // 品牌色
      colorPrimary: tokens.brand,
      colorInfo: tokens.colorBlue,
      colorSuccess: tokens.colorGreen,
      colorWarning: tokens.colorOrange,
      colorError: tokens.error,
      colorLink: tokens.colorBlue,

      // 基础背景
      colorBgBase: tokens.surfaceDim,
      colorBgLayout: tokens.surface,
      colorBgContainer: tokens.surfaceContainerLow,
      colorBgElevated: tokens.surfaceContainerLowest,

      // 基础文字
      colorText: tokens.onSurface,
      colorTextSecondary: tokens.onSurfaceVariant,
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
