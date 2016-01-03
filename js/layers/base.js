var $ = require('jquery')
var stampit = require('stampit')

var baseLayer = stampit({
  init: function () {
    this.width = $(window).width()
    this.height = $(window).height()
    this.isDisplayed = true
    this.isMoving = true
    this.shapes = []
    this.prepareCanvas()
    this.generateShapes()
    this.printShapes()
    this.bindEffects()
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
      this.updateShapePositions()
      if (this.isMoving) {
        this.clear()
        this.printShapes()
        requestAnimationFrame(this.animate.bind(this))
      }
    },
    updateShapePositions: function () {
      this.shapes.forEach(this.updateShapePosition.bind(this))
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
    reset: function () {
      if (this.isMoving) {
        this.shapes = []
        this.generateShapes()
      }
    },
    changeEffect: function (isIncreasing) {
      isIncreasing ? this.increaseEffect() : this.decreaseEffect()
      this.reset()
    }
  }
})

module.exports = baseLayer
