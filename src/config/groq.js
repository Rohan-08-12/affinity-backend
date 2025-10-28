const Groq = require('groq-sdk');

// Debug: Check environment variables
console.log(' Groq Environment check:');
console.log('GROQ_API_KEY exists:', !!process.env.GROQ_API_KEY);

// Check if the API key exists
if (!process.env.GROQ_API_KEY) {
  console.error(' GROQ_API_KEY not found in environment variables');
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

console.log('Groq client initialized successfully');

module.exports = groq;

