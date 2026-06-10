<script setup lang="ts">
import { ref, inject } from 'vue'
import { message } from 'ant-design-vue'
import { useSpacemitToken } from '../../theme/spacemitTokens'

const isDark = inject('isDark', ref(false))
const currentTokens = useSpacemitToken()

interface TokenItem {
  name: string
  key: string
  desc: string
}

interface TokenCategory {
  title: string
  desc: string
  tokens: TokenItem[]
}

const tokenCategories: TokenCategory[] = [
  {
    title: '品牌核心色 (Brand Colors)',
    desc: 'Spacemit 的主要视觉特征色（默认主色为 Spacemit 绿），用于表示主交互、状态容器等。',
    tokens: [
      { name: 'Brand/Brand', key: 'brand', desc: '品牌主色' },
      { name: 'brandHover', key: 'brandHover', desc: '品牌主色悬浮态 (混合生成)' },
      { name: 'Brand/BrandContainer', key: 'brandContainer', desc: '品牌色容器背景' },
      { name: 'Brand/OnBrand', key: 'onBrand', desc: '品牌色上层内容/文字色' },
      { name: 'Brand/OnBrandContainer', key: 'onBrandContainer', desc: '品牌色容器上层文字色' },
    ]
  },
  {
    title: '表面与背景色 (Surface & Background)',
    desc: '用于控制页面整体、侧边栏、卡片容器底色等底色层级。',
    tokens: [
      { name: 'Surface/Surface', key: 'surface', desc: '主要背景色' },
      { name: 'Surface/SurfaceBright', key: 'surfaceBright', desc: '明亮背景色' },
      { name: 'Surface/SurfaceDim', key: 'surfaceDim', desc: '暗沉背景色' },
    ]
  },
  {
    title: '容器内部色 (Container Colors)',
    desc: '用于各种状态卡片、搜索框、控制件以及按钮的背景。',
    tokens: [
      { name: 'Container/SurfaceContainerLowest', key: 'surfaceContainerLowest', desc: '容器最低阶背景(如卡片)' },
      { name: 'Container/SurfaceContainerLow', key: 'surfaceContainerLow', desc: '容器低阶背景' },
      { name: 'Container/SurfaceContainer', key: 'surfaceContainer', desc: '容器中阶背景' },
      { name: 'Container/SurfaceContainerHigh', key: 'surfaceContainerHigh', desc: '容器高阶背景' },
      { name: 'Container/SurfaceContainerHighest', key: 'surfaceContainerHighest', desc: '容器最高阶背景' },
    ]
  },
  {
    title: '文字与内容色 (Typography & Context)',
    desc: '用于控制主要的标题、普通文本、辅助提示文字以及图标的颜色。',
    tokens: [
      { name: 'Context/OnSurface', key: 'onSurface', desc: '主要文字/前景色' },
      { name: 'Context/OnSurfaceVariant', key: 'onSurfaceVariant', desc: '次级文字/前景色' },
    ]
  },
  {
    title: '描边与分割线色 (Border & Line)',
    desc: '用于各种表格网格、卡片边框、输入框边框及分割线。',
    tokens: [
      { name: 'Line/Outline', key: 'outline', desc: '常用描边/分割线色' },
      { name: 'Line/OutlineVariant', key: 'outlineVariant', desc: '弱描边/细分割线色' },
    ]
  },
  {
    title: '反馈与提示色 (Feedback)',
    desc: '用于表示错误、警示状态下的相关配色。',
    tokens: [
      { name: 'Feedback/Error', key: 'error', desc: '错误状态色' },
      { name: 'Feedback/ErrorContainer', key: 'errorContainer', desc: '错误提示容器背景色' },
      { name: 'Feedback/OnError', key: 'onError', desc: '错误背景之上的内容/文字色' },
      { name: 'Feedback/OnErrorContainer', key: 'onErrorContainer', desc: '错误提示容器之上的文字色' },
    ]
  },
  {
    title: '交互状态色 (State)',
    desc: '表示元素受到鼠标 Hover、Pressed 等反馈及不可点击的 Disabled 状态。',
    tokens: [
      { name: 'State/StateDisabled', key: 'stateDisabled', desc: '禁用状态透明色' },
      { name: 'State/StateDisabledVariant', key: 'stateDisabledVariant', desc: '次级禁用状态透明色' },
      { name: 'State/StatePressed', key: 'statePressed', desc: '交互按下状态透明色' },
      { name: 'State/StateHovered', key: 'stateHovered', desc: '交互悬浮状态透明色' },
    ]
  },
  {
    title: '遮罩与反色 (Scrim & Inverse)',
    desc: '用于弹窗蒙层和反向向配色场景（如气泡 Tooltip 黑色背景）。',
    tokens: [
      { name: 'Scrim', key: 'scrim', desc: '弹窗遮罩/蒙层色' },
      { name: 'Inverse/InverseSurface', key: 'inverseSurface', desc: '反色容器底色' },
      { name: 'Inverse/InverseOnSurface', key: 'inverseOnSurface', desc: '反色容器之上文字色' },
    ]
  },
  {
    title: '基础色彩 (Base Colors)',
    desc: '系统预置的基础黑白阶与核心基础色映射。',
    tokens: [
      { name: 'Color/Base/Primary', key: 'colorBasePrimary', desc: '基础主色 (黑/白)' },
      { name: 'Color/Base/PrimaryContainer', key: 'colorBasePrimaryContainer', desc: '基础主色容器背景色' },
      { name: 'Color/Base/OnPrimary', key: 'colorBaseOnPrimary', desc: '基础主色上层文字色' },
      { name: 'Color/Base/OnPrimaryContainer', key: 'colorBaseOnPrimaryContainer', desc: '基础容器上层文字色' },
    ]
  },
  {
    title: '语义色彩分类 (Semantic Colors)',
    desc: '系统所需的七种核心语义辅助色，均完整支持 Primary、PrimaryContainer、OnPrimary 及 OnPrimaryContainer 全功能映射。',
    tokens: [
      // 蓝色
      { name: 'Color/Blue/Primary', key: 'colorBlue', desc: '语义蓝色 (链接/信息)' },
      { name: 'Color/Blue/PrimaryContainer', key: 'colorBlueBg', desc: '语义蓝色容器背景色' },
      { name: 'Color/Blue/OnPrimary', key: 'colorBlueOnPrimary', desc: '蓝色之上内容文字色' },
      { name: 'Color/Blue/OnPrimaryContainer', key: 'colorBlueOnPrimaryContainer', desc: '蓝色容器之上文字色' },

      // 红色
      { name: 'Color/Red/Primary', key: 'colorRed', desc: '语义红色 (主要警示)' },
      { name: 'Color/Red/PrimaryContainer', key: 'colorRedBg', desc: '语义红色容器背景色' },
      { name: 'Color/Red/OnPrimary', key: 'colorRedOnPrimary', desc: '红色之上内容文字色' },
      { name: 'Color/Red/OnPrimaryContainer', key: 'colorRedOnPrimaryContainer', desc: '红色容器之上文字色' },

      // 绿色
      { name: 'Color/Green/Primary', key: 'colorGreen', desc: '语义绿色 (成功状态)' },
      { name: 'Color/Green/PrimaryContainer', key: 'colorGreenBg', desc: '语义绿色容器背景色' },
      { name: 'Color/Green/OnPrimary', key: 'colorGreenOnPrimary', desc: '绿色之上内容文字色' },
      { name: 'Color/Green/OnPrimaryContainer', key: 'colorGreenOnPrimaryContainer', desc: '绿色容器之上文字色' },

      // 橙色
      { name: 'Color/Orange/Primary', key: 'colorOrange', desc: '语义橙色 (警告状态)' },
      { name: 'Color/Orange/PrimaryContainer', key: 'colorOrangeBg', desc: '语义橙色容器背景色' },
      { name: 'Color/Orange/OnPrimary', key: 'colorOrangeOnPrimary', desc: '橙色之上内容文字色' },
      { name: 'Color/Orange/OnPrimaryContainer', key: 'colorOrangeOnPrimaryContainer', desc: '橙色容器之上文字色' },

      // 黄色
      { name: 'Color/Yellow/Primary', key: 'colorYellow', desc: '语义黄色 (星级评分/警告)' },
      { name: 'Color/Yellow/PrimaryContainer', key: 'colorYellowBg', desc: '语义黄色容器背景色' },
      { name: 'Color/Yellow/OnPrimary', key: 'colorYellowOnPrimary', desc: '黄色之上内容文字色' },
      { name: 'Color/Yellow/OnPrimaryContainer', key: 'colorYellowOnPrimaryContainer', desc: '黄色容器之上文字色' },

      // 青色
      { name: 'Color/Cyan/Primary', key: 'colorCyan', desc: '语义青色 (标签分类)' },
      { name: 'Color/Cyan/PrimaryContainer', key: 'colorCyanBg', desc: '语义青色容器背景色' },
      { name: 'Color/Cyan/OnPrimary', key: 'colorCyanOnPrimary', desc: '青色之上内容文字色' },
      { name: 'Color/Cyan/OnPrimaryContainer', key: 'colorCyanOnPrimaryContainer', desc: '青色容器之上文字色' },

      // 紫色
      { name: 'Color/Purple/Primary', key: 'colorPurple', desc: '语义紫色 (徽标/流转进程)' },
      { name: 'Color/Purple/PrimaryContainer', key: 'colorPurpleBg', desc: '语义紫色容器背景色' },
      { name: 'Color/Purple/OnPrimary', key: 'colorPurpleOnPrimary', desc: '紫色之上内容文字色' },
      { name: 'Color/Purple/OnPrimaryContainer', key: 'colorPurpleOnPrimaryContainer', desc: '紫色容器之上文字色' },
    ]
  }
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

    <div class="categories-container">
      <div 
        v-for="category in tokenCategories" 
        :key="category.title"
        class="token-category-group"
      >
        <div class="category-group-header">
          <h3>{{ category.title }}</h3>
          <p>{{ category.desc }}</p>
        </div>

        <div class="token-grid">
          <a-card 
            v-for="token in category.tokens" 
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
      </div>
    </div>
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
.categories-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.token-category-group {
  background: var(--bg-section, #ffffff);
  border: 1px solid var(--border-color, #e8e8e8);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.category-group-header {
  border-bottom: 1px solid var(--border-color, #f0f0f0);
  padding-bottom: 10px;
}
.category-group-header h3 {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 4px 0;
  color: var(--color-text, #000000);
}
.category-group-header p {
  font-size: 12px;
  opacity: 0.6;
  margin: 0;
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
