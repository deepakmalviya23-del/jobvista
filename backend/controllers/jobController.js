const Job = require('../models/Job');

// Get all jobs with filters
const getJobs = async (req, res) => {
  try {
    const { search, location, jobType, minSalary } = req.query;
    let query = {};

    if (search) query.title = { $regex: search, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };
    if (jobType) query.jobType = jobType;
    if (minSalary) query.salary = { $gte: Number(minSalary) };

    const jobs = await Job.find(query).populate('postedBy', 'name company');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single job
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new job (Only Employer)
const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      postedBy: req.user.id
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getJobs, getJobById, createJob };