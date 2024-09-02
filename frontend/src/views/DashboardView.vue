<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Meus Grupos</h1>
    
    <button @click="showNewGroupModal = true" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6">
      Criar Novo Grupo
    </button>

    <div v-if="groups.length === 0" class="text-gray-600">
      Você ainda não tem grupos. Crie um novo grupo para começar!
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="group in groups" :key="group.id" class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-2">{{ group.name }}</h2>
        <p class="text-gray-600 mb-4">{{ group.description }}</p>
        <div class="flex justify-between">
          <button @click="viewGroupDetails(group.id)" class="text-blue-500 hover:text-blue-700">
            Ver Detalhes
          </button>
          <button @click="editGroup(group)" class="text-yellow-500 hover:text-yellow-700">
            Editar
          </button>
          <button @click="deleteGroup(group.id)" class="text-red-500 hover:text-red-700">
            Excluir
          </button>
        </div>
      </div>
    </div>

    <!-- Modal para criar/editar grupo -->
    <div v-if="showNewGroupModal || showEditGroupModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">
          {{ showNewGroupModal ? 'Criar Novo Grupo' : 'Editar Grupo' }}
        </h3>
        <form @submit.prevent="showNewGroupModal ? createGroup() : updateGroup()">
          <div class="mb-4">
            <label for="groupName" class="block text-gray-700 text-sm font-bold mb-2">Nome do Grupo</label>
            <input v-model="currentGroup.name" type="text" id="groupName" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
          </div>
          <div class="mb-4">
            <label for="groupDescription" class="block text-gray-700 text-sm font-bold mb-2">Descrição</label>
            <textarea v-model="currentGroup.description" id="groupDescription" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="3"></textarea>
          </div>
          <div class="flex items-center justify-between">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              {{ showNewGroupModal ? 'Criar' : 'Atualizar' }}
            </button>
            <button @click="closeGroupModal" type="button" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal para detalhes do grupo -->
    <div v-if="showGroupDetailsModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div class="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
        <h4 class="text-xl font-medium mb-2">Convidar Membro</h4>
      <form @submit.prevent="inviteMember" class="mb-4">
        <input v-model="inviteEmail" type="email" placeholder="Email do membro" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2">
        <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Convidar
        </button>
      </form>
        <h3 class="text-2xl font-medium leading-6 text-gray-900 mb-4">
          {{ currentGroup.name }}
        </h3>
        <p class="text-gray-600 mb-4">{{ currentGroup.description }}</p>
        
        <h4 class="text-xl font-medium mb-2">Membros</h4>
        <ul class="mb-4">
          <li v-for="member in currentGroup.members" :key="member.id">
            {{ member.name }} ({{ member.email }})
          </li>
        </ul>

        <h4 class="text-xl font-medium mb-2">Despesas</h4>
        <button @click="showNewExpenseModal = true" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
          Adicionar Despesa
        </button>
        <table class="w-full mb-4">
          <thead>
            <tr>
              <th class="text-left">Descrição</th>
              <th class="text-left">Valor</th>
              <th class="text-left">Pago por</th>
              <th class="text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="expense in currentGroup.expenses" :key="expense.id">
              <td>{{ expense.description }}</td>
              <td>{{ expense.amount }}</td>
              <td>{{ expense.paidBy.name }}</td>
              <td>
                <button @click="editExpense(expense)" class="text-yellow-500 hover:text-yellow-700 mr-2">
                  Editar
                </button>
                <button @click="deleteExpense(expense.id)" class="text-red-500 hover:text-red-700">
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <h4 class="text-xl font-medium mb-2">Saldos</h4>
        <table class="w-full mb-4">
          <thead>
            <tr>
              <th class="text-left">Membro</th>
              <th class="text-left">Saldo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="balance in currentGroup.balances" :key="balance.userId">
              <td>{{ balance.userName }}</td>
              <td :class="balance.balance > 0 ? 'text-green-500' : 'text-red-500'">
                {{ balance.balance > 0 ? '+' : '' }}{{ balance.balance }}
              </td>
            </tr>
          </tbody>
        </table>

        <button @click="closeGroupDetailsModal" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Fechar
        </button>
      </div>
    </div>

    <!-- Modal para criar/editar despesa -->
    <div v-if="showNewExpenseModal || showEditExpenseModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">
          {{ showNewExpenseModal ? 'Adicionar Nova Despesa' : 'Editar Despesa' }}
        </h3>
        <form @submit.prevent="showNewExpenseModal ? createExpense() : updateExpense()">
          <div class="mb-4">
            <label for="expenseDescription" class="block text-gray-700 text-sm font-bold mb-2">Descrição</label>
            <input v-model="currentExpense.description" type="text" id="expenseDescription" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
          </div>
          <div class="mb-4">
            <label for="expenseAmount" class="block text-gray-700 text-sm font-bold mb-2">Valor</label>
            <input v-model="currentExpense.amount" type="number" step="0.01" id="expenseAmount" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
          </div>
          <div class="mb-4">
            <label for="expensePaidBy" class="block text-gray-700 text-sm font-bold mb-2">Pago por</label>
            <select v-model="currentExpense.paidById" id="expensePaidBy" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
              <option v-for="member in currentGroup.members" :key="member.id" :value="member.id">
                {{ member.name }}
              </option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Participantes</label>
            <div v-for="member in currentGroup.members" :key="member.id" class="flex items-center mb-2">
              <input
                type="checkbox"
                :id="'participant-' + member.id"
                :value="member.id"
                v-model="currentExpense.participantIds"
                class="mr-2"
              >
              <label :for="'participant-' + member.id">{{ member.name }}</label>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              {{ showNewExpenseModal ? 'Adicionar' : 'Atualizar' }}
            </button>
            <button @click="closeExpenseModal" type="button" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const inviteEmail = ref('')
const groups = ref([])
const currentGroup = ref({ name: '', description: '' })
const currentExpense = ref({ description: '', amount: 0, paidById: null, participantIds: [] })

const showNewGroupModal = ref(false)
const showEditGroupModal = ref(false)
const showGroupDetailsModal = ref(false)
const showNewExpenseModal = ref(false)
const showEditExpenseModal = ref(false)

const fetchGroups = async () => {
  try {
    const response = await api.get('/groups')
    groups.value = response.data
  } catch (error) {
    console.error('Erro ao buscar grupos:', error)
    // Adicione uma notificação de erro aqui
  }
}

const inviteMember = async () => {
  try {
    await api.post(`/groups/${currentGroup.value.id}/invite`, { email: inviteEmail.value })
    alert('Convite enviado com sucesso!')
    inviteEmail.value = ''
    await viewGroupDetails(currentGroup.value.id)
  } catch (error) {
    console.error('Erro ao convidar membro:', error)
    alert('Erro ao convidar membro. Por favor, tente novamente.')
  }
}

const createGroup = async () => {
  try {
    await api.post('/groups', currentGroup.value)
    await fetchGroups()
    closeGroupModal()
  } catch (error) {
    console.error('Erro ao criar grupo:', error)
    // Adicione uma notificação de erro aqui
  }
}

const updateGroup = async () => {
  try {
    await api.put(`/groups/${currentGroup.value.id}`, currentGroup.value)
    await fetchGroups()
    closeGroupModal()
  } catch (error) {
    console.error('Erro ao atualizar grupo:', error)
    // Adicione uma notificação de erro aqui
  }
}

const deleteGroup = async (groupId) => {
  if (confirm('Tem certeza que deseja excluir este grupo?')) {
    try {
      await api.delete(`/groups/${groupId}`)
      await fetchGroups()
    } catch (error) {
      console.error('Erro ao excluir grupo:', error)
      // Adicione uma notificação de erro aqui
    }
  }
}

const viewGroupDetails = async (groupId) => {
  try {
    const response = await api.get(`/groups/${groupId}`)
    currentGroup.value = response.data
    const expensesResponse = await api.get(`/expenses/group/${groupId}`)
    currentGroup.value.expenses = expensesResponse.data
    const balancesResponse = await api.get(`/expenses/group/${groupId}/balances`)
    currentGroup.value.balances = balancesResponse.data
    showGroupDetailsModal.value = true
  } catch (error) {
    console.error('Erro ao buscar detalhes do grupo:', error)
  }
}

const editGroup = (group) => {
  currentGroup.value = { ...group }
  showEditGroupModal.value = true
}

const createExpense = async () => {
  try {
    await api.post('/expenses', {
      ...currentExpense.value,
      groupId: currentGroup.value.id
    })
    await viewGroupDetails(currentGroup.value.id)
    closeExpenseModal()
  } catch (error) {
    console.error('Erro ao criar despesa:', error)
    // Adicione uma notificação de erro aqui
  }
}

const updateExpense = async () => {
  try {
    await api.put(`/expenses/${currentExpense.value.id}`, currentExpense.value)
    await viewGroupDetails(currentGroup.value.id)
    closeExpenseModal()
  } catch (error) {
    console.error('Erro ao atualizar despesa:', error)
    // Adicione uma notificação de erro aqui
  }
}

const deleteExpense = async (expenseId) => {
  if (confirm('Tem certeza que deseja excluir esta despesa?')) {
    try {
      await api.delete(`/expenses/${expenseId}`)
      await viewGroupDetails(currentGroup.value.id)
    } catch (error) {
      console.error('Erro ao excluir despesa:', error)
      // Adicione uma notificação de erro aqui
    }
  }
}

const editExpense = (expense) => {
  currentExpense.value = { ...expense, participantIds: expense.participants.map(p => p.id) }
  showEditExpenseModal.value = true
}

const closeGroupModal = () => {
  showNewGroupModal.value = false
  showEditGroupModal.value = false
  currentGroup.value = { name: '', description: '' }
}

const closeExpenseModal = () => {
  showNewExpenseModal.value = false
  showEditExpenseModal.value = false
  currentExpense.value = { description: '', amount: 0, paidById: null, participantIds: [] }
}

const closeGroupDetailsModal = () => {
  showGroupDetailsModal.value = false
  currentGroup.value = { name: '', description: '' }
}

onMounted(() => {
  fetchGroups()
})
</script>