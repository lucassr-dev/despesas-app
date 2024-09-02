import { defineStore } from 'pinia'
import axios from 'axios'
import { API_BASE_URL } from '@/config'

export const useExpenseStore = defineStore('expense', {
  state: () => ({
    expenses: {},
  }),
  actions: {
    async fetchExpenses(groupId) {
      try {
        const response = await axios.get(`${API_BASE_URL}/expenses/group/${groupId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        this.expenses[groupId] = response.data
        return response.data
      } catch (error) {
        console.error('Erro ao buscar despesas:', error)
        throw error
      }
    },
    async createExpense(groupId, { description, amount, participantIds }) {
      try {
        const response = await axios.post(`${API_BASE_URL}/expenses/create`, 
          { groupId, description, amount, participantIds },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        )
        if (!this.expenses[groupId]) {
          this.expenses[groupId] = []
        }
        this.expenses[groupId].push(response.data.expense)
        return true
      } catch (error) {
        console.error('Erro ao criar despesa:', error)
        return false
      }
    },
    async updateExpense(expenseId, { description, amount, participantIds }) {
      try {
        const response = await axios.put(`${API_BASE_URL}/expenses/${expenseId}`, 
          { description, amount, participantIds },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        )
        // Atualizar a despesa no state
        for (const groupId in this.expenses) {
          const index = this.expenses[groupId].findIndex(e => e.id === expenseId)
          if (index !== -1) {
            this.expenses[groupId][index] = response.data.expense
            break
          }
        }
        return true
      } catch (error) {
        console.error('Erro ao atualizar despesa:', error)
        return false
      }
    },
    async deleteExpense(expenseId) {
      try {
        await axios.delete(`${API_BASE_URL}/expenses/${expenseId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        // Remover a despesa do state
        for (const groupId in this.expenses) {
          this.expenses[groupId] = this.expenses[groupId].filter(e => e.id !== expenseId)
        }
        return true
      } catch (error) {
        console.error('Erro ao excluir despesa:', error)
        return false
      }
    },
    async getBalances(groupId) {
      try {
        const response = await axios.get(`${API_BASE_URL}/expenses/group/${groupId}/balances`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        return response.data
      } catch (error) {
        console.error('Erro ao buscar saldos:', error)
        throw error
      }
    }
  }
})