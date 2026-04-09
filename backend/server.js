const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

// DNS Fix for Windows
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);

dotenv.config();
connectDB();

const app = express();

// ✅ Improved CORS Configuration
app.use(cors({
  origin: [
    "https://jobvista-two.vercel.app",   // Your Vercel frontend
    "http://localhost:5173",             // Local development
    "http://localhost:3000"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test Route
app.get('/', (req, res) => {
  res.json({
    message: "✅ JobVista Backend is Running Successfully!",
    status: "active",
    version: "1.0.0",
    frontend: "https://jobvista-two.vercel.app"
  });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});