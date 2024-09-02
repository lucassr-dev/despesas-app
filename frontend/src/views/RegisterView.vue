<template>
  <div class="max-w-md mx-auto">
    <h2 class="text-3xl font-bold mb-6 text-center">Criar Conta</h2>
    <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Nome
        </label>
        <input
          v-model="name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Seu nome"
          required
        >
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input
          v-model="email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="seu@email.com"
          required
        >
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Senha
        </label>
        <input
          v-model="password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
          required
        >
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Registrar
        </button>
        <router-link
          to="/login"
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        >
          Já tem uma conta? Faça login
        </router-link>
      </div>
    </form>
    <p v-if="error" class="text-red-500 text-xs italic">{{ error }}</p>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

const handleSubmit = async () => {
  try {
    await authStore.register(name.value, email.value, password.value)
    await authStore.login(email.value, password.value)
    router.push('/dashboard')
  } catch (err) {
    error.value = 'Ocorreu um erro durante o registro. Por favor, tente novamente.'
  }
}
</script>