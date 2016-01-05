var stampit = require('stampit')
var divisors = require('array-math').divisors
var gcd = require('gcd')
var sqrt = require('sqrt')
var _ = require('lodash')

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
      var offset = 0
      while (offset < this.width) {
        this.shapes.push(this.ribbonCoords(offset))
        offset += this.currentStepSize() * 2
      }
    },
    printShape: function (shape, index) {
      this.drawRibbon(shape.x1, shape.y1, shape.x2, shape.y2, this.currentWidth())
    },
    updateShapePosition: function (shape, index) {
      var initialCoords = this.ribbonCoords(0)
      var x1Max = initialCoords.x2, operation = null
      if (shape.x1 < x1Max) {
        operation = function (value, key) { shape[key]++ }
      } else {
        operation = function (value, key) { shape[key] = initialCoords[key]}
      }
      _.each(shape, operation)
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
    currentStepSize: function () {
      return this.currentWidth() * sqrt(2)
    },
    drawRibbon: function (x1, y1, x2, y2) {
      this.context.beginPath()
      this.context.moveTo(x1, y1)
      this.context.lineTo(x2, y2)
      this.context.lineTo(x2 + this.currentStepSize(), y2 + this.currentStepSize())
      this.context.lineTo(x1 + this.currentStepSize(), y1 + this.currentStepSize())
      this.context.closePath()
      this.context.fill()
    },
    ribbonCoords: function (offset) {
      var x1 = -this.height / 2, y1 = -x1, x2 = this.width / 2, y2 = -x2
      return {
        x1: x1 + offset,
        y1: y1 + offset,
        x2: x2 + offset,
        y2: y2 + offset
      }
    }
  }
})

module.exports = diagonalRibbons
