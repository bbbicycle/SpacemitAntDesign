<script setup lang="ts">
import { ref, inject } from 'vue'
import {
  ApiOutlined,
  RocketOutlined,
  BuildOutlined,
  CodeOutlined,
  SafetyCertificateOutlined,
  DashboardOutlined,
  SettingOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons-vue'

const isDark = inject('isDark', ref(false))

// Typography 可编辑与复制值
const editableText = ref('进迭时空致力于设计高性能 RISC-V CPU')
const copyableText = ref('npx -y create-vite-app@latest')
</script>

<template>
  <div class="category-page">
    <div class="page-header-desc">
      <h2>通用组件 (General)</h2>
      <p>通用组件是系统的基础构件。主按钮及相关状态色均已深度集成 Spacemit 品牌绿色，在亮色与暗色模式下拥有极佳的前后对比度与视觉柔和感。</p>
    </div>

    <!-- 1. Button 按钮 -->
    <section class="component-section">
      <div class="section-title">
        <h3>Button 按钮</h3>
        <span class="component-badge">Button</span>
      </div>
      <p class="section-desc">按钮用于开始一个即时操作。包含了主按钮、次按钮、虚线按钮、文本按钮、链接按钮、禁用、加载、危险、以及带图标的各种状态组合。</p>
      
      <a-card :bordered="false" class="component-card">
        <div class="preview-group">
          <h4>按钮类型 (Type)</h4>
          <a-space wrap :size="12">
            <a-button type="primary">主按钮 (Primary)</a-button>
            <a-button>次按钮 (Default)</a-button>
            <a-button type="dashed">虚线按钮 (Dashed)</a-button>
            <a-button type="text">文本按钮 (Text)</a-button>
            <a-button type="link">链接按钮 (Link)</a-button>
          </a-space>
        </div>

        <div class="preview-group">
          <h4>危险状态与禁用 (Danger & Disabled)</h4>
          <a-space wrap :size="12">
            <a-button type="primary" danger>危险主按钮</a-button>
            <a-button danger>危险次按钮</a-button>
            <a-button type="primary" disabled>禁用主按钮</a-button>
            <a-button disabled>禁用次按钮</a-button>
            <a-button type="primary" loading>加载中</a-button>
            <a-button loading>加载中</a-button>
          </a-space>
        </div>

        <div class="preview-group">
          <h4>带图标与几何形状 (Icon & Shapes)</h4>
          <a-space wrap :size="12">
            <a-button type="primary">
              <template #icon><api-outlined /></template>
              构建芯片 (Spacemit K1)
            </a-button>
            <a-button>
              <template #icon><setting-outlined /></template>
              配置编译器
            </a-button>
            <a-button shape="circle">
              <template #icon><search-outlined /></template>
            </a-button>
            <a-button type="primary" shape="circle">S</a-button>
          </a-space>
        </div>
      </a-card>
    </section>

    <!-- 2. Typography 排版 -->
    <section class="component-section">
      <div class="section-title">
        <h3>Typography 排版</h3>
        <span class="component-badge">Typography</span>
      </div>
      <p class="section-desc">排版组件用于展示标准的文字排版与样式。文字颜色已与 `onSurface` 全局响应式绑定，确保极佳的可读性。</p>
      
      <a-card :bordered="false" class="component-card">
        <div class="preview-group">
          <h4>标题级别 (Title)</h4>
          <a-typography-title :level="1">Spacemit K1 高能效 RISC-V 核心 (Level 1)</a-typography-title>
          <a-typography-title :level="2">高性能模拟器构建与测试 (Level 2)</a-typography-title>
          <a-typography-title :level="3">LLVM/GCC 编译链适配工作 (Level 3)</a-typography-title>
          <a-typography-title :level="4">指令集架构仿真 (Level 4)</a-typography-title>
        </div>

        <div class="preview-group">
          <h4>文本与段落 (Text & Paragraph)</h4>
          <a-space direction="vertical" style="width: 100%">
            <a-typography-paragraph>
              进迭时空（Spacemit）是一家专注于研发高性能 RISC-V 架构芯片的半导体初创公司。首款商用芯片已实现批量量产。
            </a-typography-paragraph>
            <a-typography-paragraph :editable="{ onChange: (val: string) => editableText = val }">
              {{ editableText }} (双击或点击右侧图标可编辑)
            </a-typography-paragraph>
            <a-typography-paragraph :copyable="{ text: copyableText }">
              命令行构建：<code>{{ copyableText }}</code> (支持复制)
            </a-typography-paragraph>
            
            <a-space wrap :size="16">
              <a-typography-text type="secondary">次要文本 (Secondary)</a-typography-text>
              <a-typography-text type="success">成功文本 (Success)</a-typography-text>
              <a-typography-text type="warning">警告文本 (Warning)</a-typography-text>
              <a-typography-text type="danger">危险文本 (Danger)</a-typography-text>
              <a-typography-text disabled>禁用文本 (Disabled)</a-typography-text>
              <a-typography-text mark>高亮标记</a-typography-text>
              <a-typography-text code>riscv64-unknown-elf</a-typography-text>
              <a-typography-text strong>加粗文本</a-typography-text>
              <a-typography-text underline>下划线文本</a-typography-text>
              <a-typography-text delete>删除线文本</a-typography-text>
            </a-space>
          </a-space>
        </div>
      </a-card>
    </section>

    <!-- 3. Icon 图标 -->
    <section class="component-section">
      <div class="section-title">
        <h3>Icon 图标</h3>
        <span class="component-badge">Icon</span>
      </div>
      <p class="section-desc">结合 <code>@ant-design/icons-vue</code>，使用芯片与系统开发常见图标，已完成亮暗色及状态色适配。</p>
      
      <a-card :bordered="false" class="component-card">
        <div class="icon-showcase-grid">
          <div class="icon-item">
            <api-outlined class="tech-icon" />
            <span>ApiOutlined</span>
          </div>
          <div class="icon-item">
            <rocket-outlined class="tech-icon brand-tint" />
            <span>RocketOutlined</span>
          </div>
          <div class="icon-item">
            <build-outlined class="tech-icon" />
            <span>BuildOutlined</span>
          </div>
          <div class="icon-item">
            <code-outlined class="tech-icon" />
            <span>CodeOutlined</span>
          </div>
          <div class="icon-item">
            <safety-certificate-outlined class="tech-icon success-tint" />
            <span>SafetyCertificate</span>
          </div>
          <div class="icon-item">
            <dashboard-outlined class="tech-icon" />
            <span>Dashboard</span>
          </div>
          <div class="icon-item">
            <check-circle-outlined class="tech-icon success-tint" />
            <span>CheckCircle</span>
          </div>
          <div class="icon-item">
            <exclamation-circle-outlined class="tech-icon warning-tint" />
            <span>Exclamation</span>
          </div>
          <div class="icon-item">
            <close-circle-outlined class="tech-icon danger-tint" />
            <span>CloseCircle</span>
          </div>
          <div class="icon-item">
            <info-circle-outlined class="tech-icon info-tint" />
            <span>InfoCircle</span>
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
  background: rgba(32, 108, 255, 0.1);
  color: #206cff;
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
.icon-showcase-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 16px;
  text-align: center;
}
.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 14px;
  background: var(--bg-section, #ffffff);
  border: 1px solid var(--border-color, #e8e8e8);
  border-radius: 10px;
  font-size: 12px;
}
.tech-icon {
  font-size: 24px;
}
.brand-tint { color: var(--color-primary-text, #4ea100); }
.success-tint { color: #35c44f; }
.warning-tint { color: #ff7024; }
.danger-tint { color: #e42d22; }
.info-tint { color: #206cff; }
</style>
