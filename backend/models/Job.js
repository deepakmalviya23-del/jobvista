const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: Number,
  jobType: { type: String, enum: ['full-time', 'part-time', 'remote', 'hybrid'], required: true },
  experienceLevel: String,
  description: String,
  requirements: [String],
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);