/**
 * spacemitAntdTheme.ts
 *
 * 负责组装最终给 Ant Design Vue ConfigProvider 使用的主题对象。
 *
 * 职责：
 * - 组装 lightTheme 和 darkTheme
 * - 关联 Spacemit 基础 token 到 Ant Design Vue 的全局 Seed / Alias Token
 * - 关联组件级 Token
 * - 设置默认的 theme algorithm
 */

import { theme } from 'ant-design-vue'
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import { spacemitLightTokens, spacemitDarkTokens } from './spacemitTokens'
import { buildLightComponentTokens, buildDarkComponentTokens } from './componentTokens'

/**
 * Spacemit 浅色主题配置
 * 默认使用
 */
export const spacemitLightTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // 品牌色
    colorPrimary: spacemitLightTokens.brand,
    colorInfo: spacemitLightTokens.colorBlue,
    colorSuccess: spacemitLightTokens.colorGreen,
    colorWarning: spacemitLightTokens.colorOrange,
    colorError: spacemitLightTokens.error,
    colorLink: spacemitLightTokens.colorBlue,

    // 基础背景
    colorBgBase: spacemitLightTokens.surfaceBright,
    colorBgLayout: spacemitLightTokens.surface,
    colorBgContainer: spacemitLightTokens.surfaceContainerLowest,
    colorBgElevated: spacemitLightTokens.surfaceContainerLowest,

    // 基础文字
    colorText: spacemitLightTokens.onSurface,
    colorTextSecondary: spacemitLightTokens.onSurfaceVariant,
    colorTextDisabled: spacemitLightTokens.stateDisabled,
    colorTextLightSolid: spacemitLightTokens.onBrand,

    // 边框
    colorBorder: spacemitLightTokens.outline,
    colorBorderSecondary: spacemitLightTokens.outlineVariant,
    colorSplit: spacemitLightTokens.outlineVariant,

    // 圆角与字号
    borderRadius: spacemitLightTokens.radiusBase,
    borderRadiusSM: spacemitLightTokens.radiusSmall,
    borderRadiusLG: spacemitLightTokens.radiusLarge,
    borderRadiusXS: spacemitLightTokens.radiusXSmall,
    fontSize: spacemitLightTokens.fontSizeBase,

    // 状态填充与辅助色
    colorFillSecondary: spacemitLightTokens.surfaceContainer,
    colorFillTertiary: spacemitLightTokens.surfaceContainerLow,
    
    // 派生状态色定义，确保组件默认样式能正确反映 Spacemit 品牌
    colorPrimaryBg: spacemitLightTokens.brandContainer,
    colorPrimaryBgHover: spacemitLightTokens.brandContainer,
    colorPrimaryBorder: spacemitLightTokens.brand,
    colorPrimaryHover: spacemitLightTokens.brandHover,
    colorPrimaryActive: spacemitLightTokens.onBrandContainer,
    colorPrimaryText: spacemitLightTokens.onBrandContainer,
  },
  components: buildLightComponentTokens(spacemitLightTokens),
}

/**
 * Spacemit 深色主题配置
 * 保留基础结构，供后续扩展
 */
export const spacemitDarkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    // 品牌色
    colorPrimary: spacemitDarkTokens.brand,
    colorInfo: spacemitDarkTokens.colorBlue,
    colorSuccess: spacemitDarkTokens.colorGreen,
    colorWarning: spacemitDarkTokens.colorOrange,
    colorError: spacemitDarkTokens.error,
    colorLink: spacemitDarkTokens.colorBlue,

    // 基础背景
    colorBgBase: spacemitDarkTokens.surfaceDim,
    colorBgLayout: spacemitDarkTokens.surface,
    colorBgContainer: spacemitDarkTokens.surfaceContainerLowest,
    colorBgElevated: spacemitDarkTokens.surfaceContainerLowest,

    // 基础文字
    colorText: spacemitDarkTokens.onSurface,
    colorTextSecondary: spacemitDarkTokens.onSurfaceVariant,
    colorTextDisabled: spacemitDarkTokens.stateDisabled,
    colorTextLightSolid: spacemitDarkTokens.onBrand,

    // 边框
    colorBorder: spacemitDarkTokens.outline,
    colorBorderSecondary: spacemitDarkTokens.outlineVariant,
    colorSplit: spacemitDarkTokens.outlineVariant,

    // 圆角与字号
    borderRadius: spacemitDarkTokens.radiusBase,
    borderRadiusSM: spacemitDarkTokens.radiusSmall,
    borderRadiusLG: spacemitDarkTokens.radiusLarge,
    borderRadiusXS: spacemitDarkTokens.radiusXSmall,
    fontSize: spacemitDarkTokens.fontSizeBase,

    // 状态填充与辅助色
    colorFillSecondary: spacemitDarkTokens.surfaceContainer,
    colorFillTertiary: spacemitDarkTokens.surfaceContainerLow,

    // 派生状态色定义
    colorPrimaryBg: spacemitDarkTokens.brandContainer,
    colorPrimaryBgHover: spacemitDarkTokens.brandContainer,
    colorPrimaryBorder: spacemitDarkTokens.brand,
    colorPrimaryHover: spacemitDarkTokens.brandHover,
    colorPrimaryActive: spacemitDarkTokens.onBrandContainer,
    colorPrimaryText: spacemitDarkTokens.onBrandContainer,
  },
  components: buildDarkComponentTokens(spacemitDarkTokens),
}
