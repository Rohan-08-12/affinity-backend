# Affinity - AI Therapist Platform

A modern, full-stack AI therapist companion with journaling, mood tracking, and empathetic chat support.

## 🎯 Features

- **AI Chat**: Free Groq-powered AI therapist conversations
- **Journal**: Daily journaling with entry history
- **Mood Tracker**: Log and track your emotional journey
- **Notifications**: Get reminders for wellness activities
- **Crisis Detection**: Automatic crisis resource support
- **Authentication**: Secure JWT-based login/registration

## 🚀 Quick Start

### Prerequisites

- Node.js (v14+)
- MongoDB Atlas account (free) or local MongoDB
- Groq API key (free from https://console.groq.com)

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd affinity-backend
npm install
```

### 2. Set Up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free account and cluster
3. Create database user
4. Get connection string
5. Whitelist your IP in "Network Access"

### 3. Get Groq API Key (Free)

1. Visit https://console.groq.com
2. Sign up with Google
3. Go to "API Keys"
4. Create new API key
5. Copy the key (starts with `gsk_`)

### 4. Configure Environment

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/affinity?retryWrites=true&w=majority
GROQ_API_KEY=gsk_your_groq_api_key_here
JWT_SECRET=your-random-secret-key-here
PORT=3000
```

Generate JWT secret:
```bash
openssl rand -base64 32
```

### 5. Start Backend

```bash
node src/server.js
```

You should see:
```
✅ Groq client initialized successfully
MongoDB connected
Server is running on port 3000
```

### 6. Start Frontend

Open a new terminal:

```bash
cd affinity-frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:5173

## 📁 Project Structure

```
affinity-backend/
├── src/
│   ├── config/         # Database and API configs
│   ├── controllers/    # Route handlers
│   ├── middlewares/    # Auth middleware
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   └── server.js       # Entry point
├── affinity-frontend/  # React frontend
└── docs/              # API documentation
```

## 🔌 API Endpoints

### Authentication
- `POST /auth/register` - Create account
- `POST /auth/login` - Sign in
- `GET /auth/me` - Get profile

### Journal
- `GET /journals` - Get all entries
- `POST /journals` - Create entry

### Mood
- `GET /moods` - Get mood history
- `POST /moods` - Log mood

### Chat
- `POST /chats/start` - Start new chat
- `POST /chats/continue` - Continue chat
- `GET /chats/history` - Get chat history

### Notifications
- `GET /notifications` - Get notifications
- `PUT /notifications/:id/read` - Mark as read

## 🎨 Tech Stack

### Backend
- Node.js & Express
- MongoDB with Mongoose
- JWT authentication
- Groq AI API

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios

## 🔐 Environment Variables

Required `.env` variables:

```env
MONGO_URI=mongodb+srv://...      # MongoDB connection string
GROQ_API_KEY=gsk_...             # Groq API key
JWT_SECRET=...                    # JWT signing secret
PORT=3000                         # Server port
```

## 🛡️ Crisis Detection

The AI automatically detects crisis language and provides professional mental health resources from:

- Talk Suicide Canada (1-833-456-4566)
- Crisis Services Canada
- Kids Help Phone
- Various crisis helplines
- Emergency services (911)

## 📝 License

ISC License

## ⚠️ Disclaimer

Affinity is not a substitute for professional therapy or medical care. The crisis detection feature directs users to professional mental health resources.

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify Groq API key is valid
- Ensure `.env` file exists

### Frontend can't connect
- Make sure backend is running on port 3000
- Check CORS settings
- Verify backend logs

### Chat not working
- Verify Groq API key in `.env`
- Check Groq quota in console
- Review server logs for errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues or questions:
- GitHub Issues
- Check documentation in `/docs`
- Review API contracts
