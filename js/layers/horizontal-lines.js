var stampit = require('stampit')
var divisors = require('array-math').divisors
var median = require('median')

var horizontalLines = stampit({
  init: function () {
    this.description = 'horizontal lines'
  },
  methods: {
    setup: function () {
      this.possibleDivisors = divisors(this.height, {proper: true})
      this.divisorIndex = Math.floor(this.possibleDivisors.length / 2)
      this.shapeParams = { height: 1, spacing: this.currentDivisor() - 1 }
    },
    generateShapes: function () {
      var params = this.shapeParams, yOffset = 0
      while (yOffset < this.height) {
        this.shapes.push({ x: 0, y: yOffset, width: this.width, height: params.height})
        yOffset += params.height + params.spacing
      }
    },
    printShape: function (shape, index) {
      this.context.fillStyle = 'blue'
      this.context.fillRect(shape.x, shape.y, shape.width, shape.height)
    },
    updateShapePosition: function (shape, index) {
      shape.y = (shape.y + this.stepLength) % this.height
    },
    increaseEffect: function () { // increases spacing
      if (this.divisorIndex < this.possibleDivisors.length - 1) {
        this.effectValue++
        this.divisorIndex++
        this.shapeParams.spacing = this.currentDivisor() - this.shapeParams.height
      }
    },
    decreaseEffect: function () { // decreases spacing
      if (this.divisorIndex > 1) {
        this.effectValue--
        this.divisorIndex--
        this.shapeParams.spacing = this.currentDivisor() - this.shapeParams.height
      }
    },

    // private
    currentDivisor: function () {
      return this.possibleDivisors[this.divisorIndex]
    }
  }
})

module.exports = horizontalLines
