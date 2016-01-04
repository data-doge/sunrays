var $ = require('jquery')
var stampit = require('stampit')
var base =  require('./base')
var horizontalLines = require('./horizontal-lines')
var verticalLines = require('./vertical-lines')

// need to adjust body size so that width and height are both a multiple of 5,
// this ensures maximum subdivisions for patterns with repeating shapes
// -- this will soon be a part of this layer's modules setup method
var width = $('body').width()
while (width % 12 !== 0) { width-- }
$('body').width(width)

var height = $('body').height()
while (height % 12 !== 0) { height-- }
$('body').height(height)

var layers = [
  stampit.compose(horizontalLines, base)(),
  stampit.compose(verticalLines, base)()
]

module.exports = layers
