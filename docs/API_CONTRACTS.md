API Contracts – Affinity Backend (AI Therapist)

This document defines the implemented API routes, request/response formats, and expected behaviors for the Affinity AI Therapist backend.

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

GET /auth/me

Description: Get current user profile

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

PUT /auth/me/preferences

Description: Update current user preferences

Request Body:

{
"preferences": {
"reminderFrequency": "weekly",
"journalPrivacy": "private"
}
}

Response (200):

{
"message": "Preferences updated",
"preferences": {
"reminderFrequency": "weekly",
"journalPrivacy": "private"
}
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

Description: Get all journal entries

Response (200):

[
{
"entryId": "j123",
"date": "2025-09-11",
"entry": "Today was tough but I managed..."
}
]

DELETE /journal/:id

Description: Delete a journal entry by ID

Response (200):

{
"message": "Journal entry deleted"
}

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

Description: Get mood history

Response (200):

[
{ "date": "2025-09-10", "mood": "calm" },
{ "date": "2025-09-11", "mood": "anxious" }
]

🔔 Notifications Routes
GET /notification

Description: Retrieve all user notifications

Response (200):

[
{ "id": "n1", "message": "Remember to journal today!", "read": false },
{ "id": "n2", "message": "Daily mood check reminder", "read": true }
]

PUT /notification/:id/read

Description: Mark a notification as read

Response (200):

{
"message": "Notification marked as read"
}

💬 Chat Routes
POST /chat/start

Description: Start a new AI therapy session

Request Body:

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

Description: Continue an existing session

Request Body:

{
"sessionId": "sess789",
"prompt": "It's mostly about exams coming up."
}

Response (200):

{
"reply": "Exams can definitely feel overwhelming. How have you been coping with the stress so far?",
"sessionId": "sess789",
"messageCount": 4,
"isNewSession": false
}

GET /chat/session/:sessionId

Description: Fetch a specific chat session

Response (200):

{
"sessionId": "sess789",
"messages": [
{ "role": "user", "content": "I feel anxious." },
{ "role": "ai", "content": "I'm here to listen..." }
],
"createdAt": "2025-09-11T12:00:00Z",
"updatedAt": "2025-09-11T12:05:00Z",
"messageCount": 2
}

GET /chat/history

Description: Get all chat sessions (paginated)

Response (200):

[
{
"sessionId": "sess789",
"preview": {
"firstMessage": "I feel anxious.",
"lastMessage": "I'm here to listen...",
"messageCount": 2
},
"createdAt": "2025-09-11T12:00:00Z",
"updatedAt": "2025-09-11T12:05:00Z"
}
]

🛡️ Error Responses (Example)
{
"error": true,
"message": "Unauthorized access"
}
