const mongoose = require('mongoose')

// db name must be provided in url
mongoose.connect(process.env.MONGODB_URL, {   
    useNewUrlParser: true,
    useCreateIndex: true,  
    useFindAndModify: false
})




