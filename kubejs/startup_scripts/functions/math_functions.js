const rotationCache = []

function getMathFunctions() {
     var square = (num) => num * num

     var diff = (num0, num1) => Math.abs(num0 - num1)
     
     var isOdd = (num) => num % 2 == 1
     var isEven = (num) => num % 2 == 0

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

     var rotateSnake = (point, size) => comfuncs.functionalVar(commaths.rotate2D(point, size), r => commaths.isOdd(r.height) ? commaths.flip(point, size) : r.width)

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
          if (matrix == null) {
               matrix = []
               var rotate = drag
               if (anchor == 1)
                    rotate = rotateAntiClockwise
               else if (anchor == 2)
                    rotate = rotateClockwise
               else if (anchor == 3)
                    rotate = flip
               comfuncs.forEasy(size * size, point => matrix[point] = rotate(point, size))
               rotationCache.push({size: size, anchor: anchor, matrix: matrix})
          }
          return comfuncs.ensureArray(points).map(point => matrix[point])
     }

     return {
          square: square,
          diff: diff,
          isOdd: isOdd,
          isEven: isEven,
          roll: roll,
          drag: drag,
          flip: flip,
          rotate1D: rotate1D,
          rotate2D: rotate2D,
          rotateSnake: rotateSnake,
          rotateFlip: rotateFlip,
          rotateClockwise: rotateClockwise,
          rotateAntiClockwise: rotateAntiClockwise,
          findRotation: findRotation
     }
}