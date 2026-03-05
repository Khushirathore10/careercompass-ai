const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticate } = require('../middleware/auth');
const { careers, recommendCareers } = require('../careerData');

router.get('/list', (req, res) => res.json(Object.values(careers)));

router.get('/recommendations', authenticate, (req, res) => {
  const profile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(req.userId);
  const assessment = db.prepare('SELECT * FROM assessments WHERE user_id = ? ORDER BY completed_at DESC LIMIT 1').get(req.userId);
  if (!profile) return res.json(Object.values(careers).slice(0, 5));
  profile.skills = JSON.parse(profile.skills || '[]');
  profile.interests = JSON.parse(profile.interests || '[]');
  const recommendations = recommendCareers(profile, assessment);
  res.json(recommendations);
});

router.get('/:id', (req, res) => {
  const career = careers[req.params.id];
  career ? res.json(career) : res.status(404).json({ message: 'Career not found' });
});

router.post('/save', authenticate, (req, res) => {
  const { career_id } = req.body;
  const exists = db.prepare('SELECT id FROM career_selections WHERE user_id = ? AND career_id = ?').get(req.userId, career_id);
  if (!exists) db.prepare('INSERT INTO career_selections (user_id, career_id) VALUES (?, ?)').run(req.userId, career_id);
  res.json({ message: 'Career saved' });
});

router.get('/saved/list', authenticate, (req, res) => {
  const saved = db.prepare('SELECT career_id FROM career_selections WHERE user_id = ?').all(req.userId);
  const results = saved.map(s => careers[s.career_id]).filter(Boolean);
  res.json(results);
});

module.exports = router;
