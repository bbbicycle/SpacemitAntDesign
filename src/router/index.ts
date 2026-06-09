import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainLayout from '../pages/MainLayout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: MainLayout,
    redirect: '/overview',
    children: [
      {
        path: 'components/theme-tokens',
        name: 'ThemeTokens',
        component: () => import('../pages/categories/ThemeTokens.vue'),
        meta: { title: '设计令牌 - Spacemit Ant Design Vue' }
      },
      {
        path: 'components/data-display',
        name: 'DataDisplay',
        component: () => import('../pages/categories/DataDisplay.vue'),
        meta: { title: '数据展示 - Spacemit Ant Design Vue' }
      },
      {
        path: 'overview',
        name: 'Overview',
        component: () => import('../pages/Overview.vue'),
        meta: { title: '组件总览 - Spacemit Ant Design Vue' }
      },
      {
        path: 'components/general',
        name: 'General',
        component: () => import('../pages/categories/General.vue'),
        meta: { title: '通用组件 - Spacemit Ant Design Vue' }
      },
      {
        path: 'components/layout',
        name: 'Layout',
        component: () => import('../pages/categories/Layout.vue'),
        meta: { title: '布局组件 - Spacemit Ant Design Vue' }
      },
      {
        path: 'components/navigation',
        name: 'Navigation',
        component: () => import('../pages/categories/Navigation.vue'),
        meta: { title: '导航组件 - Spacemit Ant Design Vue' }
      },
      {
        path: 'components/data-entry',
        name: 'DataEntry',
        component: () => import('../pages/categories/DataEntry.vue'),
        meta: { title: '数据录入组件 - Spacemit Ant Design Vue' }
      },
      {
        path: 'components/feedback',
        name: 'Feedback',
        component: () => import('../pages/categories/Feedback.vue'),
        meta: { title: '反馈组件 - Spacemit Ant Design Vue' }
      },
      {
        path: 'components/other',
        name: 'Other',
        component: () => import('../pages/categories/Other.vue'),
        meta: { title: '其他组件 - Spacemit Ant Design Vue' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// 设置页面 Title
router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
})

export default router
