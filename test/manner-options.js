
/**
 * Test dependencies.
 */

const test = require('tape')
const options = require('..')


test('should add single OPTIONS handler for single HTTP resource', assert => {
  assert.plan(2)
  const obj = options({
    get: () => {}
  })
  assert.equal(typeof obj.options, 'object')
  assert.equal(typeof obj.options['/'], 'function')
})


test('should add single OPTIONS handler for multiple HTTP resources', assert => {
  assert.plan(2)
  const obj = options({
    get: () => {},
    post: () => {}
  })
  assert.equal(typeof obj.options, 'object')
  assert.equal(typeof obj.options['/'], 'function')
})


test('should create one OPTIONS handler per path', assert => {
  assert.plan(3)
  const obj = options({
    get: () => {},
    post: {
      '/': () => {},
      '/:name': () => {}
    }
  })
  assert.equal(typeof obj.options, 'object')
  assert.equal(typeof obj.options['/'], 'function')
  assert.equal(typeof obj.options['/:name'], 'function')
})
