/**
 * @typedef {Object} Rotations
 * @property {Number} size
 * @property {Number} anchor
 * @property {Number[]} matrix
 */

/**
 * A helper containing functions that are either unpresent in {@link Math} or done more effeciently. Notably, simple 90 degree point rotation.
 * @class StackHelper
 * @constructor
 */
function MathHelper() {
     /** @type {Array.<Rotations>} */ this.rotationCache = []
     return this
}

MathHelper.prototype = {
     //Powers
     /**
      * @param {Number} i 
      * @returns {Number}
      */
     square: function(i) {
          return Math.pow(i, 2)
     },

     /**
      * @param {Number} i 
      * @returns {Number}
      */
     cube: function(i) {
          return Math.pow(i, 3)
     },

     /**
      * @param {Number} i 
      * @returns {Number}
      */
     tesseract: function(i) {
          return Math.pow(i, 4)
     },

     //Testing
     /**
      * @param {Number} x 
      * @param {Number} y 
      * @returns {Number} The positive difference of two numbers
      */
     diff: function(x, y) {
          return Math.abs(x - y)
     },
     
     /**
      * @param {Number} i 
      * @returns {Number}
      */
     isOdd: function(i) {
          return i % 2 == 1
     },

     /**
      * @param {Number} i 
      * @returns {Number}
      */
     isEven: function(i) {
          return i % 2 == 0
     },

     //Whole Rotations (90 degrees)
     /**
      * Places a point on the square given the following information
      * @param {Number} width 
      * @param {Number} height 
      * @param {Number} size 
      * @returns {Number} The index of the placed point
      */
     place: function(width, height, size) {
          return width + height * size
     },

     /**
      * Will reverse engineer the 1 dimensional point (width; x axis) given a certain square.
      * @param {Number} point 
      * @param {Number} size 
      * @returns {Number} The width (x axis)
      */
     locateLine: function(point, size) {
          return this.locateSquare(point, size).width
     },

     /**
      * Will reverse engineer the coordinate of a point given a certain square.
      * @param {Number} point 
      * @param {Number} size 
      */
     locateSquare: function(point, size) {
          var height = 0
          while (point >= size) {
               height++
               point -= size
          }
          return {width: point, height: height}
     },

     /**
      * Since an index is always placed with respect to a square's dimensions, the position must be recompiled 
      * according to it's new square in order to avoid distortion.
      * @param {Number} point 
      * @param {Number} oldSize 
      * @param {Number} newSize 
      * @returns {Number} A remapped index such that it still fits in the same position on a different square.
      */
     stretch: function(point, oldSize, newSize) {
          var {width, height} = this.locateSquare(point, oldSize)
          return this.place(width, height, newSize)
     },

     /**
      * Will flip a point on a line (1 dimension)
      * @param {Number} point 
      * @param {Number} size 
      * @returns {Number} The index of the flipped point
      */
     flipLine: function(point, size) {
          return size - 1 - point
     },

     /**
      * Will flip a point on a square (2 dimensions)
      * @param {Number} point 
      * @param {Number} size 
      * @returns {Number} The index of the flipped point
      */
     flipSquare: function(point, size) {
          var {width, height} = this.locateSquare(point, size)
          return this.place(this.flipLine(height, size), this.flipLine(width, size), size)
     },

     /**
      * @param {Number} point 
      * @param {Number} size 
      * @returns {Number}
      */
     rotateClockwise: function(point, size) {
          var {width, height} = this.locateSquare(point, size)
          return this.place(height, this.flipLine(width, size), size)
     },
   
     /**
      * @param {Number} point 
      * @param {Number} size 
      * @returns {Number}
      */
     rotateAntiClockwise: function(point, size) {
          var {width, height} = this.locateSquare(point, size)
          return this.place(this.flipLine(height, size), width, size)
     },

     /**
      * Rotates a collection of given points given a certain square with respect to the anchor. 
      * Ensure that you use the right size or you will get an `ArrayIndexOutOfBoundsException`
      * 
      *  * All rotations will be cached for later use to avoid constantly recalculating the same values.
      * 
      * @param {Number|Number[]} points A single number will be converted into an array
      * @param {Number} size 
      * @param {?Number} anchor 0 = stay; 1 = antiClockwise; 2 = clockWise; 3 = +-180 degrees
      * @returns {Number[]} A rotated version of the entered points
      * 
      */
     rotate: function(points, size, anchor) {
          /** @type {Rotations} */ var rotation =  this.rotationCache.find(rotation => rotation.size == size && rotation.anchor == anchor)
          /** @type {Array.<Number>} */ var matrix = rotation != null ? rotation.matrix : null
          if (matrix == null) {
               matrix = []
               var rotator
               switch(anchor) {
                    default: rotator = point => point
                    case 1: rotator = this.rotateAntiClockwise
                    case 2: rotator = this.rotateClockwise
                    case 3: rotator = this.flipSquare
               }
               comfuncs.forEasy(size * size, point => matrix[point] = rotator(point, size))
               this.rotationCache.push({size: size, anchor: anchor, matrix: matrix})
          }
          return comfuncs.ensureArray(points).map(point => matrix[point])
     }
}