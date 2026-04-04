const express = require('express');
const protect = require('../middleware/auth');
const role = require('../middleware/role');
const upload = require('../middleware/upload');
const { applyJob, getMyApplications, getJobApplicants } = require('../controllers/applicationController');

const router = express.Router();

router.post('/apply', protect, upload.single('resume'), applyJob);
router.get('/my-applications', protect, role(['seeker']), getMyApplications);
router.get('/job/:jobId', protect, role(['employer']), getJobApplicants);

module.exports = router;