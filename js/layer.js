var $ = require('jquery')

function Layer (params) {
  this.loadParams(params)
  this.initialize()
}

Layer.prototype.loadParams = function (params) {
  this.width = $(window).width()
  this.height = $(window).height()
  this.generateShapes = params.generateShapes.bind(this)
  this.printShape = params.printShape.bind(this)
  this.updateShape = params.updateShape.bind(this)
  this.isDisplayed = true
  this.isMoving = true
  this.direction = 'forward'
  this.shapes = []
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

Layer.prototype.printShapes = function () {
  this.shapes.forEach(this.printShape.bind(this))
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

Layer.prototype.toggleAnimation = function () {
  this.isMoving = !this.isMoving
  if (this.isMoving) { this.animate() }
}

Layer.prototype.toggleDisplay = function () {
  this.isMoving = !this.isMoving
  this.isDisplayed ? this.clear() : this.animate()
  this.isDisplayed = !this.isDisplayed
}

Layer.prototype.clear = function () {
  this.context.clearRect(0, 0, this.width, this.height)
}

Layer.prototype.toggleDirection = function () {
  this.direction = this.direction === 'forward' ? 'back' : 'forward'
}

module.exports = Layer
