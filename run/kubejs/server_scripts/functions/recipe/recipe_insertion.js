const insertionKeyStorage = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

/** @param {ShapedIngredients} shapedIngredients */
function createShape(shapedIngredients) {
     var size = shapedIngredients.size
     var pattern = []
     var keys = {}

     for (var height = 0; height < size; height++) {
          var patternLayer = ''
          for (var width = 0; width < size; width++) {
               var index = maths.place(width, height, size)
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
     if (result == null || Item.of(result).isEmpty() || result instanceof RecipeObject || result instanceof RecipeInsertion || ingredientInserts == null || (Array.isArray(ingredientInserts) && ingredientInserts.length == 0))
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
          this.ingredients.mapper.forEach(object => object.indexes = object.indexes.forEach(i => maths.rotate(i, this.size, anchor)))
          return this
     },

     /**
      * @param {Number} anchor 1 = vertical, 2 = horizontal, 3 = vertical & horizontal
      */
     flip: function (anchor) {
          var vertical = anchor == 2 || anchor == 3
          var horizontal = anchor == 1 || anchor == 3
          this.ingredients.mapper.forEach(object => object.indexes = object.indexes.map(i => {
               var {width, height} = maths.locateSquare(i, this.size)
               if (vertical)
                    width = maths.flipLine(width, this.size)
               if (horizontal)
                    height = maths.flipLine(height, this.size)
               return maths.place(width, height, this.size)
          }))
          return this
     },

     /**
      * @param {Number} anchor 1 = vertical, 2 = horizontal, 3 = vertical & horizontal
      */
     snake: function (anchor) {
          var vertical = anchor == 1 || anchor == 3 
          var horizontal = anchor == 2 || anchor == 3
          this.ingredients.mapper.forEach(object => object.indexes = object.indexes.map(i => {
               var {width, height} = maths.locateSquare(i, this.size)
               if (vertical && maths.isOdd(height))
                    width = maths.flipLine(width, size)
               if (horizontal && maths.isOdd(width))
                    height = maths.flipLine(height, size)
               return maths.flipLine(width, height, this.size)
          }))
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
          var final = createShape(this.ingredients)
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