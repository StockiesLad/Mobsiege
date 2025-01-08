const insertionKeyStorage = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

/** @param {ShapedIngredients} shapedIngredients */
function createPattern(shapedIngredients) {
     var size = shapedIngredients.size
     var pattern = []
     var keys = {}

     for (var height = 0; height < size; height++) {
          var patternLayer = ''
          for (var width = 0; width < size; width++) {
               var index = commaths.roll(width, height, size)
               var ingredient = shapedIngredients.at(index)
               var key = ingredient != null ? insertionKeyStorage.charAt(shapedIngredients.mapper.indexOf(ingredient)) : ' '
               patternLayer = patternLayer + key
               if (insertionKeyStorage.includes(key) && keys[key] == null) keys[key] = ingredient.ingredient
          }
          pattern.push(patternLayer)
     }

     if (global.debug && (Object.keys(keys).length == 0 || pattern.length == 0))
          console.error(
               '[recipes.insertion]: Failed to parse!' +
               '\n        ingredients=' + shapedIngredients.toString() + 
               '\n        pattern=' + pattern +
               '\n        keys=' + JSON.stringify(keys)
          )

     return {pattern: pattern, keys: keys}
}

/**
 * An object to create & modify functional shaped recipes. Things like modification and finalisation are automatically defaulted, 
 * so you don't have to explicitly call things you don't need just to create a recipe.
 * 
 * <p></p> NOTE: Any repeating indexes will be overriden by the FIRST ingredientObject of that particular index
 * 
 * @class RecipeInsertion
 * @constructor
 * @param {RecipeObject} recipeObject The parent {@link RecipeObject}
 * @param {Internal.Item | String} result 
 * @param {Array} ingredientInserts Can be in compressed array or object form. See {@link parseIngredients}
 * @param {?Number} size If null - will be inferred. See {@link inferPatternSize}
 */
function RecipeInsertion(recipeObject, result, ingredientInserts, size) {
     if (result == null || result instanceof RecipeObject || result instanceof RecipeInsertion || ingredientInserts == null || (Array.isArray(ingredientInserts) && ingredientInserts.length == 0))
          console.error(
               '[recipes.insertion]: Invalid insertion recipe!' +
               '\n        result=' + result + 
               '\n        ingredientInserts=' + ingredientInserts 
          )
     this.event = recipeObject.event   
     this.recipeObject = recipeObject
     /** @type {Internal.Item | String}*/ this.result = result
     /** @type {ShapedIngredients}*/ this.ingredients = iOfShape(ingredientInserts, size)
     /** @type {Number}*/ this.size = this.ingredients.size
     this.terminated = false
     return this
}

RecipeInsertion.prototype = {
     //Modification
     /**
      * This will add the following ingredientInserts to the BACK. In other words, giving it priority. Adjust your code accordingly
      * @param {Array} ingredientInserts 
      */
     append: function(ingredientInserts) {
          this.ingredients.incorp(ingredientInserts)
          return this
     },

     /**
      * @param {Number} anchor 0 = top-left, 1 = top-right, 2 = bottom-left, 3 = bottom-right
      */
     rotate: function(anchor) {
          this.ingredients.remap(map => {
               var newMap = []
               for (var i = 0; i < map.length; i++)
                    newMap[comfuncs.findRotation(i, this.size, anchor)] = map[i]
               return newMap
          })
          return this
     },

     /**
      * @param {Number} anchor 1 = vertical, 2 = horizontal, 3 = vertical & horizontal
      */
     flip: function (anchor) {
          var vertical = anchor == 2 || anchor == 3
          var horizontal = anchor == 1 || anchor == 3

          this.ingredients.remap(map => {
               var newMap = []
               for (var i = 0; i < map.length; i++) {
                    var {width, height} = commaths.rotate2D(i, this.size)
                    if (vertical)
                         width = commaths.flip(width, this.size)
                    if (horizontal)
                         height = commaths.flip(height, this.size)
                    newMap[commaths.roll(width, height, this.size)] = map[i]
               }
               return newMap
          })

          return this
     },

     /**
      * @param {Number} anchor 1 = vertical, 2 = horizontal, 3 = vertical & horizontal
      */
     snake: function (anchor) {
          var vertical = anchor == 1 || anchor == 3 
          var horizontal = anchor == 2 || anchor == 3

          this.ingredients.remap(map => {
               var newMap = []
               for (var i = 0; i < map.length; i++) {
                    var {width, height} = commaths.rotate2D(i, this.size)
                    if (vertical && commaths.isOdd(height))
                         width = commaths.flip(width, size)
                    if (horizontal && commaths.isOdd(width))
                         height = commaths.flip(height, size)
                    newMap[commaths.roll(width, height, this.size)] = map[i]
               }
               return newMap
          })
          return this
     },

     //Finalisation
     /**
      * @callback InsertionRecipe
      * @param {Internal.Item} result
      * @param {String[][]} recipe.pattern
      * @param {Object.<string, Internal.Item>} recipe.keys
      */
     /**
      * Finalise insertion with any recipe. See {@link InsertionRecipe}
      * @param {InsertionRecipe} recipe
      */
     finalise: function(recipe) {
          this.terminated = true
          var final = createPattern(this.ingredients)
          recipe(this.result, final.pattern, final.keys)
     },

     /**
      * Finalise insertion into Vanilla Shaped Crafting.
      */
     vanilla: function() {
          this.finalise((result, pattern, keys) => this.event.shaped(result, pattern, keys))
     },

     /**
      * Finalise insertion into Tool Damaging Shaped Crafting.
      */
     toolDamaging: function() {
         this.finalise((result, pattern, keys) => this.recipeObject.toolDamagingShaped(result, pattern, keys))
     },

     /**
      * Finalise insertion into Mechanical Shaped Crafting.
      */
     mechanical: function() {
          this.finalise((result, pattern, keys) => this.event.recipes.createMechanicalCrafting(result, pattern, keys))
     }
}