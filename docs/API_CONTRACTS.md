📜 API Contract – Affinity Backend (AI Therapist)

⚠️ Disclaimer: Affinity is not a substitute for professional therapy or medical care.
If harmful or crisis-related language is detected, the system will return crisis hotline resources.

🔑 Authentication Routes
POST /auth/register

Register a new user.
Request:

{
"name": "John Doe",
"email": "john@example.com",
"password": "securepassword123"
}

Response (201):

{
"message": "User registered successfully",
"token": "jwt-token"
}

POST /auth/login

Login with email & password.
Request:

{
"email": "john@example.com",
"password": "securepassword123"
}

Response (200):

{
"message": "Login successful",
"token": "jwt-token"
}

GET /auth/me

Get authenticated user profile.
Response (200):

{
"id": "abc123",
"name": "John Doe",
"email": "john@example.com",
"preferences": {}
}

📔 Journal Routes
POST /journal

Create a new journal entry.
Request:

{
"entry": "Today was tough but I managed to get through it."
}

Response (201):

{
"message": "Journal entry saved",
"entryId": "j123"
}

GET /journal

Retrieve all journal entries.
Response (200):

[
{
"id": "j123",
"date": "2025-09-16",
"entry": "Today was tough but I managed..."
}
]

DELETE /journal/:id

Delete a specific journal entry.
Response (200):

{
"message": "Journal entry deleted"
}

😊 Mood Routes
POST /mood

Log a new mood.
Request:

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

Get mood history.
Response (200):

[
{ "date": "2025-09-15", "mood": "calm" },
{ "date": "2025-09-16", "mood": "anxious" }
]

🔔 Notifications Routes
GET /notifications

Retrieve all notifications.
Response (200):

[
{ "id": "n1", "message": "Remember to journal today!", "read": false },
{ "id": "n2", "message": "Daily mood check reminder", "read": true }
]

PUT /notifications/:id/read

Mark a notification as read.
Response (200):

{
"message": "Notification marked as read"
}

💬 Chat Routes (AI Sessions)
POST /chat/start

Start a new chat session.
Request:

{
"prompt": "I'm feeling really anxious today."
}

Response (200):

{
"reply": "I'm here to listen. Can you tell me more about what's making you anxious?",
"sessionId": "sess789",
"isNewSession": true
}

POST /chat/continue

Continue an existing chat session.
Request:

{
"sessionId": "sess789",
"prompt": "It's mostly because of my exams."
}

Response (200):

{
"reply": "Exams can be really stressful. How have you been coping with the pressure?",
"sessionId": "sess789",
"isNewSession": false,
"messageCount": 5
}

GET /chat/session/:id

Fetch a specific chat session.
Response (200):

{
"sessionId": "sess789",
"messages": [
{ "role": "user", "content": "I feel anxious." },
{ "role": "ai", "content": "I'm here to listen..." }
],
"createdAt": "2025-09-15T12:00:00.000Z",
"updatedAt": "2025-09-15T12:15:00.000Z",
"messageCount": 2
}

GET /chat/history

Get preview of all chat sessions.
Response (200):

[
{
"sessionId": "sess789",
"preview": {
"firstMessage": "I feel anxious.",
"lastMessage": "I'm here to listen...",
"messageCount": 2
},
"createdAt": "2025-09-15T12:00:00.000Z",
"updatedAt": "2025-09-15T12:15:00.000Z"
}
]

🛡️ Error Responses
{
"error": true,
"message": "Unauthorized access"
}
