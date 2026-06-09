<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { SearchOutlined, ApiOutlined } from '@ant-design/icons-vue'

const router = useRouter()
const searchQuery = ref('')

const componentCategories = [
  {
    title: '系统变量 (Theme System)',
    key: 'theme-system',
    desc: 'Spacemit 品牌颜色与设计令牌大盘。',
    components: [
      { name: 'ThemeTokens', title: '主题变量', desc: '全局浅色与深色设计令牌，支持一键拷贝色值。', path: '/components/theme-tokens' }
    ]
  },
  {
    title: '通用组件 (General)',
    key: 'general',
    desc: '最基础的原子级交互构件。',
    components: [
      { name: 'Button', title: '按钮', desc: '用于开始一个即时操作。', path: '/components/general#buttons' },
      { name: 'Typography', title: '排版', desc: '标准的文字排版、修饰段落与文本格式。', path: '/components/general#typography' },
      { name: 'Icon', title: '图标', desc: '语义化向量图标，支持主题状态颜色响应。', path: '/components/general#icons' }
    ]
  },
  {
    title: '布局组件 (Layout)',
    key: 'layout',
    desc: '控制界面元素的组织框架与排版间距。',
    components: [
      { name: 'Divider', title: '分割线', desc: '区隔不同段落与板块内容的连线。', path: '/components/layout#divider' },
      { name: 'Grid', title: '栅格', desc: '经典的 24 栅格网格系统。', path: '/components/layout#grid' },
      { name: 'Layout', title: '布局框架', desc: '搭建页面主要骨架（顶栏、侧边栏、正文）。', path: '/components/layout#layout-demo' },
      { name: 'Space', title: '间距', desc: '灵活设置并调整组件之间的距离。', path: '/components/layout#space' }
    ]
  },
  {
    title: '导航组件 (Navigation)',
    key: 'navigation',
    desc: '指示层级、提供路径切换与引导工作流。',
    components: [
      { name: 'Breadcrumb', title: '面包屑', desc: '显示当前页面的层级路径。', path: '/components/navigation#breadcrumb' },
      { name: 'Dropdown', title: '下拉菜单', desc: '点击或悬浮折叠的聚合操作。', path: '/components/navigation#breadcrumb' },
      { name: 'Menu', title: '导航菜单', desc: '层级清晰的横向顶栏或纵向侧栏菜单。', path: '/components/navigation#menu-nav' },
      { name: 'Pagination', title: '分页', desc: '对长列表数据进行分页切片处理。', path: '/components/navigation#pagination' },
      { name: 'Steps', title: '步骤条', desc: '拆分复杂流程，一步步引导用户进行。', path: '/components/navigation#steps' }
    ]
  },
  {
    title: '数据录入组件 (Data Entry)',
    key: 'data-entry',
    desc: '提供与用户输入、选择、文件交互的入口。',
    components: [
      { name: 'Form', title: '表单', desc: '具备格式校验与验证反馈的复杂配置表单。', path: '/components/data-entry#form' },
      { name: 'Input', title: '输入框', desc: '支持文本、密码、前缀与清除的单行/多行输入。', path: '/components/data-entry#form' },
      { name: 'Select', title: '选择器', desc: '下拉列表单选或多选、标签功能。', path: '/components/data-entry#form' },
      { name: 'DatePicker', title: '日期选择', desc: '选择单个日期或周期时间范围。', path: '/components/data-entry#form' },
      { name: 'Slider', title: '滑块', desc: '滑动刻度调节，适配 Spacemit 绿色。', path: '/components/data-entry#form' },
      { name: 'Rate', title: '评分', desc: '用于评价并进行星级打分。', path: '/components/data-entry#form' },
      { name: 'Switch', title: '开关', desc: '两种对立状态的极速切换。', path: '/components/data-entry#form' },
      { name: 'Checkbox', title: '复选框', desc: '多项选择、全选/半选状态支持。', path: '/components/data-entry#form' },
      { name: 'Radio', title: '单选框', desc: '互斥的单项选择及单选按钮组。', path: '/components/data-entry#form' },
      { name: 'AutoComplete', title: '自动完成', desc: '智能输入联想过滤。', path: '/components/data-entry#form' },
      { name: 'Cascader', title: '级联选择', desc: '多级联动的选择器。', path: '/components/data-entry#form' },
      { name: 'TreeSelect', title: '树选择', desc: '树形层级结构的多选或单选。', path: '/components/data-entry#form' },
      { name: 'Mentions', title: '提及', desc: '@ 提及群组或用户的文本区域。', path: '/components/data-entry#form' },
      { name: 'Transfer', title: '穿梭框', desc: '在两个列表中快速转移选择项。', path: '/components/data-entry#transfer' },
      { name: 'Upload', title: '上传', desc: '文件上传，支持照片墙与拖拽。', path: '/components/data-entry#upload' }
    ]
  },
  {
    title: '数据展示组件 (Data Display)',
    key: 'data-display',
    desc: '向用户呈现多维度的结构化数据、状态标记与数值计量。',
    components: [
      { name: 'Card', title: '卡片', desc: '用于将信息整合放置在特定矩形网格中。', path: '/components/data-display#card' },
      { name: 'Table', title: '表格', desc: '以二维网格呈现结构化设备数据的通用表格。', path: '/components/data-display#table' },
      { name: 'Tabs', title: '标签页', desc: '并列切换多个内容板块。', path: '/components/data-display#tabs' },
      { name: 'Tag', title: '标签', desc: '轻量级的文本分类状态标签。', path: '/components/data-display#tag' },
      { name: 'Timeline', title: '时间轴', desc: '按时间节点垂直顺序呈现任务生命周期。', path: '/components/data-display#timeline' },
      { name: 'Tooltip', title: '文字提示', desc: '最轻量级的悬浮提示气泡。', path: '/components/data-display#tooltip' },
      { name: 'Popover', title: '气泡卡片', desc: '悬浮在元素上层，展示更详细的快捷操作。', path: '/components/data-display#popover' },
      { name: 'Avatar', title: '头像', desc: '展示用户或组织标识。', path: '/components/data-display#avatar-badge' },
      { name: 'Badge', title: '徽标数', desc: '在右上角进行数字、红点及状态标注。', path: '/components/data-display#avatar-badge' },
      { name: 'Calendar', title: '日历', desc: '提供日历排盘与展示。', path: '/components/data-display#calendar' },
      { name: 'Carousel', title: '走马灯', desc: '轮播展示多张芯片幻灯片内容。', path: '/components/data-display#carousel' },
      { name: 'Collapse', title: '折叠面板', desc: '可以折叠或展开的垂直面板组。', path: '/components/data-display#collapse' },
      { name: 'Descriptions', title: '描述列表', desc: '呈现设备参数的多列对齐详情表。', path: '/components/data-display#descriptions' },
      { name: 'Empty', title: '空状态', desc: '无可展示内容时的提示信息。', path: '/components/data-display#empty' },
      { name: 'Image', title: '图片', desc: '支持放大、旋转、缩放查看的图片。', path: '/components/data-display#image' },
      { name: 'List', title: '列表', desc: '标准的列表项数据垂直排列。', path: '/components/data-display#list' },
      { name: 'QRCode', title: '二维码', desc: '生成扫描可跳转的二维码。', path: '/components/data-display#qrcode' },
      { name: 'Segmented', title: '分段控制器', desc: '在线性分类之间快速滑动切换。', path: '/components/data-display#segmented' },
      { name: 'Statistic', title: '统计数值', desc: '高光展示数值与计量。', path: '/components/data-display#statistic' },
      { name: 'Tour', title: '漫游式引导', desc: '一键开启的界面引导气泡。', path: '/components/data-display#tour' },
      { name: 'Tree', title: '树形控件', desc: '多层级分支结构树及勾选。', path: '/components/data-display#tree' }
    ]
  },
  {
    title: '反馈组件 (Feedback)',
    key: 'feedback',
    desc: '向用户呈现操作执行结果、系统异常告警及任务运行进度。',
    components: [
      { name: 'Alert', title: '警告提示', desc: '向用户呈现系统级通知或任务状态警告。', path: '/components/feedback#alert' },
      { name: 'Drawer', title: '抽屉', desc: '屏幕边缘滑出的浮动面板，提供元数据配置。', path: '/components/feedback#drawer' },
      { name: 'Message', title: '全局提示', desc: '轻量级的顶部全局操作结果反馈。', path: '/components/feedback#message' },
      { name: 'Modal', title: '对话框', desc: '打开隔离窗口执行重要操作与表单确认。', path: '/components/feedback#modal' },
      { name: 'Notification', title: '通知提醒框', desc: '系统角落弹出通知，多用于后台告警。', path: '/components/feedback#notification' },
      { name: 'Popconfirm', title: '气泡确认框', desc: '轻量级的在元素气泡中弹出的确认操作。', path: '/components/feedback#popconfirm' },
      { name: 'Progress', title: '进度条', desc: '展示当前任务进度，完美适配品牌绿。', path: '/components/feedback#progress' },
      { name: 'Result', title: '结果', desc: '大面积图形化呈现芯片任务运行结果确认。', path: '/components/feedback#result' },
      { name: 'Skeleton', title: '骨架屏', desc: '展示灰度骨架占位以降低等待焦躁感。', path: '/components/feedback#skeleton' },
      { name: 'Spin', title: '加载中', desc: '局部或整页的加载态指示动画。', path: '/components/feedback#spin' }
    ]
  },
  {
    title: '其他组件 (Other)',
    key: 'other',
    desc: '提供固钉、水印、悬浮及全局化高级上下文控制。',
    components: [
      { name: 'Affix', title: '固钉', desc: '固钉可以将页面中的重要卡片固定在可视位置。', path: '/components/other#affix' },
      { name: 'ConfigProvider', title: '全局化配置', desc: '为子组件提供统一的主题色和圆角等规则。', path: '/components/other#configprovider' },
      { name: 'FloatButton', title: '悬浮按钮', desc: '常驻角落的快捷键，支持子按钮组展开。', path: '/components/other#floatbutton' },
      { name: 'Watermark', title: '水印', desc: '添加页面防伪或防泄密水印。', path: '/components/other#watermark' },
      { name: 'App', title: '包裹组件', desc: '提供合并 message 等弹窗上下文的顶层包装。', path: '/components/other#app-wrapper' }
    ]
  }
]

// 搜索过滤逻辑
const filteredCategories = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return componentCategories

  return componentCategories.map(category => {
    const matchedComponents = category.components.filter(
      comp => comp.name.toLowerCase().includes(query) || comp.title.includes(query) || comp.desc.includes(query)
    )
    return {
      ...category,
      components: matchedComponents
    }
  }).filter(category => category.components.length > 0)
})

const navigateToComponent = (path: string) => {
  const [routePath, hash] = path.split('#')
  router.push(routePath).then(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 150)
    }
  })
}
</script>

<template>
  <div class="overview-page">
    <!-- 头部横幅 -->
    <div class="overview-hero">
      <div class="hero-content">
        <h2>Spacemit 主题组件总览</h2>
        <p>参考 Ant Design Vue 官方规范建立的组件资产大盘。这里为您梳理了已经完成 Spacemit 品牌绿色与灰度适配的基础组件。您可以在左侧菜单或以下面板中点击任意组件查看真实状态及进行调试。</p>
        
        <div class="search-box-wrapper">
          <a-input 
            v-model:value="searchQuery" 
            placeholder="搜索组件，例如: Button, Form..." 
            size="large"
            allow-clear
          >
            <template #prefix>
              <search-outlined style="color: rgba(120,120,120,0.6);" />
            </template>
          </a-input>
        </div>
      </div>
    </div>

    <!-- 零结果展示 -->
    <div v-if="filteredCategories.length === 0" class="no-results">
      <api-outlined style="font-size: 48px; opacity: 0.3; margin-bottom: 16px;" />
      <h3>没有找到匹配的组件</h3>
      <p>请尝试搜索其他英文组件名称或中文名称。</p>
    </div>

    <!-- 组件类别卡片群 -->
    <div v-else class="categories-list">
      <div 
        v-for="category in filteredCategories" 
        :key="category.key"
        class="category-group-card"
      >
        <div class="category-group-header">
          <h3>{{ category.title }}</h3>
          <p>{{ category.desc }}</p>
        </div>

        <div class="component-items-grid">
          <div 
            v-for="comp in category.components" 
            :key="comp.name"
            class="component-overview-card"
            @click="navigateToComponent(comp.path)"
          >
            <div class="card-top">
              <span class="comp-name-en">{{ comp.name }}</span>
              <span class="comp-name-zh">{{ comp.title }}</span>
            </div>
            <p class="comp-desc">{{ comp.desc }}</p>
            <div class="card-footer-link">
              <span>查看示例</span>
              <span class="arrow">→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overview-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* 横幅 */
.overview-hero {
  background: var(--bg-token-card, #f9f9fb);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 40px 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
}

.hero-content h2 {
  font-size: 24px;
  font-weight: 800;
  margin: 0 0 10px 0;
  letter-spacing: -0.5px;
}

.hero-content p {
  font-size: 14px;
  opacity: 0.7;
  max-width: 800px;
  line-height: 1.6;
  margin: 0 0 24px 0;
}

.search-box-wrapper {
  max-width: 480px;
}

/* 列表大组 */
.categories-list {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.category-group-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.category-group-header {
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 12px;
}

.category-group-header h3 {
  font-size: 18px;
  font-weight: 800;
  margin: 0 0 4px 0;
}

.category-group-header p {
  font-size: 12px;
  opacity: 0.55;
  margin: 0;
}

/* 组件小卡片网格 */
.component-items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.component-overview-card {
  background: var(--bg-section, #ffffff);
  border: 1px solid var(--border-color, #e8e8e8);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  min-height: 140px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.005);
}

.component-overview-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary, #b2e40d);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.04);
}

.card-top {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 10px;
}

.comp-name-en {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
}

.comp-name-zh {
  font-size: 12px;
  opacity: 0.5;
  font-weight: 500;
}

.comp-desc {
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  margin: 0;
  flex-grow: 1;
}

.card-footer-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-primary-text, #4ea100);
  opacity: 0.85;
  transition: opacity 0.2s;
}

.component-overview-card:hover .card-footer-link {
  opacity: 1;
}

.card-footer-link .arrow {
  transition: transform 0.2s;
}

.component-overview-card:hover .card-footer-link .arrow {
  transform: translateX(4px);
}

/* 没搜到结果 */
.no-results {
  text-align: center;
  padding: 60px 0;
}

.no-results h3 {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 6px 0;
}

.no-results p {
  font-size: 13px;
  opacity: 0.5;
  margin: 0;
}
</style>
