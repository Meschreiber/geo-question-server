'use strict'

const path = require('path')
const express = require('express')
const PrettyError = require('pretty-error')
const app = express()

// const pkg = require('APP')
// if (!pkg.isProduction && !pkg.isTesting) {
//   // Logging middleware (dev only)
//   app.use(require('volleyball'))
// }

// Pretty error prints errors all pretty.
const prettyError = new PrettyError
// Skip events.js and http.js and similar core node files.
prettyError.skipNodeFiles()
// Skip all the trace lines about express' core and sub-modules.
prettyError.skipPackage('express')

module.exports = app
  .use('/api', require('./api'))
  // any requests with an extension (.js, .css, etc.) turn into 404
  .use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

if (module === require.main) {
  // Start listening only if we're the main module.
  const server = app.listen(
    process.env.PORT || 3000,
    () => {
      console.log(`--- Started HTTP Server for Geography Questions} ---`)
      const { address, port } = server.address()
      const host = address === '::' ? 'localhost' : address
      const urlSafeHost = host.includes(':') ? `[${host}]` : host
      console.log(`Listening on http://${urlSafeHost}:${port}`)
    }
  )
}