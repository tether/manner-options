
/**
 * Test dependencies.
 */

const test = require('tape')
const options = require('..')


test('should add options communication for simple HTTP resource', assert => {
  assert.plan(1)
  const obj = options({
    get: () => {}
  })

  assert.equal(typeof obj.options, 'function')
})
