import { useAuthStore } from '@/stores/auth'

export function requireAuth(to, from, next) {
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
}