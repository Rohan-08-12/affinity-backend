import { useState, useEffect } from 'react'
import { moodService } from '../services/moodService'
import { Heart, Plus, Calendar, TrendingUp } from 'lucide-react'

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const MOODS = [
  { id: 'happy', emoji: '😊', label: 'Happy', color: 'yellow' },
  { id: 'calm', emoji: '😌', label: 'Calm', color: 'blue' },
  { id: 'anxious', emoji: '😟', label: 'Anxious', color: 'orange' },
  { id: 'sad', emoji: '😢', label: 'Sad', color: 'blue' },
  { id: 'angry', emoji: '😠', label: 'Angry', color: 'red' },
  { id: 'excited', emoji: '🤩', label: 'Excited', color: 'purple' },
  { id: 'tired', emoji: '😴', label: 'Tired', color: 'gray' },
  { id: 'confused', emoji: '😕', label: 'Confused', color: 'gray' },
]

const MoodTab = () => {
  const [moodHistory, setMoodHistory] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedMood, setSelectedMood] = useState(null)
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      const data = await moodService.getMoodHistory()
      setMoodHistory(data || [])
    } catch (error) {
      console.error('Failed to load mood history:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedMood) return

    setLoading(true)
    try {
      await moodService.logMood(selectedMood.id, note)
      setSelectedMood(null)
      setNote('')
      setShowForm(false)
      loadHistory()
    } catch (error) {
      console.error('Failed to log mood:', error)
    } finally {
      setLoading(false)
    }
  }

  const getMoodEmoji = (moodName) => {
    const mood = MOODS.find(m => m.id === moodName)
    return mood ? mood.emoji : '😐'
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Mood Tracker</h2>
        <p className="text-gray-600">Track your emotional journey</p>
      </div>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="mb-6 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          <Plus className="w-5 h-5" />
          Log My Mood
        </button>
      ) : (
        <div className="mb-6 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">How are you feeling today?</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-4 gap-3">
              {MOODS.map((mood) => (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() => setSelectedMood(mood)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedMood?.id === mood.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-4xl mb-2">{mood.emoji}</div>
                  <div className="text-sm text-gray-700">{mood.label}</div>
                </button>
              ))}
            </div>

            {selectedMood && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add a note (optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Tell us more about how you're feeling..."
                  className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading || !selectedMood}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Mood'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setSelectedMood(null)
                  setNote('')
                }}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-bold text-gray-800">Mood History</h3>
        </div>

        {moodHistory.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No mood entries yet</p>
            <p className="text-gray-400 text-sm mt-2">Start tracking your moods daily</p>
          </div>
        ) : (
          <div className="space-y-3">
            {moodHistory.map((entry, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="text-3xl">{getMoodEmoji(entry.mood)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(entry.date)}</span>
                  </div>
                  {entry.note && (
                    <p className="text-gray-700 mt-1">{entry.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MoodTab

