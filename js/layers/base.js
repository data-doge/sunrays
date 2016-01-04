var $ = require('jquery')
var stampit = require('stampit')

var baseLayer = stampit({
  init: function () {
    this.context = null
    this.width = $('body').width()
    this.height = $('body').height()
    this.isDisplayed = true
    this.isAnimated = true
    this.stepLength = 1
    this.effectValue = 0
    this.shapes = []
    this.prepareCanvas()
    this.setup()
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
      this.updateShapePositions()
      if (this.isAnimated) {
        this.clear()
        this.printShapes()
        requestAnimationFrame(this.animate.bind(this))
      }
    },
    updateShapePositions: function () {
      this.shapes.forEach(this.updateShapePosition.bind(this))
    },
    toggleAnimation: function () {
      this.isAnimated = !this.isAnimated
      if (this.isAnimated) { this.animate() }
    },
    toggleDisplay: function () {
      this.isAnimated = !this.isAnimated
      this.isDisplayed ? this.clear() : this.animate()
      this.isDisplayed = !this.isDisplayed
    },
    clear: function () {
      this.context.clearRect(0, 0, this.width, this.height)
    },
    reset: function () {
      if (this.isAnimated) {
        this.shapes = []
        this.generateShapes()
      }
    },
    changeEffect: function (isIncreasing) {
      isIncreasing ? this.increaseEffect() : this.decreaseEffect()
      this.reset()
    },
    changeStepLength: function (isIncreasing) {
      this.reset()
      if (isIncreasing && this.stepLength < 20) { this.stepLength++ }
      if (!isIncreasing && this.stepLength > 1) { this.stepLength-- }
    }
  }
})

module.exports = baseLayer
