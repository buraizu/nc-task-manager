require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5d11515d71a112c17f001783', { age: 5 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 5 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5d11515d71a112c17f001783', 7).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})