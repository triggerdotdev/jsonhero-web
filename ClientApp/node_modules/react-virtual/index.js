if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/react-virtual.production.min.js')
} else {
  module.exports = require('./dist/react-virtual.development.js')
}
