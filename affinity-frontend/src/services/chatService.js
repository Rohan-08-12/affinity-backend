import api from './api'

export const chatService = {
  async startSession(prompt) {
    const response = await api.post('/chats/start', { prompt })
    return response.data
  },

  async continueSession(sessionId, prompt) {
    const response = await api.post('/chats/continue', { sessionId, prompt })
    return response.data
  },

  async getSession(sessionId) {
    const response = await api.get(`/chats/session/${sessionId}`)
    return response.data
  },

  async getChatHistory() {
    const response = await api.get('/chats/history')
    return response.data
  },
}

