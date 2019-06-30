const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    
    // const task = new Task(req.body)
    
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

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

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        // const tasks = await Task.find({ owner: req.user._id })
        await req.user.populate({
            path: 'tasks',
            match: match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: sort
            }
        }).execPopulate()

        res.send(req.user.tasks)
    } catch(e) {
        res.status(418).send(e)
    }

   

    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.status(418).send(e)
    // })
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    
    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id: _id, owner: req.user._id })
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

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        // const task = await Task.findOne({ id: req.params.id, owner: req.user._id})  // id, update, options object. 'new: true' returns newly updated document instead of old one
        const task2 = await Task.findById(req.params.id)
        // console.log('task 1: ', task)
        console.log('task 2: ', task2)
        
        if(!task2) {
            return res.status(404).send()
        }
        
        updates.forEach((update) => task2[update] = req.body[update])
        await task2.save()

        res.send(task2)
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

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // const taskToDelete = await Task.findById(req.params.id)
        // const task = await taskToDelete.remove()

        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch(e) {
        res.status(500).send(e)
    }
})

module.exports = router