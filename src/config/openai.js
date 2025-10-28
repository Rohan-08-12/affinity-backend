// const OpenAI = require('openai');
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,

// });

// module.exports = openai;





const OpenAI = require('openai');

// Debug: Check environment variables
console.log('🔍 Environment check:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY);
console.log('OPENAI_API_KEY preview:', process.env.OPENAI_API_KEY ? 
  process.env.OPENAI_API_KEY.substring(0, 7) + '...' : 'NOT FOUND');

// Check if the API key is properly formatted
if (!process.env.OPENAI_API_KEY) {
  console.error(' OPENAI_API_KEY not found in environment variables');
  console.error('Make sure you have a .env file in your project root with:');
  console.error('OPENAI_API_KEY=sk-your-actual-key-here');
  process.exit(1);
}

if (!process.env.OPENAI_API_KEY.startsWith('sk-')) {
  console.error('❌ OPENAI_API_KEY should start with "sk-"');
  console.error('Current value starts with:', process.env.OPENAI_API_KEY.substring(0, 3));
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log('✅ OpenAI client initialized successfully');

module.exports = openai;