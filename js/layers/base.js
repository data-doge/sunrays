var $ = require('jquery')
var stampit = require('stampit')

var baseLayer = stampit({
  init: function () {
    this.width = $(window).width()
    this.height = $(window).height()
    this.isDisplayed = true
    this.isMoving = true
    this.direction = 'forward'
    this.shapes = []
    this.prepareCanvas()
    this.generateShapes()
    this.printShapes()
    this.animate()
  },
  methods: {
    prepareCanvas: function () {
      var $canvas = $('<canvas></canvas>')
      $canvas.attr('width', this.width)
      $canvas.attr('height', this.height)
      $('body').append($canvas)
      this.context = $canvas[0].getContext('2d')
    },
    printShapes: function () {
      this.shapes.forEach(this.printShape.bind(this))
    },
    animate: function () {
      this.updateShapes()
      if (this.isMoving) {
        this.clear()
        this.printShapes()
        requestAnimationFrame(this.animate.bind(this))
      }
    },
    updateShapes: function () {
      this.shapes.forEach(this.updateShape.bind(this))
    },
    toggleAnimation: function () {
      this.isMoving = !this.isMoving
      if (this.isMoving) { this.animate() }
    },
    toggleDisplay: function () {
      this.isMoving = !this.isMoving
      this.isDisplayed ? this.clear() : this.animate()
      this.isDisplayed = !this.isDisplayed
    },
    clear: function () {
      this.context.clearRect(0, 0, this.width, this.height)
    },
    toggleDirection: function () {
      this.direction = this.direction === 'forward' ? 'back' : 'forward'
    }
  }
})

module.exports = baseLayer
