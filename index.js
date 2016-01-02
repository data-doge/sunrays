var $ = require('jquery')
var _ = require('lodash')
function log (string) { console.log(string + ': ', eval(string)) }
var layers = require('./js/layers')

var $layerNum = $('.layer-num')

var currentLayer = layers[0]

$(document).on('keyup', function (e) {
  console.log('e.keyCode: ', e.keyCode)
  if (_.inRange(e.keyCode, 49, 58)) {
    var layerNum = e.keyCode - 49
    currentLayer = layers[layerNum]
    $layerNum.text(layerNum + 1)
  }

  switch (e.keyCode) {
    case 32:
      currentLayer.toggleDisplay(); break;
    case 13:
      currentLayer.toggleAnimation(); break;
    case 68:
      currentLayer.toggleDirection(); break;
  }
})
