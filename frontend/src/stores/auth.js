import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token')
  }),
  getters: {
    isLoggedIn: (state) => !!state.token
  },
  actions: {
    async login(email, password) {
      const response = await api.post('/users/login', { email, password })
      this.token = response.data.token
      this.user = response.data.user
      localStorage.setItem('token', this.token)
    },
    async register(name, email, password) {
      const response = await api.post('/users/register', { name, email, password })
      this.token = response.data.token
      this.user = response.data.user
      localStorage.setItem('token', this.token)
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    }
  }
})