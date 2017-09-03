'use strict'

const fs = require('fs')
const url = require('url')
const path = require('path')

const HTML_PATH = path.join(__dirname, '..', '..', '_template.html')
const ASSETS = ['bower_components']

var server = function (req, res) {
  var filePath = getEndpoint(req)
  fs.readFile(filePath, function (err, data) {
    res.writeHead(200)
    res.end(data)
  })
}

var getEndpoint = function (req) {
  var urlObj = url.parse(req.url, true, false)

  var routes = urlObj.path.split('/')
  var firstUrlPath = (routes && routes[1]) || null
  if (ASSETS.indexOf(firstUrlPath) !== -1) {
    return path.join(__dirname, '..', '..', urlObj.path)
  }
  return HTML_PATH
}

module.exports = server
