const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const quizRoutes = require('./routes/quiz.routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
  })
);
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ success: true, data: { message: 'WhyThough API is running.' } });
});

app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found.' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
