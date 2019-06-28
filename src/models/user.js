const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, // removes empty spaces
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Pick a stronger password')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// 'methods' refers to instance methods
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user.id.toString() }, 'secret')

    user.tokens = user.tokens.concat({ token: token })
    await user.save()
    
    return token
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()  // toObject() provided by mongoose

    delete userObject.password
    delete userObject.tokens

    return userObject
}

// Example from manual way to hide private data
// userSchema.methods.getPublicProfile = function () {
//     const user = this
//     const userObject = user.toObject()  // toObject() provided by mongoose

//     delete userObject.password
//     delete userObject.tokens

//     return userObject
// }

// Static methods accessible on model 'model methods'
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if(!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// Password hashing logic stored here only
userSchema.pre('save', async function (next) {   // Will run before user is saved. Cannot use arrow function due to lack of 'this' binding
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()   // Required to end function, due to possibility of async operations ongoing
})

const User = mongoose.model('User', userSchema)

module.exports = User