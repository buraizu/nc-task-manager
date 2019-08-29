 // no need to require jest, test() is provided as global in test files
 const { calculateTip, 
    fahrenheitToCelsius, 
    celsiusToFahrenheit,
    add 
} = require('../src/math')

test('should calculate total with tip', () => {
    const total = calculateTip(10, .3)

    expect(total).toBe(13)

    // if(total !== 13) {
    //     throw new Error(`Total tip should be 13. Got ${total}`)
    // }

})

test('should calculate total with default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12)
})

test('should calculate F to C', () => {
    const temp = fahrenheitToCelsius(32)
    expect(temp).toBe(0)
}) 

test('should calculate C to F', () => {
    const temp = celsiusToFahrenheit(0)
    expect(temp).toBe(32)
})  

// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     }, 2000)
// })

// 'done' parameter informs jest this is async code
test('should add two numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

// Works the same as test above, but cleaner due to async/await
test('should add two numbers async/await', async () => {
    const sum = await add(10, 23)
    expect(sum).toBe(33)
})