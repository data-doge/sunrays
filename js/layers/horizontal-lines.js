var stampit = require('stampit')

var horizontalLines = stampit({
  methods: {
    generateShapes: function () {
      var yOffset = 0, spacing = 10, height = 5

      while (yOffset < this.height) {
        this.shapes.push({ x: 0, y: yOffset, width: this.width, height: height})
        yOffset += height + spacing
      }
    },
    printShape: function (shape, index) {
      this.context.fillStyle = 'blue'
      this.context.fillRect(shape.x, shape.y, shape.width, shape.height)
    },
    updateShape: function (shape, index) {
      if (this.direction === 'forward') {
        shape.y = (shape.y + 1) % this.height
      } else {
        shape.y  = shape.y > 0 ? shape.y - 1 : this.height
      }
    }
  }
})

module.exports = horizontalLines
