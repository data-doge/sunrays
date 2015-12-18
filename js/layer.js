function Layer () {
  this.width = $(window).width()
  this.height = $(window).height()
  this.context;
  this.shapes = []
  this.initialize()
}

Layer.prototype.initialize = function () {
  this.prepareCanvas()
  this.generateShapes()
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
  var xOffset = 0, padding = 20, width = 20, color = 'black'

  while (xOffset + padding < this.width) {
    this.shapes.push({ x: xOffset, y: 0, width: width, height: this.height, color: color })
    xOffset += width + padding
  }
}

Layer.prototype.printShapes = function () {
  // put a bunch of lines on the screen
}

Layer.prototype.animate = function () {
  // make their positions rotate
}
