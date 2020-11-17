const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  users: {
    type: [{ type: String }],
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = Project = mongoose.model('projects', projectSchema);
