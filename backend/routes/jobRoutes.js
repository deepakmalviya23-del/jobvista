const express = require('express');
const protect = require('../middleware/auth');
const role = require('../middleware/role');
const { getJobs, getJobById, createJob } = require('../controllers/jobController');

const router = express.Router();

router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', protect, role(['employer']), createJob);

module.exports = router;