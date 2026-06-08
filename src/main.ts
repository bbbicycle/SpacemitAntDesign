import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'

// 引入 Ant Design Vue 4.x 官方样式重置
import 'ant-design-vue/dist/reset.css'
// 引入本地自定义全局样式
import './index.css'

const app = createApp(App)

// 注册 Ant Design Vue 组件库
app.use(Antd)

app.mount('#app')
