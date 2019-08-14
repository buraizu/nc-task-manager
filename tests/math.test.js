 // no need to require jest, test() is provided as global in test files

test('this should succeed', () => {

}) 

test('this should fail', () => {
    throw new Error('failure')
}) 