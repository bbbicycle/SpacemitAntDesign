<script setup lang="ts">
import { ref, inject, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { theme } from 'ant-design-vue'
import {
  ApiOutlined,
  AppstoreOutlined,
  BuildOutlined,
  BlockOutlined,
  NodeIndexOutlined,
  FormOutlined,
  BgColorsOutlined,
  DesktopOutlined,
  MessageOutlined,
  InfoCircleOutlined
} from '@ant-design/icons-vue'

const isDark = inject('isDark', ref(false))
const route = useRoute()
const router = useRouter()

const { token } = theme.useToken()

// 侧边栏当前激活项与路由自动同步
const selectedKeys = computed(() => {
  return [route.path]
})

// 侧边栏点击跳转
const handleMenuClick = (info: any) => {
  router.push(info.key)
}
</script>

<template>
  <!-- 外层包裹 a-layout -->
  <a-layout class="main-layout-wrapper">
    <!-- 顶部 a-layout-header -->
    <a-layout-header class="showcase-header">
      <div class="header-left" @click="router.push('/overview')">
        <div class="brand-logo">
          <api-outlined />
        </div>
        <div class="brand-info">
          <span class="brand-title">Spacemit Ant Design Vue</span>
          <span class="brand-subtitle">官方 Layout 布局组件构建框架</span>
        </div>
      </div>
      <div class="header-actions">
        <span class="theme-label">{{ isDark ? '深色模式 (Dark)' : '浅色模式 (Light)' }}</span>
        <a-switch v-model:checked="isDark" checked-children="Dark" un-checked-children="Light" />
      </div>
    </a-layout-header>

    <!-- 下部 a-layout 承载 Sider 与 Content -->
    <a-layout class="sub-layout-wrapper">
      <!-- 左侧 a-layout-sider -->
      <a-layout-sider 
        width="280" 
        breakpoint="lg" 
        collapsed-width="0"
        :theme="isDark ? 'dark' : 'light'"
        class="showcase-sidebar"
      >
        <div class="sidebar-wrapper">
          <div class="sidebar-menu-title">
            <api-outlined />
            <span>芯片组件大盘</span>
          </div>
          <a-menu
            :selectedKeys="selectedKeys"
            mode="inline"
            :theme="isDark ? 'dark' : 'light'"
            @click="handleMenuClick"
            style="border: none; background: transparent;"
          >
            <a-menu-item key="/overview">
              <template #icon><appstore-outlined /></template>
              组件总览 (Overview)
            </a-menu-item>
            <a-menu-item key="/components/theme-tokens">
              <template #icon><bg-colors-outlined /></template>
              主题变量 (Theme Tokens)
            </a-menu-item>
            <a-menu-item key="/components/general">
              <template #icon><build-outlined /></template>
              通用组件 (General)
            </a-menu-item>
            <a-menu-item key="/components/layout">
              <template #icon><block-outlined /></template>
              布局组件 (Layout)
            </a-menu-item>
            <a-menu-item key="/components/navigation">
              <template #icon><node-index-outlined /></template>
              导航组件 (Navigation)
            </a-menu-item>
            <a-menu-item key="/components/data-entry">
              <template #icon><form-outlined /></template>
              数据录入 (Data Entry)
            </a-menu-item>
            <a-menu-item key="/components/data-display">
              <template #icon><desktop-outlined /></template>
              数据展示 (Data Display)
            </a-menu-item>
            <a-menu-item key="/components/feedback">
              <template #icon><message-outlined /></template>
              反馈组件 (Feedback)
            </a-menu-item>
            <a-menu-item key="/components/other">
              <template #icon><info-circle-outlined /></template>
              其他组件 (Other)
            </a-menu-item>
          </a-menu>
        </div>
      </a-layout-sider>

      <!-- 右侧 a-layout-content -->
      <a-layout-content class="showcase-content">
        <div class="content-viewport">
          <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>

          <!-- 底部 a-layout-footer 移入右侧滚动区内部 -->
          <a-layout-footer class="showcase-footer">
            <p>进迭时空 (Spacemit) 芯片编译与架构仿真适配预览系统 • 界面已完全应用官方 Layout 布局树与自定义 Token 层</p>
          </a-layout-footer>
        </div>
      </a-layout-content>
    </a-layout>

    <!-- 一键置顶 -->
    <a-back-top />
  </a-layout>
</template>

<style scoped>
/* 撑满全屏且禁止外层滚动 */
.main-layout-wrapper {
  height: 100vh;
  overflow: hidden;
}

/* 顶栏样式 */
.showcase-header {
  height: 72px !important;
  line-height: 72px !important;
  padding: 0 32px !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid v-bind('token.colorBorderSecondary');
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.015);
  z-index: 10;
  background: v-bind('token.colorBgContainer');
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  height: 100%;
}

.brand-logo {
  width: 44px;
  height: 44px;
  background: v-bind('token.colorPrimary');
  color: v-bind('token.colorTextLightSolid');
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  border-radius: 10px;
  box-shadow: 0 4px 16px v-bind("token.colorPrimary + '4d'");
  animation: logoPulse 3s infinite ease-in-out;
  line-height: 1;
}

@keyframes logoPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); box-shadow: 0 6px 18px rgba(178, 228, 13, 0.45); }
  100% { transform: scale(1); }
}

.brand-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.3;
}

.brand-title {
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.3px;
  color: v-bind('token.colorText');
}

.brand-subtitle {
  font-size: 11px;
  opacity: 0.55;
  font-weight: 500;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  background: v-bind('token.colorFillSecondary');
  padding: 6px 16px;
  border-radius: 20px;
  border: 1px solid v-bind('token.colorBorderSecondary');
  height: 38px;
  line-height: 1;
}

.theme-label {
  font-size: 12px;
  font-weight: 600;
  color: v-bind('token.colorText');
}

/* 下部主内容区布局 */
.sub-layout-wrapper {
  height: calc(100vh - 72px);
  overflow: hidden;
}

/* 侧边栏样式 */
.showcase-sidebar {
  border-right: 1px solid v-bind('token.colorBorderSecondary');
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.005);
  z-index: 9;
  height: 100%;
  overflow-y: auto;
}

.sidebar-wrapper {
  padding: 24px 8px;
}

.sidebar-menu-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 800;
  margin-bottom: 16px;
  padding: 0 16px 12px 16px;
  border-bottom: 1px solid v-bind('token.colorBorderSecondary');
  opacity: 0.75;
  color: v-bind('token.colorText');
}

/* 内容区样式 */
.showcase-content {
  padding: 32px !important;
  height: 100%;
  overflow-y: auto;
}

.content-viewport {
  max-width: 1120px;
  margin: 0 auto;
}

/* 底部样式 */
.showcase-footer {
  text-align: center !important;
  padding: 24px 32px !important;
  margin-top: 40px;
  font-size: 12px;
  opacity: 0.45;
  border-top: 1px solid v-bind('token.colorBorderSecondary');
  background: transparent !important;
}

/* 页面淡入渐变动效 */
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
