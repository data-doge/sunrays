var $ = require('jquery')
var _ = require('lodash')
function log (string) { console.log(string + ': ', eval(string)) }
var layers = require('./js/layers')

$(document).on('keydown', function (e) {
  if (_.inRange(e.keyCode, 49, 58)) {
    var layerNum = e.keyCode - 49
    layers.setTo(layerNum)
  }

  switch (e.keyCode) {
    case 32: // space
      layers.current().toggle(); break;
    case 39: // right arrow
      layers.current().changeEffect('up'); break;
    case 37: // left arrow
      layers.current().changeEffect('down'); break;
    case 38: // up arrow
      layers.current().changeStepLength('up'); break;
    case 40: // down arrow
      layers.current().changeStepLength('down'); break;
    case 189: // minus
      layers.lowerCurrentLayer(); break;
    case 187: // plus
      layers.raiseCurrentLayer(); break;
  }

  layers.updateIndicators()
})
