# Affinity Frontend

A modern, beautiful React frontend for the Affinity AI Therapist platform.

## 🚀 Features

- **Authentication**: Secure login and registration
- **AI Chat Interface**: Real-time chat with AI therapist
- **Journal**: Daily journaling feature
- **Mood Tracker**: Track emotional journey
- **Notifications**: Stay updated with reminders
- **Responsive Design**: Beautiful UI that works on all devices

## 🛠️ Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Lightning-fast build tool
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **Lucide React**: Beautiful icons
- **date-fns**: Date formatting

## 📦 Installation

```bash
cd affinity-frontend
npm install
```

## 🏃 Running the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🔧 Configuration

Update the API URL in `src/services/api.js` or set the environment variable:

```bash
VITE_API_URL=http://localhost:3000
```

## 📁 Project Structure

```
affinity-frontend/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── ChatTab.jsx
│   │   ├── JournalTab.jsx
│   │   ├── MoodTab.jsx
│   │   ├── NotificationsTab.jsx
│   │   ├── Sidebar.jsx
│   │   └── PrivateRoute.jsx
│   ├── contexts/       # React contexts
│   │   └── AuthContext.jsx
│   ├── pages/          # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   ├── services/       # API service layer
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── chatService.js
│   │   ├── journalService.js
│   │   ├── moodService.js
│   │   └── notificationService.js
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🔌 API Integration

The frontend integrates with the Affinity backend API:

- **Authentication**: `/auth/login`, `/auth/register`, `/auth/me`
- **Journal**: `/journals` (GET, POST), `/journals/:id` (DELETE)
- **Mood**: `/moods` (GET, POST)
- **Chat**: `/chats/start`, `/chats/continue`, `/chats/history`
- **Notifications**: `/notifications` (GET), `/notifications/:id/read` (PUT)

## 🎨 Design

- Modern gradient UI
- Responsive layout
- Smooth animations
- Intuitive navigation
- Accessible components

## ⚠️ Disclaimer

Affinity is not a substitute for professional therapy or medical care. Users in crisis are encouraged to contact professional help immediately.

