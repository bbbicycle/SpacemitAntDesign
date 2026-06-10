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
import { inject, ref, computed, ComputedRef } from 'vue'

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
 * 将十六进制颜色与白色 (#ffffff) 进行混合
 * @param hex 十六进制颜色，如 "#b2e40d"
 * @param percent 白色比例 (0 ~ 1)
 */
export function mixWithWhite(hex: string, percent: number): string {
  let cleanHex = hex.replace('#', '').trim()
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(char => char + char).join('')
  }
  const r = parseInt(cleanHex.substring(0, 2), 16)
  const g = parseInt(cleanHex.substring(2, 4), 16)
  const b = parseInt(cleanHex.substring(4, 6), 16)

  const newR = Math.round(r * (1 - percent) + 255 * percent)
  const newG = Math.round(g * (1 - percent) + 255 * percent)
  const newB = Math.round(b * (1 - percent) + 255 * percent)

  const toHex = (val: number) => {
    const clamped = Math.max(0, Math.min(255, val))
    return clamped.toString(16).padStart(2, '0')
  }
  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`
}

/**
 * Spacemit 基础 token 类型定义
 */
export interface SpacemitBaseTokens {
  // ---- 品牌色 ----
  brand: string
  brandHover: string
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
  colorBasePrimary: string
  colorBasePrimaryContainer: string
  colorBaseOnPrimary: string
  colorBaseOnPrimaryContainer: string
  colorBlue: string
  colorBlueBg: string
  colorBlueOnPrimary: string
  colorBlueOnPrimaryContainer: string
  colorRed: string
  colorRedBg: string
  colorRedOnPrimary: string
  colorRedOnPrimaryContainer: string
  colorGreen: string
  colorGreenBg: string
  colorGreenOnPrimary: string
  colorGreenOnPrimaryContainer: string
  colorOrange: string
  colorOrangeBg: string
  colorOrangeOnPrimary: string
  colorOrangeOnPrimaryContainer: string
  colorYellow: string
  colorYellowBg: string
  colorYellowOnPrimary: string
  colorYellowOnPrimaryContainer: string
  colorCyan: string
  colorCyanBg: string
  colorCyanOnPrimary: string
  colorCyanOnPrimaryContainer: string
  colorPurple: string
  colorPurpleBg: string
  colorPurpleOnPrimary: string
  colorPurpleOnPrimaryContainer: string

  // ---- 基础样式 ----
  radiusBase: number
  radiusSmall: number
  radiusLarge: number
  radiusXSmall: number
  fontSizeBase: number

  // ---- 动效与阴影 ----
  boxShadowCardHover: string
  motionDurationMid: string
  motionEaseInOut: string
}

/**
 * 从 Spacemit 颜色数据构建基础 token
 */
function buildTokens(
  tokens: Record<string, { value: string; description: string }>
): SpacemitBaseTokens {
  const brandVal = getTokenValue(tokens, 'Brand/Brand')
  return {
    // 品牌色
    brand: brandVal,
    brandHover: mixWithWhite(brandVal, 0.12),
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
    colorBasePrimary: getTokenValue(tokens, 'Color/Base/Primary'),
    colorBasePrimaryContainer: getTokenValue(tokens, 'Color/Base/PrimaryContainer'),
    colorBaseOnPrimary: getTokenValue(tokens, 'Color/Base/OnPrimary'),
    colorBaseOnPrimaryContainer: getTokenValue(tokens, 'Color/Base/OnPrimaryContainer'),
    colorBlue: getTokenValue(tokens, 'Color/Blue/Primary'),
    colorBlueBg: getTokenValue(tokens, 'Color/Blue/PrimaryContainer'),
    colorBlueOnPrimary: getTokenValue(tokens, 'Color/Blue/OnPrimary'),
    colorBlueOnPrimaryContainer: getTokenValue(tokens, 'Color/Blue/OnPrimaryContainer'),
    colorRed: getTokenValue(tokens, 'Color/Red/Primary'),
    colorRedBg: getTokenValue(tokens, 'Color/Red/PrimaryContainer'),
    colorRedOnPrimary: getTokenValue(tokens, 'Color/Red/OnPrimary'),
    colorRedOnPrimaryContainer: getTokenValue(tokens, 'Color/Red/OnPrimaryContainer'),
    colorGreen: getTokenValue(tokens, 'Color/Green/Primary'),
    colorGreenBg: getTokenValue(tokens, 'Color/Green/PrimaryContainer'),
    colorGreenOnPrimary: getTokenValue(tokens, 'Color/Green/OnPrimary'),
    colorGreenOnPrimaryContainer: getTokenValue(tokens, 'Color/Green/OnPrimaryContainer'),
    colorOrange: getTokenValue(tokens, 'Color/Orange/Primary'),
    colorOrangeBg: getTokenValue(tokens, 'Color/Orange/PrimaryContainer'),
    colorOrangeOnPrimary: getTokenValue(tokens, 'Color/Orange/OnPrimary'),
    colorOrangeOnPrimaryContainer: getTokenValue(tokens, 'Color/Orange/OnPrimaryContainer'),
    colorYellow: getTokenValue(tokens, 'Color/Yellow/Primary'),
    colorYellowBg: getTokenValue(tokens, 'Color/Yellow/PrimaryContainer'),
    colorYellowOnPrimary: getTokenValue(tokens, 'Color/Yellow/OnPrimary'),
    colorYellowOnPrimaryContainer: getTokenValue(tokens, 'Color/Yellow/OnPrimaryContainer'),
    colorCyan: getTokenValue(tokens, 'Color/Cyan/Primary'),
    colorCyanBg: getTokenValue(tokens, 'Color/Cyan/PrimaryContainer'),
    colorCyanOnPrimary: getTokenValue(tokens, 'Color/Cyan/OnPrimary'),
    colorCyanOnPrimaryContainer: getTokenValue(tokens, 'Color/Cyan/OnPrimaryContainer'),
    colorPurple: getTokenValue(tokens, 'Color/Purple/Primary'),
    colorPurpleBg: getTokenValue(tokens, 'Color/Purple/PrimaryContainer'),
    colorPurpleOnPrimary: getTokenValue(tokens, 'Color/Purple/OnPrimary'),
    colorPurpleOnPrimaryContainer: getTokenValue(tokens, 'Color/Purple/OnPrimaryContainer'),

    // 基础样式值（第一版仅预留少量）
    radiusBase: 8,
    radiusSmall: 6,
    radiusLarge: 12,
    radiusXSmall: 3,
    fontSizeBase: 14,

    // 默认的动效与阴影 Token
    boxShadowCardHover: tokens['Inverse/InverseSurface'] ? '0 8px 16px rgba(0, 0, 0, 0.12)' : '0 8px 16px rgba(0, 0, 0, 0.04)',
    motionDurationMid: '0.15s',
    motionEaseInOut: 'cubic-bezier(0, 0, 0.2, 1)',
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

export type ColorThemeName = 'base' | 'blue' | 'red' | 'green' | 'orange' | 'yellow' | 'cyan' | 'purple'

/**
 * 动态根据主题名称获取映射后的品牌 Token
 */
export function getDynamicTokens(tokens: SpacemitBaseTokens, themeName: ColorThemeName): SpacemitBaseTokens {
  if (themeName === 'base') {
    return tokens
  }

  let primaryVal = tokens.brand
  let containerVal = tokens.brandContainer
  let onPrimaryVal = tokens.onBrand
  let onPrimaryContainerVal = tokens.onBrandContainer

  switch (themeName) {
    case 'blue':
      primaryVal = tokens.colorBlue
      containerVal = tokens.colorBlueBg
      onPrimaryVal = tokens.colorBlueOnPrimary
      onPrimaryContainerVal = tokens.colorBlueOnPrimaryContainer
      break
    case 'red':
      primaryVal = tokens.colorRed
      containerVal = tokens.colorRedBg
      onPrimaryVal = tokens.colorRedOnPrimary
      onPrimaryContainerVal = tokens.colorRedOnPrimaryContainer
      break
    case 'green':
      primaryVal = tokens.colorGreen
      containerVal = tokens.colorGreenBg
      onPrimaryVal = tokens.colorGreenOnPrimary
      onPrimaryContainerVal = tokens.colorGreenOnPrimaryContainer
      break
    case 'orange':
      primaryVal = tokens.colorOrange
      containerVal = tokens.colorOrangeBg
      onPrimaryVal = tokens.colorOrangeOnPrimary
      onPrimaryContainerVal = tokens.colorOrangeOnPrimaryContainer
      break
    case 'yellow':
      primaryVal = tokens.colorYellow
      containerVal = tokens.colorYellowBg
      onPrimaryVal = tokens.colorYellowOnPrimary
      onPrimaryContainerVal = tokens.colorYellowOnPrimaryContainer
      break
    case 'cyan':
      primaryVal = tokens.colorCyan
      containerVal = tokens.colorCyanBg
      onPrimaryVal = tokens.colorCyanOnPrimary
      onPrimaryContainerVal = tokens.colorCyanOnPrimaryContainer
      break
    case 'purple':
      primaryVal = tokens.colorPurple
      containerVal = tokens.colorPurpleBg
      onPrimaryVal = tokens.colorPurpleOnPrimary
      onPrimaryContainerVal = tokens.colorPurpleOnPrimaryContainer
      break
  }

  return {
    ...tokens,
    brand: primaryVal,
    brandHover: mixWithWhite(primaryVal, 0.12),
    brandContainer: containerVal,
    onBrand: onPrimaryVal,
    onBrandContainer: onPrimaryContainerVal
  }
}

/**
 * 业务组件中用于便捷获取当前生效的 Spacemit 基础 Token 的 Composition API。
 * 它默认依赖于 provide 提供的 'isDark' 和 'colorTheme' 响应式状态。
 */
export function useSpacemitToken(): ComputedRef<SpacemitBaseTokens> {
  const isDark = inject('isDark', ref(false))
  const colorTheme = inject('colorTheme', ref<ColorThemeName>('base'))
  return computed(() => {
    const base = isDark.value ? spacemitDarkTokens : spacemitLightTokens
    return getDynamicTokens(base, colorTheme.value)
  })
}
