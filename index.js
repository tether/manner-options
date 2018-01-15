
/**
 * This is a simple description.
 *
 * @api public
 */

module.exports = function (resource) {
  const options = paths(resource)
  return {
    ...resource,
    options: describe(paths(resource))
  }
}


/**
 * Describe the communication options for a manner resource
 *
 * @param {Object} options
 * @param {Object} schema
 * @return {Object}
 * @api private
 */

function describe (options, schema) {
  const resource = {}
  Object.keys(options).map(path => {
    resource[path] = () => {}
  })
  return resource
}


/**
 * Extract the options paths from a manner resource.
 *
 * @param {Object} resource
 * @return {Array}
 * @api private
 */

function paths (resource) {
  const options = {}
  Object.keys(resource).map(method => {
    const target = resource[method]
    const type = typeof target
    if (type === 'function') {
      options['/'] = (options['/'] || [])
      options['/'].push(method)
    } else if (type === 'object') {
      Object.keys(target).map(path => {
        options[path] = (options[path] || [])
        options[path].push(method)
      })
    }
  })
  return options
}
