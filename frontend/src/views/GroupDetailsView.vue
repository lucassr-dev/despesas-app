<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800">{{ group ? group.name : 'Detalhes do Grupo' }}</h1>
      <button @click="$router.push('/grupos')" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out">
        Voltar para Grupos
      </button>
    </div>

    <div v-if="group">
      <p class="text-gray-600 mb-8">{{ group.description }}</p>

      <!-- Lista de despesas -->
      <div v-if="expenses.length > 0">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">Despesas do Grupo</h2>
        <div class="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <table class="w-full">
            <thead class="bg-gray-100">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pago por</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="expense in expenses" :key="expense.id">
                <td class="px-6 py-4 whitespace-nowrap">{{ expense.description }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ formatCurrency(expense.amount) }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ expense.paidBy.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(expense.date) }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button @click="editExpense(expense)" class="text-blue-600 hover:text-blue-900 mr-2">Editar</button>
                  <button @click="deleteExpense(expense.id)" class="text-red-600 hover:text-red-900">Excluir</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <p v-else class="text-xl text-gray-600 mb-8">Este grupo ainda não tem despesas.</p>

      <!-- Formulário para adicionar/editar despesa -->
      <div class="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800">{{ editingExpense ? 'Editar Despesa' : 'Adicionar Nova Despesa' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="expenseDescription" class="block text-gray-700 font-bold mb-2">Descrição</label>
            <input type="text" id="expenseDescription" v-model="newExpense.description" required
                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>
          <div class="mb-4">
            <label for="expenseAmount" class="block text-gray-700 font-bold mb-2">Valor</label>
            <input type="number" id="expenseAmount" v-model="newExpense.amount" step="0.01" required
                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 font-bold mb-2">Participantes</label>
            <div v-for="member in group.members" :key="member.id" class="flex items-center mb-2">
              <input type="checkbox" :id="'member-' + member.id" :value="member.id" v-model="newExpense.participantIds"
                     class="mr-2">
              <label :for="'member-' + member.id">{{ member.name }}</label>
            </div>
          </div>
          <div class="flex justify-between">
            <button type="submit" 
                    class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
              {{ editingExpense ? 'Atualizar Despesa' : 'Adicionar Despesa' }}
            </button>
            <button v-if="editingExpense" @click="cancelEdit" type="button"
                    class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <!-- Saldos do grupo -->
      <div v-if="balances.length > 0" class="bg-white shadow-lg rounded-lg p-6">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800">Saldos do Grupo</h2>
        <ul>
          <li v-for="balance in balances" :key="balance.userId" class="mb-2">
            <span class="font-semibold">{{ balance.userName }}:</span> 
            <span :class="balance.balance >= 0 ? 'text-green-600' : 'text-red-600'">
              {{ formatCurrency(balance.balance) }}
            </span>
          </li>
        </ul>
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
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useGroupStore } from '@/stores/group'
import { useExpenseStore } from '@/stores/expense'

const route = useRoute()
const groupStore = useGroupStore()
const expenseStore = useExpenseStore()

const group = ref(null)
const expenses = ref([])
const balances = ref([])
const newExpense = ref({ description: '', amount: null, participantIds: [] })
const editingExpense = ref(null)
const errors = ref({})
const notification = ref({ show: false, message: '', type: 'success' })

const groupId = computed(() => route.params.id)

onMounted(async () => {
  await loadGroupDetails()
})

const loadGroupDetails = async () => {
  group.value = await groupStore.getGroupById(groupId.value)
  await loadExpenses()
  await loadBalances()
}

const loadExpenses = async () => {
  expenses.value = await expenseStore.fetchExpenses(groupId.value)
}

const loadBalances = async () => {
  balances.value = await expenseStore.getBalances(groupId.value)
}

const validateForm = () => {
  errors.value = {}
  if (!newExpense.value.description.trim()) {
    errors.value.description = 'A descrição é obrigatória'
  }
  if (!newExpense.value.amount || newExpense.value.amount <= 0) {
    errors.value.amount = 'O valor deve ser maior que zero'
  }
  if (newExpense.value.participantIds.length === 0) {
    errors.value.participantIds = 'Selecione pelo menos um participante'
  }
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return

  if (editingExpense.value) {
    await updateExpense()
  } else {
    await createExpense()
  }
}

const createExpense = async () => {
  const success = await expenseStore.createExpense(groupId.value, newExpense.value)
  if (success) {
    resetForm()
    showNotification('Despesa adicionada com sucesso!', 'success')
    await loadExpenses()
    await loadBalances()
  } else {
    showNotification('Erro ao adicionar despesa. Por favor, tente novamente.', 'error')
  }
}

const updateExpense = async () => {
  const success = await expenseStore.updateExpense(editingExpense.value.id, newExpense.value)
  if (success) {
    resetForm()
    showNotification('Despesa atualizada com sucesso!', 'success')
    await loadExpenses()
    await loadBalances()
  } else {
    showNotification('Erro ao atualizar despesa. Por favor, tente novamente.', 'error')
  }
}

const editExpense = (expense) => {
  editingExpense.value = expense
  newExpense.value = { ...expense, participantIds: expense.participants.map(p => p.id) }
}

const deleteExpense = async (expenseId) => {
  if (confirm('Tem certeza que deseja excluir esta despesa?')) {
    const success = await expenseStore.deleteExpense(expenseId)
    if (success) {
      showNotification('Despesa excluída com sucesso!', 'success')
      await loadExpenses()
      await loadBalances()
    } else {
      showNotification('Erro ao excluir despesa. Por favor, tente novamente.', 'error')
    }
  }
}

const cancelEdit = () => {
  resetForm()
}

const resetForm = () => {
  newExpense.value = { description: '', amount: null, participantIds: [] }
  editingExpense.value = null
  errors.value = {}
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR')
}

const showNotification = (message, type) => {
  notification.value = { show: true, message, type }
  setTimeout(() => {
    notification.value.show = false
  }, 3000)
}
</script>