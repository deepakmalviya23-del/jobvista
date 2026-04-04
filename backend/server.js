const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

// Fix for Windows DNS issue
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test Route
app.get('/', (req, res) => {
  res.json({
    message: "✅ JobVista Backend is Running Successfully!",
    status: "active",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      jobs: "/api/jobs",
      applications: "/api/applications"
    }
  });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));   // ← Add this line

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`✅ Visit http://localhost:5000 to check status`);
});