var $ = require('jquery')
var _ = require('lodash')
var stampit = require('stampit')
var base =  require('./base')
var horizontalLines = require('./horizontal-lines')
var verticalLines = require('./vertical-lines')

var layers = stampit({
  init: function () {
    this.calibrateBody()
    this.$descriptionValue = $('#description-value')
    this.$displayedValue = $('#displayed-value')
    this.$animatedValue = $('#animated-value')
    this.$speedValue = $('#speed-value')
    this.$effectValue = $('#effect-value')
    this.all = [
      stampit.compose(horizontalLines, base)(),
      stampit.compose(verticalLines, base)()
    ]
    this.setTo(0)
    this.updateIndicators()
  },
  methods: {
    setTo: function (layerNum) {
      if (_.inRange(layerNum, 10)) { this.layerNum = layerNum }
    },
    current: function () {
      return this.all[this.layerNum]
    },
    updateIndicators: function () {
      this.$descriptionValue.text(this.current().description)
      this.$displayedValue.text(this.current().isDisplayed)
      this.$animatedValue.text(this.current().isAnimated)
      this.$speedValue.text(this.current().stepLength)
      this.$effectValue.text(this.current().effectValue)
    },

    // private
    calibrateBody: function () {
      var width = $('body').width(), height = $('body').height()
      while (width % 12 !== 0) { width-- }
      while (height % 12 !== 0) { height-- }
      $('body').css({width: width, height: height})
    }
  }
})

module.exports = layers()
