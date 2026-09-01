import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  techStack: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  liveLink: {
    type: String,
    default: '',
  },
  githubLink: {
    type: String,
    default: '',
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

export default Project;
