var stampit = require('stampit')

var verticalLines = stampit({
  methods: {
    generateShapes: function () {
      var xOffset = 0, spacing = 1, width = 2

      while (xOffset < this.width) {
        this.shapes.push({ x: xOffset, y: 0, width: width, height: this.height })
        xOffset += width + spacing
      }
    },
    printShape: function (shape, index) {
      this.context.fillStyle = 'red'
      this.context.fillRect(shape.x, shape.y, shape.width, shape.height)
    },
    updateShape: function (shape, index) {
      if (this.direction === 'forward') {
        shape.x = (shape.x + 1) % this.width
      } else {
        shape.x = shape.x > 0 ?  shape.x - 1 : this.width
      }
    }
  }
})

module.exports = verticalLines
