function Layer (params) {
  params = params || {}
  this.width = $(window).width()
  this.height = $(window).height()
  this.color = params.color || 'black'
  this.isMoving = true
  this.shapes = []
  this.initialize()
}

Layer.prototype.initialize = function () {
  this.prepareCanvas()
  this.generateShapes()
  this.printShapes()
  this.animate()
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
  // padding 1 looks great
  // width <= 5 is smooth
  // around width > 5, get a lone wolf pair
  // padding can be switched with width for inverse colors
  var xOffset = 0, padding = 1, width = 4

  while (xOffset < this.width) {
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
  this.updateShapes()
  if (this.isMoving) {
    this.clear()
    this.printShapes()
    requestAnimationFrame(this.animate.bind(this))
  }
}

Layer.prototype.updateShapes = function () {
  this.shapes.forEach(this.updateShape.bind(this))
}

// will also likely be a callback that we pass into each distinct layer
Layer.prototype.updateShape = function (shape, index) {
  shape.x = (shape.x + 1) % this.width
}

Layer.prototype.toggleAnimation = function () {
  if (this.isMoving) {
    this.isMoving = false
  } else {
    this.isMoving = true
    this.animate()
  }
}

Layer.prototype.clear = function () {
  this.context.clearRect(0, 0, this.width, this.height)
}
