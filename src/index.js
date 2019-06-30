const express = require('express')
require('./db/mongoose')  
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

app.use(express.json())  // Automatically parse incoming JSON to object
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})






// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         // if (!file.originalname.endsWith('.pdf')) {
//         //     return cb(new Error('Please upload a PDF'))
//         // }

//         if(!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('Please upload a Word document'))
//         }

//         cb(undefined, true)
//         // cb (new Error('File must be a PDF'))
//         // cb (undefined, true) 
//         // cb (undefined, false)
//     }
// })

// 'upload' argument to single() is name of upload
// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// }, (error, req, res, next) => {   // function must have 4 args so express knows it's for errors
//     res.status(400).send({ error: error.message })
// })

// EXAMPLE with custom middleware
// const errorMiddleware = (req, res, next) => {
//     throw new Error('from custom middleware')
// }

// // 'upload' argument to single() is name of upload
// app.post('/upload', errorMiddleware, (req, res) => {
//     res.send()
// }, (error, req, res, next) => {   // function must have 4 args so express knows it's for errors
//     res.status(400).send({ error: error.message })
// })
