var $ = require('jquery')
var stampit = require('stampit')

var baseLayer = stampit({
  init: function () {
    this.context = null
    this.$canvas = $('<canvas></canvas>')
    this.width = $('body').width()
    this.height = $('body').height()
    this.isOn = true
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
      this.$canvas.attr('width', this.width)
                  .attr('height', this.height)
      $('body').append(this.$canvas)
      this.context = this.$canvas[0].getContext('2d')
    },
    printShapes: function () {
      this.shapes.forEach(this.printShape.bind(this))
    },
    animate: function () {
      this.updateShapePositions()
      if (this.isOn) {
        this.clear()
        this.printShapes()
        requestAnimationFrame(this.animate.bind(this))
      }
    },
    updateShapePositions: function () {
      this.shapes.forEach(this.updateShapePosition.bind(this))
    },
    toggle: function () {
      this.isOn = !this.isOn
      this.isOn ? this.animate() : this.clear()
    },
    clear: function () {
      this.context.clearRect(0, 0, this.width, this.height)
    },
    reset: function () {
      if (this.isOn) {
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
      if (!isIncreasing && this.stepLength > 0) { this.stepLength-- }
    },
    depth: function (newDepth) {
      if (newDepth) {
        this.$canvas.css('z-index', newDepth)
      } else {
        return this.$canvas.css('z-index')
      }
    }
  }
})

module.exports = baseLayer
