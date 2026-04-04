const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

// Get total users count
const getUsersCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get total jobs count
const getJobsCount = async (req, res) => {
  try {
    const count = await Job.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get total applications count
const getApplicationsCount = async (req, res) => {
  try {
    const count = await Application.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUsersCount,
  getJobsCount,
  getApplicationsCount
};