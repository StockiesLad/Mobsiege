const AIR = 'minecraft:air'
const alphabet = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*'

/* <Insertion>
     TODO: Remove this hacky asf ingredientObjects bullshit and make it into a proper class to handle everything correctly.
     DON'T ACCIDENTALLY DUPLICATE INDEXES! AN INDEX WILL ONLY CONSIDER THE FIRST KEY AND EVERY OTHER WILL BE IGNORED!!!     
          Formats:
               IngredientObject -> [Item ingredientItem, [int indexes...], @Nullable[2] = [int dest, int origin]] 
               InsertionRecipe  -> insert(Item result, [ingredientObjects...], @Nullable int size)

          Index Order:
               Left --> Right
               Top --> Bottom
*/

/**
 * @typedef IngredientObject
 * @type {Object}
 * @property {Internal.Ingredient | String} ingredient
 * @property {Number[]} indexes
 */

/**
 * 
 * @param {Array<IngredientObject|Array.<Internal.Ingredient|String, Array<Number>|Number, Array<Number> | Number>>} ingredientInserts 
 * @param {?Number} size Will be inferred from the highest index if it is null.
 * @returns {Array<IngredientObject>}
 */
function parseIngredients(ingredientInserts, size) {
     if (typeof(ingredientInserts[0]) == 'string' || ingredientInserts.every(ingredientInsert => Array.isArray(ingredientInsert)))  {
          ingredientInserts = comfuncs.ensureArraySuper(ingredientInserts, ingredientInserts[0])
          ingredientInserts = ingredientInserts.map(ingredientInsert => {
               var parsedIngredientInsert = {ingredient: ingredientInsert[0], indexes: comfuncs.ensureArray(ingredientInsert[1])}
               if (ingredientInsert.length == 3) {
                    var exceptedIndexes = parsedIngredientInsert.indexes
                    var area = comfuncs.ensureArray(ingredientInsert[2])
                    var origin
                    var dest
                    parsedIngredientInsert.indexes = []

                    if (area.length == 2) {
                         origin = area[0]
                         dest = area[1]
                    } else if (area.length == 1) {
                         origin = 0
                         dest = area[0]
                    } else if (size != null) {
                         origin = 0
                         dest = size * size - 1
                    } else {
                         origin = 0
                         dest = 0
                    }
                    for (var index = origin; index <= dest; index++)
                         if (exceptedIndexes == null || !exceptedIndexes.includes(index)) 
                              parsedIngredientInsert.indexes.push(index)
               }
               return parsedIngredientInsert
          })
     }
     return ingredientInserts
}

function inferPatternSize (ingredientInserts) {
     var largest = -1
     
     ingredientInserts.forEach(ingredientInsert => {
          ingredientInsert.indexes.forEach(index => comfuncs.functionalIf(index > largest, () => largest = index))
          var fillArea = ingredientInsert['fillArea']
          if (fillArea != null) {
               var {fillDest} = fillArea.dest
               if (fillDest > largest)
                    largest = fillDest
          }
     })
     if (largest < 0)
          console.error('[recipe_functions.inferPatternSize]: Invalid indexes for ingredientObjects=' + ingredientInserts)

     return Math.ceil(Math.sqrt(largest + 1))

}

function originPattern (size) {
     var originPattern = []

     comfuncs.forEasy(size, height => {
          var patternLayer = ''
          comfuncs.forEasy(size, width => patternLayer = patternLayer + `$/${commaths.roll(width, height, size)}/`)
          originPattern.push(patternLayer.trim())
     })

     return {pattern: originPattern, size: size}

}

function fillPattern(originPattern, ingredientObjects) {
     var {pattern, size} = originPattern
     var fillPattern = []
     var keys = {}

     comfuncs.forEasy(pattern.length, height => {
          // <Create> //
          var newPatternLayer = pattern[height]
          // <Insert> //
          comfuncs.quickerate(ingredientObjects, (ingredientObject, ingredientPosition) => ingredientObject.indexes.forEach(ingredientIndex => {
               var {ingredient} = ingredientObject
               if (ingredient != null) {
                    var ingredientKey = alphabet.charAt(ingredientPosition)
                    newPatternLayer = newPatternLayer.replace(`$/${ingredientIndex}/`, ingredientKey)
                    if (!Object.getOwnPropertyNames(keys).includes(ingredientKey))
                         comfuncs.defineProperty(keys, ingredientKey, ingredient)
               } else newPatternLayer = newPatternLayer.replace(`$/${ingredientIndex}/`, '$/-/')
          }))
          // <Clean> //
          newPatternLayer = newPatternLayer.replace(' ', '').replace('$/-/', ' ')
          comfuncs.forEasy(size * size, index => newPatternLayer = newPatternLayer.replace(`$/${index}/`, ' '))     
          // <Merge> //          
          fillPattern[height] = newPatternLayer
     })

     return {pattern: fillPattern, keys: keys}
}

function insertion(ingredientObjects, size) {
     ingredientObjects = parseIngredients(ingredientObjects, size)
     size = size != null  ? size : inferPatternSize(ingredientObjects)
     var {pattern, keys} = fillPattern(originPattern(size), ingredientObjects)

     //Debug
     if (global.debug && Object.keys(keys).length == 0)
          console.error(
               '[recipes.insertion]: Failed to parse!' +
               '\n        ingredientObjects=' + ingredientObjects + 
               '\n        keys='+ JSON.stringify(keys) + 
               '\n        pattern=' + pattern
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
 * @param {Array<IngredientObject|Array.<Internal.Ingredient|String, Array<Number>|Number, Array<Number> | Number>>} ingredientInserts Can be in compressed array or object form. See {@link parseIngredients}
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
     /** @type {Array<IngredientObject>}*/ this.ingredientObjects = parseIngredients(ingredientInserts, size)
     /** @type {Number}*/ this.size = size = size != null  ? size : inferPatternSize(this.ingredientObjects)
     this.terminated = false
     return this
}

RecipeInsertion.prototype = {
     //Modification
     /**
      * @param {Array<IngredientObject|Array.<Internal.Ingredient|String, Array<Number>|Number, Array<Number> | Number>>} ingredientInserts 
      */
     append: function(ingredientInserts) {
          console.info(' BEFORE')
          var newIngredientObjects = parseIngredients(ingredientInserts, this.size)
          console.info(this.ingredientObjects)
          console.info(' ')
          console.info(newIngredientObjects)
          this.ingredientObjects = this.ingredientObjects.filter(ingredientObject => {
               ingredientObject.indexes = ingredientObject.indexes.filter(index => newIngredientObjects.forEach(newIngredientObject => !newIngredientObject.indexes.includes(index)))
               if (ingredientObject.indexes.length == 0)
                    return false
               else return true  
          })
          this.ingredientObjects = comfuncs.incorp(newIngredientObjects, this.ingredientObjects)
          console.info('AFTER')
          console.info(this.ingredientObjects)
          return this
     },

     /**
      * @param {Number} anchor 0 = top-left, 1 = top-right, 2 = bottom-left, 3 = bottom-right
      */
     rotate: function(anchor) {
          //Is this inefficient? Yes. But, is it green? Yes!
          this.ingredientObjects = this.ingredientObjects.map(ingredientObject => {
               ingredientObject.indexes = ingredientObject.indexes.map(point => commaths.findRotation(point, size, anchor))
               return ingredientObject
          })
          return this
     },

     /**
      * @param {Number} anchor 1 = vertical, 2 = horizontal, 3 = vertical & horizontal
      */
     flip: function (anchor) {
          var vertical = anchor == 2 || anchor == 3
          var horizontal = anchor == 1 || anchor == 3

          this.ingredientObjects = this.ingredientObjects.map(ingredientObject => {
               ingredientObject.indexes = ingredientObject.indexes.map(ingredientIndex => {
                    var {width, height} = commaths.rotate2D(ingredientIndex, size)
                    if (vertical)
                         width = commaths.flip(width, size)
                    if (horizontal)
                         height = commaths.flip(height, size)
                    return commaths.roll(width, height, size)
               })                      
               return ingredientObject
          })

          return this
     },

     /**
      * @param {Number} anchor 1 = vertical, 2 = horizontal, 3 = vertical & horizontal
      */
     snake: function (anchor) {
          var vertical = anchor == 1 || anchor == 3 
          var horizontal = anchor == 2 || anchor == 3

          this.ingredientObjects = this.ingredientObjects.map(ingredientObject => {
               ingredientObject.indexes = ingredientObject.indexes.map(ingredientIndex => {
                    var {width, height} = commaths.rotate2D(ingredientIndex, size)
                    if (vertical && commaths.isOdd(height))
                         width = commaths.flip(width, size)
                    if (horizontal && commaths.isOdd(width))
                         height = commaths.flip(height, size)
                    return commaths.roll(width, height, size)
               })                      
               return ingredientObject
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
          var final = insertion(this.ingredientObjects, this.size)
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