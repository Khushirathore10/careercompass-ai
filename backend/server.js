const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/assessment', require('./routes/assessment'));
app.use('/api/careers', require('./routes/careers'));
app.use('/api/roadmap', require('./routes/roadmap'));
app.use('/api/chatbot', require('./routes/chatbot'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'CareerCompass AI Backend Running' }));

app.listen(PORT, () => {
  console.log(`\n🚀 CareerCompass AI Backend running on http://localhost:${PORT}`);
  console.log(`📊 Database: SQLite`);
  console.log(`🔐 JWT Auth: Enabled\n`);
});
