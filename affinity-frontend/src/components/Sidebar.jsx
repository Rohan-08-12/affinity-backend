import { MessageCircle, BookOpen, Heart, Bell, Calendar } from 'lucide-react'

const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'mood', label: 'Mood Tracker', icon: Heart },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 shadow-lg">
      <nav className="p-4 space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
              <span className="font-medium">{tab.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar

