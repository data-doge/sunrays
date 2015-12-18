function Layer () {
  this.width = $(window).width()
  this.height = $(window).height()
  this.initialize()
}

Layer.prototype.initialize = function () {
  this.prepareCanvas()
}

Layer.prototype.prepareCanvas = function () {
  var $canvas = $('<canvas></canvas>')
  $canvas.attr('width', this.width)
  $canvas.attr('height', this.height)
  $('body').append($canvas)
}

Layer.prototype.generateShapes = function () {

}

Layer.prototype.printShapes = function () {
  // put a bunch of lines on the screen
}

Layer.prototype.animate = function () {
  // make their positions rotate
}
