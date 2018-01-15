
/**
 * Generate the communication options for a manner resource.
 *
 * @param {Object} resource
 * @param {Object?} schema
 * @return {Object}
 * @api public
 *
 * @see https://github.com/tether/manner
 */

module.exports = function (resource, schema) {
  const options = paths(resource)
  return {
    ...resource,
    options: describe(paths(resource, schema))
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
    resource[path] = handler(options[paths], {})
  })
  return resource
}


/**
 * Generate response header according the passed
 * resource and schema.
 *
 * @param {Array} methods
 * @param {Object} headers
 * @return {Function}
 * @api private
 */

function handler (methods, headers) {
  return (query, body, req, res) => {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': `${  methods.map(method => method.toUpperCase()),join(', ')}, OPTIONS`,
      'Access-Control-Allow-Headers': 'Origin, Content-Type, Authorization, Content-Length, X-Requested-With'
    })
    res.end()
  }
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
    const add = push.bind(null, options, method)
    if (type === 'function') add('/')
    else if (type === 'object') Object.keys(target).map(add)
  })
  return options
}


/**
 * Push method path into options object.
 *
 * @param {Object} options
 * @param {String} method
 * @param {String} path
 * @api private
 */

function push (options, method, path) {
  options[path] = (options[path] || [])
  options[path].push(method)
}
