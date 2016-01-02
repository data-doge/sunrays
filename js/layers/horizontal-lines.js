var stampit = require('stampit')
var divisors = require('array-math').divisors
var median = require('median')

var horizontalLines = stampit({
  methods: {
    generateShapes: function () {
      var params = this.getDefaultShapeParams()
      while (params.yOffset < this.height) {
        this.shapes.push({ x: 0, y: params.yOffset, width: this.width, height: params.height})
        params.yOffset += params.height + params.spacing
      }
    },
    printShape: function (shape, index) {
      this.context.fillStyle = 'blue'
      this.context.fillRect(shape.x, shape.y, shape.width, shape.height)
    },
    updateShapePosition: function (shape, index) {
      shape.y  = shape.y > 0 ? shape.y - 1 : this.height
    },
    getPossibleDivisors: function () {
      return divisors(this.height, {proper: true})
    },
    getDefaultShapeParams: function () {
      var middleDivisor = median(this.getPossibleDivisors())
      var height = Math.floor(middleDivisor / 5)
      var spacing = middleDivisor - height
      return {yOffset: 0, height: height, spacing: spacing}
    }
  }
})

module.exports = horizontalLines
