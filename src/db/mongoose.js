const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {   // db name must be provided in url
    useNewUrlParser: true,
    useCreateIndex: true,  //  Ensures indices are created
    useFindAndModify: false
})




