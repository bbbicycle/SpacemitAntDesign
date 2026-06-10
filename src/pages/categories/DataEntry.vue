<script setup lang="ts">
import { ref, inject, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import {
  RocketOutlined,
  UploadOutlined,
  InboxOutlined,
  SearchOutlined,
  PlusOutlined
} from '@ant-design/icons-vue'

const isDark = inject('isDark', ref(false))

// 1. Form 数据
const formModel = ref({
  taskName: '',
  coreCount: 8,
  simulator: 'qemu',
  aiAcceleration: true
})

const handleFormSubmit = () => {
  message.success('已部署任务！')
}

// 各组件状态绑定
const inputValue = ref('')
const inputNumberValue = ref(8)
const selectValue = ref('opt1')
const selectMultipleValue = ref(['opt1', 'opt2'])
const checkboxSingle = ref(true)
const checkboxGroup = ref(['A', 'C'])
const radioValue = ref('1')
const radioGroupValue = ref('A')
const switchValue = ref(true)
const sliderValue = ref(25)
const sliderRangeValue = ref([20, 50])
const rateValue = ref(4)
const autoCompleteValue = ref('')
const cascaderValue = ref(['src', 'arch', 'riscv'])
const treeSelectValue = ref('gpr')
const mentionsValue = ref('@CompilerTeam ')
const transferTargetKeys = ref(['server-1'])
const uploadFileList = ref([])

// 选项配置
const selectOptions = [
  { value: 'opt1', label: 'Spacemit K1 SOC (8-Core)' },
  { value: 'opt2', label: 'Spacemit K3 AI SOC' },
  { value: 'opt3', label: 'Spacemit X1 Edge Server' },
  { value: 'opt4', label: '通用 RISC-V 核心' }
]

const autoCompleteOptions = ref([
  { value: 'riscv64-unknown-elf-gcc' },
  { value: 'riscv64-unknown-linux-gnu-gcc' },
  { value: 'clang-riscv64-llvm' }
])

const cascaderOptions = [
  {
    value: 'src',
    label: 'src',
    children: [
      {
        value: 'arch',
        label: 'arch',
        children: [
          { value: 'riscv', label: 'riscv' },
          { value: 'arm', label: 'arm' }
        ]
      }
    ]
  }
]

const moduleTreeData = [
  {
    title: '指令集核心',
    value: 'isa-core',
    key: 'isa-core',
    children: [
      { title: '通用寄存器 (GPR)', value: 'gpr', key: 'gpr' },
      { title: '浮点单元 (FPU)', value: 'fpu', key: 'fpu' },
      { title: '向量扩展 (Vector)', value: 'vector', key: 'vector' }
    ]
  }
]

const transferData = [
  { key: 'server-1', title: '编译集群 A (上海)' },
  { key: 'server-2', title: '测试机房 B (杭州)' },
  { key: 'server-3', title: '加速云节点 C (北京)' }
]

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
      <h2>数据录入组件 (Data Entry)</h2>
      <p>数据录入组件提供各种形式的用户信息提交及选择入口。我们将 15 种数据录入组件完全拆分，以展现其独立的各种大小状态及 Spacemit 品牌色样式适配成效。</p>
    </div>

    <!-- 1. AutoComplete 自动完成 -->
    <section id="autocomplete" class="component-section">
      <div class="section-title">
        <h3>AutoComplete 自动完成</h3>
        <span class="component-badge">AutoComplete</span>
      </div>
      <p class="section-desc">输入框的智能联想输入过滤。</p>
      <a-card>
        <a-auto-complete
          v-model:value="autoCompleteValue"
          :options="autoCompleteOptions"
          placeholder="请输入交叉编译工具链 (如 riscv...)"
          style="width: 320px;"
        />
      </a-card>
    </section>

    <!-- 2. Cascader 级联选择 -->
    <section id="cascader" class="component-section">
      <div class="section-title">
        <h3>Cascader 级联选择</h3>
        <span class="component-badge">Cascader</span>
      </div>
      <p class="section-desc">用于多层级结构的分级点选切换。</p>
      <a-card>
        <a-cascader 
          v-model:value="cascaderValue" 
          :options="cascaderOptions" 
          placeholder="选择目标代码文件路径" 
          style="width: 320px;" 
        />
      </a-card>
    </section>

    <!-- 3. Checkbox 多选框 -->
    <section id="checkbox" class="component-section">
      <div class="section-title">
        <h3>Checkbox 多选框</h3>
        <span class="component-badge">Checkbox</span>
      </div>
      <p class="section-desc">复选框可以独立或成组使用。勾选背景色设为高对比品牌色，内部对号为纯黑/纯白。</p>
      <a-card>
        <div>
          <a-typography-title :level="5">单一复选框</a-typography-title>
          <a-checkbox v-model:checked="checkboxSingle">我已同意物理芯片部署与调试协议</a-checkbox>
        </div>
        <a-divider dashed />
        <div>
          <a-typography-title :level="5">复选框组 (Checkbox.Group)</a-typography-title>
          <a-checkbox-group v-model:value="checkboxGroup">
            <a-checkbox value="A">指令解码 (ID)</a-checkbox>
            <a-checkbox value="B">执行单元 (EX)</a-checkbox>
            <a-checkbox value="C">寄存器重命名 (Rename)</a-checkbox>
            <a-checkbox value="D" disabled>回写单元 (WriteBack - 禁用)</a-checkbox>
          </a-checkbox-group>
        </div>
      </a-card>
    </section>

    <!-- 4. DatePicker 日期选择框 -->
    <section id="datepicker" class="component-section">
      <div class="section-title">
        <h3>DatePicker 日期选择框</h3>
        <span class="component-badge">DatePicker</span>
      </div>
      <p class="section-desc">选择日期或日期范围。点击可唤起日历弹窗，查看 Spacemit 品牌色今天、选中态单元格以及范围选中高亮背景的样式适配。</p>
      <a-card>
        <a-space wrap :size="16">
          <a-date-picker placeholder="选择单天日期" />
          <a-date-picker picker="month" placeholder="选择月份" />
          <a-date-picker picker="week" placeholder="选择周" />
          <a-range-picker placeholder="['开始日期', '结束日期']" />
        </a-space>
      </a-card>
    </section>

    <!-- 5. Form 表单 -->
    <section id="form" class="component-section">
      <div class="section-title">
        <h3>Form 表单</h3>
        <span class="component-badge">Form</span>
      </div>
      <p class="section-desc">典型的输入表单排版，支持垂直布局，拥有明确必填项星号提示和提交交互。</p>
      <a-card>
        <a-form :model="formModel" layout="vertical" @submit.prevent="handleFormSubmit" style="max-width: 480px;">
          <a-form-item label="编译仿真申报名称" required>
            <a-input v-model:value="formModel.taskName" placeholder="如: Spacemit-K1-Linux-6.1" />
          </a-form-item>
          <a-form-item label="CPU 核心数量配额">
            <a-input-number v-model:value="formModel.coreCount" :min="1" :max="32" style="width: 100%;" />
          </a-form-item>
          <a-form-item label="模拟平台">
            <a-select v-model:value="formModel.simulator" :options="selectOptions" />
          </a-form-item>
          <a-form-item label="指令集向量扩展 (Vector v1.0)">
            <a-switch v-model:checked="formModel.aiAcceleration" />
          </a-form-item>
          <a-space :size="12">
            <a-button type="primary" html-type="submit">
              <template #icon><rocket-outlined /></template>
              提交仿真任务
            </a-button>
            <a-button @click="formModel.taskName = ''">重置</a-button>
          </a-space>
        </a-form>
      </a-card>
    </section>

    <!-- 6. Input 输入框 -->
    <section id="input" class="component-section">
      <div class="section-title">
        <h3>Input 输入框</h3>
        <span class="component-badge">Input</span>
      </div>
      <p class="section-desc">单行或多行文本输入。展示不同尺寸 (大/中/小)、密码框、搜索框及带前后缀形态。</p>
      <a-card>
        <div>
          <a-typography-title :level="5">不同大小尺寸 (Size)</a-typography-title>
          <a-space wrap :size="12">
            <a-input value="大尺寸 (Large)" size="large" style="width: 200px;" />
            <a-input value="默认尺寸 (Default)" style="width: 200px;" />
            <a-input value="小尺寸 (Small)" size="small" style="width: 200px;" />
          </a-space>
        </div>
        <a-divider dashed />
        <div>
          <a-typography-title :level="5">前缀与后缀 (Prefix & Suffix)</a-typography-title>
          <a-space wrap :size="12">
            <a-input placeholder="带前缀" style="width: 200px;">
              <template #prefix><search-outlined /></template>
            </a-input>
            <a-input value="1.6" suffix="GHz" style="width: 200px;" />
          </a-space>
        </div>
        <a-divider dashed />
        <div>
          <a-typography-title :level="5">特殊输入框 (Password & Search)</a-typography-title>
          <a-space wrap :size="12">
            <a-input-password placeholder="请输入密钥" style="width: 200px;" />
            <a-input-search placeholder="回车执行搜索" enter-button style="width: 240px;" />
          </a-space>
        </div>
      </a-card>
    </section>

    <!-- 7. InputNumber 数字输入框 -->
    <section id="inputnumber" class="component-section">
      <div class="section-title">
        <h3>InputNumber 数字输入框</h3>
        <span class="component-badge">InputNumber</span>
      </div>
      <p class="section-desc">用于数值的输入与微调。</p>
      <a-card>
        <a-space wrap :size="16">
          <a-input-number v-model:value="inputNumberValue" :min="1" :max="64" />
          <a-input-number value="1.6" :step="0.1" string-mode suffix="GHz" />
          <a-input-number :value="8" disabled />
        </a-space>
      </a-card>
    </section>

    <!-- 8. Mentions 提及 -->
    <section id="mentions" class="component-section">
      <div class="section-title">
        <h3>Mentions 提及</h3>
        <span class="component-badge">Mentions</span>
      </div>
      <p class="section-desc">文本输入框的快捷成员 @ 提及呼出。</p>
      <a-card>
        <a-mentions v-model:value="mentionsValue" placeholder="使用 @ 呼出项目成员" style="width: 320px;">
          <a-mentions-option value="CompilerTeam">编译器开发组</a-mentions-option>
          <a-mentions-option value="VerificationTeam">仿真验证部</a-mentions-option>
          <a-mentions-option value="HardwareGroup">硬件内核组</a-mentions-option>
        </a-mentions>
      </a-card>
    </section>

    <!-- 9. Radio 单选框 -->
    <section id="radio" class="component-section">
      <div class="section-title">
        <h3>Radio 单选框</h3>
        <span class="component-badge">Radio</span>
      </div>
      <p class="section-desc">用于在一组互斥选项中点选。</p>
      <a-card>
        <div>
          <a-typography-title :level="5">普通单选组</a-typography-title>
          <a-radio-group v-model:value="radioValue">
            <a-radio value="1">上海芯片研发中心</a-radio>
            <a-radio value="2">杭州 FPGA 验证部</a-radio>
            <a-radio value="3" disabled>北美实验室 (维护中)</a-radio>
          </a-radio-group>
        </div>
        <a-divider dashed />
        <div>
          <a-typography-title :level="5">单选按钮组 (Radio.Button)</a-typography-title>
          <a-space direction="vertical" :size="12">
            <a-radio-group v-model:value="radioGroupValue">
              <a-radio-button value="A">GCC-13</a-radio-button>
              <a-radio-button value="B">LLVM-18</a-radio-button>
              <a-radio-button value="C">Spacemit-Custom-V2</a-radio-button>
            </a-radio-group>
            
            <a-radio-group v-model:value="radioGroupValue" button-style="solid">
              <a-radio-button value="A">GCC-13 (Solid)</a-radio-button>
              <a-radio-button value="B">LLVM-18</a-radio-button>
              <a-radio-button value="C">Spacemit-Custom-V2</a-radio-button>
            </a-radio-group>
          </a-space>
        </div>
      </a-card>
    </section>

    <!-- 10. Rate 评分 -->
    <section id="rate" class="component-section">
      <div class="section-title">
        <h3>Rate 评分</h3>
        <span class="component-badge">Rate</span>
      </div>
      <p class="section-desc">评星打分组件。星星填充色设为标准的金色/黄色。</p>
      <a-card>
        <a-space wrap :size="24">
          <div>
            <span style="font-size: 13px; opacity: 0.7; margin-right: 8px;">任务评估：</span>
            <a-rate v-model:value="rateValue" allow-half />
          </div>
          <div>
            <span style="font-size: 13px; opacity: 0.7; margin-right: 8px;">只读评分：</span>
            <a-rate :value="4.5" allow-half disabled />
          </div>
        </a-space>
      </a-card>
    </section>

    <!-- 11. Select 选择器 -->
    <section id="select" class="component-section">
      <div class="section-title">
        <h3>Select 选择器</h3>
        <span class="component-badge">Select</span>
      </div>
      <p class="section-desc">下拉选择列表。包含单选、多选及带搜索功能的各种形式。</p>
      <a-card>
        <a-space wrap :size="16">
          <a-select v-model:value="selectValue" :options="selectOptions" style="width: 240px;" />
          <a-select 
            v-model:value="selectMultipleValue" 
            mode="multiple" 
            :options="selectOptions" 
            placeholder="支持多选"
            style="width: 320px;" 
          />
          <a-select 
            show-search
            placeholder="支持输入搜索过滤"
            :options="selectOptions" 
            style="width: 240px;" 
          />
        </a-space>
      </a-card>
    </section>

    <!-- 12. Slider 滑块 -->
    <section id="slider" class="component-section">
      <div class="section-title">
        <h3>Slider 滑块</h3>
        <span class="component-badge">Slider</span>
      </div>
      <p class="section-desc">通过滑动来调节比例。滑块的轨道及活动高亮轨道已被精心着色。</p>
      <a-card  style="max-width: 600px;">
        <div>
          <a-typography-title :level="5">单滑块 (当前值: {{ sliderValue }}%)</a-typography-title>
          <a-slider v-model:value="sliderValue" />
        </div>
        <a-divider dashed />
        <div>
          <a-typography-title :level="5">双滑块范围调节 (Range)</a-typography-title>
          <a-slider v-model:value="sliderRangeValue" range />
        </div>
      </a-card>
    </section>

    <!-- 13. Switch 开关 -->
    <section id="switch" class="component-section">
      <div class="section-title">
        <h3>Switch 开关</h3>
        <span class="component-badge">Switch</span>
      </div>
      <p class="section-desc">控制两种完全对立的状态切换。</p>
      <a-card>
        <a-space wrap :size="20">
          <a-switch v-model:checked="switchValue" checked-children="开启" un-checked-children="关闭" />
          <a-switch checked loading />
          <a-switch disabled />
        </a-space>
      </a-card>
    </section>

    <!-- 14. TimePicker 时间选择框 -->
    <section id="timepicker" class="component-section">
      <div class="section-title">
        <h3>TimePicker 时间选择框</h3>
        <span class="component-badge">TimePicker</span>
      </div>
      <p class="section-desc">时间的选择与范围选择。</p>
      <a-card>
        <a-space wrap :size="16">
          <a-time-picker placeholder="选择单点时间" />
          <a-time-range-picker />
        </a-space>
      </a-card>
    </section>

    <!-- 15. Transfer 穿梭框 -->
    <section id="transfer" class="component-section">
      <div class="section-title">
        <h3>Transfer 穿梭框</h3>
        <span class="component-badge">Transfer</span>
      </div>
      <p class="section-desc">在左右两个列表中移动及管理成员选项。</p>
      <a-card>
        <a-transfer
          v-model:target-keys="transferTargetKeys"
          :data-source="transferData"
          :render="(item: any) => item.title"
          style="width: 100%"
        />
      </a-card>
    </section>

    <!-- 16. TreeSelect 树选择 -->
    <section id="treeselect" class="component-section">
      <div class="section-title">
        <h3>TreeSelect 树选择</h3>
        <span class="component-badge">TreeSelect</span>
      </div>
      <p class="section-desc">下拉面板为树形多级层级选择结构。</p>
      <a-card>
        <a-tree-select
          v-model:value="treeSelectValue"
          :tree-data="moduleTreeData"
          tree-default-expand-all
          placeholder="点选芯片架构模块"
          style="width: 320px;"
        />
      </a-card>
    </section>

    <!-- 17. Upload 上传 -->
    <section id="upload" class="component-section">
      <div class="section-title">
        <h3>Upload 上传</h3>
        <span class="component-badge">Upload</span>
      </div>
      <p class="section-desc">支持点击、拖拽等文件上传形式，已精细适配拖拽虚线框与文件列表的背景样式。</p>
      <a-card>
        <div>
          <a-typography-title :level="5">普通按钮上传</a-typography-title>
          <a-upload>
            <a-button>
              <upload-outlined />
              选择固件包并上传
            </a-button>
          </a-upload>
        </div>
        <a-divider dashed />
        <div>
          <a-typography-title :level="5">照片墙形态 (Picture Card)</a-typography-title>
          <a-upload
            list-type="picture-card"
            :file-list="uploadFileList"
          >
            <div>
              <plus-outlined />
              <div style="margin-top: 8px">选择图片</div>
            </div>
          </a-upload>
        </div>
        <a-divider dashed />
        <div>
          <a-typography-title :level="5">拖拽上传区域 (Dragger)</a-typography-title>
          <a-upload-dragger name="files" multiple>
            <p class="ant-upload-drag-icon" style="color: var(--color-primary-text);">
              <inbox-outlined />
            </p>
            <p class="ant-upload-text">点击或拖拽固件压缩包到此区域进行上传</p>
            <p class="ant-upload-hint">支持 .bin, .img, .tar 格式，限制 50MB 以内</p>
          </a-upload-dragger>
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
  background: var(--bg-badge, #f2ffdc);
  color: var(--color-primary-text, #4ea100);
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

.form-grid-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.form-actions {
  display: flex;
  gap: 16px;
  justify-content: flex-start;
}
.switch-box-custom {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 0;
}
.switch-desc {
  font-size: 12px;
  opacity: 0.6;
}

@media (max-width: 768px) {
  .form-grid-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
