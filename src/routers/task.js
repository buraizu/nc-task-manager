const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(418).send(e)
    }

    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     res.status(418).send(e)
    // })
})

router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(e) {
        res.status(418).send(e)
    }

   

    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.status(418).send(e)
    // })
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    
    try {
        const task = await Task.findById(_id)
        if(!task) {
            return res.status(418).send()
        }

        res.send(task)
    } catch(e) {
        res.status(500).send()
    }

    // Task.findById(_id).then((task) => {
    //     if(!task) {
    //         return res.status(418).send()
    //     }

    //     res.send(task)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    // const isValidOperation = updates.every((update) => {
    //     return allowedUpdates.includes(update)
    // })
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        const task = await Task.findById(req.params.id)  // id, update, options object. 'new: true' returns newly updated document instead of old one
   
        updates.forEach((update) => task[update] = req.body[update])

        await task.save()
        
        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

// router.patch('/users/:id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     // const isValidOperation = updates.every((update) => {
//     //     return allowedUpdates.includes(update)
//     // })
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
//     if(!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates' })
//     }

//     try {
//         // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })    // id, update, options object. 'new: true' returns newly updated document instead of old one
        
//         // 
//         const user = await User.findById(req.params.id)

//         updates.forEach((update) => user[update] = req.body[update])
        
//         await user.save()

//         if(!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch(e) {
//         res.status(400).send(e)
//     }
// })

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch(e) {
        res.status(500).send(e)
    }
})

module.exports = router