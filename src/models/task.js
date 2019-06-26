const mongoose = require('mongoose')
const validator = require('validator')

const Task = mongoose.model('Task', {
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

module.exports = Task

// const chore = new Task({
   
    
// })

// chore.save().then(() => {
//     console.log(chore)
// }).catch((error) => {
//     console.log(error)
// })
