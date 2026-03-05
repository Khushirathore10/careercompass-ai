const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, (req, res) => {
  const account = db.prepare('SELECT id, name, email FROM users WHERE id = ?').get(req.userId);
  const profile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(req.userId);
  if (profile) {
    profile.skills = JSON.parse(profile.skills || '[]');
    profile.interests = JSON.parse(profile.interests || '[]');
  }
  res.json({ user: account, profile: profile || {} });
});

router.post('/update', authenticate, (req, res) => {
  const { education_level, stream, skills, interests, career_goals } = req.body;
  const skillsJson = JSON.stringify(skills || []);
  const interestsJson = JSON.stringify(interests || []);
  const exists = db.prepare('SELECT id FROM profiles WHERE user_id = ?').get(req.userId);
  if (exists) {
    db.prepare(`UPDATE profiles SET education_level=?, stream=?, skills=?, interests=?, career_goals=?, updated_at=CURRENT_TIMESTAMP WHERE user_id=?`)
      .run(education_level, stream, skillsJson, interestsJson, career_goals, req.userId);
  } else {
    db.prepare(`INSERT INTO profiles (user_id, education_level, stream, skills, interests, career_goals) VALUES (?, ?, ?, ?, ?, ?)`)
      .run(req.userId, education_level, stream, skillsJson, interestsJson, career_goals);
  }
  res.json({ message: 'Profile updated successfully' });
});

module.exports = router;
