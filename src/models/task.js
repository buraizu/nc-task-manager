const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task

// const chore = new Task({
   
    
// })

// chore.save().then(() => {
//     console.log(chore)
// }).catch((error) => {
//     console.log(error)
// })
