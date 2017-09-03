'use strict'

// 이 구조는 queue와 순서가 반대로 작동된다. push = unshift, last = pop
var logs = module.exports = function () {
  this.space = []
}

logs.prototype.save = function (obj) {
  var self = this

  self.space.unshift(obj)

  return obj
}

logs.prototype.last = function () {
  var space = this.space

  if (space.length == 0) {
    return null
  }
  return space[0]
}

logs.prototype.list = function (page, size) {
  var space = this.space
  size = size || 10

  return space.slice((page - 1) * size, (page) * size)
}

logs.prototype.clear = function () {
  this.space = []
}
