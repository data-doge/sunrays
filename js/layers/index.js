var $ = require('jquery')
var _ = require('lodash')
var stampit = require('stampit')
var base =  require('./base')
var horizontalLines = require('./horizontal-lines')
var verticalLines = require('./vertical-lines')

var layers = stampit({
  init: function () {
    this.calibrateBody()
    this.$description = $('#description')
    this.$on = $('#on')
    this.$speed = $('#speed')
    this.$effect = $('#effect')
    this.$depth = $('#depth')
    this.all = [
      stampit.compose(horizontalLines, base),
      stampit.compose(verticalLines, base)
    ]
    this.setDepths(this.all)
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
      this.$description.text(this.current().description)
      this.$on.text(this.current().isOn)
      this.$speed.text(this.current().stepLength)
      this.$effect.text(this.current().effectValue)
      this.$depth.text(this.current().depth())
    },
    lowerCurrentLayer: function () {
      var layers = this.orderedByDepth()
      var layerIndex = layers.findIndex(this.isCurrentLayer.bind(this))
      if (layerIndex > 0) {
        var lowerLayer = layers[layerIndex - 1]
        layers[layerIndex - 1] = this.current()
        layers[layerIndex] = lowerLayer
        this.setDepths(layers)
      }
    },
    raiseCurrentLayer: function () {
      var layers = this.orderedByDepth()
      var layerIndex = layers.findIndex(this.isCurrentLayer.bind(this))
      if (layerIndex < layers.length - 1) {
        var higherLayer = layers[layerIndex + 1]
        layers[layerIndex + 1] = this.current()
        layers[layerIndex] = higherLayer
        this.setDepths(layers)
      }
    },

    // private
    calibrateBody: function () {
      var width = $('body').width(), height = $('body').height()
      while (width % 12 !== 0) { width-- }
      while (height % 12 !== 0) { height-- }
      $('body').css({width: width, height: height})
    },
    orderedByDepth: function () {
      return _.sortBy(this.all, function (layer) {
        return layer.$canvas.css('z-index')
      })
    },
    setDepths: function (layers) {
      layers.forEach(function (layer, index) {
        layer.depth(index + 1)
      })
    },
    isCurrentLayer: function (layer, index) {
      return layer === this.current()
    }
  }
})

module.exports = layers()
