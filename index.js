var $ = require('jquery')
var _ = require('lodash')
function log (string) { console.log(string + ': ', eval(string)) }
var layers = require('./js/layers')

var $layerNum = $('#layer-no-value')

// TODO: move to layers module
var currentLayer = layers[0]

$(document).on('keyup', function (e) {
  console.log('e.keyCode: ', e.keyCode)

  // TODO: move to layers module
  if (_.inRange(e.keyCode, 49, 58)) {
    var layerNum = e.keyCode - 49
    currentLayer = layers[layerNum]
    $layerNum.text(layerNum + 1)
  }

  switch (e.keyCode) {
    case 32: // enter
      currentLayer.toggleDisplay(); break;
    case 13: // space
      currentLayer.toggleAnimation(); break;
    case 39: // right arrow
      currentLayer.changeEffect(true); break;
    case 37: // left arrow
      currentLayer.changeEffect(false); break;
    case 38: // up arrow
      currentLayer.changeStepLength(true); break;
    case 40: // down arrow
      currentLayer.changeStepLength(false); break;
  }
})
