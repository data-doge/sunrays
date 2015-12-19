function Layer (params) {
  params = params || {}
  this.width = $(window).width()
  this.height = $(window).height()
  this.color = params.color || 'black'
  this.shapes = []
  this.initialize()
}

Layer.prototype.initialize = function () {
  this.prepareCanvas()
  this.generateShapes()
  this.printShapes()
}

Layer.prototype.prepareCanvas = function () {
  var $canvas = $('<canvas></canvas>')
  $canvas.attr('width', this.width)
  $canvas.attr('height', this.height)
  $('body').append($canvas)
  this.context = $canvas[0].getContext('2d')
}

// will likely be a callback that we pass in for each distinct layer
Layer.prototype.generateShapes = function () {
  var xOffset = 0, padding = 20, width = 20

  while (xOffset + padding < this.width) {
    this.shapes.push({ x: xOffset, y: 0, width: width, height: this.height })
    xOffset += width + padding
  }
}

Layer.prototype.printShapes = function () {
  this.shapes.forEach(this.printShape.bind(this))
}

// will also likely be a callback that we pass into each distinct layer
Layer.prototype.printShape = function (shape, index) {
  this.context.fillRect(shape.x, shape.y, shape.width, shape.height)
}

Layer.prototype.animate = function () {
  // make their positions rotate
}
