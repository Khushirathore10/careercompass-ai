const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticate } = require('../middleware/auth');
const { careers } = require('../careerData');

router.get('/:careerId', authenticate, (req, res) => {
  const { careerId } = req.params;
  const career = careers[careerId];
  if (!career) return res.status(404).json({ message: 'Career not found' });
  const progress = db.prepare('SELECT step_index, completed FROM roadmap_progress WHERE user_id = ? AND career_id = ?').all(req.userId, careerId);
  const roadmapWithStatus = career.roadmap.map((step, idx) => {
    const status = progress.find(p => p.step_index === idx);
    return { ...step, completed: !!(status && status.completed) };
  });
  const completedCount = roadmapWithStatus.filter(s => s.completed).length;
  const progressPercent = Math.round((completedCount / career.roadmap.length) * 100);
  res.json({ career: { id: career.id, title: career.title, icon: career.icon }, roadmap: roadmapWithStatus, progress: progressPercent });
});

router.post('/toggle-step', authenticate, (req, res) => {
  const { careerId, stepIndex } = req.body;
  const existing = db.prepare('SELECT id, completed FROM roadmap_progress WHERE user_id = ? AND career_id = ? AND step_index = ?').get(req.userId, careerId, stepIndex);
  if (existing) {
    db.prepare('UPDATE roadmap_progress SET completed = ? WHERE id = ?').run(existing.completed ? 0 : 1, existing.id);
  } else {
    db.prepare('INSERT INTO roadmap_progress (user_id, career_id, step_index, completed) VALUES (?, ?, ?, ?)').run(req.userId, careerId, stepIndex, 1);
  }
  res.json({ success: true });
});

module.exports = router;
