const express = require('express')
require('./db/mongoose')  
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

app.use(express.json())  // Automatically parse incoming JSON to object
app.use(userRouter)
app.use(taskRouter)

// supertest does not require app.listen(), so we exclude it in this
// file for testing purposes

module.exports = app

