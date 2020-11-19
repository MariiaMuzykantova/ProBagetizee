const mongoose = require('mongoose');

const o_date = new Intl.DateTimeFormat();
const f_date = (m_ca, m_it) => Object({ ...m_ca, [m_it.type]: m_it.value });
const m_date = o_date.formatToParts().reduce(f_date, {});

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  projectId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    required: false,
    default: 'In progress',
  },
  create_date: {
    type: String,
    default: m_date.day + '-' + m_date.month + '-' + m_date.year,
  },
});

module.exports = Task = mongoose.model('task', taskSchema);
