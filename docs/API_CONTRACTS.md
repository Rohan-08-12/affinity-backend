API Contracts – Affinity Backend (AI Therapist)

This document defines the planned API routes, request/response formats, and expected behaviors for the Affinity AI Therapist backend.

⚠️ Disclaimer: Affinity is not a substitute for professional therapy or medical care. The system will suggest crisis hotlines if harmful language is detected.

🔑 Authentication Routes
POST /auth/register

Description: Register a new user account

Request Body:

{
"name": "John Doe",
"email": "john@example.com",
"password": "securepassword123"
}

Response (201):

{
"message": "User registered successfully",
"userId": "abc123",
"token": "jwt-token"
}

POST /auth/login

Description: Login with email & password

Request Body:

{
"email": "john@example.com",
"password": "securepassword123"
}

Response (200):

{
"message": "Login successful",
"token": "jwt-token"
}

👤 User Profile Routes
GET /users/:id

Description: Get user profile info

Response (200):

{
"id": "abc123",
"name": "John Doe",
"email": "john@example.com",
"preferences": {
"reminderFrequency": "daily",
"journalPrivacy": "private"
}
}

PUT /users/:id

Description: Update profile settings/preferences

Request Body:

{
"preferences": {
"reminderFrequency": "weekly",
"journalPrivacy": "private"
}
}

💬 Chat Routes
POST /chat/session

Description: Start a new AI therapy session

Request Body:

{
"prompt": "I'm feeling really anxious today."
}

Response (200):

{
"reply": "I'm here to listen. Can you tell me more about what's making you anxious?",
"sessionId": "sess789"
}

GET /chat/session/:id

Description: Fetch past chat session history

Response (200):

{
"sessionId": "sess789",
"messages": [
{ "role": "user", "content": "I feel anxious." },
{ "role": "ai", "content": "I'm here to listen..." }
]
}

📔 Journal Routes
POST /journal

Description: Create a new journal entry

Request Body:

{
"entry": "Today was tough but I managed to get through it."
}

Response (201):

{
"message": "Journal entry saved",
"entryId": "j123"
}

GET /journal

Description: Get all user journal entries

Response (200):

[
{
"entryId": "j123",
"date": "2025-09-11",
"entry": "Today was tough but I managed..."
}
]

😊 Mood Tracking Routes
POST /mood

Description: Log user’s mood

Request Body:

{
"mood": "anxious",
"note": "Before an exam"
}

Response (201):

{
"message": "Mood logged successfully",
"moodId": "m456"
}

GET /mood

Description: Get user mood history

Response (200):

[
{ "date": "2025-09-10", "mood": "calm" },
{ "date": "2025-09-11", "mood": "anxious" }
]

🔔 Notifications Routes
GET /notifications

Description: Retrieve all user notifications

Response (200):

[
{ "id": "n1", "message": "Remember to journal today!", "read": false },
{ "id": "n2", "message": "Daily mood check reminder", "read": true }
]

PUT /notifications/:id/read

Description: Mark a notification as read

Response (200):

{
"message": "Notification marked as read"
}

🛡️ Error Responses (Example)
{
"error": true,
"message": "Unauthorized access"
}
