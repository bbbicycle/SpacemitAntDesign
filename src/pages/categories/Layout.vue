<script setup lang="ts">
import { ref, inject, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const isDark = inject('isDark', ref(false))

// Space 间距大小控制
const spaceSize = ref<number | 'small' | 'middle' | 'large'>(16)

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
      <h2>布局组件 (Layout)</h2>
      <p>布局组件用于对页面骨架及元素的间距分布进行排列管理。Layout 主体背景已完美适配 Spacemit 品牌规范。</p>
    </div>

    <!-- 1. Divider 分割线 -->
    <section id="divider" class="component-section">
      <div class="section-title">
        <h3>Divider 分割线</h3>
        <span class="component-badge">Divider</span>
      </div>
      <p class="section-desc">分割线用于区分页面上的段落或者卡片内容。默认边框颜色采用次级分割线 token `outlineVariant`。</p>
      
      <a-card>
        <p>在设计硬件寄存器时，通常需要划分指令类型。</p>
        <a-divider />
        <p>指令类型可进一步分为算术指令和存储指令。</p>
        <a-divider>划分线带文字</a-divider>
        <p>RVI 核心支持标准 I 扩展。</p>
        <a-divider orientation="left">左对齐文字</a-divider>
        <p>RVM 核心支持标准 M 乘法扩展。</p>
        <a-divider orientation="right">右对齐文字</a-divider>
        <p>支持多模块垂直分隔：
          <a href="#">CPU设计</a>
          <a-divider type="vertical" />
          <a href="#">软件生态</a>
          <a-divider type="vertical" />
          <a href="#">社区生态</a>
        </p>
      </a-card>
    </section>

    <!-- 2. Grid 栅格 -->
    <section id="grid" class="component-section">
      <div class="section-title">
        <h3>Grid 栅格</h3>
        <span class="component-badge">Grid</span>
      </div>
      <p class="section-desc">24 栅格系统，展示不同列数的平均分配与 Gutter 间距效果。</p>
      
      <a-card>
        <div class="grid-demo-wrapper">
          <a-typography-title :level="5">Row 24 Span 等分</a-typography-title>
          <a-row :gutter="[16, 16]">
            <a-col :span="24"><div class="grid-block">col-24 (100% 宽度)</div></a-col>
          </a-row>
          
          <h4 style="margin-top: 16px;">二等分 & 三等分 (Gutter: 16px)</h4>
          <a-row :gutter="[16, 16]">
            <a-col :span="12"><div class="grid-block">col-12 (50%)</div></a-col>
            <a-col :span="12"><div class="grid-block">col-12 (50%)</div></a-col>
          </a-row>
          
          <a-row :gutter="[16, 16]" style="margin-top: 12px;">
            <a-col :span="8"><div class="grid-block">col-8 (33.3%)</div></a-col>
            <a-col :span="8"><div class="grid-block">col-8 (33.3%)</div></a-col>
            <a-col :span="8"><div class="grid-block">col-8 (33.3%)</div></a-col>
          </a-row>

          <h4 style="margin-top: 16px;">四等分与混合比例</h4>
          <a-row :gutter="[16, 16]">
            <a-col :span="6"><div class="grid-block">col-6</div></a-col>
            <a-col :span="6"><div class="grid-block">col-6</div></a-col>
            <a-col :span="6"><div class="grid-block">col-6</div></a-col>
            <a-col :span="6"><div class="grid-block">col-6</div></a-col>
          </a-row>
          
          <a-row :gutter="[16, 16]" style="margin-top: 12px;">
            <a-col :span="4"><div class="grid-block">col-4</div></a-col>
            <a-col :span="20"><div class="grid-block">col-20</div></a-col>
          </a-row>
        </div>
      </a-card>
    </section>

    <!-- 3. Layout 布局 -->
    <section id="layout-demo" class="component-section">
      <div class="section-title">
        <h3>Layout 布局</h3>
        <span class="component-badge">Layout</span>
      </div>
      <p class="section-desc">页面框架级布局演示。这里展示一个微缩版调度平台骨架，头部、侧边栏和内容的底色、文字均使用组件级 Token 进行统一覆盖。</p>
      
      <a-card>
        <div class="mini-layout-container">
          <a-layout class="mini-layout">
            <a-layout-sider width="80" class="mini-sider">
              <div class="mini-logo">S</div>
              <div class="mini-menu-item active">架构</div>
              <div class="mini-menu-item">测试</div>
              <div class="mini-menu-item">运维</div>
            </a-layout-sider>
            <a-layout>
              <a-layout-header class="mini-header">
                <span class="mini-title">Spacemit SoC 调度平台 v4.0</span>
              </a-layout-header>
              <a-layout-content class="mini-content">
                <div class="mini-card-grid">
                  <div class="mini-content-card">核心: Spacemit K1</div>
                  <div class="mini-content-card">状态: 编译完成</div>
                </div>
              </a-layout-content>
              <a-layout-footer class="mini-footer">
                进迭时空 ©2026
              </a-layout-footer>
            </a-layout>
          </a-layout>
        </div>
      </a-card>
    </section>

    <!-- 4. Space 间距 -->
    <section id="space" class="component-section">
      <div class="section-title">
        <h3>Space 间距</h3>
        <span class="component-badge">Space</span>
      </div>
      <p class="section-desc">间距组件，可以灵活控制内嵌子元素之间的排版距离，防止界面拥挤。</p>
      
      <a-card>
        <div>
          <div style="margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 13px;">间距大小 (Space Size)：</span>
            <a-radio-group v-model:value="spaceSize" size="small">
              <a-radio-button value="small">Small (8px)</a-radio-button>
              <a-radio-button value="middle">Middle (16px)</a-radio-button>
              <a-radio-button value="large">Large (24px)</a-radio-button>
              <a-radio-button :value="40">超大 (40px)</a-radio-button>
            </a-radio-group>
          </div>
          
          <div class="space-demo-box">
            <a-space :size="spaceSize" wrap>
              <a-button type="primary">芯片内核</a-button>
              <a-button>分支预测</a-button>
              <a-button type="dashed">乱序执行</a-button>
              <a-tag color="success">已通过</a-tag>
              <span style="font-size: 13px;">文本标签</span>
            </a-space>
          </div>
        </div>

        <a-divider dashed />
        <div>
          <a-typography-title :level="5">垂直排列 (Direction="vertical")</a-typography-title>
          <div class="space-demo-box">
            <a-space direction="vertical" :size="spaceSize" style="width: 100%">
              <a-alert message="编译器更新: LLVM 18 GCC-13 开始对 Spacemit K1 提供基础分支优化支持" type="info" show-icon />
              <a-alert message="服务器异常: 杭州 FPGA 验证节点-04 当前硬件过载" type="warning" show-icon />
            </a-space>
          </div>
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
  background: #ff70241f;
  color: #ff7024;
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

/* Grid 演示 */
.grid-block {
  background: var(--color-primary, #b2e40d);
  color: var(--logo-text, #000000);
  text-align: center;
  padding: 12px 0;
  font-weight: 600;
  border-radius: 8px;
  font-size: 12px;
  opacity: 0.85;
}

/* Layout 演示 */
.mini-layout-container {
  padding: 16px;
  background: var(--bg-preview-layout, #f2f2f7);
  border-radius: 12px;
}
.mini-layout {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  min-height: 180px;
}
.mini-sider {
  padding: 8px 0;
  text-align: center;
  border-right: 1px solid var(--border-color);
}
.mini-logo {
  width: 24px;
  height: 24px;
  line-height: 24px;
  background: var(--color-primary);
  color: #000;
  font-weight: 900;
  border-radius: 6px;
  margin: 0 auto 16px auto;
  font-size: 12px;
}
.mini-menu-item {
  font-size: 11px;
  padding: 6px 0;
  margin: 4px 6px;
  border-radius: 4px;
  opacity: 0.6;
  cursor: pointer;
}
.mini-menu-item.active {
  background: var(--bg-badge);
  color: var(--color-primary-text);
  font-weight: 700;
  opacity: 1;
}
.mini-header {
  height: 40px !important;
  line-height: 40px !important;
  padding: 0 16px !important;
  border-bottom: 1px solid var(--border-color);
  font-size: 12px;
  font-weight: 700;
}
.mini-content {
  padding: 12px !important;
}
.mini-card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.mini-content-card {
  background: var(--bg-section);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 10px;
  font-size: 10px;
  text-align: center;
  font-weight: 500;
}
.mini-footer {
  text-align: center !important;
  padding: 8px 0 !important;
  font-size: 9px !important;
  opacity: 0.5;
  border-top: 1px solid var(--border-color);
}
.space-demo-box {
  background: var(--bg-section, #ffffff);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}
</style>
