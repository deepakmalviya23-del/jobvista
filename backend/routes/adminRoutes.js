const express = require('express');
const protect = require('../middleware/auth');
const role = require('../middleware/role');
const { 
  getUsersCount, 
  getJobsCount, 
  getApplicationsCount 
} = require('../controllers/adminController');

const router = express.Router();

// All admin routes are protected and only accessible by admin
router.get('/users/count', protect, role(['admin']), getUsersCount);
router.get('/jobs/count', protect, role(['admin']), getJobsCount);
router.get('/applications/count', protect, role(['admin']), getApplicationsCount);

module.exports = router;