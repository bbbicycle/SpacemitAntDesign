<script setup lang="ts">
import { ref, computed, provide } from 'vue'
import { spacemitLightTheme, spacemitDarkTheme } from './theme'

// 默认使用浅色主题 (Light)
const isDark = ref(false)

// 派生出当前生效的 Ant Design Vue 主题配置
const currentTheme = computed(() => {
  return isDark.value ? spacemitDarkTheme : spacemitLightTheme
})

// 将 isDark 状态注入下级组件，允许下级页面通过开关修改
provide('isDark', isDark)
</script>

<template>
  <a-config-provider :theme="currentTheme">
    <!-- a-app 用于在 4.x 中统一全局上下文（如 message 等弹框样式继承） -->
    <a-app>
      <div class="showcase-theme-container" :class="{ 'dark-mode': isDark }">
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
