require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5d1155bff46c64c20d6fd1d4').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('5d1145ab0fcc4ebfd6923ee8').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})
