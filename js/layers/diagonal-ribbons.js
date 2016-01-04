var stampit = require('stampit')
var divisors = require('array-math').divisors
var gcd = require('gcd')

var diagonalRibbons = stampit({
  init: function () {
    this.description = 'diagonal ribbons'
  },
  methods: {
    setup: function () {
      this.possibleWidths = this.getPossibleWidths()
      console.log('this.possibleWidths: ', this.possibleWidths)
    },
    generateShapes: function () {
      // since body is calibrated, both x and y axes are subdivisible by 12
    },
    printShape: function (shape, index) {
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
    }
  }
})

module.exports = diagonalRibbons
