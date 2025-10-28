import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Sidebar from '../components/Sidebar'
import ChatTab from '../components/ChatTab'
import JournalTab from '../components/JournalTab'
import MoodTab from '../components/MoodTab'
import NotificationsTab from '../components/NotificationsTab'
import { LogOut, Heart, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('chat')
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                <Sparkles className="w-5 h-5 text-purple-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Affinity</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'chat' && <ChatTab />}
          {activeTab === 'journal' && <JournalTab />}
          {activeTab === 'mood' && <MoodTab />}
          {activeTab === 'notifications' && <NotificationsTab />}
        </main>
      </div>
    </div>
  )
}

export default Dashboard

