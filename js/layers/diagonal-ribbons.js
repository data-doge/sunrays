var stampit = require('stampit')
var divisors = require('array-math').divisors
var gcd = require('gcd')
var sqrt = require('sqrt')

var diagonalRibbons = stampit({
  init: function () {
    this.description = 'diagonal ribbons'
  },
  methods: {
    setup: function () {
      this.possibleWidths = this.getPossibleWidths()
      this.widthIndex = Math.floor(this.possibleWidths.length / 2)
      console.log('this.possibleWidths: ', this.possibleWidths)
    },
    generateShapes: function () {
      var ribbonWidth = this.currentWidth(), offset = 0
      while (offset < this.width) {
        var x1 = -this.height / 2, y1 = -x1, x2 = this.width / 2, y2 = -x2
        this.shapes.push({
          x1: x1 + offset,
          y1: y1 + offset,
          x2: x2 + offset,
          y2: y2 + offset
        })
        offset += sqrt(2) * ribbonWidth * 2
      }
    },
    printShape: function (shape, index) {
      this.drawRibbon(shape.x1, shape.y1, shape.x2, shape.y2, this.currentWidth())
    },
    updateShapePosition: function (shape, index) {
    },
    increaseEffect: function () {
    },
    decreaseEffect: function () {
    },

    // private
    getPossibleWidths: function () {
      return divisors(gcd(this.width, this.height))
    },
    currentWidth: function () {
      return this.possibleWidths[this.widthIndex]
    },
    drawRibbon: function (x1, y1, x2, y2, w) {
      this.context.beginPath()
      this.context.moveTo(x1, y1)
      this.context.lineTo(x2, y2)
      this.context.lineTo(x2 + sqrt(2) * w, y2 + sqrt(2) * w)
      this.context.lineTo(x1 + sqrt(2) * w, y1 + sqrt(2) * w)
      this.context.closePath()
      this.context.fill()
    }
  }
})

module.exports = diagonalRibbons
