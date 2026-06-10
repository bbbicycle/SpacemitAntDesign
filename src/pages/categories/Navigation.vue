<script setup lang="ts">
import { ref, inject, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import {
  DashboardOutlined,
  ApiOutlined,
  BuildOutlined,
  DownOutlined,
  CodeOutlined,
  SettingOutlined,
  FileTextOutlined,
  ArrowLeftOutlined,
  PlusOutlined,
  EllipsisOutlined,
  InfoCircleOutlined
} from '@ant-design/icons-vue'

const isDark = inject('isDark', ref(false))

// 侧边 Breadcrumb 下拉菜单数据
const breadcrumbMenu = computed(() => ({
  items: [
    { key: '1', label: 'Spacemit K1 (八核商业版)' },
    { key: '2', label: 'Spacemit K3 (边缘 AI 增强版)' },
    { key: '3', label: 'Spacemit X1 (高性能算力版)' },
  ],
}))

// Menu 状态
const horizontalMenuKey = ref(['dashboard'])
const inlineMenuKey = ref(['rtl-design'])

// Pagination 状态
const currentPage = ref(1)

// Steps 状态
const currentStep = ref(1)
const stepsList = [
  { title: 'RTL 设计', description: '代码架构与核心设计' },
  { title: 'FPGA 验证', description: '硬件逻辑电路模拟' },
  { title: '芯片流片', description: '半导体代工厂加工' },
  { title: '固件适配', description: '操作系统与编译器支持' },
  { title: '量产发布', description: '商业产品大批量发售' },
]

// Dropdown 操作
const handleDropdownClick = (e: any) => {
  message.info(`触发了操作，Key: ${e.key}`)
}

const route = useRoute()

const scrollToHash = (id: string, attempts = 0) => {
  if (!id) return
  if (attempts > 30) return
  const el = document.getElementById(id)
  if (el) {
    setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  } else {
    setTimeout(() => scrollToHash(id, attempts + 1), 50)
  }
}

onMounted(() => {
  if (route.hash) {
    scrollToHash(route.hash.substring(1))
  }
})

watch(() => route.hash, (newHash) => {
  if (newHash) {
    scrollToHash(newHash.substring(1))
  }
})
</script>

<template>
  <div class="category-page">
    <div class="page-header-desc">
      <h2>导航组件 (Navigation)</h2>
      <p>导航组件用于在页面中引导用户路径，管理功能模块之间的层级关系。已对菜单、步骤条、面包屑以及锚点的高亮滑条完成了 Spacemit 品牌色适配。</p>
    </div>

    <!-- 1. Anchor 锚点 -->
    <section id="anchor" class="component-section">
      <div class="section-title">
        <h3>Anchor 锚点</h3>
        <span class="component-badge">Anchor</span>
      </div>
      <p class="section-desc">页面内快速跳转定位锚点。点击以下链接，页面将自动平滑滚动至本页对应的组件位置。</p>
      
      <a-card>
        <a-anchor :affix="false">
          <a-anchor-link href="#anchor" title="1. Anchor 锚点" />
          <a-anchor-link href="#breadcrumb" title="2. Breadcrumb 面包屑" />
          <a-anchor-link href="#dropdown" title="3. Dropdown 下拉菜单" />
          <a-anchor-link href="#menu-nav" title="4. Menu 导航菜单" />
          <a-anchor-link href="#page-header" title="5. PageHeader 页头" />
          <a-anchor-link href="#pagination" title="6. Pagination 分页" />
          <a-anchor-link href="#steps" title="7. Steps 步骤条" />
        </a-anchor>
      </a-card>
    </section>

    <!-- 2. Breadcrumb 面包屑 -->
    <section id="breadcrumb" class="component-section">
      <div class="section-title">
        <h3>Breadcrumb 面包屑</h3>
        <span class="component-badge">Breadcrumb</span>
      </div>
      <p class="section-desc">面包屑用于指示当前页面所在的层级关系，支持自定义下拉菜单操作。</p>
      
      <a-card>
        <a-breadcrumb>
          <a-breadcrumb-item href="#">
            <dashboard-outlined />
            <span>控制台</span>
          </a-breadcrumb-item>
          <a-breadcrumb-item href="#">芯片设计中心</a-breadcrumb-item>
          <a-breadcrumb-item href="#" overlay>
            核心选择
            <template #overlay>
              <a-menu :items="breadcrumbMenu.items" />
            </template>
          </a-breadcrumb-item>
          <a-breadcrumb-item>Spacemit K1</a-breadcrumb-item>
        </a-breadcrumb>
      </a-card>
    </section>

    <!-- 3. Dropdown 下拉菜单 -->
    <section id="dropdown" class="component-section">
      <div class="section-title">
        <h3>Dropdown 下拉菜单</h3>
        <span class="component-badge">Dropdown</span>
      </div>
      <p class="section-desc">当页面空间有限时，折叠聚合一系列动作选项。</p>
      
      <a-card>
        <a-space wrap :size="16">
          <a-dropdown>
            <a-button type="primary">
              编译操作项 <down-outlined />
            </a-button>
            <template #overlay>
              <a-menu @click="handleDropdownClick">
                <a-menu-item key="gcc">使用 GCC 链编译</a-menu-item>
                <a-menu-item key="llvm">使用 LLVM 链编译</a-menu-item>
                <a-menu-divider />
                <a-menu-item key="abort" disabled>强行中止构建 (权限不足)</a-menu-item>
                <a-menu-item key="restart">清空缓存并重启</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          
          <a-dropdown-button @click="message.info('点击了左侧触发')" @mouseenter="() => {}">
            SoC 调试菜单
            <template #overlay>
              <a-menu @click="handleDropdownClick">
                <a-menu-item key="serial">打开物理串口</a-menu-item>
                <a-menu-item key="jtag">初始化 OpenOCD JTAG</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown-button>
        </a-space>
      </a-card>
    </section>

    <!-- 4. Menu 导航菜单 -->
    <section id="menu-nav" class="component-section">
      <div class="section-title">
        <h3>Menu 导航菜单</h3>
        <span class="component-badge">Menu</span>
      </div>
      <p class="section-desc">支持水平 (Horizontal) 菜单和内嵌 (Inline) 菜单形式，选中背景与 Hover 文本色已经过 Spacemit 灰度精修。</p>
      
      <a-card>
        <div>
          <a-typography-title :level="5">水平横向菜单 (Horizontal)</a-typography-title>
          <a-menu v-model:selectedKeys="horizontalMenuKey" mode="horizontal">
            <a-menu-item key="dashboard">
              <template #icon><dashboard-outlined /></template>
              调度控制台
            </a-menu-item>
            <a-menu-item key="chips">
              <template #icon><api-outlined /></template>
              SoC 设计图谱
            </a-menu-item>
            <a-sub-menu key="tools">
              <template #icon><build-outlined /></template>
              <template #title>编译器工具链</template>
              <a-menu-item key="gcc-tool">GCC 工具集</a-menu-item>
              <a-menu-item key="llvm-tool">LLVM/Clang</a-menu-item>
            </a-sub-menu>
            <a-menu-item key="disabled-nav" disabled>高层调试(暂未开放)</a-menu-item>
          </a-menu>
        </div>

        <a-divider dashed />
        <div>
          <a-typography-title :level="5">侧边内嵌菜单 (Inline)</a-typography-title>
          <div style="max-width: 280px; border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; background: var(--bg-token-card);">
            <a-menu
              v-model:selectedKeys="inlineMenuKey"
              mode="inline"
              style="width: 100%"
            >
              <a-sub-menu key="rtl">
                <template #icon><code-outlined /></template>
                <template #title>RTL 物理设计</template>
                <a-menu-item key="rtl-design">流水线微架构</a-menu-item>
                <a-menu-item key="rtl-verification">UVM 仿真用例</a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="firmware">
                <template #icon><setting-outlined /></template>
                <template #title>底座固件开发</template>
                <a-menu-item key="opensbi">OpenSBI 配置</a-menu-item>
                <a-menu-item key="u-boot">U-Boot 移植引导</a-menu-item>
              </a-sub-menu>
              <a-menu-item key="kernel-conf">
                <template #icon><file-textOutlined /></template>
                内核模块配置
              </a-menu-item>
            </a-menu>
          </div>
        </div>
      </a-card>
    </section>

    <!-- 5. PageHeader 页头 -->
    <section id="page-header" class="component-section">
      <div class="section-title">
        <h3>PageHeader 页头</h3>
        <span class="component-badge">PageHeader</span>
      </div>
      <p class="section-desc">页头组件用于声明当前模块的主体属性。在 Antd v4 中我们自主还原了标准的页头外观，包含面包屑、元数据栏和右侧操作区，保证整体质感。</p>
      
      <div class="page-header-demo-box">
        <div class="custom-page-header">
          <!-- 面包屑 -->
          <div class="page-header-breadcrumb">
            <a-breadcrumb>
              <a-breadcrumb-item>芯片仿真</a-breadcrumb-item>
              <a-breadcrumb-item>集群服务器</a-breadcrumb-item>
              <a-breadcrumb-item>上海 CPU 研发中心</a-breadcrumb-item>
            </a-breadcrumb>
          </div>
          <!-- 标题与操作栏 -->
          <div class="page-header-heading">
            <div class="page-header-heading-left">
              <a-button type="text" shape="circle" class="back-btn">
                <template #icon><arrow-left-outlined /></template>
              </a-button>
              <span class="page-header-title">编译节点-A (上海张江)</span>
              <span class="page-header-subtitle">运行中</span>
              <a-tag color="processing">主控节点</a-tag>
            </div>
            <div class="page-header-heading-extra">
              <a-button>节点自检</a-button>
              <a-button type="primary">
                <template #icon><plus-outlined /></template>
                分配新测试机
              </a-button>
              <a-button type="text" shape="circle">
                <template #icon><ellipsis-outlined /></template>
              </a-button>
            </div>
          </div>
          <!-- 详情与元数据 -->
          <div class="page-header-content">
            <div class="main-info">
              <p>进迭时空核心物理服务器，专职负责乱序八核架构的 EDA 逻辑综合与回归测试。该节点当前资源空闲率 42.6%，散热管道状态正常。</p>
            </div>
            <div class="meta-row">
              <div class="meta-item">
                <span class="label">负责人：</span>
                <span class="val">张江编译器团队</span>
              </div>
              <div class="meta-item">
                <span class="label">流片代工线：</span>
                <span class="val">TSMC 12nm</span>
              </div>
              <div class="meta-item">
                <span class="label">更新时间：</span>
                <span class="val">2026-06-09 15:20</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Pagination 分页 -->
    <section id="pagination" class="component-section">
      <div class="section-title">
        <h3>Pagination 分页</h3>
        <span class="component-badge">Pagination</span>
      </div>
      <p class="section-desc">列表数据的切片显示，页码数字的激活态与品牌主色契合。</p>
      
      <a-card>
        <div>
          <a-typography-title :level="5">标准分页</a-typography-title>
          <a-pagination v-model:current="currentPage" :total="100" show-less-items />
        </div>
        <a-divider dashed />
        <div>
          <a-typography-title :level="5">迷你与辅助功能分页 (Mini / Size Changer)</a-typography-title>
          <a-pagination
            v-model:current="currentPage"
            size="small"
            :total="150"
            show-size-changer
            show-quick-jumper
          />
        </div>
      </a-card>
    </section>

    <!-- 7. Steps 步骤条 -->
    <section id="steps" class="component-section">
      <div class="section-title">
        <h3>Steps 步骤条</h3>
        <span class="component-badge">Steps</span>
      </div>
      <p class="section-desc">串联复杂逻辑，一步步引导操作。步骤条序号的高对比配色方案在亮色和暗色模式下拥有极佳的视觉稳定性。</p>
      
      <a-card>
        <!-- 横向标准步骤条 -->
        <div>
          <div style="margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between;">
            <a-typography-title :level="5">编译流程步骤展示 (当前步骤: {{ currentStep + 1 }}/5)</a-typography-title>
            <a-space>
              <a-button size="small" :disabled="currentStep === 0" @click="currentStep--">上一步</a-button>
              <a-button size="small" type="primary" :disabled="currentStep === 4" @click="currentStep++">下一步</a-button>
            </a-space>
          </div>
          <a-steps :current="currentStep">
            <a-step 
              v-for="step in stepsList" 
              :key="step.title" 
              :title="step.title" 
              :description="step.description" 
            />
          </a-steps>
        </div>

        <!-- 迷你与点状步骤条 -->
        <a-divider dashed />
        <div>
          <a-typography-title :level="5">迷你与点状步骤条 (Mini & Dot)</a-typography-title>
          <a-steps :current="currentStep" size="small" style="margin-bottom: 20px;">
            <a-step title="设计" />
            <a-step title="FPGA" />
            <a-step title="流片" />
            <a-step title="适配" />
            <a-step title="发布" />
          </a-steps>
          
          <a-steps :current="currentStep" progress-dot>
            <a-step title="指令集架构设计" description="Spacemit Vector Extension 1.0" />
            <a-step title="EDA 前端设计" description="Verilog / SystemVerilog" />
            <a-step title="物理版流片提交" description="GDSII 数据包封存" />
          </a-steps>
        </div>

        <!-- 错误状态步骤条 -->
        <a-divider dashed />
        <div>
          <a-typography-title :level="5">带状态 (Error / Progress) 步骤条</a-typography-title>
          <a-steps :current="2" status="error">
            <a-step title="RTL 静态检查" description="通过 Synopsys Spyglass" />
            <a-step title="代码逻辑综合" description="成功生成 Netlist 网表" />
            <a-step title="后仿真时序分析" description="时序违规 (Hold Time Slack < 0)" />
            <a-step title="版图设计" description="等待网表时序时区清零" />
          </a-steps>
        </div>
      </a-card>
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
.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
}
.section-title h3 {
  font-size: 16px;
  font-weight: 700;
  margin: 0;
}
.component-badge {
  font-size: 11px;
  background: #7434dc1f;
  color: #7434dc;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 700;
}
.section-desc {
  font-size: 13px;
  opacity: 0.65;
  margin-bottom: 20px;
  line-height: 1.5;
}

/* 自定义 PageHeader 样式 */
.page-header-demo-box {
  background: var(--bg-token-card, #f9f9fb);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1px;
  overflow: hidden;
}
.custom-page-header {
  padding: 16px 24px;
  background: var(--bg-section);
}
.page-header-breadcrumb {
  margin-bottom: 8px;
  font-size: 12px;
}
.page-header-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 12px;
}
.page-header-heading-left {
  display: flex;
  align-items: center;
  gap: 8px;
}
.back-btn {
  margin-right: 4px;
}
.page-header-title {
  font-size: 16px;
  font-weight: 700;
}
.page-header-subtitle {
  font-size: 12px;
  opacity: 0.5;
  font-weight: 500;
}
.page-header-content {
  border-top: 1px solid var(--border-color);
  padding-top: 12px;
}
.page-header-content p {
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.6;
  margin: 0 0 12px 0;
}
.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
.meta-item {
  font-size: 11px;
}
.meta-item .label {
  opacity: 0.5;
}
.meta-item .val {
  opacity: 0.8;
  font-weight: 500;
}
</style>
