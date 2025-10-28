import { useState, useEffect } from 'react'
import { journalService } from '../services/journalService'
import { BookOpen, Plus, Calendar } from 'lucide-react'

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const JournalTab = () => {
  const [entries, setEntries] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [entryText, setEntryText] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadEntries()
  }, [])

  const loadEntries = async () => {
    try {
      const data = await journalService.getEntries()
      setEntries(data || [])
    } catch (error) {
      console.error('Failed to load entries:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!entryText.trim()) return

    setLoading(true)
    try {
      await journalService.createEntry(entryText)
      setEntryText('')
      setShowForm(false)
      loadEntries()
    } catch (error) {
      console.error('Failed to save entry:', error)
    } finally {
      setLoading(false)
    }
  }

  // TODO: Implement delete functionality when backend supports it
  // const handleDelete = async (id) => {
  //   if (!window.confirm('Are you sure you want to delete this entry?')) return
  //   try {
  //     await journalService.deleteEntry(id)
  //     loadEntries()
  //   } catch (error) {
  //     console.error('Failed to delete entry:', error)
  //   }
  // }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Journal</h2>
        <p className="text-gray-600">Record your thoughts and feelings</p>
      </div>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="mb-6 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          <Plus className="w-5 h-5" />
          New Entry
        </button>
      ) : (
        <div className="mb-6 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">New Journal Entry</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={entryText}
              onChange={(e) => setEntryText(e.target.value)}
              placeholder="How are you feeling today? What's on your mind?"
              className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              disabled={loading}
            />
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Entry'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEntryText('')
                }}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {entries.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No journal entries yet</p>
            <p className="text-gray-400 text-sm mt-2">Start by adding your first entry</p>
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry.entryId || entry.id} className="bg-white rounded-xl shadow hover:shadow-lg transition p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(entry.date || entry.createdAt)}</span>
                </div>
                {/* Delete button disabled until backend supports it */}
                {/* <button
                  onClick={() => handleDelete(entry.entryId || entry.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button> */}
              </div>
              <p className="text-gray-800 whitespace-pre-wrap">{entry.entry}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default JournalTab

