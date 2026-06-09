<script setup lang="ts">
import { ref, inject, h } from 'vue'
import { message } from 'ant-design-vue'
import {
  UserOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  FrownOutlined,
  TagOutlined,
  CalendarOutlined,
  DesktopOutlined,
  NotificationOutlined,
  QrcodeOutlined,
  ClockCircleOutlined,
  SmileOutlined
} from '@ant-design/icons-vue'

const isDark = inject('isDark', ref(false))

// Segmented 状态
const segmentedValue = ref('core-perf')
const segmentedOptions = [
  { value: 'core-perf', label: '单核性能', payload: '1.6GHz' },
  { value: 'multi-perf', label: '多核性能', payload: '12.8GHz' },
  { value: 'ai-flops', label: 'AI 算力', payload: '50TOPS' }
]

// Tab 状态
const activeTabKey = ref('opt1')

// Timeline 状态
const timelinePending = ref(false)

// Tree 状态
const treeSelectedKeys = ref(['gpr'])
const treeCheckedKeys = ref(['gpr'])
const treeData = [
  {
    title: 'RISC-V 乱序核心寄存器树',
    key: 'isa-tree',
    children: [
      {
        title: '通用寄存器 (GPR)',
        key: 'gpr',
        children: [
          { title: 'x0 (zero)', key: 'x0' },
          { title: 'x1 (ra - 返回地址)', key: 'x1' },
          { title: 'x2 (sp - 栈指针)', key: 'x2' }
        ]
      },
      {
        title: '控制与状态寄存器 (CSR)',
        key: 'csr',
        children: [
          { title: 'mstatus', key: 'mstatus' },
          { title: 'mtvec', key: 'mtvec' }
        ]
      }
    ]
  }
]

// Table 数据
const tableColumns = [
  { title: '芯片代号', dataIndex: 'codename', key: 'codename' },
  { title: '架构规格', dataIndex: 'spec', key: 'spec' },
  { title: 'AI 协处理器', dataIndex: 'npu', key: 'npu' },
  { title: '跑分评估', dataIndex: 'score', key: 'score' }
]

const tableData = [
  { key: '1', codename: 'Spacemit K1', spec: 'RISC-V 八核 64-bit', npu: '2.0 TOPS AI', score: 'SPEC 94' },
  { key: '2', codename: 'Spacemit K3', spec: 'AI 增强型智能终端 CPU', npu: '8.0 TOPS AI', score: 'SPEC 128' },
  { key: '3', codename: 'Spacemit X1', spec: '高性能数据中心 CPU', npu: '50.0 TOPS AI', score: 'SPEC 320' }
]

const rowSelection = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(`keys: ${selectedRowKeys}`, 'rows: ', selectedRows)
  }
}

// Tour 漫游引导状态
const tourOpen = ref(false)
const refHeader = ref(null)
const refSider = ref(null)
const refContent = ref(null)

const tourSteps = [
  {
    title: '第一步：主题控制',
    description: '点击顶栏右侧的 Light/Dark 开关，可以对整个 Layout 与组件变量执行平滑的主题切换。',
    target: () => document.querySelector('.header-actions')
  },
  {
    title: '第二步：芯片组件大盘',
    description: '左侧是导航侧边栏，已经采用官方的 Layout.Sider 嵌套实现，您可以通过点击快速跳转对应的多页面模块。',
    target: () => document.querySelector('.showcase-sidebar')
  },
  {
    title: '第三步：查看数据展示',
    description: '这里是刚刚集成的「数据展示」大类，提供了卡片、统计、表格、漫游等丰富组件的全新演示。',
    target: () => document.querySelector('.category-page')
  }
]

// Popover 操作
const popoverVisible = ref(false)
</script>

<template>
  <div class="category-page">
    <div class="page-header-desc">
      <h2>数据展示组件 (Data Display)</h2>
      <p>数据展示组件用于向用户呈现多元化的数据及状态信息。我们对卡片背景、表格头部、标签颜色、日历网格及分段控制器等高频交互项完成了 Spacemit 品牌绿色适配。</p>
    </div>

    <!-- 1. Avatar 头像 & Badge 徽标数 -->
    <section id="avatar-badge" class="component-section">
      <div class="section-title">
        <h3>Avatar 头像 & Badge 徽标数</h3>
        <span class="component-badge">Avatar & Badge</span>
      </div>
      <p class="section-desc">头像用于展示用户或组织标识，徽标数在头像或图标右上角进行数字、红点及状态信息的标注提示。</p>
      
      <a-card :bordered="false" class="component-card">
        <div class="preview-group">
          <h4>头像尺寸与形状 (Avatar)</h4>
          <a-space wrap :size="20">
            <a-avatar size="large"><template #icon><user-outlined /></template></a-avatar>
            <a-avatar :size="48">Spacemit</a-avatar>
            <a-avatar shape="square" size="large" style="background-color: var(--color-primary); color: #000; font-weight: 700;">S</a-avatar>
            <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLFcnbWBgSaJxsHWtC.png" />
          </a-space>
        </div>

        <div class="preview-group" style="margin-top: 20px;">
          <h4>徽标数标记 (Badge)</h4>
          <a-space wrap :size="28">
            <a-badge :count="5">
              <a-avatar shape="square"><template #icon><user-outlined /></template></a-avatar>
            </a-badge>
            <a-badge dot>
              <notification-outlined style="font-size: 20px;" />
            </a-badge>
            <a-badge count="编译中" :number-style="{ backgroundColor: 'var(--color-primary)', color: '#000' }">
              <a-avatar shape="square">SoC</a-avatar>
            </a-badge>
            <a-badge status="success" text="流片成功" />
            <a-badge status="processing" text="EDA 仿真中" />
            <a-badge status="error" text="时序违规" />
          </a-space>
        </div>
      </a-card>
    </section>

    <!-- 2. Calendar 日历 -->
    <section id="calendar" class="component-section">
      <div class="section-title">
        <h3>Calendar 日历</h3>
        <span class="component-badge">Calendar</span>
      </div>
      <p class="section-desc">提供日历排盘，已对当前日期圈及选中网格格进行了嫩绿色主题覆盖。</p>
      <a-card :bordered="false" class="component-card">
        <div style="max-width: 340px; border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; background: var(--bg-section);">
          <a-calendar :fullscreen="false" />
        </div>
      </a-card>
    </section>

    <!-- 3. Card 卡片 -->
    <section id="card" class="component-section">
      <div class="section-title">
        <h3>Card 卡片</h3>
        <span class="component-badge">Card</span>
      </div>
      <p class="section-desc">卡片将信息聚合在特定的矩形容器中。卡片背景采用最亮容器背景色 `surfaceContainerLowest`（亮色下是纯白色），在 Layout 页面上具有醒目的层次关系。</p>
      
      <a-card :bordered="false" class="component-card">
        <a-row :gutter="24">
          <a-col :span="12" :xs="24" :sm="12">
            <a-card title="Spacemit K1 规格说明" size="small" style="background: var(--bg-section);">
              <template #extra><a href="#" style="color: var(--color-primary-text);">更多</a></template>
              <p>采用进迭时空自研 RISC-V 核心架构，搭载 2.0T AI npu 计算能力，已广泛应用于商业边缘盒子中。</p>
            </a-card>
          </a-col>
          <a-col :span="12" :xs="24" :sm="12">
            <a-card hoverable style="background: var(--bg-section);" size="small">
              <template #cover>
                <div style="height: 100px; background: var(--color-primary); display: flex; align-items: center; justify-content: center; color: #000; font-weight: 800;">
                  Spacemit SoC Chipset
                </div>
              </template>
              <a-card-meta title="AI 芯片系列" description="高性能 RISC-V 芯片开发者平台">
                <template #avatar>
                  <a-avatar><template #icon><user-outlined /></template></a-avatar>
                </template>
              </a-card-meta>
            </a-card>
          </a-col>
        </a-row>
      </a-card>
    </section>

    <!-- 4. Carousel 走马灯 -->
    <section id="carousel" class="component-section">
      <div class="section-title">
        <h3>Carousel 走马灯</h3>
        <span class="component-badge">Carousel</span>
      </div>
      <p class="section-desc">走马灯用于轮播展示多张芯片幻灯片内容，支持自动播放与圆点导航指示。</p>
      
      <a-card :bordered="false" class="component-card">
        <a-carousel autoplay style="max-width: 600px; border-radius: 8px; overflow: hidden;">
          <div class="carousel-slide-block slide-1">
            <h4>Spacemit K1 CPU</h4>
            <p>首款基于 RISC-V 八核的高能效算力底座</p>
          </div>
          <div class="carousel-slide-block slide-2">
            <h4>Spacemit K3 AI CPU</h4>
            <p>提供多路边缘高清智能分析与处理</p>
          </div>
          <div class="carousel-slide-block slide-3">
            <h4>Spacemit X1 DataCenter CPU</h4>
            <p>高性能通用服务器级核心设计中</p>
          </div>
        </a-carousel>
      </a-card>
    </section>

    <!-- 5. Collapse 折叠面板 -->
    <section id="collapse" class="component-section">
      <div class="section-title">
        <h3>Collapse 折叠面板</h3>
        <span class="component-badge">Collapse</span>
      </div>
      <p class="section-desc">可以折叠或展开的垂直面板组。</p>
      
      <a-card :bordered="false" class="component-card">
        <a-collapse accordion>
          <a-collapse-panel key="1" header="QEMU 仿真器配置说明">
            <p>QEMU 模拟器支持通过 GDB 对编译出的 ELF 进行单步调试，加载 OpenSBI 引导固件执行系统模拟。</p>
          </a-collapse-panel>
          <a-collapse-panel key="2" header="FPGA 物理测试板网络挂载">
            <p>通过 NFS 挂载主机文件系统，以方便在 FPGA 上进行应用层代码的交叉编译与快速测试。</p>
          </a-collapse-panel>
          <a-collapse-panel key="3" header="UVM 功能覆盖率报告查看" disabled>
            <p>功能覆盖率已达到 98.6%，等待测试用例完全收尾。</p>
          </a-collapse-panel>
        </a-collapse>
      </a-card>
    </section>

    <!-- 6. Descriptions 描述列表 -->
    <section id="descriptions" class="component-section">
      <div class="section-title">
        <h3>Descriptions 描述列表</h3>
        <span class="component-badge">Descriptions</span>
      </div>
      <p class="section-desc">以网格对齐的多列元数据表呈现组件或设备的详细参数配置。</p>
      
      <a-card :bordered="false" class="component-card">
        <a-descriptions title="Spacemit K1 SOC 规格参数详情" bordered size="small">
          <a-descriptions-item label="芯片型号">Spacemit K1-Commercial</a-descriptions-item>
          <a-descriptions-item label="主频规格">1.6 GHz</a-descriptions-item>
          <a-descriptions-item label="发布状态">已量产</a-descriptions-item>
          <a-descriptions-item label="内存扩展">LPDDR4X 8GB</a-descriptions-item>
          <a-descriptions-item label="向量指令集" :span="2">RISC-V Vector Extension v1.0 (256-bit)</a-descriptions-item>
          <a-descriptions-item label="测试集群负责人">张江模拟仿真组</a-descriptions-item>
          <a-descriptions-item label="编译测试结果">
            <a-tag color="success">通过</a-tag>
          </a-descriptions-item>
        </a-descriptions>
      </a-card>
    </section>

    <!-- 7. Empty 空状态 -->
    <section id="empty" class="component-section">
      <div class="section-title">
        <h3>Empty 空状态</h3>
        <span class="component-badge">Empty</span>
      </div>
      <p class="section-desc">空状态用于提示当前列表无可展示内容。</p>
      
      <a-card :bordered="false" class="component-card">
        <a-empty description="暂未分配编译任务" />
      </a-card>
    </section>

    <!-- 8. Image 图片 -->
    <section id="image" class="component-section">
      <div class="section-title">
        <h3>Image 图片</h3>
        <span class="component-badge">Image</span>
      </div>
      <p class="section-desc">支持放大、旋转、缩放查看的图片渲染。</p>
      
      <a-card :bordered="false" class="component-card">
        <a-image
          :width="150"
          fallback="https://zos.alipayobjects.com/rmsportal/ODTLFcnbWBgSaJxsHWtC.png"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </a-card>
    </section>

    <!-- 9. List 列表 -->
    <section id="list" class="component-section">
      <div class="section-title">
        <h3>List 列表</h3>
        <span class="component-badge">List</span>
      </div>
      <p class="section-desc">标准的列表项数据垂直排列。</p>
      
      <a-card :bordered="false" class="component-card" style="max-width: 500px;">
        <a-list size="small" bordered>
          <a-list-item>
            <a-list-item-meta description="主频：1.6 GHz, 流水线：九级双发双译码">
              <template #title><a href="#">Spacemit Core-K100</a></template>
              <template #avatar><a-avatar shape="square">K1</a-avatar></template>
            </a-list-item-meta>
          </a-list-item>
          <a-list-item>
            <a-list-item-meta description="主频：2.0 GHz, 乱序八核 AI 协同">
              <template #title><a href="#">Spacemit Core-K300</a></template>
              <template #avatar><a-avatar shape="square">K3</a-avatar></template>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-card>
    </section>

    <!-- 10. Popover 气泡卡片 -->
    <section id="popover" class="component-section">
      <div class="section-title">
        <h3>Popover 气泡卡片</h3>
        <span class="component-badge">Popover</span>
      </div>
      <p class="section-desc">悬浮在元素上层，展示更详细的快捷操作卡片。</p>
      
      <a-card :bordered="false" class="component-card">
        <a-popover title="SoC JTAG 仿真连接状态">
          <template #content>
            <p>当前连接状态：正常</p>
            <p>测试日志：Hold Time 时序收敛完成。</p>
          </template>
          <a-button type="primary">悬浮查看连接详情</a-button>
        </a-popover>
      </a-card>
    </section>

    <!-- 11. QRCode 二维码 -->
    <section id="qrcode" class="component-section">
      <div class="section-title">
        <h3>QRCode 二维码</h3>
        <span class="component-badge">QRCode</span>
      </div>
      <p class="section-desc">生成用于扫描的二维码。我们对前景色和品牌绿进行了适配。</p>
      
      <a-card :bordered="false" class="component-card">
        <a-space wrap :size="24">
          <a-qrcode value="https://antdv.com" />
          <a-qrcode value="https://antdv.com" color="var(--color-primary-text)" />
        </a-space>
      </a-card>
    </section>

    <!-- 12. Segmented 分段控制器 -->
    <section id="segmented" class="component-section">
      <div class="section-title">
        <h3>Segmented 分段控制器</h3>
        <span class="component-badge">Segmented</span>
      </div>
      <p class="section-desc">用于在线性分类之间快速滑动切换。高亮滑块底色完全采用品牌配色 Token 自适应控制。</p>
      
      <a-card :bordered="false" class="component-card">
        <a-space direction="vertical" :size="16">
          <a-segmented v-model:value="segmentedValue" :options="segmentedOptions" />
          <div style="font-size: 13px; opacity: 0.8;">
            当前选中的性能架构规格：<a-tag color="processing">{{ segmentedValue }}</a-tag>
          </div>
        </a-space>
      </a-card>
    </section>

    <!-- 13. Statistic 统计数值 -->
    <section id="statistic" class="component-section">
      <div class="section-title">
        <h3>Statistic 统计数值</h3>
        <span class="component-badge">Statistic</span>
      </div>
      <p class="section-desc">高光展示数值与计量，支持加减前缀与状态装饰。</p>
      
      <a-card :bordered="false" class="component-card">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-statistic title="物理集群仿真跑分 (SPECint)" :value="98.4" :precision="1" suffix="%" />
          </a-col>
          <a-col :span="12">
            <a-statistic title="累计成功编译芯片内核 (SoC 内核)" :value="1024" prefix="v" />
          </a-col>
        </a-row>
      </a-card>
    </section>

    <!-- 14. Table 表格 -->
    <section id="table" class="component-section">
      <div class="section-title">
        <h3>Table 表格</h3>
        <span class="component-badge">Table</span>
      </div>
      <p class="section-desc">以二维网格呈现海量结构化设备数据，行选择复选框底图已被定制为 Spacemit 主题绿。</p>
      
      <a-card :bordered="false" class="component-card">
        <a-table 
          :columns="tableColumns" 
          :data-source="tableData" 
          :row-selection="rowSelection"
          :pagination="{ pageSize: 5 }" 
        />
      </a-card>
    </section>

    <!-- 15. Tabs 标签页 -->
    <section id="tabs" class="component-section">
      <div class="section-title">
        <h3>Tabs 标签页</h3>
        <span class="component-badge">Tabs</span>
      </div>
      <p class="section-desc">多模块并列切换，滑动高亮指示条的圆角与嫩绿色高度定制。</p>
      
      <a-card :bordered="false" class="component-card">
        <a-tabs v-model:activeKey="activeTabKey">
          <a-tab-pane key="opt1" tab="SoC 核心指标">
            <p style="padding: 12px 0;">展示标准的物理频率、核心配额、二级缓存等参数详情。</p>
          </a-tab-pane>
          <a-tab-pane key="opt2" tab="性能仿真图谱">
            <p style="padding: 12px 0;">展示 SPECint 编译性能、向量运算加速比以及 NPU 算力走势。</p>
          </a-tab-pane>
          <a-tab-pane key="opt3" tab="开发板接口适配" disabled>
            <p style="padding: 12px 0;">物理开发板接口适配信息维护中。</p>
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </section>

    <!-- 16. Tag 标签 -->
    <section id="tag" class="component-section">
      <div class="section-title">
        <h3>Tag 标签</h3>
        <span class="component-badge">Tag</span>
      </div>
      <p class="section-desc">轻量级的文本分类标签。</p>
      
      <a-card :bordered="false" class="component-card">
        <div class="preview-group">
          <h4>预设与状态颜色 (Preset & Status)</h4>
          <a-space wrap :size="10">
            <a-tag color="success">已流片</a-tag>
            <a-tag color="processing">仿真验证中</a-tag>
            <a-tag color="error">时序报错</a-tag>
            <a-tag color="warning">编译器警告</a-tag>
            <a-tag color="default">未启动</a-tag>
          </a-space>
        </div>
        <div class="preview-group">
          <h4>自定义与可关闭标签 (Colors & Closable)</h4>
          <a-space wrap :size="10">
            <a-tag color="#b2e40d" style="color:#000;">Spacemit Brand</a-tag>
            <a-tag color="pink">Pink</a-tag>
            <a-tag color="blue">Blue</a-tag>
            <a-tag closable @close="() => message.info('标签已关闭')">可关闭标签</a-tag>
          </a-space>
        </div>
      </a-card>
    </section>

    <!-- 17. Timeline 时间轴 -->
    <section id="timeline" class="component-section">
      <div class="section-title">
        <h3>Timeline 时间轴</h3>
        <span class="component-badge">Timeline</span>
      </div>
      <p class="section-desc">按时间节点垂直顺序呈现任务或时间流。</p>
      
      <a-card :bordered="false" class="component-card">
        <a-timeline :pending="timelinePending ? '等待流片新阶段...' : false">
          <a-timeline-item color="green">2021年：进迭时空创立，确立乱序八核 RISC-V CPU 设计目标</a-timeline-item>
          <a-timeline-item color="green">2023年：首款 SoC 芯片 Spacemit K1 流片成功，软件工具链适配开启</a-timeline-item>
          <a-timeline-item color="blue">
            <template #dot><clock-circle-outlined style="font-size: 16px" /></template>
            2025年：发布全新 K3 边缘 AI 芯片，开启大批量商业化落地
          </a-timeline-item>
          <a-timeline-item color="gray">2026年：高性能通用服务器 CPU X1 前端物理设计启动</a-timeline-item>
        </a-timeline>
      </a-card>
    </section>

    <!-- 18. Tooltip 文字提示 -->
    <section id="tooltip" class="component-section">
      <div class="section-title">
        <h3>Tooltip 文字提示</h3>
        <span class="component-badge">Tooltip</span>
      </div>
      <p class="section-desc">最轻量级的悬浮提示气泡。</p>
      
      <a-card :bordered="false" class="component-card">
        <a-tooltip title="TSMC 12nm 全光刻物理制造线">
          <a-button>悬浮查看代工厂线</a-button>
        </a-tooltip>
      </a-card>
    </section>

    <!-- 19. Tour 漫游式引导 -->
    <section id="tour" class="component-section">
      <div class="section-title">
        <h3>Tour 漫游式引导</h3>
        <span class="component-badge">Tour</span>
      </div>
      <p class="section-desc">漫游式气泡引导。点击以下按钮，开启以本预览页真实物理节点进行定位的漫游指引。</p>
      
      <a-card :bordered="false" class="component-card">
        <a-button type="primary" @click="tourOpen = true">开启系统漫游导览</a-button>
        <a-tour v-model:open="tourOpen" :steps="tourSteps" />
      </a-card>
    </section>

    <!-- 20. Tree 树形控件 -->
    <section id="tree" class="component-section">
      <div class="section-title">
        <h3>Tree 树形控件</h3>
        <span class="component-badge">Tree</span>
      </div>
      <p class="section-desc">多层级分支结构树，勾选状态复选框颜色已与品牌绿同步。</p>
      
      <a-card :bordered="false" class="component-card">
        <a-tree
          v-model:selectedKeys="treeSelectedKeys"
          v-model:checkedKeys="treeCheckedKeys"
          checkable
          show-line
          :tree-data="treeData"
        />
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
  background: #35c44f1f;
  color: #35c44f;
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
.component-card {
  border-radius: 12px !important;
  border: 1px solid var(--border-color, #e8e8e8) !important;
  background: var(--bg-token-card, #f9f9fb) !important;
}
.preview-group {
  margin-bottom: 20px;
  border-bottom: 1px dashed var(--border-color, #e8e8e8);
  padding-bottom: 16px;
}
.preview-group:last-child {
  margin-bottom: 0;
  border-bottom: none;
  padding-bottom: 0;
}
.preview-group h4 {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 12px 0;
  opacity: 0.8;
}

/* 走马灯幻灯片 */
.carousel-slide-block {
  height: 160px;
  padding: 24px 32px;
  color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 8px;
}
.slide-1 { background: #e1ecfe; }
.slide-2 { background: #edffdc; }
.slide-3 { background: #fcede5; }

.carousel-slide-block h4 {
  font-size: 16px;
  font-weight: 800;
  margin: 0 0 8px 0;
}
.carousel-slide-block p {
  font-size: 13px;
  margin: 0;
  opacity: 0.8;
}
</style>
