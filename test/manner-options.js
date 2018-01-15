
/**
 * Test dependencies.
 */

const test = require('tape')
const options = require('..')


test('should add single options handler for single HTTP resource', assert => {
  assert.plan(2)
  const obj = options({
    get: () => {}
  })
  assert.equal(typeof obj.options, 'object')
  assert.equal(typeof obj.options['/'], 'function')
})


test('should add single options handler for multiple HTTP resources', assert => {
  assert.plan(2)
  const obj = options({
    get: () => {},
    post: () => {}
  })
  assert.equal(typeof obj.options, 'object')
  assert.equal(typeof obj.options['/'], 'function')
})
