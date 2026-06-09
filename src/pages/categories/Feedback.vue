<script setup lang="ts">
import { ref, inject, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { message, notification } from 'ant-design-vue'
import {
  InfoCircleOutlined,
  SmileOutlined,
  FrownOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined
} from '@ant-design/icons-vue'

const isDark = inject('isDark', ref(false))

// 1. Drawer 状态
const drawerOpen = ref(false)
const showDrawer = () => {
  drawerOpen.value = true
}

// 2. Message 状态
const triggerMessage = (type: 'success' | 'error' | 'warning' | 'info' | 'loading') => {
  if (type === 'success') {
    message.success('RTL 代码静态检查通过，未发现语法报错。')
  } else if (type === 'error') {
    message.error('时序约束校验失败！寄存器建立时间(Setup Time)违规 0.23ns。')
  } else if (type === 'warning') {
    message.warning('时钟门控模块存在潜在悬空管脚警告。')
  } else if (type === 'info') {
    message.info('已成功分发 8 个仿真线程至 TSMC 计算节点。')
  } else if (type === 'loading') {
    const hide = message.loading('正在提取布线后网表寄生参数...', 0)
    setTimeout(hide, 2000)
  }
}

// 3. Modal 状态
const modalOpen = ref(false)
const showModal = () => {
  modalOpen.value = true
}
const handleModalOk = () => {
  modalOpen.value = false
  message.success('编译流水线配置修改已下发生效！')
}

// 4. Notification 状态
const triggerNotification = (placement: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight') => {
  notification.open({
    message: '芯片温度超限警告',
    description: '核心区 (Core-0) 温度传感器检测到温度已达 92℃，仿真器执行自动降频保护机制。',
    placement,
    duration: 3,
    icon: () => h(ExclamationCircleOutlined, { style: 'color: #ff4d4f' })
  })
}
// 辅助导入 h 函数用于通知图标渲染
import { h } from 'vue'

// 5. Popconfirm 状态
const confirmDelete = () => {
  message.success('时序验证仿真数据库清理成功。')
}
const cancelDelete = () => {
  message.info('操作已取消')
}

// 6. Skeleton 与 Spin 状态
const showSkeleton = ref(true)
const spinRunning = ref(false)
const toggleSpin = () => {
  spinRunning.value = !spinRunning.value
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
      <h2>反馈组件 (Feedback)</h2>
      <p>反馈组件用于展示操作状态、全局提醒、流程进度及加载态。我们已针对警告提示（Alert）、消息浮窗（Message/Notification）、确认对话框（Modal）、进度条（Progress）以及加载指示器（Spin）进行了 Spacemit 品牌绿色和深色适配。</p>
    </div>

    <!-- 1. Alert 警告提示 -->
    <section id="alert" class="component-section">
      <div class="section-title">
        <h3>Alert 警告提示</h3>
        <span class="component-badge">Alert</span>
      </div>
      <p class="section-desc">向用户展示系统级通知或任务状态警告，支持描述段落、Icon 以及一键关闭。</p>
      
      <a-card>
        <a-space direction="vertical" style="width: 100%" :size="16">
          <a-alert message="仿真任务正常结束 - RTL Sim Successful" type="success" show-icon />
          <a-alert message="内存泄漏检测提示" description="节点 #02 疑似存在少量堆内存未释放漏洞，但目前不影响正常编译。" type="info" show-icon />
          <a-alert message="编译器版本过期警告" description="当前编译器版本为 GCC 12.2，建议升级为进迭自研 RVGCC 14.1 以启用更优代码优化。" type="warning" show-icon closable />
          <a-alert message="核心死锁错误" description="仿真流水线第 8291 个时钟周期检测到核心取指阶段死锁，流水线已强行挂起。" type="error" show-icon />
        </a-space>
      </a-card>
    </section>

    <!-- 3. Drawer 抽屉 -->
    <section id="drawer" class="component-section">
      <div class="section-title">
        <h3>Drawer 抽屉</h3>
        <span class="component-badge">Drawer</span>
      </div>
      <p class="section-desc">屏幕边缘滑出的浮动面板，用于展示或配置与主屏幕关联性较弱的复杂元数据。</p>
      
      <a-card>
        <a-button type="primary" @click="showDrawer">打开芯片配置抽屉</a-button>
        <a-drawer
          v-model:open="drawerOpen"
          title="Spacemit Core IP 详细配置"
          placement="right"
          :width="420"
        >
          <div style="display: flex; flex-direction: column; gap: 20px;">
            <div>
              <h4 style="font-weight: 700; margin-bottom: 8px;">指令扩展配置 (ISA Extension)</h4>
              <a-checkbox-group :value="['i', 'm', 'a', 'f', 'd', 'c', 'v']" disabled>
                <a-checkbox value="i">I (整数)</a-checkbox>
                <a-checkbox value="m">M (乘除)</a-checkbox>
                <a-checkbox value="a">A (原子)</a-checkbox>
                <a-checkbox value="f">F (单精度浮点)</a-checkbox>
                <a-checkbox value="d">D (双精度浮点)</a-checkbox>
                <a-checkbox value="v">V (向量扩展 1.0)</a-checkbox>
              </a-checkbox-group>
            </div>
            <div>
              <h4 style="font-weight: 700; margin-bottom: 8px;">乱序流水线深度</h4>
              <a-input-number :min="4" :max="16" :value="9" style="width: 100%" />
            </div>
            <div>
              <h4 style="font-weight: 700; margin-bottom: 8px;">仿真器性能预算模式</h4>
              <a-radio-group :value="'cycle-accurate'">
                <a-radio value="functional">功能级模拟 (快速)</a-radio>
                <a-radio value="cycle-accurate">周期精确级 (精细)</a-radio>
              </a-radio-group>
            </div>
          </div>
          <template #footer>
            <div style="text-align: right;">
              <a-button style="margin-right: 8px" @click="drawerOpen = false">取消</a-button>
              <a-button type="primary" @click="drawerOpen = false">应用配置</a-button>
            </div>
          </template>
        </a-drawer>
      </a-card>
    </section>

    <!-- 4. Message 全局提示 -->
    <section id="message" class="component-section">
      <div class="section-title">
        <h3>Message 全局提示</h3>
        <span class="component-badge">Message</span>
      </div>
      <p class="section-desc">最轻量级的顶部全局操作结果反馈，在延时后自动消失。完全适配 Spacemit 灰度框和品牌嫩绿色高光。</p>
      
      <a-card>
        <a-space wrap :size="16">
          <a-button @click="triggerMessage('success')">成功提示</a-button>
          <a-button @click="triggerMessage('error')">失败错误</a-button>
          <a-button @click="triggerMessage('warning')">警告信息</a-button>
          <a-button @click="triggerMessage('info')">普通通知</a-button>
          <a-button type="primary" @click="triggerMessage('loading')">开启异步加载提示</a-button>
        </a-space>
      </a-card>
    </section>

    <!-- 5. Modal 对话框 -->
    <section id="modal" class="component-section">
      <div class="section-title">
        <h3>Modal 对话框</h3>
        <span class="component-badge">Modal</span>
      </div>
      <p class="section-desc">打开一个隔离的覆盖窗口执行重要操作、提示或表单录入。</p>
      
      <a-card>
        <a-button type="primary" @click="showModal">弹出时序数据库重建确认</a-button>
        <a-modal
          v-model:open="modalOpen"
          title="您确定要重建时序仿真数据库吗？"
          ok-text="确认重建"
          cancel-text="暂不重建"
          @ok="handleModalOk"
        >
          <p style="margin-bottom: 12px; color: #ff4d4f; font-weight: 600;">
            <exclamation-circle-outlined /> 该操作将清空本地所有缓存的综合网表及时序报告！
          </p>
          <p>重新建立数据库大约需要花费 15-20 分钟的物理机运行时间，仿真队列将会挂起当前排队的任务。</p>
        </a-modal>
      </a-card>
    </section>

    <!-- 6. Notification 通知提醒框 -->
    <section id="notification" class="component-section">
      <div class="section-title">
        <h3>Notification 通知提醒框</h3>
        <span class="component-badge">Notification</span>
      </div>
      <p class="section-desc">在系统右上角或角落弹出通知信息，多用于后台异步处理完成、或者边缘设备异常告警。</p>
      
      <a-card>
        <a-space wrap :size="16">
          <a-button @click="triggerNotification('topRight')">右上角弹出 (默认)</a-button>
          <a-button @click="triggerNotification('topLeft')">左上角弹出</a-button>
          <a-button @click="triggerNotification('bottomRight')">右下角弹出</a-button>
          <a-button @click="triggerNotification('bottomLeft')">左下角弹出</a-button>
        </a-space>
      </a-card>
    </section>

    <!-- 7. Popconfirm 气泡确认框 -->
    <section id="popconfirm" class="component-section">
      <div class="section-title">
        <h3>Popconfirm 气泡确认框</h3>
        <span class="component-badge">Popconfirm</span>
      </div>
      <p class="section-desc">比 Modal 更加轻量级的在元素气泡中弹出的确认操作，无需打断用户专注度。</p>
      
      <a-card>
        <a-popconfirm
          title="是否确认永久清除该时序仿真数据库？"
          ok-text="确定清理"
          cancel-text="取消"
          @confirm="confirmDelete"
          @cancel="cancelDelete"
        >
          <a-button danger>删除时序仿真数据</a-button>
        </a-popconfirm>
      </a-card>
    </section>

    <!-- 8. Progress 进度条 -->
    <section id="progress" class="component-section">
      <div class="section-title">
        <h3>Progress 进度条</h3>
        <span class="component-badge">Progress</span>
      </div>
      <p class="section-desc">展示当前任务的进度状态。进度高光完美同步 Spacemit 品牌绿色。</p>
      
      <a-card>
        <div>
          <a-typography-title :level="5">条状进度 (Line Progress)</a-typography-title>
          <a-space direction="vertical" style="width: 100%" :size="16">
            <div>
              <span style="font-size: 12px; opacity: 0.6;">SoC 功能验证编译中：</span>
              <a-progress :percent="65" />
            </div>
            <div>
              <span style="font-size: 12px; opacity: 0.6;">编译器适配构建成功：</span>
              <a-progress :percent="100" />
            </div>
            <div>
              <span style="font-size: 12px; opacity: 0.6;">物理 DRC 检查报错：</span>
              <a-progress :percent="82" status="exception" />
            </div>
          </a-space>
        </div>

        <a-divider dashed />
        <div>
          <a-typography-title :level="5">环形与仪表盘进度 (Circle & Dashboard)</a-typography-title>
          <a-space :size="40" wrap>
            <div>
              <span style="display: block; text-align: center; font-size: 12px; opacity: 0.6; margin-bottom: 8px;">物理布局规划进度</span>
              <a-progress type="circle" :percent="75" :width="100" />
            </div>
            <div>
              <span style="display: block; text-align: center; font-size: 12px; opacity: 0.6; margin-bottom: 8px;">时序收敛总进度</span>
              <a-progress type="circle" :percent="100" :width="100" />
            </div>
            <div>
              <span style="display: block; text-align: center; font-size: 12px; opacity: 0.6; margin-bottom: 8px;">仿真时钟资源占用</span>
              <a-progress type="dashboard" :percent="88" status="exception" :width="100" />
            </div>
          </a-space>
        </div>

        <a-divider dashed />
        <div>
          <a-typography-title :level="5">分步进度条 (Steps Progress)</a-typography-title>
          <a-space direction="vertical" style="width: 100%" :size="10">
            <div>
              <span style="font-size: 12px; opacity: 0.6;">CPU 九级流水线验证进度步骤：</span>
              <a-progress :percent="60" :steps="9" />
            </div>
            <div>
              <span style="font-size: 12px; opacity: 0.6;">编译器 5 个优化级别编译步骤：</span>
              <a-progress :percent="100" :steps="5" stroke-color="var(--color-primary)" />
            </div>
          </a-space>
        </div>
      </a-card>
    </section>

    <!-- 9. Result 结果 -->
    <section id="result" class="component-section">
      <div class="section-title">
        <h3>Result 结果</h3>
        <span class="component-badge">Result</span>
      </div>
      <p class="section-desc">对复杂操作或流程提供大面积的图形化结果确认页，具有强烈的仪式感。</p>
      
      <a-card>
        <a-result
          status="success"
          title="Spacemit K1-SoC 流片大版图顺利交付"
          sub-title="已成功通过 EDA 时序签名仿真、IR-Drop 电压降评估和 TSMC 物理代工厂网表规范自检，物理制造任务已锁定排产。"
        >
          <template #extra>
            <a-button type="primary">返回芯片看板</a-button>
            <a-button>打印 GDSII 自检报告</a-button>
          </template>
        </a-result>
      </a-card>
    </section>

    <!-- 10. Skeleton 骨架屏 -->
    <section id="skeleton" class="component-section">
      <div class="section-title">
        <h3>Skeleton 骨架屏</h3>
        <span class="component-badge">Skeleton</span>
      </div>
      <p class="section-desc">在数据尚未加载完全时，渲染灰度骨架占位结构以降低用户的等待焦躁感。</p>
      
      <a-card>
        <div style="margin-bottom: 16px;">
          <span style="font-size: 13px; margin-right: 12px;">切换骨架屏加载状态：</span>
          <a-switch v-model:checked="showSkeleton" />
        </div>
        
        <div v-if="showSkeleton">
          <a-skeleton active :avatar="true" :paragraph="{ rows: 4 }" />
        </div>
        <div v-else style="padding: 16px; border: 1px solid var(--border-color); border-radius: 8px; background: var(--bg-section);">
          <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px;">
            <a-avatar :size="48">Core</a-avatar>
            <div>
              <h4 style="font-weight: 700; margin: 0;">Spacemit Core-K100</h4>
              <p style="margin: 0; font-size: 12px; opacity: 0.6;">物理性能参数加载成功</p>
            </div>
          </div>
          <p>主频：1.6 GHz</p>
          <p>流水线：乱序九级流水</p>
          <p>测试评估结果：时序收敛完备，功耗符合 1.2W 预期指标。</p>
        </div>
      </a-card>
    </section>

    <!-- 11. Spin 加载中 -->
    <section id="spin" class="component-section">
      <div class="section-title">
        <h3>Spin 加载中</h3>
        <span class="component-badge">Spin</span>
      </div>
      <p class="section-desc">页面级或局部的加载提示动画，表明当前任务正处于后台编译或数据拉取中。</p>
      
      <a-card>
        <div>
          <a-typography-title :level="5">各种尺寸的 Spin (Sizes)</a-typography-title>
          <a-space :size="24">
            <a-spin size="small" />
            <a-spin />
            <a-spin size="large" />
            <a-spin>
              <template #indicator>
                <loading-outlined style="font-size: 24px" spin />
              </template>
            </a-spin>
          </a-space>
        </div>

        <a-divider dashed />
        <div>
          <a-typography-title :level="5">容器包裹加载态 (Container Wrap)</a-typography-title>
          <div style="margin-bottom: 16px;">
            <span style="font-size: 13px; margin-right: 12px;">触发容器内异步加载：</span>
            <a-button size="small" @click="toggleSpin">{{ spinRunning ? '停止加载' : '开始加载' }}</a-button>
          </div>
          <a-spin :spinning="spinRunning" tip="正在执行时序仿真布线优化算法...">
            <div style="padding: 24px; border: 1px solid var(--border-color); border-radius: 8px; background: var(--bg-section);">
              <h4 style="font-weight: 700; margin-bottom: 8px;">物理布线状态面板 (Routing Stage)</h4>
              <p style="font-size: 13px; margin: 0 0 6px 0;">已连接引脚比率：99.92%</p>
              <p style="font-size: 13px; margin: 0 0 6px 0;">重叠引脚数：0</p>
              <p style="font-size: 13px; margin: 0;">计算吞吐量：182 M/sec</p>
            </div>
          </a-spin>
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
