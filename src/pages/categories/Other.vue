<script setup lang="ts">
import { ref, inject, h, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { App } from 'ant-design-vue'
import {
  QuestionCircleOutlined,
  SettingOutlined,
  CustomerServiceOutlined,
  SyncOutlined,
  ArrowUpOutlined,
  EnvironmentOutlined
} from '@ant-design/icons-vue'

const isDark = inject('isDark', ref(false))

// 1. ConfigProvider 局部主题定制
const customTheme = {
  token: {
    colorPrimary: '#1890ff', // 经典蓝色，用于和 Spacemit 的品牌绿进行直观对比
    borderRadius: 4
  }
}

// 2. Watermark 水印状态控制
const watermarkText = ref('Spacemit Confidential')
const watermarkGap = ref<[number, number]>([100, 100])

// 3. App 上下文内的交互按钮小组件 (利用 Render Function)
const AppActionButton = {
  setup() {
    const { message: appMessage, modal: appModal } = App.useApp()
    
    const triggerMsg = () => {
      appMessage.success('成功！此全局 Message 的上下文已与外层 a-app 绑定。')
    }
    
    const triggerConfirm = () => {
      appModal.confirm({
        title: '物理集群状态评估完毕',
        content: '检测到仿真节点一切正常。是否立刻归档当前编译产物以备后续回归？',
        okText: '立刻归档',
        cancelText: '暂不归档',
        onOk() {
          appMessage.success('已加入归档队列。')
        }
      })
    }

    return () => h('div', { style: 'display: flex; gap: 12px; wrap: wrap;' }, [
      h('a-button', { type: 'primary', onClick: triggerMsg }, '触发 App 消息提示'),
      h('a-button', { onClick: triggerConfirm }, '弹出 App 确认弹窗')
    ])
  }
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
      <h2>其他组件 (Other)</h2>
      <p>其他功能组件提供了固钉（Affix）、主题与全局配置（ConfigProvider）、悬浮按钮（FloatButton）、数字水印（Watermark）以及简化消息管理的上下文包裹（App）等功能。</p>
    </div>

    <!-- 1. Affix 固钉 -->
    <section id="affix" class="component-section">
      <div class="section-title">
        <h3>Affix 固钉</h3>
        <span class="component-badge">Affix</span>
      </div>
      <p class="section-desc">固钉可以将页面中的重要操作或信息卡片固定在特定的可视位置，方便用户随时点按，而不受页面长距离滚动的影响。</p>
      
      <a-card>
        <a-space direction="vertical" :size="12">
          <p style="font-size: 13px; opacity: 0.6;">当向下滚动页面时，以下固钉按钮将会悬浮在顶部距离视口 80px 的位置：</p>
          <a-affix :offset-top="80">
            <a-button type="primary">
              <template #icon><sync-outlined spin /></template>
              仿真状态悬浮钉 (Affix Top)
            </a-button>
          </a-affix>
        </a-space>
      </a-card>
    </section>

    <!-- 3. ConfigProvider 全局化配置 -->
    <section id="configprovider" class="component-section">
      <div class="section-title">
        <h3>ConfigProvider 全局化配置</h3>
        <span class="component-badge">ConfigProvider</span>
      </div>
      <p class="section-desc">用于为子组件提供统一的主题颜色、圆角、字号以及语言等设计规则。在此我们可以展示通过局部 ConfigProvider 对比 Spacemit 主色与经典蓝色的表现。</p>
      
      <a-card>
        <a-row :gutter="24">
          <a-col :span="12" :xs="24" :sm="12">
            <div style="padding: 16px; border: 1px solid var(--border-color); border-radius: 8px; background: var(--bg-section); height: 100%;">
              <h4 style="font-weight: 700; margin-bottom: 12px; font-size: 13px;">Spacemit 品牌绿色主题 (全局默认)</h4>
              <a-space direction="vertical" style="width: 100%">
                <a-button type="primary" block>Spacemit 主色按钮</a-button>
                <a-checkbox checked>品牌绿复选框</a-checkbox>
                <a-radio checked>品牌绿单选框</a-radio>
              </a-space>
            </div>
          </a-col>
          <a-col :span="12" :xs="24" :sm="12">
            <div style="padding: 16px; border: 1px solid var(--border-color); border-radius: 8px; background: var(--bg-section); height: 100%;">
              <h4 style="font-weight: 700; margin-bottom: 12px; font-size: 13px;">局部定制蓝色小圆角主题 (ConfigProvider)</h4>
              <a-config-provider :theme="customTheme">
                <a-space direction="vertical" style="width: 100%">
                  <a-button type="primary" block>定制蓝色按钮 (Radius 4)</a-button>
                  <a-checkbox checked>定制蓝复选框</a-checkbox>
                  <a-radio checked>定制蓝单选框</a-radio>
                </a-space>
              </a-config-provider>
            </div>
          </a-col>
        </a-row>
      </a-card>
    </section>

    <!-- 4. FloatButton 悬浮按钮 -->
    <section id="floatbutton" class="component-section">
      <div class="section-title">
        <h3>FloatButton 悬浮按钮</h3>
        <span class="component-badge">FloatButton</span>
      </div>
      <p class="section-desc">常驻右下角或固定容器内的多功能浮动快捷键，支持返回顶部、气泡卡片与子按钮组展开。</p>
      
      <a-card>
        <div style="position: relative; height: 180px; border: 1px dashed var(--border-color); border-radius: 8px; overflow: hidden; background: var(--bg-section);">
          <div style="padding: 16px;">
            <p style="font-size: 13px; opacity: 0.6; margin: 0 0 12px 0;">请点击下方容器中右下角的圆形悬浮图标组展开快捷按钮：</p>
          </div>
          
          <!-- 在特定容器内局部展示，避免污染外部视口 -->
          <a-float-button-group
            trigger="click"
            type="primary"
            :style="{ right: '24px', bottom: '24px', position: 'absolute' }"
          >
            <template #icon><setting-outlined /></template>
            <a-float-button tooltip="芯片测试反馈">
              <template #icon><question-circle-outlined /></template>
            </a-float-button>
            <a-float-button tooltip="仿真技术客服">
              <template #icon><customer-service-outlined /></template>
            </a-float-button>
          </a-float-button-group>
        </div>
      </a-card>
    </section>

    <!-- 5. Watermark 水印 -->
    <section id="watermark" class="component-section">
      <div class="section-title">
        <h3>Watermark 水印</h3>
        <span class="component-badge">Watermark</span>
      </div>
      <p class="section-desc">水印用于保护页面敏感版权及防止机密信息截屏泄漏。支持动态自定义水印文案与密度。</p>
      
      <a-card>
        <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 20px; flex-wrap: wrap;">
          <div>
            <span style="font-size: 13px; margin-right: 8px;">水印文案：</span>
            <a-input v-model:value="watermarkText" style="width: 200px;" size="small" />
          </div>
        </div>
        
        <a-watermark
          :content="watermarkText"
          :gap="watermarkGap"
          style="display: block;"
        >
          <div style="height: 200px; padding: 24px; border: 1px solid var(--border-color); border-radius: 8px; background: var(--bg-section); overflow-y: auto;">
            <h4 style="font-weight: 800; margin: 0 0 12px 0; color: var(--color-primary-text);">内部机密 - Spacemit K3 SoC 物理寄存器规格图谱</h4>
            <p style="font-size: 12px; line-height: 1.6; margin: 0 0 6px 0;">Base Address: 0x4000_0000 | Mask: 0xFFFF_0000</p>
            <p style="font-size: 12px; line-height: 1.6; margin: 0 0 6px 0;">Control CSR: 0xbc0 (misa) | Vector Core Ratio: 4:1</p>
            <p style="font-size: 12px; line-height: 1.6; margin: 0 0 6px 0;">L1 D-Cache: 32 KB, 4-way associative | L2 Cache: 1 MB, 8-way</p>
            <p style="font-size: 12px; line-height: 1.6; margin: 0;">时序约束结果：完全收敛，最大时滞 0.05ns，符合车规级安全运行冗余范围。</p>
          </div>
        </a-watermark>
      </a-card>
    </section>

    <!-- 6. App 包裹组件 -->
    <section id="app-wrapper" class="component-section">
      <div class="section-title">
        <h3>App 包裹组件</h3>
        <span class="component-badge">App</span>
      </div>
      <p class="section-desc">使用 App 包裹组件，可以在子级任意节点上通过 useApp() 统一获取 message、modal 和 notification 调用上下文，免除了在多主题下动态创建的弹层无法继承全局 ConfigProvider Token 变量的痛点。</p>
      
      <a-card>
        <a-app>
          <!-- 挂载上面用 Render Function 构建的小动作按钮组件 -->
          <AppActionButton />
        </a-app>
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

</style>
