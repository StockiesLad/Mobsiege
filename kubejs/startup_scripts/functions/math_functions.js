const rotationCache = []

function getMathFunctions() {
     var square = (num) => num * num

     var diff = (num0, num1) => Math.abs(num0 - num1)

     var roll = (width, height, size) => width + height * size

     var drag = (point, size) =>  {
          var {width, height} = rotate2D(point, size)
          return roll(width, height, size)
     }

     var flip = (point, size) => size - 1 - point

     var rotate2D = (point, size) => {
          var height = 0
          while (point >= size) {
               height++
               point -= size
          }
          return {width: point, height: height}
     }

     var rotate1D = (point, size) => rotate2D(point, size).width

     /*
          = origin + (size - 1 - width - height) * size - width + height
          = (size - 1 - width) * size + height
     */
     var rotateClockwise = (point, size) => {
          var {width, height} = rotate2D(point, size)
          return roll(height, flip(width, size), size)

     }
   
     /*
          = origin + (width + 1) * (size - 1) - height * (size - 1)
          = (width + 1) * size - height - 1
     */
     var rotateAntiClockwise = (point, size) => {
          var {width, height} = rotate2D(point, size)
          return roll(flip(height, size), width, size)

     }

     var rotateFlip = (point, size) => {
          var {width, height} = rotate2D(point, size)
          return roll(flip(height, size), flip(width, size), size)
     }

     var findRotation = (points, size, anchor) => {
          var matrix
          rotationCache.forEach(rotation => {
               if (rotation.size >= size && rotation.anchor == anchor)
                    matrix = rotation.matrix
          })
          if (matrix.length == 0) {
               matrix = []
               var rotate
               switch (anchor) {
                    default: rotate = drag
                    case 0: rotate = rotateAntiClockwise
                    case 1: rotate = rotateClockwise
                    case 2: rotate = flip
               }
               comfuncs.forEasy(size * size, point => matrix.push(rotate(point)))
               rotationCache.push({size: size, anchor: anchor, matrix: matrix})
          }
          return points.map(point => matrix[point])
     }

     return {
          square: square,
          diff: diff,
          roll: roll,
          drag: drag,
          rotate1D: rotate1D,
          rotate2D: rotate2D,
          rotateFlip: rotateFlip,
          rotateClockwise: rotateClockwise,
          rotateAntiClockwise: rotateAntiClockwise,
          findRotation: findRotation
     }
}