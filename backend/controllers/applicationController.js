const Application = require('../models/Application');
const Job = require('../models/Job');
const upload = require('../middleware/upload');

// Apply to a job
const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const resumePath = req.file ? `/uploads/resumes/${req.file.filename}` : null;

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
      resume: resumePath
    });

    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get my applications (Seeker)
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate('job', 'title company location salary');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get applicants for a job (Employer)
const getJobApplicants = async (req, res) => {
  try {
    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'name email resume');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { applyJob, getMyApplications, getJobApplicants };