/**
 * @typedef IngredientObject
 * @type {Object}
 * @property {Internal.Ingredient | String} ingredient
 * @property {Number[]} indexes
 */

/**
 * @class ShapedIngredients
 * @constructor
 * @param {[]} ingredients 
 * @param {Number} size 
 */
function ShapedIngredients(ingredients, size) {
     if (!(typeof(ingredients[0]) == 'string' || ingredients.every(ingredientInsert => Array.isArray(ingredientInsert))))  {
          console.error(`Failed to create ShapedIngredients. ingredients=${JSON.stringify(ingredients)}`)
          return null
     }

     if (size == null) {
          var largestIndex = -1
          common.alwaysSquareArray(ingredients, ingredients[0]).forEach(ingredient => {
               common.alwaysArray(ingredient[1]).forEach(i => {
                    if (i > largestIndex)
                         largestIndex = i
               })
          })
          size = Math.ceil(Math.sqrt(largestIndex + 1))
     }

     /** @type {Array.<IngredientObject>} */ this.mapper = []
     this.size = size
          
     common.alwaysSquareArray(ingredients, ingredients[0]).forEach(ingredient => {
          var indexes = common.alwaysArray(ingredient[1])
          if (ingredient.length == 3) {
               var exceptedIndexes = indexes
               indexes = []
               var fillArea = common.alwaysArray(ingredient[2])
               var fillOrigin = fillArea.length == 2 ? fillArea[0] : 0
               var fillDestination = fillArea.length != 0 ? fillArea[fillArea.length - 1] : this.length
               for (var i = fillOrigin; i <= fillDestination; i++)
                    if (exceptedIndexes == null || !exceptedIndexes.includes(i)) 
                         indexes.push(i)
          }
          this.mapper.push({ingredient: ingredient[0], indexes: indexes})
     })

     return this
}

ShapedIngredients.prototype = {
     incorp: function(ingredients) {
          /** @type {ShapedIngredients} */ var shapedIngredients = iOfShape(ingredients, this.size)
          this.mapper = this.mapper.filter(ingredient => {
               ingredient.indexes = ingredient.indexes.filter(index => !shapedIngredients.containsIndex(index))
               if (ingredient.indexes.length == 0)
                    return false
               return true
          })
          this.mapper = shapedIngredients.mapper.concat(this.mapper)
          return this
     },

     containsIndex: function(i) {
          return this.at(i) != null
     },

     /**
      * 
      * @param {Number} i 
      * @returns {IngredientObject}
      */
     at: function(i) {
          return this.mapper.find(ingredient => ingredient.indexes.find(index => {
               if (index == i) return true
               else return false
          }) != null)
     },

     toString: function() {
          return `ShapedIngredient[size=${this.size},mapper=${JSON.stringify(this.mapper)}]`
     }
}
/**
 * 
 * @param {Object} ingredients 
 * @param {Number} size 
 * @returns {ShapedIngredients}
 */
function iOfShape(ingredients, size) {
     if (ingredients instanceof ShapedIngredients) return ingredients
     else return new ShapedIngredients(ingredients, size)
}