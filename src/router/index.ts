import { createRouter, createWebHistory } from 'vue-router'
import MyTasksPage from '@/pages/MyTasksPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'tasks',
      component: MyTasksPage
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import('@/pages/ArchivePage.vue')
    }
  ]
})

export default router
