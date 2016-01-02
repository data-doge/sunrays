var stampit = require('stampit')
var divisors = require('array-math').divisors
var median = require('median')

var verticalLines = stampit({
  methods: {
    generateShapes: function () {
      var params = this.getDefaultShapeParams()
      while (params.xOffset < this.width) {
        this.shapes.push({ x: params.xOffset, y: 0, width: params.width, height: this.height })
        params.xOffset += params.width + params.spacing
      }
    },
    printShape: function (shape, index) {
      this.context.fillStyle = 'red'
      this.context.fillRect(shape.x, shape.y, shape.width, shape.height)
    },
    updateShape: function (shape, index) {
      shape.x = (shape.x + 1) % this.width
    },
    getPossibleDivisors: function () {
      return divisors(this.width, {proper: true})
    },
    getDefaultShapeParams: function () {
      var middleDivisor = median(this.getPossibleDivisors())
      var width = Math.floor(middleDivisor / 1.1)
      var spacing = middleDivisor - width
      return { xOffset: 0, width: width, spacing: spacing }
    }
  }
})

module.exports = verticalLines
