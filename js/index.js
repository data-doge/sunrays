var layer = new Layer()
console.log('layer: ', layer)

$(document).on('keyup', function (e) {
  if (e.keyCode === 32) {
    layer.toggleAnimation()
  }
})
