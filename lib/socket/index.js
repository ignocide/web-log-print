'use strict'

module.exports = function (io, logs) {
  io.on('connection', function (socket) {
    var log = logs.list(1)
    socket.emit('init', log)
  })
}
