import Project from '../models/Project.js';

export const getProjects = async (req, res) => {
  try {
    const { category, featured } = req.query;
    const filters = {};

    if (category) filters.category = category;
    if (featured !== undefined) {
      filters.featured = featured === 'true';
    }

    const projects = await Project.find(filters).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch projects.' });
  }
};

export const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch project details.' });
  }
};

export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Project creation failed.' });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    Object.assign(project, req.body);
    const updatedProject = await project.save();

    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Project update failed.' });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    await project.deleteOne();
    res.json({ message: 'Project deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Project deletion failed.' });
  }
};
