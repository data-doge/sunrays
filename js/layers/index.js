var stampit = require('stampit')
var base =  require('./base')
var horizontalLines = require('./horizontal-lines')
var verticalLines = require('./vertical-lines')

var layers = [
  stampit.compose(horizontalLines, base)(),
  stampit.compose(verticalLines, base)()
]

module.exports = layers
