require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const connectDB = require('./config/db');

const userRoute = require('./routes/userRoute');
const projectRoute = require('./routes/projectRoute');
const taskRoute = require('./routes/taskRoute');

const port = process.env.PORT || 5000;
console.log('current ENV: ', process.env.NODE_ENV);

const app = express();

// Bodyparser middleware (it is included in express)
app.use(express.json());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// CORS middleware
app.use(cors());

// Connect to mongo
connectDB();

// Use routes
app.use('/user', userRoute);
app.use('/projects', projectRoute);
app.use('/tasks', taskRoute);

app.listen(port, () => console.log(`server running on port ${port}`));
