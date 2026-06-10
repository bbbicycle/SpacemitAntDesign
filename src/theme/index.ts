/**
 * theme/index.ts
 *
 * 统一主题文件入口。
 */

export { 
  spacemitLightTheme, 
  spacemitDarkTheme,
  getSpacemitLightTheme,
  getSpacemitDarkTheme
} from './spacemitAntdTheme'

export { 
  spacemitLightTokens, 
  spacemitDarkTokens, 
  mixWithWhite, 
  useSpacemitToken,
  getDynamicTokens
} from './spacemitTokens'

export type { SpacemitBaseTokens, ColorThemeName } from './spacemitTokens'
export { buildLightComponentTokens, buildDarkComponentTokens } from './componentTokens'
