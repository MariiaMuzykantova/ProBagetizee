const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')

const itemRoutes = require('./routes/items')

const app = express();

const port = process.env.PORT || 5000

// Bodyparser middleware (it is actually nowadays included in express)
app.use(express.json())

// DB config
const db = keys.MONGO_URI

// Connect to mongo
mongoose
    .connect(db)
    .then(() => console.log("db connected"))
    .catch(error => console.log(error))

// Use routes
app.use('/api/items', itemRoutes)

app.listen(port, () => console.log(`server running on port ${port}`))