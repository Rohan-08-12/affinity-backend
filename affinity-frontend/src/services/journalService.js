import api from './api'

export const journalService = {
  async getEntries() {
    const response = await api.get('/journals')
    return response.data
  },

  async createEntry(entry) {
    const response = await api.post('/journals', { entry })
    return response.data
  },

  async deleteEntry(id) {
    const response = await api.delete(`/journals/${id}`)
    return response.data
  },
}

