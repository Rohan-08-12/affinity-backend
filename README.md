# Affinity Backend

Affinity is an **AI Therapist** platform designed to provide supportive journaling, empathetic chat, and mood tracking.  
This backend repository powers secure authentication, user data management, chat sessions, and mood entry storage.  
⚠️ **Disclaimer:** Affinity is **not a substitute for professional therapy or medical care**. If a user is in crisis, the system provides local hotline information and encourages contacting a professional immediately.

---

## 🚀 Tech Stack (Planned)

- **Node.js & Express.js** – REST API framework
- **MongoDB** – Database for users, sessions, and mood logs
- **JWT & OAuth** – Authentication & session security
- **Third-party LLM API** – For AI-assisted chat responses
- **Socket.IO** – (Future) real-time support chat
- **Postman** – API testing & documentation
- **Docker** – (Future) containerization and deployment

---

## 📂 Project Structure

Affinity-backend/
├── src/ # Application source code
├── tests/ # Test cases (unit/integration)
├── docs/ # Documentation
│ └── API_CONTRACTS.md
├── .gitignore
├── README.md
└── package.json

---

## 🔄 Branch Workflow

- `main` → always production-ready
- `dev` → integration branch for new features
- `feature/*` → for new work (e.g., `feature/user-auth`)

Workflow:

1. Create branch from `dev`
2. Commit & push changes
3. Open Pull Request into `dev`
4. After testing, merge `dev` → `main`

---

## 📌 Features (Planned)

- User registration & login (JWT / OAuth)
- AI-powered chat with empathy-focused responses
- AI Diary: users can log daily journal entries
- Mood tracking dashboard (text-based entries)
- Notifications/reminders for journaling
- Safety system for crisis language detection → hotline suggestions

---

## 🛡️ Ethics & Safety

- Affinity is **not clinical therapy**.
- Data is encrypted at rest and in transit.
- No medical advice is stored or generated.
- If harmful language is detected, users are directed to **local crisis resources (e.g., 9-8-8 in Canada)**.

---

## 📑 Documentation

- [API Contracts](./docs/API_CONTRACTS.md) – planned routes and response structures
- Contribution guidelines – coming soon

---

## 🛠️ Getting Started

> **Note:** Setup instructions will be expanded as the codebase develops.

1. Clone the repository
   ```bash
   git clone https://github.com/<your-username>/Affinity-backend.git
   cd Affinity-backend
   ```

Install dependencies

npm install

Add .env file with placeholders:

PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret>
AI_API_KEY=<your-llm-api-key>

Start dev server (to be added later).

🤝 Contributing

We follow a feature-branch workflow. Please open Issues or Pull Requests for contributions.
