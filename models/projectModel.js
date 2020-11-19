const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  users: {
    type: Array,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
    default: 'In progress',
  },
});

module.exports = Project = mongoose.model('projects', projectSchema);
