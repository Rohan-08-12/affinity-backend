const ChatSession=require('../models/ChatSession');

const startSession=async(req,res)=>{
    try {
        const {prompt}=req.body;
        if(!prompt){
            return res.status(400).json({message:'Prompt is required'});
        }
        const newSession=new ChatSession({
            user:req.user._id,
            messages: [
            { role: 'user', content: prompt },
            { role: 'ai', content: "I'm here to listen. Can you tell me more about what's making you anxious?" } // placeholder
      ]
        });
        await newSession.save();
        
    res.status(200).json({
      reply: session.messages[1].content,
      sessionId: session._id
    });
    } catch (error) {
        console.log('Error starting chat session:',error);
        res.status(500).json({message:'Server error'});
        
    }
}


const getSessionHistory=async(req,res)=>{
    try {
        const sessions=await ChatSession.find({user:req.user._id}).sort({createdAt:-1});

    res.status(200).json({
      sessionId: session._id,
      messages: session.messages.map(m => ({
        role: m.role,
        content: m.content
      }))
    });
    } catch (error) {
        console.log('Error fetching chat sessions:',error);
        res.status(500).json({message:'Server error'});
    }
}

module.exports = { startSession, getSessionHistory };
