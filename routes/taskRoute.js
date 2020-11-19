const router = require('express').Router();
const auth = require('../middleware/auth');
const Task = require('../models/taskModel');
const Project = require('../models/projectModel');

// Create new task
router.post('/', auth, async (req, res) => {
  try {
    const { title, projectId, description } = req.body;

    //validation
    if (!title || !projectId) {
      return res
        .status(400)
        .json({ message: 'Not all fields have been entered.' });
    }

    const project = await Project.findOne({ _id: projectId });

    if (!project) {
      return res.status(400).json({ message: 'Project not found' });
    }

    const newTask = new Task({
      title,
      description: description ? description : '',
      projectId,
    });

    const savedTask = await newTask.save();

    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get tasks of a project
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findOne({ _id: id });

    if (!project) {
      return res.status(400).json({ message: 'Project not found' });
    }

    const tasks = await Task.find({ projectId: id });

    if (!tasks) {
      return res.status(400).json({ message: 'Tasks not found' });
    }

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete tasks by taskId
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    res.json(deletedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update task status to done
router.post('/updatestatus', auth, async (req, res) => {
  try {
    const { taskId } = req.body;

    if (!taskId) {
      return res
        .status(400)
        .json({ message: 'Not all fields have been entered.' });
    }

    const task = await Task.findOne({ _id: taskId });

    if (!task) {
      return res.status(400).json({ message: 'Task not found' });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId },
      { status: task.status === 'In progress' ? 'Done' : 'In progress' }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
