<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isLoggedIn = computed(() => authStore.isLoggedIn)

const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-md">
      <div class="container mx-auto px-6 py-3 flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <router-link to="/" class="text-gray-800 hover:text-blue-600">Home</router-link>
          <router-link to="/dashboard" class="text-gray-800 hover:text-blue-600">Dashboard</router-link>
        </div>
        <div class="text-2xl font-bold text-blue-600">
          <span class="animate-pulse">ExpenseShare</span>
        </div>
        <div>
          <button v-if="isLoggedIn" @click="logout" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Logout
          </button>
          <router-link v-else to="/login" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </router-link>
        </div>
      </div>
    </nav>

    <main class="container mx-auto px-6 py-8">
      <router-view></router-view>
    </main>
  </div>
</template>
