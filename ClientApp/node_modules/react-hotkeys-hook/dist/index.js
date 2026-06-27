
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-hotkeys-hook.cjs.production.min.js')
} else {
  module.exports = require('./react-hotkeys-hook.cjs.development.js')
}
