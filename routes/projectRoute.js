const router = require('express').Router();
const auth = require('../middleware/auth');
const Project = require('../models/projectModel');
const User = require('../models/userModel');

router.post('/', auth, async (req, res) => {
  try {
    const { title, username, email } = req.body;

    //validation
    if (!title || !username || !email) {
      return res
        .status(400)
        .json({ message: 'Not all fields have been entered.' });
    }

    const newProject = new Project({
      title,
      users: [{ username, email, id: req.userId }],
    });

    const savedProject = await newProject.save();

    res.json(savedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({
      users: { $elemMatch: { id: req.userId } },
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const deleteProject = await Project.findByIdAndDelete(req.params.id);

    res.json(deleteProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add user to project
router.post('/adduser', auth, async (req, res) => {
  try {
    const { email, projectId } = req.body;

    if (!email || !projectId) {
      return res
        .status(400)
        .json({ message: 'Not all fields have been entered.' });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const project = await Project.findOne({ _id: projectId });

    if (!project) {
      return res.status(400).json({ message: 'Project not found' });
    }

    // check if user is already in project
    if (project.users.some((e) => e.email === user.email)) {
      return res
        .status(400)
        .json({ message: 'User is already in that project' });
    }

    const updatedProject = await Project.findOneAndUpdate(
      { _id: project._id },
      {
        $push: {
          users: { username: user.username, id: user.id, email: user.email },
        },
      }
    );

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
