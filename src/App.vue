<script setup lang="ts">
import { ref, computed, provide } from 'vue'
import { 
  getSpacemitLightTheme, 
  getSpacemitDarkTheme, 
  spacemitLightTokens, 
  spacemitDarkTokens, 
  getDynamicTokens 
} from './theme'
import type { ColorThemeName } from './theme'

// 默认使用浅色主题 (Light)
const isDark = ref(false)

// 默认使用默认品牌色系
const colorTheme = ref<ColorThemeName>('base')

// 派生出当前生效的 Ant Design Vue 主题配置
const currentTheme = computed(() => {
  return isDark.value 
    ? getSpacemitDarkTheme(colorTheme.value) 
    : getSpacemitLightTheme(colorTheme.value)
})

// 根据当前被激活的设计令牌，动态生成 CSS 变量以挂载到页面根节点，
// 完美解决预览页面的 CSS 变量同 JS 设计令牌的自动联控与一致性。
const cssVariables = computed(() => {
  const baseTokens = isDark.value ? spacemitDarkTokens : spacemitLightTokens
  const tokens = getDynamicTokens(baseTokens, colorTheme.value)
  const buttonConfig = (currentTheme.value.components?.Button || {}) as any
  return {
    '--border-color': tokens.outlineVariant,
    '--bg-section': tokens.surfaceContainerLowest,
    '--bg-token-card': tokens.surfaceContainerLow,
    '--color-primary': tokens.brand,
    '--color-primary-text': tokens.onBrandContainer,
    '--color-text': tokens.onSurface,
    '--bg-badge': tokens.brandContainer,
    '--bg-preview-layout': tokens.surface,
    '--box-shadow-card-hover': tokens.boxShadowCardHover,
    '--motion-duration-mid': tokens.motionDurationMid,
    '--motion-ease-in-out': tokens.motionEaseInOut,
    '--btn-padding-inline': `${buttonConfig.paddingInline ?? 15}px`,
    '--btn-padding-inline-sm': `${buttonConfig.paddingInlineSM ?? 7}px`,
    '--btn-padding-inline-lg': `${buttonConfig.paddingInlineLG ?? 15}px`,
  }
})

// 将 isDark 和 colorTheme 状态注入下级组件，允许下级页面进行控制与联动
provide('isDark', isDark)
provide('colorTheme', colorTheme)
</script>

<template>
  <a-config-provider :theme="currentTheme">
    <!-- a-app 用于在 4.x 中统一全局上下文（如 message 等弹框样式继承） -->
    <a-app>
      <div 
        class="showcase-theme-container" 
        :class="{ 'dark-mode': isDark }"
        :style="cssVariables"
      >
        <router-view />
      </div>
    </a-app>
  </a-config-provider>
</template>

<style>
/* 全局页面无缝过渡 */
html, body {
  margin: 0;
  padding: 0;
}
</style>
