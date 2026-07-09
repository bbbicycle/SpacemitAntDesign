<script setup lang="ts">
import { ref, inject, onMounted, watch } from 'vue'
import { message } from 'ant-design-vue'
import { useSpacemitToken } from '../../theme/spacemitTokens'

const isDark = inject('isDark', ref(false))
const colorTheme = inject('colorTheme', ref('base'))
const currentTokens = useSpacemitToken()
const activeTab = ref('spacemit-tokens')

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

interface CssVarItem {
  name: string
  desc: string
  sourceToken?: string
}

interface CssVarCategory {
  title: string
  desc: string
  vars: CssVarItem[]
}

const cssVarCategories: CssVarCategory[] = [
  {
    title: '品牌主色 (Primary Colors)',
    desc: 'Ant Design 核心品牌色系变量，常用于主要交互按钮、文字链接、焦点边框等。',
    vars: [
      { name: '--ant-color-primary', desc: '品牌主色', sourceToken: 'brand' },
      { name: '--ant-color-primary-hover', desc: '品牌主色悬浮态', sourceToken: 'brandHover' },
      { name: '--ant-color-primary-active', desc: '品牌主色激活态/深色', sourceToken: 'onBrandContainer' },
      { name: '--ant-color-primary-outline', desc: '品牌主色外发光/聚焦圈色', sourceToken: 'transparent' },
      { name: '--ant-color-primary-bg', desc: '品牌主色浅色背景色', sourceToken: 'brandContainer' },
      { name: '--ant-color-primary-bg-hover', desc: '品牌主色浅色背景悬浮态', sourceToken: 'brandContainer' },
      { name: '--ant-color-primary-border', desc: '品牌主色描边色', sourceToken: 'brand' },
      { name: '--ant-color-primary-border-hover', desc: '品牌主色描边悬浮态', sourceToken: 'brandHover' },
      { name: '--ant-color-primary-text', desc: '品牌主色文本色', sourceToken: 'onBrandContainer' },
      { name: '--ant-color-primary-text-hover', desc: '品牌主色文本悬浮态', sourceToken: 'onBrandContainer' },
      { name: '--ant-color-primary-text-active', desc: '品牌主色文本激活态', sourceToken: 'onBrandContainer' }
    ]
  },
  {
    title: '成功状态色 (Success Colors)',
    desc: '用于表单校验成功、操作执行成功、流程顺利完成等正面状态提示。',
    vars: [
      { name: '--ant-color-success', desc: '成功状态主色', sourceToken: 'colorGreen' },
      { name: '--ant-color-success-hover', desc: '成功状态悬浮态', sourceToken: 'colorGreen (派生)' },
      { name: '--ant-color-success-active', desc: '成功状态激活态', sourceToken: 'colorGreen (派生)' },
      { name: '--ant-color-success-bg', desc: '成功状态浅色背景', sourceToken: 'colorGreenBg' },
      { name: '--ant-color-success-bg-hover', desc: '成功状态浅背景悬浮态', sourceToken: 'colorGreenBg (派生)' },
      { name: '--ant-color-success-border', desc: '成功状态边框色', sourceToken: 'colorGreen (派生)' }
    ]
  },
  {
    title: '警告状态色 (Warning Colors)',
    desc: '用于非阻塞的警示通知、危险动作的预警等提示。',
    vars: [
      { name: '--ant-color-warning', desc: '警告状态主色', sourceToken: 'colorOrange' },
      { name: '--ant-color-warning-hover', desc: '警告状态悬浮态', sourceToken: 'colorOrange (派生)' },
      { name: '--ant-color-warning-active', desc: '警告状态激活态', sourceToken: 'colorOrange (派生)' },
      { name: '--ant-color-warning-bg', desc: '警告状态浅色背景', sourceToken: 'colorOrangeBg' },
      { name: '--ant-color-warning-bg-hover', desc: '警告状态浅背景悬浮态', sourceToken: 'colorOrangeBg (派生)' },
      { name: '--ant-color-warning-border', desc: '警告状态边框色', sourceToken: 'colorOrange (派生)' }
    ]
  },
  {
    title: '错误状态色 (Error Colors)',
    desc: '用于表单校验失败、操作出错、系统核心故障及高危破坏性动作警示。',
    vars: [
      { name: '--ant-color-error', desc: '错误状态主色', sourceToken: 'error' },
      { name: '--ant-color-error-hover', desc: '错误状态悬浮态', sourceToken: 'error (派生)' },
      { name: '--ant-color-error-active', desc: '错误状态激活态', sourceToken: 'error (派生)' },
      { name: '--ant-color-error-bg', desc: '错误状态浅色背景', sourceToken: 'errorContainer' },
      { name: '--ant-color-error-bg-hover', desc: '错误状态浅背景悬浮态', sourceToken: 'errorContainer (派生)' },
      { name: '--ant-color-error-border', desc: '错误状态边框色', sourceToken: 'error (派生)' }
    ]
  },
  {
    title: '常规信息色 (Info Colors)',
    desc: '用于常规系统通知、中性的操作指引和提示。',
    vars: [
      { name: '--ant-color-info', desc: '信息状态主色', sourceToken: 'colorBlue' },
      { name: '--ant-color-info-hover', desc: '信息状态悬浮态', sourceToken: 'colorBlue (派生)' },
      { name: '--ant-color-info-active', desc: '信息状态激活态', sourceToken: 'colorBlue (派生)' },
      { name: '--ant-color-info-bg', desc: '信息状态浅色背景', sourceToken: 'colorBlueBg' },
      { name: '--ant-color-info-bg-hover', desc: '信息状态浅背景悬浮态', sourceToken: 'colorBlueBg (派生)' },
      { name: '--ant-color-info-border', desc: '信息状态边框色', sourceToken: 'colorBlue (派生)' }
    ]
  },
  {
    title: '中性背景色 (Neutral Backgrounds)',
    desc: '用于页面底色、侧边栏、卡片和弹出容器层级深度底色。',
    vars: [
      { name: '--ant-color-bg-base', desc: '基础极性背景色', sourceToken: 'surfaceBright' },
      { name: '--ant-color-bg-layout', desc: '页面框架布局背景色', sourceToken: 'surface' },
      { name: '--ant-color-bg-container', desc: '组件/容器底色(如卡片、输入框)', sourceToken: 'surfaceContainerLowest' },
      { name: '--ant-color-bg-elevated', desc: '悬浮容器底色(如弹窗、下拉菜单)', sourceToken: 'surfaceContainerLowest' },
      { name: '--ant-color-bg-spotlight', desc: '气泡提示底色(如 Tooltip 背景)', sourceToken: 'inverseSurface' },
      { name: '--ant-color-bg-mask', desc: '遮罩底色(如 Modal 蒙层)', sourceToken: 'scrim' }
    ]
  },
  {
    title: '中性文本色 (Neutral Typography)',
    desc: '文字排版色值，按照主次、失效等不同状态分为多个灰度等级。',
    vars: [
      { name: '--ant-color-text', desc: '一级文本/主要文字色', sourceToken: 'onSurface' },
      { name: '--ant-color-text-secondary', desc: '二级文本/次要辅助色', sourceToken: 'onSurfaceVariant' },
      { name: '--ant-color-text-tertiary', desc: '三级文本/弱文字/占位符', sourceToken: 'onSurfaceVariant' },
      { name: '--ant-color-text-quaternary', desc: '四级文本/失效禁用文字色', sourceToken: 'stateDisabled' },
      { name: '--ant-color-text-light-solid', desc: '亮色背景之上的实色文字', sourceToken: 'onBrand' }
    ]
  },
  {
    title: '中性描边与线 (Neutral Border & Line)',
    desc: '用于表格网格、卡片分割线及表单项边缘轮廓。',
    vars: [
      { name: '--ant-color-border', desc: '一级常用描边/边框色', sourceToken: 'outline' },
      { name: '--ant-color-border-secondary', desc: '二级描边/细弱分割线色', sourceToken: 'outlineVariant' },
      { name: '--ant-color-split', desc: '通用内容分割线色', sourceToken: 'outlineVariant' }
    ]
  },
  {
    title: '中性填充色 (Neutral Fills)',
    desc: '用于输入框处于 Hover/Active、表格交替行或交互滑块底色填充。',
    vars: [
      { name: '--ant-color-fill', desc: '一级填充色', sourceToken: 'surfaceContainerHighest' },
      { name: '--ant-color-fill-secondary', desc: '二级填充色', sourceToken: 'surfaceContainer' },
      { name: '--ant-color-fill-tertiary', desc: '三级填充色', sourceToken: 'surfaceContainerLow' },
      { name: '--ant-color-fill-quaternary', desc: '四级填充色', sourceToken: 'surfaceContainerLowest' }
    ]
  },
  {
    title: '交互与链接 (Links)',
    desc: '专门针对 `<a>` 标签或交互式超链接的色彩定义。',
    vars: [
      { name: '--ant-color-link', desc: '超链接文字色', sourceToken: 'colorBlue' },
      { name: '--ant-color-link-hover', desc: '超链接悬浮态文字色', sourceToken: 'colorBlue (派生)' },
      { name: '--ant-color-link-active', desc: '超链接激活态文字色', sourceToken: 'colorBlue (派生)' }
    ]
  }
]

const cssVarValues = ref<Record<string, string>>({})

const getStaticCssVarValue = (name: string): string => {
  const t = currentTokens.value as any
  if (!t) return ''

  switch (name) {
    // 品牌主色
    case '--ant-color-primary':
      return t.brand
    case '--ant-color-primary-hover':
      return t.brandHover || t.brand
    case '--ant-color-primary-active':
      return t.onBrandContainer || t.brand
    case '--ant-color-primary-outline':
      return 'transparent'
    case '--ant-color-primary-bg':
      return t.brandContainer
    case '--ant-color-primary-bg-hover':
      return t.brandContainer
    case '--ant-color-primary-border':
      return t.brand
    case '--ant-color-primary-border-hover':
      return t.brandHover || t.brand
    case '--ant-color-primary-text':
      return t.onBrandContainer
    case '--ant-color-primary-text-hover':
      return t.onBrandContainer
    case '--ant-color-primary-text-active':
      return t.onBrandContainer

    // 成功色 (Green)
    case '--ant-color-success':
      return t.colorGreen
    case '--ant-color-success-hover':
      return t.colorGreen
    case '--ant-color-success-active':
      return t.colorGreen
    case '--ant-color-success-bg':
      return t.colorGreenBg
    case '--ant-color-success-bg-hover':
      return t.colorGreenBg
    case '--ant-color-success-border':
      return t.colorGreen

    // 警告色 (Orange)
    case '--ant-color-warning':
      return t.colorOrange
    case '--ant-color-warning-hover':
      return t.colorOrange
    case '--ant-color-warning-active':
      return t.colorOrange
    case '--ant-color-warning-bg':
      return t.colorOrangeBg
    case '--ant-color-warning-bg-hover':
      return t.colorOrangeBg
    case '--ant-color-warning-border':
      return t.colorOrange

    // 错误色 (Error)
    case '--ant-color-error':
      return t.error
    case '--ant-color-error-hover':
      return t.error
    case '--ant-color-error-active':
      return t.error
    case '--ant-color-error-bg':
      return t.errorContainer
    case '--ant-color-error-bg-hover':
      return t.errorContainer
    case '--ant-color-error-border':
      return t.error

    // 信息色 (Blue)
    case '--ant-color-info':
      return t.colorBlue
    case '--ant-color-info-hover':
      return t.colorBlue
    case '--ant-color-info-active':
      return t.colorBlue
    case '--ant-color-info-bg':
      return t.colorBlueBg
    case '--ant-color-info-bg-hover':
      return t.colorBlueBg
    case '--ant-color-info-border':
      return t.colorBlue

    // 中性背景
    case '--ant-color-bg-base':
      return t.surfaceBright
    case '--ant-color-bg-layout':
      return t.surface
    case '--ant-color-bg-container':
      return t.surfaceContainerLowest
    case '--ant-color-bg-elevated':
      return t.surfaceContainerLowest
    case '--ant-color-bg-spotlight':
      return t.inverseSurface
    case '--ant-color-bg-mask':
      return t.scrim

    // 中性文本
    case '--ant-color-text':
      return t.onSurface
    case '--ant-color-text-secondary':
      return t.onSurfaceVariant
    case '--ant-color-text-tertiary':
      return t.onSurfaceVariant
    case '--ant-color-text-quaternary':
      return t.stateDisabled
    case '--ant-color-text-light-solid':
      return t.onBrand

    // 中性描边
    case '--ant-color-border':
      return t.outline
    case '--ant-color-border-secondary':
      return t.outlineVariant
    case '--ant-color-split':
      return t.outlineVariant

    // 中性填充
    case '--ant-color-fill':
      return t.surfaceContainerHighest
    case '--ant-color-fill-secondary':
      return t.surfaceContainer
    case '--ant-color-fill-tertiary':
      return t.surfaceContainerLow
    case '--ant-color-fill-quaternary':
      return t.surfaceContainerLowest

    // 链接
    case '--ant-color-link':
      return t.colorBlue
    case '--ant-color-link-hover':
      return t.colorBlue
    case '--ant-color-link-active':
      return t.colorBlue

    default:
      return ''
  }
}

const updateCssVarValues = () => {
  const el = document.querySelector('.showcase-theme-container') || document.documentElement
  const styles = window.getComputedStyle(el)
  const newValues: Record<string, string> = {}
  
  cssVarCategories.forEach(category => {
    category.vars.forEach(v => {
      let val = styles.getPropertyValue(v.name).trim()
      if (!val) {
        val = getStaticCssVarValue(v.name)
      }
      newValues[v.name] = val
    })
  })
  cssVarValues.value = newValues
}

watch([isDark, colorTheme, currentTokens], () => {
  requestAnimationFrame(() => {
    updateCssVarValues()
  })
}, { deep: true })

onMounted(() => {
  updateCssVarValues()
  setTimeout(updateCssVarValues, 100)
  setTimeout(updateCssVarValues, 500)
})

const copyToken = (name: string, value: string) => {
  navigator.clipboard.writeText(value).then(() => {
    message.success(`已复制设计令牌 ${name}: ${value}`)
  }).catch(() => {
    message.error('复制失败，请手动选择复制')
  })
}

const copyCssVarName = (name: string) => {
  const syntax = `var(${name})`
  navigator.clipboard.writeText(syntax).then(() => {
    message.success(`已复制 CSS 变量: ${syntax}`)
  }).catch(() => {
    message.error('复制失败，请手动选择复制')
  })
}

const copyCssVarValue = (name: string, value: string) => {
  if (!value) {
    message.warning('色值为空，无法复制')
    return
  }
  navigator.clipboard.writeText(value).then(() => {
    message.success(`已复制 ${name} 的色值: ${value}`)
  }).catch(() => {
    message.error('复制失败，请手动选择复制')
  })
}
</script>

<template>
  <div class="category-page">
    <div class="page-header-desc">
      <h2>设计令牌 & CSS 变量 (Theme Tokens & CSS Variables)</h2>
      <p>
        以下展示 Spacemit 设计令牌与 Ant Design 派生的 CSS 变量映射。您可以在其他项目中直接通过 CSS 变量来调用这些品牌色值。
      </p>
    </div>

    <a-tabs v-model:activeKey="activeTab" class="theme-tokens-tabs">
      <a-tab-pane key="spacemit-tokens" tab="Spacemit 设计令牌 (spacemitTokens)">
        <div class="tab-desc-info">
          以下展示从 <code>color.{{ isDark ? 'dark' : 'light' }}.json</code> 映射来的 Spacemit 核心品牌原始变量。点击卡片可复制其在 JS 主题配置中的实际色值。
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
      </a-tab-pane>

      <a-tab-pane key="css-variables" tab="CSS 变量库 (--ant-color-*)">
        <div class="tab-desc-info">
          以下展示由 Ant Design Vue 主题转换出的核心 CSS 变量。您可以在其他项目中使用 <code>var(--ant-color-*)</code> 引用这些经过品牌适配后的色值。点击色卡可复制其 <code>var()</code> 语法。
        </div>
        <div class="categories-container">
          <div 
            v-for="category in cssVarCategories" 
            :key="category.title"
            class="token-category-group"
          >
            <div class="category-group-header">
              <h3>{{ category.title }}</h3>
              <p>{{ category.desc }}</p>
            </div>

            <div class="token-grid">
              <a-card 
                v-for="token in category.vars" 
                :key="token.name"
                size="small"
                hoverable
                class="token-card-native css-var-card"
                @click="copyCssVarName(token.name)"
              >
                <template #cover>
                  <div 
                    class="token-color-preview" 
                    :style="{ backgroundColor: cssVarValues[token.name] || 'transparent' }"
                  ></div>
                </template>
                <div class="token-info-inner">
                  <span class="token-name css-var-name">{{ token.name }}</span>
                  <span class="token-value">{{ cssVarValues[token.name] || '获取中...' }}</span>
                  <span class="token-desc">{{ token.desc }}</span>
                  
                  <!-- 关联的 Spacemit Token 映射信息 -->
                  <div v-if="token.sourceToken" class="token-mapping-info">
                    <span class="mapping-label">映射自:</span>
                    <code class="mapping-code">{{ token.sourceToken }}</code>
                  </div>

                  <div class="token-card-actions" @click.stop>
                    <a-button type="link" size="small" style="padding: 0; font-size: 11px;" @click="copyCssVarName(token.name)">
                      复制变量名
                    </a-button>
                    <a-button type="link" size="small" style="padding: 0; font-size: 11px; margin-left: auto;" @click="copyCssVarValue(token.name, cssVarValues[token.name])">
                      复制色值
                    </a-button>
                  </div>
                </div>
              </a-card>
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
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
.tab-desc-info {
  margin-bottom: 24px;
  font-size: 13px;
  color: var(--color-text);
  opacity: 0.85;
  padding: 12px 16px;
  background: var(--bg-token-card, #f0f2f5);
  border-left: 4px solid var(--color-primary, #4ea100);
  border-radius: 4px;
  line-height: 1.5;
}
.theme-tokens-tabs :deep(.ant-tabs-nav) {
  margin-bottom: 20px;
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
.css-var-name {
  color: var(--color-primary-text, #4ea100);
  font-size: 12.5px;
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
.token-mapping-info {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  margin-top: 6px;
  background: var(--bg-token-card, #f5f5f7);
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid var(--border-color, #e8e8e8);
}
.mapping-label {
  opacity: 0.55;
  font-weight: 500;
}
.mapping-code {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  color: var(--color-primary, #4ea100);
  font-weight: 600;
}
.token-card-actions {
  display: flex;
  align-items: center;
  margin-top: 10px;
  border-top: 1px dashed var(--border-color, #e8e8e8);
  padding-top: 8px;
}
</style>
