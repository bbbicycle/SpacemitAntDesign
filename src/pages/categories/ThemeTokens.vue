<script setup lang="ts">
import { ref, inject, computed } from 'vue'
import { message } from 'ant-design-vue'
import { spacemitLightTokens, spacemitDarkTokens } from '../../theme/spacemitTokens'

const isDark = inject('isDark', ref(false))

const currentTokens = computed(() => {
  return isDark.value ? spacemitDarkTokens : spacemitLightTokens
})

const displayedTokens = [
  { name: 'Brand/Brand', key: 'brand', desc: '品牌主色' },
  { name: 'Brand/BrandContainer', key: 'brandContainer', desc: '品牌色容器背景' },
  { name: 'Brand/OnBrand', key: 'onBrand', desc: '品牌色上层内容/文字色' },
  { name: 'Brand/OnBrandContainer', key: 'onBrandContainer', desc: '品牌色容器上层文字色' },
  { name: 'Surface/Surface', key: 'surface', desc: '主要背景色' },
  { name: 'Surface/SurfaceBright', key: 'surfaceBright', desc: '明亮背景色' },
  { name: 'Surface/SurfaceDim', key: 'surfaceDim', desc: '暗沉背景色' },
  { name: 'Container/SurfaceContainerLowest', key: 'surfaceContainerLowest', desc: '容器最低阶背景(卡片/输入框)' },
  { name: 'Container/SurfaceContainerLow', key: 'surfaceContainerLow', desc: '容器低阶背景' },
  { name: 'Container/SurfaceContainer', key: 'surfaceContainer', desc: '容器中阶背景' },
  { name: 'Container/SurfaceContainerHigh', key: 'surfaceContainerHigh', desc: '容器高阶背景' },
  { name: 'Container/SurfaceContainerHighest', key: 'surfaceContainerHighest', desc: '容器最高阶背景' },
  { name: 'Context/OnSurface', key: 'onSurface', desc: '正文文字色' },
  { name: 'Context/OnSurfaceVariant', key: 'onSurfaceVariant', desc: '次级文字色' },
  { name: 'Line/Outline', key: 'outline', desc: '描边/分割线色' },
  { name: 'Line/OutlineVariant', key: 'outlineVariant', desc: '次级描边色' },
  { name: 'Feedback/Error', key: 'error', desc: '错误状态色' },
  { name: 'Feedback/ErrorContainer', key: 'errorContainer', desc: '错误状态背景色' },
  { name: 'State/StateDisabled', key: 'stateDisabled', desc: '禁用状态透明色' },
  { name: 'State/StatePressed', key: 'statePressed', desc: '按下状态透明色' },
]

const copyToken = (name: string, value: string) => {
  navigator.clipboard.writeText(value).then(() => {
    message.success(`已复制 ${name}: ${value}`)
  }).catch(() => {
    message.error('复制失败，请手动选择复制')
  })
}
</script>

<template>
  <div class="category-page">
    <div class="page-header-desc">
      <h2>设计令牌 (Theme Tokens)</h2>
      <p>
        以下展示从 <code>color.{{ isDark ? 'dark' : 'light' }}.json</code> 映射来的 Spacemit 核心颜色与状态变量。
        这些底层 Token 直接映射到 Ant Design Vue 的 Seed Token / Alias Token 以及组件级细节上。点击色块即可复制色值。
      </p>
    </div>

    <section class="component-section">
      <div class="token-grid">
        <a-card 
          v-for="token in displayedTokens" 
          :key="token.key"
          size="small"
          hoverable
          class="token-card-native"
          @click="copyToken(token.name, (currentTokens as any)[token.key])"
        >
          <template #cover>
            <div 
              class="token-color-preview" 
              :style="{ backgroundColor: (currentTokens as any)[token.key] }"
            ></div>
          </template>
          <div class="token-info-inner">
            <span class="token-name">{{ token.name }}</span>
            <span class="token-value">{{ (currentTokens as any)[token.key] }}</span>
            <span class="token-desc">{{ token.desc }}</span>
          </div>
        </a-card>
      </div>
    </section>
  </div>
</template>

<style scoped>
.category-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.page-header-desc {
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 20px;
}
.page-header-desc h2 {
  font-size: 20px;
  font-weight: 800;
  margin: 0 0 8px 0;
}
.page-header-desc p {
  font-size: 14px;
  opacity: 0.7;
  margin: 0;
  line-height: 1.6;
}
.component-section {
  background: var(--bg-section, #ffffff);
  border: 1px solid var(--border-color, #e8e8e8);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
}
.token-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}
.token-card-native {
  cursor: pointer;
}
.token-color-preview {
  height: 64px;
  width: 100%;
}
.token-info-inner {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.token-name {
  font-size: 13px;
  font-weight: 700;
  word-break: break-all;
}
.token-value {
  font-size: 12px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  opacity: 0.8;
}
.token-desc {
  font-size: 11px;
  opacity: 0.55;
  margin-top: 4px;
}
</style>
