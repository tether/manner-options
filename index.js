
/**
 * This is a simple description.
 *
 * @api public
 */

module.exports = function (resource) {
  return {
    ...resource,
    options: () => {}
  }
}
