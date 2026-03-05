const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { careers } = require('../careerData');

router.post('/message', authenticate, (req, res) => {
  const { message } = req.body;
  const msg = message.toLowerCase();
  let response = "I'm not sure about that. Try asking about salaries, skills, or specific career paths like 'Backend Developer'!";
  if (msg.includes('salary')) {
    response = "Salaries vary by role. For example, a **Backend Developer** earns ₹4-6 LPA at entry-level, while a **Data Scientist** starts at ₹5-8 LPA. Which role are you interested in?";
  } else if (msg.includes('skill')) {
    response = "Key skills for tech careers include **Python, SQL, React, and AWS**. If you tell me your target role, I can give you a specific list!";
  } else if (msg.includes('hello') || msg.includes('hi')) {
    response = "Hi there! I'm your AI Career Advisor. How can I help you navigate your career journey today?";
  } else {
    const foundCareer = Object.values(careers).find(c => msg.includes(c.title.toLowerCase()));
    if (foundCareer) {
      response = `Great choice! **${foundCareer.title}** is a rewarding path. \n\n**Key Skills:** ${foundCareer.requiredSkills.slice(0, 4).join(', ')}. \n**Starting Salary:** ${foundCareer.salary.entry.label}. \n\nCheck the Roadmap page for a full learning plan!`;
    }
  }
  res.json({ response });
});

module.exports = router;
