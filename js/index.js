var horizontalLines = {
  generateShapes: function () {
    var yOffset = 0, spacing = 3, height = 3

    while (yOffset < this.height) {
      this.shapes.push({ x: 0, y: yOffset, width: this.width, height: height})
      yOffset += height + spacing
    }
  },
  printShape: function (shape, index) {
    this.context.fillStyle = 'black'
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

var verticalLines = {
  generateShapes: function () {
    var xOffset = 0, spacing = 3, width = 3

    while (xOffset < this.width) {
      this.shapes.push({ x: xOffset, y: 0, width: width, height: this.height })
      xOffset += width + spacing
    }
  },
  printShape: function (shape, index) {
    this.context.fillStyle = 'black'
    this.context.fillRect(shape.x, shape.y, shape.width, shape.height)
  },
  updateShape: function (shape, index) {
    if (this.direction === 'forward') {
      shape.x = (shape.x + 3) % this.width
    } else {
      shape.x = shape.x > 0 ? shape.x - 1 : this.width
    }
  }
}

var $layerNum = $('.layer-num')

var layers = []
layers.push(new Layer(horizontalLines))
layers.push(new Layer(verticalLines))

var currentLayer = layers[0]
$(document).on('keyup', function (e) {
  // if key 1 - 9 pressed
  if (_.inRange(e.keyCode, 49, 58)) {
    var layerNum = e.keyCode - 49
    currentLayer = layers[layerNum]
    $layerNum.text(layerNum + 1)
  }

  // 37 - left
  // 38 - up
  // 39 - right
  // 40 - down

  switch (e.keyCode) {
    case 32:
      currentLayer.toggleDisplay(); break;
    case 13:
      currentLayer.toggleAnimation(); break;
    case 68:
      currentLayer.toggleDirection(); break;
  }
})

var $body = $('body')
var maxthetaX = 25, thetaX = 0, dThetaX = 1
var thetaYMax = 25, thetaY = 0, dThetaY = 1

function rotate () {
  if (Math.abs(thetaX) >= maxthetaX) { dThetaX = -dThetaX }
  if (Math.abs(thetaY) >= thetaYMax) { dThetaY = -dThetaY }
  thetaX += dThetaX
  thetaY += dThetaY
  $body.css('transform', 'rotateX(' + thetaX + 'deg)')
  $body.css('transform', 'rotateY(' + thetaY + 'deg)')
  requestAnimationFrame(rotate)
}

rotate()
