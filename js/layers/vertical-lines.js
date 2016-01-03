var stampit = require('stampit')
var divisors = require('array-math').divisors
var median = require('median')
var _ = require('lodash')

var verticalLines = stampit({
  methods: {
    generateShapes: function () {
      if (!this.shapeParams) {
        this.shapeParams = this.getDefaultShapeParams()
      } else {
        this.shapeParams.xOffset = 0
      }
      var params = this.shapeParams
      while (params.xOffset < this.width) {
        this.shapes.push({ x: params.xOffset, y: 0, width: params.width, height: this.height })
        params.xOffset += params.width + params.spacing
      }
    },
    printShape: function (shape, index) {
      this.context.fillStyle = 'red'
      this.context.fillRect(shape.x, shape.y, shape.width, shape.height)
    },
    updateShapePosition: function (shape, index) {
      shape.x = (shape.x + 1) % this.width
    },
    fetchPossibleDivisors: function () {
      this.possibleDivisors = divisors(this.width, {proper: true})
    },
    getDefaultShapeParams: function () {
      this.fetchPossibleDivisors()
      var middleDivisor = median(this.possibleDivisors)
      this.divisorIndex = _.findIndex(this.possibleDivisors, function (divisor) {
        return divisor === middleDivisor
      })
      var width = Math.floor(middleDivisor / 10)
      var spacing = middleDivisor - width
      return { xOffset: 0, width: width, spacing: spacing }
    },
    increaseSize: function () {
      if (this.divisorIndex < this.possibleDivisors.length - 1) {
        this.divisorIndex++
        this.shapeParams.spacing = this.currentDivisor() - this.shapeParams.width
      }
    },
    decreaseSize: function () {
      if (this.divisorIndex > 1) {
        this.divisorIndex--
        this.shapeParams.spacing = this.currentDivisor() - this.shapeParams.width
      }
    },
    currentDivisor: function () {
      return this.possibleDivisors[this.divisorIndex]
    },
    bindEffects: function () {
      this.increaseEffect = this.increaseSize
      this.decreaseEffect = this.decreaseSize
    }
  }
})

module.exports = verticalLines
