var $ = require('jquery')
var _ = require('lodash')
function log (string) { console.log(string + ': ', eval(string)) }
var layers = require('./js/layers')

$(document).on('keyup', function (e) {
  console.log('e.keyCode: ', e.keyCode)

  if (_.inRange(e.keyCode, 49, 58)) {
    var layerNum = e.keyCode - 49
    layers.setTo(layerNum)
  }

  switch (e.keyCode) {
    case 32: // space
      layers.current().toggle(); break;
    case 39: // right arrow
      layers.current().changeEffect(true); break;
    case 37: // left arrow
      layers.current().changeEffect(false); break;
    case 38: // up arrow
      layers.current().changeStepLength(true); break;
    case 40: // down arrow
      layers.current().changeStepLength(false); break;
    case 189: // minus
      layers.lowerCurrentLayer(); break;
    case 187: // plus
      break;
  }

  layers.updateIndicators()
})
