var WCONSOLE = require('./')

var data = 'string'
var data1 = {
  b: 1
}

// log(data,data1)
// log(data1)

var wConsole = new WCONSOLE({
  port: 7000
})

var i = 0
var setLog = function () {
  setTimeout(function () {
    wConsole.log({
      sample: ++i
    })
    setLog()
  }, 1000)
}

setLog()
