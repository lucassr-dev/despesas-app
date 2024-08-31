<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8 text-gray-800">Meus Grupos</h1>
    
    <!-- Lista de grupos -->
    <div v-if="groupStore.groups.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div v-for="group in groupStore.groups" :key="group.id" 
           class="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
        <div class="p-6">
          <h2 class="text-2xl font-semibold text-gray-800 mb-2">{{ group.name }}</h2>
          <p class="text-gray-600 mb-4">{{ group.description }}</p>
          <button @click="showInviteModal(group.id)" 
                  class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out transform hover:-translate-y-1">
            Convidar Membro
          </button>
        </div>
      </div>
    </div>
    <p v-else class="text-xl text-gray-600 mb-8">Você ainda não tem grupos. Crie um novo grupo para começar!</p>

    <!-- Formulário para criar novo grupo -->
    <div class="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-6 text-gray-800">Criar Novo Grupo</h2>
      <form @submit.prevent="createGroup">
        <div class="mb-4">
          <label for="groupName" class="block text-gray-700 font-bold mb-2">Nome do Grupo</label>
          <input type="text" id="groupName" v-model="newGroup.name" required
                 class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <div class="mb-6">
          <label for="groupDescription" class="block text-gray-700 font-bold mb-2">Descrição</label>
          <textarea id="groupDescription" v-model="newGroup.description" rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>
        <button type="submit" 
                class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
          Criar Grupo
        </button>
      </form>
    </div>

    <!-- Modal para convidar membro -->
    <div v-if="showInvite" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800">Convidar Membro</h2>
        <input type="email" v-model="inviteEmail" placeholder="E-mail do membro"
               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6">
        <div class="flex justify-end">
          <button @click="inviteUser" 
                  class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-2 transition duration-300 ease-in-out transform hover:-translate-y-1">
            Convidar
          </button>
          <button @click="showInvite = false" 
                  class="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
            Cancelar
          </button>
        </div>
      </div>
    </div>

    <!-- Notificações -->
    <div v-if="notification.show" 
         :class="['fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white', 
                  notification.type === 'success' ? 'bg-green-500' : 'bg-red-500']">
      {{ notification.message }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useGroupStore } from '@/stores/group'

const groupStore = useGroupStore()

const newGroup = ref({ name: '', description: '' })
const showInvite = ref(false)
const inviteEmail = ref('')
const currentGroupId = ref(null)
const notification = ref({ show: false, message: '', type: 'success' })

onMounted(() => {
  groupStore.fetchGroups()
})

const createGroup = async () => {
  const success = await groupStore.createGroup(newGroup.value.name, newGroup.value.description)
  if (success) {
    newGroup.value = { name: '', description: '' }
    showNotification('Grupo criado com sucesso!', 'success')
  } else {
    showNotification('Erro ao criar grupo. Por favor, tente novamente.', 'error')
  }
}

const showInviteModal = (groupId) => {
  currentGroupId.value = groupId
  showInvite.value = true
}

const inviteUser = async () => {
  if (currentGroupId.value && inviteEmail.value) {
    const success = await groupStore.inviteUser(currentGroupId.value, inviteEmail.value)
    if (success) {
      showNotification('Convite enviado com sucesso!', 'success')
      showInvite.value = false
      inviteEmail.value = ''
    } else {
      showNotification('Erro ao enviar convite. Por favor, tente novamente.', 'error')
    }
  }
}

const showNotification = (message, type) => {
  notification.value = { show: true, message, type }
  setTimeout(() => {
    notification.value.show = false
  }, 3000)
}
</script>