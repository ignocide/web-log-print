'use strict'

const opn = require('opn')
const fs = require('fs')

var open = function (json) {
  fs.readFile(__dirname + '/_template.html', 'utf-8', function (err, data) {
    if (err) return console.error(err)
    data = data.replace('##data##', JSON.stringify(json))
    fs.writeFile(__dirname + '/tmp.html', data, function (err) {
    // fs.writeFile(root.project + '.doc.html', data, function (err) {
      if (err) return console.error(err)
      opn(__dirname + '/tmp.html')
    })
  })
}

var jsonLog = function () {}

var log = module.exports = function () {
  var args = Array.prototype.slice.call(arguments)
  args = args.length == 1 ? args[0] : args
  open(args)
}
