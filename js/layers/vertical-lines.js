var stampit = require('stampit')
var divisors = require('array-math').divisors
var median = require('median')

var verticalLines = stampit({
  methods: {
    setup: function () {
      this.possibleDivisors = divisors(this.width, {proper: true})
      this.divisorIndex = Math.floor(this.possibleDivisors.length / 2)
      this.shapeParams = { width: 2, spacing: this.currentDivisor() - 2 }
    },
    generateShapes: function () {
      var params = this.shapeParams, xOffset = 0
      while (xOffset < this.width) {
        this.shapes.push({ x: xOffset, y: 0, width: params.width, height: this.height })
        xOffset += params.width + params.spacing
      }
    },
    printShape: function (shape, index) {
      this.context.fillStyle = 'red'
      this.context.fillRect(shape.x, shape.y, shape.width, shape.height)
    },
    updateShapePosition: function (shape, index) {
      shape.x = (shape.x + 1) % this.width
    },
    increaseEffect: function () { // increases spacing
      if (this.divisorIndex < this.possibleDivisors.length - 1) {
        this.divisorIndex++
        this.shapeParams.spacing = this.currentDivisor() - this.shapeParams.width
      }
    },
    decreaseEffect: function () { // decreases spacing
      if (this.divisorIndex > 1) {
        this.divisorIndex--
        this.shapeParams.spacing = this.currentDivisor() - this.shapeParams.width
      }
    },

    // private
    currentDivisor: function () {
      return this.possibleDivisors[this.divisorIndex]
    }
  }
})

module.exports = verticalLines
