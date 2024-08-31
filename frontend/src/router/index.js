import { createRouter, createWebHistory } from 'vue-router'
import { requireAuth } from './guards'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/grupos',
      name: 'grupos',
      component: () => import('../views/GroupsView.vue'),
      beforeEnter: requireAuth
    },
    {
      path: '/despesas',
      name: 'despesas',
      component: () => import('../views/ExpensesView.vue'),
      beforeEnter: requireAuth
    }
  ]
})

export default router