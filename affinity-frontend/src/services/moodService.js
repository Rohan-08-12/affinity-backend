import api from './api'

export const moodService = {
  async getMoodHistory() {
    const response = await api.get('/moods')
    return response.data
  },

  async logMood(mood, note) {
    const response = await api.post('/moods', { mood, note })
    return response.data
  },
}

