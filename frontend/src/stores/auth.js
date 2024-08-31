import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', { email, password })
        this.token = response.data.token
        this.user = response.data.user
        localStorage.setItem('token', this.token)
        return true
      } catch (error) {
        console.error('Erro no login:', error)
        return false
      }
    },
    async register(name, email, password) {
      try {
        await axios.post('http://localhost:3000/api/auth/register', { name, email, password })
        return true
      } catch (error) {
        console.error('Erro no registro:', error)
        return false
      }
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },
    async checkAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
        try {
          const response = await axios.get('http://localhost:3000/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          })
          this.user = response.data
        } catch (error) {
          this.logout()
        }
      }
    },
  },
})