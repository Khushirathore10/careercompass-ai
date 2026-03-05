const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticate } = require('../middleware/auth');
const { questions } = require('../assessmentData');

router.get('/questions', authenticate, (req, res) => res.json(questions));

router.post('/submit', authenticate, (req, res) => {
  const { answers } = req.body;
  let scores = { logical: 0, technical: 0, creativity: 0, communication: 0 };
  let totals = { logical: 0, technical: 0, creativity: 0, communication: 0 };
  questions.forEach((q, idx) => {
    totals[q.category] += q.points;
    if (q.correct !== undefined) {
      if (answers[idx] === q.correct) scores[q.category] += q.points;
    } else {
      scores[q.category] += (answers[idx] || 0) * (q.points / 3);
    }
  });
  const results = {
    logical_score: Math.round((scores.logical / (totals.logical || 1)) * 100),
    technical_score: Math.round((scores.technical / (totals.technical || 1)) * 100),
    creativity_score: Math.round((scores.creativity / (totals.creativity || 1)) * 100),
    communication_score: Math.round((scores.communication / (totals.communication || 1)) * 100)
  };
  db.prepare(`INSERT INTO assessments (user_id, logical_score, technical_score, creativity_score, communication_score, answers) VALUES (?, ?, ?, ?, ?, ?)`)
    .run(req.userId, results.logical_score, results.technical_score, results.creativity_score, results.communication_score, JSON.stringify(answers));
  res.json({ message: 'Assessment submitted', results });
});

router.get('/results', authenticate, (req, res) => {
  const last = db.prepare('SELECT * FROM assessments WHERE user_id = ? ORDER BY completed_at DESC LIMIT 1').get(req.userId);
  res.json(last || null);
});

module.exports = router;
