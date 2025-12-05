import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/add-vehicle',
      name: 'AddVehicle',
      component: () => import('../views/AddVehicleView.vue')
    }
  ],
})

export default router
