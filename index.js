'use strict'

const  pkg = require('./package.json')
require('dotenv').config()

module.exports = {
  get name() { return pkg.name },
  get isTesting() { return !!global.it },
  get isProduction() {
    return process.env.NODE_ENV === 'production'
  },
  get isDevelopment() {
    return process.env.NODE_ENV === 'development'
  },
  get baseUrl() {
    return process.env.BASE_URL || `http://localhost:${process.env.port}`
  },
  get port() {
    return env.PORT || 1337
  },
  get root() {
    return __dirname
  },
  package: pkg,
}
