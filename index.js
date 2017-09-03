'use strict'

const http = require('http')
const socket = require('socket.io')
const _ = require('lodash')
const fs = require('fs')
const Logs = require('./lib/logs')

const socketHandler = require('./lib/socket')
const serverHandler = require('./lib/server')

var wConsole = module.exports = function (opts) {
  var defaultOpts = {
    production: false,
    port: 309,
    host: '0.0.0.0'
    limit: 100
  }
  var opts = this.opts = _.defaults(opts, defaultOpts)

  this.logs = new Logs({
    limit: opts.limit
  })

  var server = this.server = http.createServer(serverHandler)
  var io = this.io = socket(server)
  socketHandler(io, this.logs)

  server.listen(opts.port, opts.host, function (err) {
    console.log(server.address())
    if (err) {
      throw new Error('server or port already used')
    }
  })
}

wConsole.prototype.isServerOpen = function () {
  if (!this.server.address()) {
    return false
  }
  return true
}

wConsole.prototype.log = function (log) {
  var self = this

  self.logs.save(log)
  if (!self.isServerOpen()) {
    return false
  }

  this.io.emit('update', log)
}
