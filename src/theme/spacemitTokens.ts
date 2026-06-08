/**
 * spacemitTokens.ts
 *
 * 将 Spacemit 原始颜色 token（来自 color.light.json / color.dark.json）
 * 转换为更易被主题使用的基础 token 对象。
 *
 * 职责：
 * - 读取 JSON 颜色 token
 * - 提取关键颜色并整理为扁平化结构
 * - 预留少量基础样式值（圆角、字号）
 * - 导出 spacemitLightTokens 和 spacemitDarkTokens
 */

import lightColorData from './color.light.json'
import darkColorData from './color.dark.json'

/**
 * 从 Spacemit 颜色 JSON 中安全读取指定 token 的值
 */
function getTokenValue(
  tokens: Record<string, { value: string; description: string }>,
  key: string,
  fallback: string = '#000000'
): string {
  return tokens[key]?.value ?? fallback
}

/**
 * Spacemit 基础 token 类型定义
 */
export interface SpacemitBaseTokens {
  // ---- 品牌色 ----
  brand: string
  brandContainer: string
  onBrand: string
  onBrandContainer: string

  // ---- 表面/背景色 ----
  surface: string
  surfaceBright: string
  surfaceDim: string

  // ---- 容器色 ----
  surfaceContainer: string
  surfaceContainerLow: string
  surfaceContainerHigh: string
  surfaceContainerHighest: string
  surfaceContainerLowest: string

  // ---- 文字/内容色 ----
  onSurface: string
  onSurfaceVariant: string

  // ---- 描边色 ----
  outline: string
  outlineVariant: string

  // ---- 反馈色 ----
  error: string
  errorContainer: string
  onError: string
  onErrorContainer: string

  // ---- 状态色 ----
  stateDisabled: string
  stateDisabledVariant: string
  statePressed: string
  stateHovered: string

  // ---- 遮罩 ----
  scrim: string

  // ---- 反色 ----
  inverseSurface: string
  inverseOnSurface: string

  // ---- 语义色（来自 Color 系列）----
  colorBlue: string
  colorBlueBg: string
  colorRed: string
  colorRedBg: string
  colorGreen: string
  colorGreenBg: string
  colorOrange: string
  colorOrangeBg: string
  colorYellow: string
  colorYellowBg: string
  colorCyan: string
  colorCyanBg: string
  colorPurple: string
  colorPurpleBg: string

  // ---- 基础样式 ----
  radiusBase: number
  radiusSmall: number
  radiusLarge: number
  radiusXSmall: number
  fontSizeBase: number
}

/**
 * 从 Spacemit 颜色数据构建基础 token
 */
function buildTokens(
  tokens: Record<string, { value: string; description: string }>
): SpacemitBaseTokens {
  return {
    // 品牌色
    brand: getTokenValue(tokens, 'Brand/Brand'),
    brandContainer: getTokenValue(tokens, 'Brand/BrandContainer'),
    onBrand: getTokenValue(tokens, 'Brand/OnBrand'),
    onBrandContainer: getTokenValue(tokens, 'Brand/OnBrandContainer'),

    // 表面/背景色
    surface: getTokenValue(tokens, 'Surface/Surface'),
    surfaceBright: getTokenValue(tokens, 'Surface/SurfaceBright'),
    surfaceDim: getTokenValue(tokens, 'Surface/SurfaceDim'),

    // 容器色
    surfaceContainer: getTokenValue(tokens, 'Container/SurfaceContainer'),
    surfaceContainerLow: getTokenValue(tokens, 'Container/SurfaceContainerLow'),
    surfaceContainerHigh: getTokenValue(tokens, 'Container/SurfaceContainerHigh'),
    surfaceContainerHighest: getTokenValue(tokens, 'Container/SurfaceContainerHighest'),
    surfaceContainerLowest: getTokenValue(tokens, 'Container/SurfaceContainerLowest'),

    // 文字/内容色
    onSurface: getTokenValue(tokens, 'Context/OnSurface'),
    onSurfaceVariant: getTokenValue(tokens, 'Context/OnSurfaceVariant'),

    // 描边色
    outline: getTokenValue(tokens, 'Line/Outline'),
    outlineVariant: getTokenValue(tokens, 'Line/OutlineVariant'),

    // 反馈色
    error: getTokenValue(tokens, 'Feedback/Error'),
    errorContainer: getTokenValue(tokens, 'Feedback/ErrorContainer'),
    onError: getTokenValue(tokens, 'Feedback/OnError'),
    onErrorContainer: getTokenValue(tokens, 'Feedback/OnErrorContainer'),

    // 状态色
    stateDisabled: getTokenValue(tokens, 'State/StateDisabled'),
    stateDisabledVariant: getTokenValue(tokens, 'State/StateDisabledVariant'),
    statePressed: getTokenValue(tokens, 'State/StatePressed'),
    stateHovered: getTokenValue(tokens, 'State/StateHovered'),

    // 遮罩
    scrim: getTokenValue(tokens, 'Scrim'),

    // 反色
    inverseSurface: getTokenValue(tokens, 'Inverse/InverseSurface'),
    inverseOnSurface: getTokenValue(tokens, 'Inverse/InverseOnSurface'),

    // 语义色
    colorBlue: getTokenValue(tokens, 'Color/Blue/Primary'),
    colorBlueBg: getTokenValue(tokens, 'Color/Blue/PrimaryContainer'),
    colorRed: getTokenValue(tokens, 'Color/Red/Primary'),
    colorRedBg: getTokenValue(tokens, 'Color/Red/PrimaryContainer'),
    colorGreen: getTokenValue(tokens, 'Color/Green/Primary'),
    colorGreenBg: getTokenValue(tokens, 'Color/Green/PrimaryContainer'),
    colorOrange: getTokenValue(tokens, 'Color/Orange/Primary'),
    colorOrangeBg: getTokenValue(tokens, 'Color/Orange/PrimaryContainer'),
    colorYellow: getTokenValue(tokens, 'Color/Yellow/Primary'),
    colorYellowBg: getTokenValue(tokens, 'Color/Yellow/PrimaryContainer'),
    colorCyan: getTokenValue(tokens, 'Color/Cyan/Primary'),
    colorCyanBg: getTokenValue(tokens, 'Color/Cyan/PrimaryContainer'),
    colorPurple: getTokenValue(tokens, 'Color/Purple/Primary'),
    colorPurpleBg: getTokenValue(tokens, 'Color/Purple/PrimaryContainer'),

    // 基础样式值（第一版仅预留少量）
    radiusBase: 12,
    radiusSmall: 8,
    radiusLarge: 16,
    radiusXSmall: 4,
    fontSizeBase: 14,
  }
}

/**
 * Spacemit 浅色基础 token
 */
export const spacemitLightTokens = buildTokens(
  lightColorData.tokens as Record<string, { value: string; description: string }>
)

/**
 * Spacemit 深色基础 token
 */
export const spacemitDarkTokens = buildTokens(
  darkColorData.tokens as Record<string, { value: string; description: string }>
)
