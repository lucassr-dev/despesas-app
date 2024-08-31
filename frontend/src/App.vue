<script setup>
import {  onMounted } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  authStore.checkAuth()
})

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <header class="bg-white shadow-md">
      <nav class="container mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <RouterLink to="/" class="text-gray-700 hover:text-gray-900">Início</RouterLink>
          <RouterLink to="/grupos" class="text-gray-700 hover:text-gray-900">Grupos</RouterLink>
          <RouterLink to="/despesas" class="text-gray-700 hover:text-gray-900">Despesas</RouterLink>
        </div>
        <div class="text-2xl font-bold text-blue-600">
          ExpenseShare
        </div>
        <div>
          <template v-if="!authStore.isAuthenticated">
            <RouterLink to="/login" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2">Login</RouterLink>
            <RouterLink to="/register" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Cadastro</RouterLink>
          </template>
          <button v-else @click="logout" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Logout</button>
        </div>
      </nav>
    </header>

    <main class="flex-grow">
      <RouterView />
    </main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

body {
  font-family: 'Poppins', sans-serif;
}
</style>