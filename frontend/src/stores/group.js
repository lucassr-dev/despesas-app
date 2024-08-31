import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useGroupStore = defineStore('group', {
  state: () => ({
    groups: [],
  }),
  actions: {
    async fetchGroups() {
      const authStore = useAuthStore()
      try {
        const response = await axios.get('http://localhost:3000/api/groups', {
          headers: { Authorization: `Bearer ${authStore.token}` }
        })
        this.groups = response.data
      } catch (error) {
        console.error('Erro ao buscar grupos:', error)
      }
    },
    async createGroup(name, description) {
      const authStore = useAuthStore()
      try {
        const response = await axios.post('http://localhost:3000/api/groups/create', 
          { name, description },
          { headers: { Authorization: `Bearer ${authStore.token}` } }
        )
        this.groups.push(response.data.group)
        return true
      } catch (error) {
        console.error('Erro ao criar grupo:', error)
        return false
      }
    },
    async inviteUser(groupId, email) {
      const authStore = useAuthStore()
      try {
        await axios.post('http://localhost:3000/api/groups/invite', 
          { groupId, email },
          { headers: { Authorization: `Bearer ${authStore.token}` } }
        )
        return true
      } catch (error) {
        console.error('Erro ao convidar usuário:', error)
        return false
      }
    }
  }
})