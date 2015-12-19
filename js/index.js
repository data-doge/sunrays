var layerParams0 = {
  color: 'black',
  generateShapes: function () {
    var xOffset = 0, padding = 1, width = 4

    while (xOffset < this.width) {
      this.shapes.push({ x: xOffset, y: 0, width: width, height: this.height })
      xOffset += width + padding
    }
  },
  printShape: function (shape, index) {
    this.context.fillRect(shape.x, shape.y, shape.width, shape.height)
  },
  updateShape: function (shape, index) {
    shape.x = (shape.x + 1) % this.width
  }
}

var layer = new Layer(layerParams0)

$(document).on('keyup', function (e) {
  if (e.keyCode === 32) {
    layer.toggleAnimation()
  }
})
