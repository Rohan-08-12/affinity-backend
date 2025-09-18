const ChatSession = require('../models/ChatSession');
const openai = require('../config/openai');

// Crisis keywords for better safety detection
const CRISIS_KEYWORDS = [
  'suicide', 'kill myself', 'end it all', 'self-harm', 'hurt myself',
  'not worth living', 'better off dead', 'cutting', 'overdose'
];

// Helper function to detect crisis language
const containsCrisisLanguage = (text) => {
  const lowerText = text.toLowerCase();
  return CRISIS_KEYWORDS.some(keyword => lowerText.includes(keyword));
};

// crisis message
const getCrisisResourcesMessage = () => {
  return `\n\nI'm concerned about what you've shared. Please reach out for professional support immediately:
• Talk Suicide Canada: 1-833-456-4566 (24/7)
• Crisis Services Canada: 1-833-456-4566 or text 45645 (4 PM - 12 AM ET)
• Kids Help Phone: 1-800-668-6868 or text CONNECT to 686868 (ages 5-29)
• First Nations and Inuit Hope for Wellness Help Line: 1-855-242-3310
• Trans Lifeline Canada: 1-877-330-6366
• LGBT Youthline Ontario: 1-800-268-9688
• Emergency services: 911

You matter, and help is available 24/7 across Canada.`;
};

// Helper function to get system message
const getSystemMessage = (hasCrisisContent = false) => {
  let systemMessage = `You are Affinity, an AI diary and supportive companion. You are not a licensed therapist or mental health professional. 

Your role is to:
- Listen empathetically and encourage self-reflection
- Provide emotional support and validation
- Help users process their thoughts and feelings
- Suggest healthy coping strategies and self-care practices
- Remember context from earlier in the conversation

Important safety guidelines:
- If you detect crisis language (suicidal thoughts, self-harm), immediately encourage professional help
- Always remind users that you're an AI, not a replacement for professional therapy
- Be warm but maintain appropriate boundaries
- If someone needs immediate help, direct them to crisis resources

Keep responses supportive, non-judgmental, and focused on the user's wellbeing. Reference earlier parts of the conversation when relevant to show you're listening and engaged.`;

  if (hasCrisisContent) {
    systemMessage += `\n\nIMPORTANT: The user's message contains concerning language. Please respond with empathy but also include crisis resources and encourage immediate professional support.`;
  }

  return systemMessage;
};

// 🆕 START a new chat session
const startSession = async (req, res) => {
  console.log('🚀 Starting new chat session...');
  
  try {
    const { prompt } = req.body;
    
    // Validate prompt
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Valid prompt is required' 
      });
    }

    // Check for crisis language
    const hasCrisisContent = containsCrisisLanguage(prompt);
    
    // Prepare messages for OpenAI
    const messages = [
      {
        role: "system",
        content: getSystemMessage(hasCrisisContent)
      },
      {
        role: "user",
        content: prompt.trim()
      }
    ];

    // Get AI response
    let aiReply;
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Using gpt-4o-mini 
        messages: messages,  // Full context
        max_tokens: 300, // Limit response length
        temperature: 0.7,  // Balanced creativity
        presence_penalty: 0.1, // Slightly discourage repetition
        frequency_penalty: 0.1 // Slightly discourage repetition 
      });
      
    //   Extract AI's reply
      aiReply = response.choices[0].message.content;
      

    //   Append crisis resources if needed
      if (hasCrisisContent) {
        aiReply += getCrisisResourcesMessage();
      }
      
    } catch (openaiError) {
      console.error('OpenAI API Error:', openaiError);
      aiReply = hasCrisisContent 
        ? `I hear that you're going through a really difficult time. While I want to support you, I'm not equipped to handle crisis situations.${getCrisisResourcesMessage()}`
        : "I'm here to listen and support you. Unfortunately, I'm having trouble processing your message right now. Can you try again, or would you like to talk about something specific?";
    }

    // Create NEW chat session
    const session = new ChatSession({
      user: req.user._id,
      messages: [
        { role: 'user', content: prompt.trim(), timestamp: new Date() },
        { role: 'ai', content: aiReply, timestamp: new Date() }
      ],
      hasCrisisContent: hasCrisisContent,
      isActive: true // Mark session as active for ongoing conversation
    });

    await session.save();

    res.status(200).json({
      reply: aiReply,
      sessionId: session._id,
      isNewSession: true
    });

  } catch (error) {
    console.error('Error starting chat session:', error);
    res.status(500).json({ 
      success: false,
      message: 'Unable to start chat session. Please try again later.' 
    });
  }
};

//  CONTINUE an existing chat session
const continueSession = async (req, res) => {
  console.log('💬 Continuing chat session...');
  
  try {
    // Extract sessionId and prompt from request body
    const { sessionId, prompt } = req.body;
    
    // Validate inputs
    if (!sessionId || !prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Session ID and valid prompt are required'
      });
    }

    // Find existing session
    const session = await ChatSession.findOne({ 
      _id: sessionId, 
      user: req.user._id 
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Chat session not found or you do not have access to it'
      });
    }

    // Check for crisis language in new message
    const hasCrisisContent = containsCrisisLanguage(prompt);

    // Prepare messages with FULL conversation history
    const messages = [
      {
        role: "system",
        content: getSystemMessage(hasCrisisContent)
      }
    ];

    // Add ALL previous messages for context
    session.messages.forEach(msg => {
      messages.push({
        role: msg.role === 'ai' ? 'assistant' : msg.role,
        content: msg.content
      });
    });

    // Add the new user message
    messages.push({
      role: "user",
      content: prompt.trim()
    });

    console.log(`📚 Using ${messages.length} messages for context`);

    // Get AI response with full context
    let aiReply;
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: messages,
        max_tokens: 300,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      });
      
      aiReply = response.choices[0].message.content;
      
      if (hasCrisisContent) {
        aiReply += getCrisisResourcesMessage();
      }
      
    } catch (openaiError) {
      console.error('OpenAI API Error:', openaiError);
      aiReply = hasCrisisContent 
        ? `I'm concerned about what you've shared.${getCrisisResourcesMessage()}`
        : "I'm having trouble processing that right now. Can you tell me more about what's on your mind?";
    }

    // Add new messages to existing session
    session.messages.push(
      { role: 'user', content: prompt.trim(), timestamp: new Date() },
      { role: 'ai', content: aiReply, timestamp: new Date() }
    );

    // Update crisis flag if needed
    if (hasCrisisContent) {
      session.hasCrisisContent = true;
    }

    session.updatedAt = new Date();
    await session.save();

    res.status(200).json({
      reply: aiReply,
      sessionId: session._id,
      messageCount: session.messages.length,
      isNewSession: false
    });

  } catch (error) {
    console.error('Error continuing chat session:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to continue chat session. Please try again later.'
    });
  }
};

// 🆕 Get a specific session with full conversation
const getSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const session = await ChatSession.findOne({
      _id: sessionId,
      user: req.user._id
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    res.status(200).json({
      sessionId: session._id,
      messages: session.messages.map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp
      })),
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
      messageCount: session.messages.length
    });

  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to fetch session'
    });
  }
};

// Get all sessions (existing function - kept as is)
const getSessionHistory = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const sessions = await ChatSession.find({ user: req.user._id })
      .sort({ updatedAt: -1 }) // Sort by most recently updated
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const formattedSessions = sessions.map(session => ({
      sessionId: session._id,
      // Only return first and last message for preview
      preview: {
        firstMessage: session.messages[0]?.content || '',
        lastMessage: session.messages[session.messages.length - 1]?.content || '',
        messageCount: session.messages.length
      },
      createdAt: session.createdAt,
      updatedAt: session.updatedAt
    }));

    res.status(200).json(formattedSessions);

  } catch (error) {
    console.error('Error fetching chat sessions:', error);
    res.status(500).json({ 
      message: 'Unable to fetch chat history' 
    });
  }
};

module.exports = {
  startSession,      // Creates new conversation
  continueSession,   // Continues existing conversation  
  getSession,        // Gets full conversation
  getSessionHistory  // Gets list of all sessions
};