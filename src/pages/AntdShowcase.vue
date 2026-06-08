<script setup lang="ts">
import { ref, inject, computed } from 'vue'
import { message } from 'ant-design-vue'
import { spacemitLightTokens, spacemitDarkTokens } from '../theme/spacemitTokens'

// 注入全局 dark 状态
const isDark = inject('isDark', ref(false))

// 颜色 Token 列表用于在页面上展示
const currentTokens = computed(() => {
  return isDark.value ? spacemitDarkTokens : spacemitLightTokens
})

// 展示的核心 token 列表
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

// 表单值定义
const inputValue = ref('')
const textareaValue = ref('')
const selectValue = ref('option1')
const checkboxValue = ref(['checked'])
const radioValue = ref('radio1')
const switchValue = ref(true)

// Select 选项
const selectOptions = [
  { value: 'option1', label: 'Spacemit CPU 架构' },
  { value: 'option2', label: 'RISC-V 核心设计' },
  { value: 'option3', label: '开发者平台适配' },
]

// Table 数据源与列定义
const tableColumns = [
  { title: '芯片代号', dataIndex: 'codename', key: 'codename' },
  { title: '架构类型', dataIndex: 'arch', key: 'arch' },
  { title: '主频', dataIndex: 'clock', key: 'clock' },
  { title: '发布状态', dataIndex: 'status', key: 'status' },
  { title: '操作', key: 'action' },
]

const tableData = [
  { key: '1', codename: 'Spacemit K1', arch: 'RISC-V 64-bit Octa-Core', clock: '1.6 GHz', status: '已商用' },
  { key: '2', codename: 'Spacemit K3', arch: 'RISC-V AI CPU', clock: '2.0 GHz', status: '样品验证中' },
  { key: '3', codename: 'Spacemit X1', arch: '高性能边缘芯片', clock: '2.4 GHz', status: '研发中' },
]

// Tab 标签页
const activeTab = ref('tab1')

// Menu 状态
const selectedMenuKeys = ref(['menu1'])

// Modal 弹框状态
const isModalOpen = ref(false)
const showModal = () => {
  isModalOpen.value = true
}
const handleModalOk = () => {
  isModalOpen.value = false
  message.success('已确认操作')
}

// 分页状态
const currentPage = ref(1)

// 拷贝 Token 提示
const copyToken = (name: string, value: string) => {
  navigator.clipboard.writeText(value).then(() => {
    message.success(`已复制 ${name}: ${value}`)
  }).catch(() => {
    message.error('复制失败，请手动选择复制')
  })
}
</script>

<template>
  <div class="showcase-container">
    <!-- 顶部页眉 -->
    <header class="showcase-header">
      <div class="header-left">
        <div class="brand-logo">S</div>
        <div>
          <h1>Spacemit Ant Design Vue Theme</h1>
          <p class="subtitle">第一版主题设计适配与组件效果预览系统</p>
        </div>
      </div>
      <div class="header-actions">
        <span class="theme-label">{{ isDark ? '深色模式 (Dark)' : '浅色模式 (Light)' }}</span>
        <a-switch v-model:checked="isDark" checked-children="Dark" un-checked-children="Light" />
      </div>
    </header>

    <div class="showcase-grid">
      <!-- 侧边导航 / 快速跳转 -->
      <aside class="showcase-sidebar">
        <a-card title="预览导航" :bordered="false" class="nav-card">
          <ul class="nav-list">
            <li><a href="#tokens">Theme Tokens (主题变量)</a></li>
            <li><a href="#buttons">Buttons (按钮)</a></li>
            <li><a href="#form-controls">Form Controls (表单控件)</a></li>
            <li><a href="#data-display">Data Display (数据展示)</a></li>
            <li><a href="#navigation">Navigation (导航与菜单)</a></li>
            <li><a href="#feedback">Feedback (反馈通知)</a></li>
          </ul>
        </a-card>
      </aside>

      <!-- 主要预览内容 -->
      <main class="showcase-content">
        <!-- 1. Theme Tokens -->
        <section id="tokens" class="preview-section">
          <div class="section-title">
            <h2>Theme Tokens</h2>
            <span class="section-badge">Tokens</span>
          </div>
          <p class="section-desc">以下展示从 <code>color.{{ isDark ? 'dark' : 'light' }}.json</code> 映射来的 Spacemit 基础颜色设计令牌，点击色块可复制色值。</p>
          
          <div class="token-grid">
            <div 
              v-for="token in displayedTokens" 
              :key="token.key"
              class="token-card"
              @click="copyToken(token.name, (currentTokens as any)[token.key])"
            >
              <div 
                class="token-color-preview" 
                :style="{ backgroundColor: (currentTokens as any)[token.key] }"
              ></div>
              <div class="token-info">
                <span class="token-name">{{ token.name }}</span>
                <span class="token-value">{{ (currentTokens as any)[token.key] }}</span>
                <span class="token-desc">{{ token.desc }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 2. Buttons -->
        <section id="buttons" class="preview-section">
          <div class="section-title">
            <h2>Buttons</h2>
            <span class="section-badge">Components</span>
          </div>
          
          <a-card title="按钮类型与状态" :bordered="false" class="component-card">
            <div class="preview-group">
              <h4>基础按钮类型 (Primary / Default / Dashed / Link / Text)</h4>
              <div class="component-row">
                <a-button type="primary">Primary Button</a-button>
                <a-button>Default Button</a-button>
                <a-button type="dashed">Dashed Button</a-button>
                <a-button type="link">Link Button</a-button>
                <a-button type="text">Text Button</a-button>
              </div>
            </div>

            <div class="preview-group">
              <h4>危险状态 (Danger)</h4>
              <div class="component-row">
                <a-button type="primary" danger>Primary Danger</a-button>
                <a-button danger>Default Danger</a-button>
                <a-button type="dashed" danger>Dashed Danger</a-button>
                <a-button type="text" danger>Text Danger</a-button>
              </div>
            </div>

            <div class="preview-group">
              <h4>禁用与加载中状态 (Disabled / Loading)</h4>
              <div class="component-row">
                <a-button type="primary" disabled>Disabled Primary</a-button>
                <a-button disabled>Disabled Default</a-button>
                <a-button type="primary" loading>Loading Primary</a-button>
                <a-button loading>Loading Default</a-button>
              </div>
            </div>
          </a-card>
        </section>

        <!-- 3. Form Controls -->
        <section id="form-controls" class="preview-section">
          <div class="section-title">
            <h2>Form Controls</h2>
            <span class="section-badge">Components</span>
          </div>

          <a-card title="表单输入与选择控件" :bordered="false" class="component-card">
            <div class="preview-group">
              <h4>单行与多行输入框 (Input / Textarea)</h4>
              <div class="component-form-row">
                <div class="form-item">
                  <label>基础输入框 (Input)</label>
                  <a-input v-model:value="inputValue" placeholder="请输入内容..." />
                </div>
                <div class="form-item">
                  <label>多行文本域 (Textarea)</label>
                  <a-textarea v-model:value="textareaValue" placeholder="请输入多行描述信息..." :rows="3" />
                </div>
              </div>
            </div>

            <div class="preview-group">
              <h4>下拉选择器 (Select)</h4>
              <div class="component-row" style="max-width: 320px;">
                <a-select v-model:value="selectValue" :options="selectOptions" style="width: 100%" />
              </div>
            </div>

            <div class="preview-group">
              <h4>复选框与单选框 (Checkbox / Radio)</h4>
              <div class="component-row">
                <a-checkbox-group v-model:value="checkboxValue">
                  <a-checkbox value="checked">已选中项目</a-checkbox>
                  <a-checkbox value="unchecked">未选中项目</a-checkbox>
                  <a-checkbox value="disabled" disabled>禁用状态</a-checkbox>
                </a-checkbox-group>
              </div>
              <div class="component-row" style="margin-top: 12px;">
                <a-radio-group v-model:value="radioValue">
                  <a-radio value="radio1">核心配置 A</a-radio>
                  <a-radio value="radio2">核心配置 B</a-radio>
                  <a-radio value="radio3" disabled>配置 C (禁用)</a-radio>
                </a-radio-group>
              </div>
            </div>

            <div class="preview-group">
              <h4>开关控制 (Switch)</h4>
              <div class="component-row">
                <a-switch v-model:checked="switchValue" checked-children="开启" un-checked-children="关闭" />
                <span style="margin-left: 10px; font-size: 13px; opacity: 0.8;">
                  当前状态: {{ switchValue ? '开 (使用品牌色)' : '关' }}
                </span>
              </div>
            </div>
          </a-card>
        </section>

        <!-- 4. Data Display -->
        <section id="data-display" class="preview-section">
          <div class="section-title">
            <h2>Data Display</h2>
            <span class="section-badge">Components</span>
          </div>

          <a-card title="卡片与数据表格" :bordered="false" class="component-card">
            <div class="preview-group">
              <h4>基础卡片 (Card)</h4>
              <div style="background: var(--bg-preview-layout, #f0f2f5); padding: 20px; border-radius: 12px; margin-bottom: 24px;">
                <a-card title="Spacemit K1 SOC 规格" :bordered="false" style="max-width: 480px;">
                  <template #extra><a href="#" class="brand-link">详细规格</a></template>
                  <p>进迭时空首款基于 RISC-V 架构的高能效八核 CPU。具备强劲的单核算力与出色的 AI 协同处理能力，适用于高性能智能终端设备。</p>
                  <div style="margin-top: 16px;">
                    <a-tag color="processing">八核</a-tag>
                    <a-tag color="success">已量产</a-tag>
                    <a-tag color="warning">AI 增强</a-tag>
                  </div>
                </a-card>
              </div>
            </div>

            <div class="preview-group">
              <h4>数据表格 (Table)</h4>
              <a-table :columns="tableColumns" :data-source="tableData" :pagination="false">
                <template #bodyCell="{ column, record }">
                  <template v-if="column.key === 'status'">
                    <a-tag :color="record.status === '已商用' ? 'green' : record.status === '样品验证中' ? 'orange' : 'blue'">
                      {{ record.status }}
                    </a-tag>
                  </template>
                  <template v-else-if="column.key === 'action'">
                    <a href="#" class="brand-link">查看详情</a>
                  </template>
                </template>
              </a-table>
            </div>
          </a-card>
        </section>

        <!-- 5. Navigation -->
        <section id="navigation" class="preview-section">
          <div class="section-title">
            <h2>Navigation</h2>
            <span class="section-badge">Components</span>
          </div>

          <a-card title="导航菜单与标签页" :bordered="false" class="component-card">
            <div class="preview-group">
              <h4>顶部/侧边导航菜单 (Menu)</h4>
              <a-menu v-model:selectedKeys="selectedMenuKeys" mode="horizontal" style="margin-bottom: 24px;">
                <a-menu-item key="menu1">主控面板</a-menu-item>
                <a-menu-item key="menu2">编译服务</a-menu-item>
                <a-menu-item key="menu3" disabled>集群调试(维护中)</a-menu-item>
                <a-menu-item key="menu4">系统设置</a-menu-item>
              </a-menu>
            </div>

            <div class="preview-group">
              <h4>标签页切换 (Tabs)</h4>
              <a-tabs v-model:activeKey="activeTab">
                <a-tab-pane key="tab1" tab="基本参数">
                  <p style="padding: 12px 0;">提供标准的处理器频率、核心数、缓存信息以及工艺规格参数。</p>
                </a-tab-pane>
                <a-tab-pane key="tab2" tab="性能跑分">
                  <p style="padding: 12px 0;">展示在 SPECint、CoreMark、Geekbench 以及主流神经网络模型上的测试数据。</p>
                </a-tab-pane>
                <a-tab-pane key="tab3" tab="操作系统适配">
                  <p style="padding: 12px 0;">展示 Debian、Ubuntu、Fedora、OpenHarmony 以及其他发行版的支持详情。</p>
                </a-tab-pane>
              </a-tabs>
            </div>

            <div class="preview-group">
              <h4>分页器 (Pagination)</h4>
              <div class="component-row">
                <a-pagination v-model:current="currentPage" :total="50" show-less-items />
              </div>
            </div>
          </a-card>
        </section>

        <!-- 6. Feedback -->
        <section id="feedback" class="preview-section">
          <div class="section-title">
            <h2>Feedback</h2>
            <span class="section-badge">Components</span>
          </div>

          <a-card title="警告提示与弹窗" :bordered="false" class="component-card">
            <div class="preview-group">
              <h4>警告提示 (Alert)</h4>
              <div class="alert-column">
                <a-alert message="信息提示: Spacemit IDE 现已支持在线构建与 RISC-V 编译模拟。" type="info" show-icon />
                <a-alert message="成功提示: 固件包镜像签名校验通过，环境就绪。" type="success" show-icon />
                <a-alert message="警告提示: 系统检测到工作负载较高，建议启用散热风扇。" type="warning" show-icon />
                <a-alert message="错误提示: SOC 连接超时，请检查串口调试器接线是否松动。" type="error" show-icon />
              </div>
            </div>

            <div class="preview-group">
              <h4>模态对话框 (Modal)</h4>
              <div class="component-row">
                <a-button type="primary" @click="showModal">打开模态对话框</a-button>
                <a-modal 
                  v-model:open="isModalOpen" 
                  title="Spacemit SoC 调试终端" 
                  @ok="handleModalOk"
                  ok-text="确认重置"
                  cancel-text="取消"
                >
                  <p style="padding: 12px 0; line-height: 1.6;">
                    此操作将重置开发板硬件缓存并触发系统热重启。重置期间所有未保存的串口输出可能会丢失。您确认需要继续执行该操作吗？
                  </p>
                </a-modal>
              </div>
            </div>
          </a-card>
        </section>
      </main>
    </div>

    <!-- 底部版权信息 -->
    <footer class="showcase-footer">
      <p>Spacemit Ant Design Vue Theme适配项目 ©2026. 设计驱动, 技术适配层建立。</p>
    </footer>
  </div>
</template>

<style scoped>
/* 优雅的极客设计美学 */
.showcase-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: var(--color-text, #1f1f1f);
}

/* 顶部 Header */
.showcase-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background: var(--bg-header, #ffffff);
  border: 1px solid var(--border-color, #f0f0f0);
  border-radius: 16px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  backdrop-filter: blur(8px);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.brand-logo {
  width: 48px;
  height: 48px;
  background: var(--color-primary, #b2e40d);
  color: var(--logo-text, #000);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 800;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(178, 228, 13, 0.3);
}

.showcase-header h1 {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 4px 0;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 13px;
  opacity: 0.7;
  margin: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--bg-actions, #f5f5f7);
  padding: 8px 16px;
  border-radius: 30px;
}

.theme-label {
  font-size: 13px;
  font-weight: 500;
}

/* 网格布局 */
.showcase-grid {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 24px;
  align-items: start;
}

/* 侧边导航 */
.showcase-sidebar {
  position: sticky;
  top: 24px;
}

.nav-card {
  border-radius: 16px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.01);
  overflow: hidden;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list li {
  margin-bottom: 12px;
}

.nav-list li:last-child {
  margin-bottom: 0;
}

.nav-list a {
  display: block;
  padding: 8px 12px;
  color: inherit;
  font-size: 13px;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  opacity: 0.8;
}

.nav-list a:hover {
  background: var(--bg-hover, #f0f2f5);
  opacity: 1;
  padding-left: 16px;
  color: var(--color-primary-text, #4ea100);
}

/* 主内容区域 */
.showcase-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* 预览区块 */
.preview-section {
  scroll-margin-top: 24px;
  background: var(--bg-section, #ffffff);
  border: 1px solid var(--border-color, #f0f0f0);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.01);
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--border-color, #f0f0f0);
  padding-bottom: 12px;
}

.section-title h2 {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
}

.section-badge {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: var(--bg-badge, #e8ffb8);
  color: var(--color-primary-text, #4ea100);
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 700;
}

.section-desc {
  font-size: 13px;
  opacity: 0.7;
  margin-bottom: 20px;
}

/* Token 展示网格 */
.token-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.token-card {
  border: 1px solid var(--border-color, #f0f0f0);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--bg-token-card, #fafafa);
}

.token-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
  border-color: var(--color-primary, #b2e40d);
}

.token-color-preview {
  height: 60px;
  width: 100%;
  border-bottom: 1px solid var(--border-color, #f0f0f0);
}

.token-info {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.token-name {
  font-size: 13px;
  font-weight: 600;
  word-break: break-all;
}

.token-value {
  font-size: 12px;
  font-family: monospace;
  opacity: 0.8;
}

.token-desc {
  font-size: 11px;
  opacity: 0.5;
  margin-top: 4px;
}

/* 组件面板样式 */
.component-card {
  border-radius: 12px !important;
  box-shadow: none !important;
}

.preview-group {
  margin-bottom: 24px;
  border-bottom: 1px dashed var(--border-color, #f0f0f0);
  padding-bottom: 20px;
}

.preview-group:last-child {
  margin-bottom: 0;
  border-bottom: none;
  padding-bottom: 0;
}

.preview-group h4 {
  font-size: 13px;
  font-weight: 600;
  margin: 0 0 16px 0;
  opacity: 0.8;
}

.component-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.component-form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-item label {
  font-size: 12px;
  font-weight: 500;
  opacity: 0.7;
}

.alert-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.brand-link {
  color: var(--color-primary-text, #4ea100);
  transition: opacity 0.2s;
  font-weight: 500;
}

.brand-link:hover {
  opacity: 0.8;
  color: var(--color-primary, #b2e40d);
}

/* 底部 */
.showcase-footer {
  text-align: center;
  padding: 40px 0 20px 0;
  font-size: 12px;
  opacity: 0.5;
  border-top: 1px solid var(--border-color, #f0f0f0);
  margin-top: 48px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .showcase-grid {
    grid-template-columns: 1fr;
  }
  .showcase-sidebar {
    display: none;
  }
  .showcase-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .header-actions {
    align-self: stretch;
    justify-content: space-between;
  }
}
</style>
