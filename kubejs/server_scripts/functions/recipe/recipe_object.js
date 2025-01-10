/**
 * An object wrapper to extend the recipe event with further functions
 * @class RecipeObject
 * @constructor
 * @param {Internal.RecipesEventJS} event The original recipe event
 */
function RecipeObject(event) {
     this.event = event
     /**
      * @type {RecipeInsertion[]}
      */
     this.insertions = []
     return this
}
// There are too many god damn recipes. But funnily enough, I need/use them all.
RecipeObject.prototype = {
     /**
      * Checks the insertions to see if that have been registered as a recipe. Makes debugging missing recipes way easier!
      * @param {Internal.RecipesEventJS} event
      */
     start: function(event) {
          this.event = event
     },

     //Removal - some of these return their removed entry.
     removeInsurely: function(filter, insuredOutput) {
          var output
          var input

          if (Object.getOwnPropertyNames(filter).includes('output')) {
               output = filter.output
               filter.output = Item.of(output)
          } else output = null
               
          if (Object.getOwnPropertyNames(filter).includes('input')) {
               input = filter.input
               filter.input = Item.of(input)
          } else input = null
               
          this.event.remove(filter)
          return output != null ? output : insuredOutput != null ? insuredOutput : input 
     },

     removeFor: function(filter, item) {
          this.remove(filter)
          return item
     },

     /**
      * @callback RecipeContext
      * @param {Internal.ItemStack} result
      * @param {Array.<Internal.Ingredient>} ingredients
      * @param {String} id
      */
     /**
      * 
      * @param {Object} filter 
      * @param {RecipeContext} recipeCall 
      */
     removeRecipes: function(filter, recipeCall) {
          var runnables = []
          this.event.forEachRecipe(filter, recipe => {
               var id = recipe.getId()
               runnables.push(() => this.removeById(id))
               if (recipeCall != null)
                    recipeCall(recipe.originalRecipeResult, recipe.originalRecipeIngredients, id)
          })
          runnables.forEach(run => run())
     },

     removeByOutput: function(item) {
          return this.removeInsurely({output: item})
     },

     removeByInput: function(item) {
          return this.removeInsurely({input: item})
     },

     removeByIo: function(item) {
          this.removeByInput(item)
          this.removeByOutput(item)
          return item
     },

     removeById: function(ids) {
          comfuncs.ensureArray(ids).forEach(id => this.removeInsurely({id: id}))
          return this
     },

     remove: function(filters) {
          comfuncs.ensureArray(filters).forEach(filter => {
               this.removeInsurely(filter)
          })
     },

     /**
      * Removes an item from the Recipe Viewers as well as from Recipes by IO.
      */
     nuke: function(items) {
          comfuncs.ensureArray(items).forEach(item => {
               comfuncs.hide(item)
               this.removeByIo(item)
          })
          return this
     },

     //Replacement
     globallyReplaceInput: function(oldItem, newItem) {
          this.event.replaceInput({input: oldItem}, oldItem, newItem)
     },

     globallyReplaceInput: function(oldItem, newItem) {
          this.event.replaceOutput({output: oldItem}, oldItem, newItem)
     },

     //Custom Recipes
     toolDamagingShaped: function(result, pattern, keys) {
          this.event.custom({
               type: 'notreepunching:tool_damaging_shaped',
               recipe: {
                    type: 'minecraft:crafting_shaped',
                    pattern: pattern,
                    key: comfuncs.handleProperties(keys, ingredient => Ingredient.of(ingredient)), //ingredientEntries,
                    result: Item.of(result)
               }
          })
          return this
     },

     toolDamagingShapeless: function(result, ingredients) {
          this.event.custom({
               type: 'notreepunching:tool_damaging_shapeless',
               recipe: {
                    type: 'minecraft:crafting_shapeless',
                    ingredients: comfuncs.handleValues(ingredients, ingredient => Ingredient.of(ingredient)),
                    result: Item.of(result)
               }
          })
          return this
     },

     kilnSmelting: function(result, ingredient, cookingTime) {
          this.event.custom({
               type: "primalstage:kiln",
               input: findId(ingredient),
               cookingtime: comfuncs.notNull(cookingTime, 1200),
               result: findId(result)
          })
          return this
     },

     charring: function(result, ingredient, medium) {
          var json = {
               type: "carbonize:burn",
               input: ingredient, //This is a TAG. Don't parse an item
               output: findId(result)
          }
          if (medium != null)
               json.medium = findId(medium)
          event.custom(json)
          return this
     },

     drying: function(result, ingredient, cookingTime) {
          this.event.custom({
               type: "primalstage:drying",
               input: ingredient,
               cookingtime: comfuncs.notNull(cookingTime, 600),
               result: result
          })
          return this
     },

     basinDrying: function(result, ingredient, cookingTime) {
          cookingTime = comfuncs.notNull(cookingTime, 100)
          this.event.custom({
               type: "integrateddynamics:drying_basin",
               item: ingredient,
               duration: cookingTime,
               result: Item.of(result)
          })
          return this
     },

     endothermicDehydration: function(result, ingredient) {
          this.event.custom({
               type: "thermal_extra:endothermic_dehydrator",
               energy: 4000,
               ingredients: [Ingredient.of(ingredient)],
               result: [Item.of(result)]
          })
          return this
     },

     grilling: function(result, ingredient, cookingTime) {
          this.event.custom({
               type: "primalstage:grill",
               input: Item.of(ingredient).getIdLocation().toString(),
               cookingtime: comfuncs.notNull(cookingTime, 600),
               result: Item.of(result).getIdLocation().toString()
          })
          return this
     },

     fluidMixing: function(results, ingredients) {
          this.event.custom({
               type: "thermal_extra:fluid_mixer",
               energy: 10000,
               ingredients: comfuncs.ensureArray(ingredients),
               result: comfuncs.ensureArray(results)
          })
          return this
     },

     componentAssembly: function(results, ingredients) {
          this.event.custom({
               type: "thermal_extra:component_assembly",
               energy: 25000,
               ingredients: comfuncs.ensureArray(ingredients),
               result: comfuncs.ensureArray(results)
          })
          return this
     },

     chilling: function(results, ingredients) {
          this.event.custom({
               type: "thermal:chiller",
               energy: 15000,
               ingredients: comfuncs.ensureArray(ingredients),
               result: comfuncs.ensureArray(results),
          })
          return this
     },

     advancedFluidRefining: function(results, ingredients) {
          this.event.custom({
               type: "thermal_extra:advanced_refinery",
               energy: 4000,
               ingredients: comfuncs.ensureArray(ingredients),
               result: comfuncs.ensureArray(results),
          })
          return this
     },

     /**
      * 
      * @param {Array.<Internal.Item | Internal.InputFluid>} results 
      * @param {Internal.Item} ingredient 
      * @returns 
      */
     squeezing: function(results, ingredient) {
          //Abstract this process to other custom recipes
          var json = {
               type: "integrateddynamics:squeezer",
               item: ingredient,
               result: {}
          }

          results.forEach(result => {
               if (result['fluid'] != null || result['fluidTag'] != null)
                    json.result.fluid = result
               else {
                    if (json.result['items'] == null)
                         json.result.items = []
                    json.result.items.push(Item.of(result))
               }
          })

          return this.event.custom(json)
     },

     //Global Recipes - this is to ensure compat between multiple mods in one spot.
     globalDrying: function(result, ingredient) {
          this.basinDrying(result, ingredient)
          this.endothermicDehydration(result, ingredient)
          return this
     },

     globalPrimitiveDrying: function (result, ingredient) {
          this.drying(result, ingredient)
          this.globalDrying(result, ingredient)
          return this
     },

     globalCrushing: function (results, ingredients) {
          this.event.recipes.createCrushing(results, ingredients)
          this.event.recipes.thermal.pulverizer(results, ingredients)
          return this
     },

     globalSmelting: function(result, ingredient, xp) {
          xp = comfuncs.notNull(xp, 0)
          this.event.smelting(result, ingredient).xp(xp)
          this.event.blasting(result, ingredient).xp(xp)
          return this
     },

     globalCooking: function(result, ingredient, xp) {
          xp = comfuncs.notNull(xp, 0)
          this.event.campfireCooking(result, ingredient).xp(xp)
          this.globalSmelting(result, ingredient, xp)
          return this
     },

     globalPrimitiveCooking: function(result, ingredient, xp) {
          xp = comfuncs.notNull(xp, 0)
          this.grilling(result, ingredient)
          this.globalCooking(result, ingredient)
          return this
     },

     globalAlloySmelting: function(results, ingredients) {
          this.event.recipes.enderio.alloy_smelting(results, ingredients)
          this.event.recipes.thermal.smelter(results, ingredients)
          this.event.recipes.create.mixing(results, ingredients).heated()
          return this
     },

     globalFluidMixing: function(results, ingredients) {
          this.fluidMixing(results, ingredients)
          return this
     },

     globalChilling: function(results, ingredients) {
          this.chilling(results, ingredients)
          return this
     },

     globalPressing: function(results, ingredients) {
          //this.event.recipes.immersiveengineering.metal_press(results, ingredients, 'immersiveengineering:mold_plate')
          this.event.recipes.create.pressing(results, ingredients)
          this.event.recipes.thermal.press(results, ingredients)
          return this
     },

     globalLiquefaction: function(resultFluid, resultItem, ingredient) {
          resultItem = comfuncs.notNull(resultItem, 'minecraft:air')
          this.event.recipes.thermal.pyrolyzer([resultFluid, resultItem], ingredient)
          this.event.recipes.immersiveengineering.coke_oven(resultItem, ingredient).creosote(resultFluid.amount)
          return this
     },

     //Insertion
     /**
      * @param {Object} result
      * @param {Array} ingredientObjects 
      * @returns {RecipeInsertion}
      */
     insert: function(result, ingredientObjects, size) {
          var insertion = new RecipeInsertion(this, result, ingredientObjects, size)
          this.insertions.push(insertion)
          return insertion
     },

     replaceWithInsert: function(result, ingredientObjects, size) {
          return this.insert(this.removeByOutput(result), ingredientObjects, size)
     },

     /**
      * Checks the insertions to see if that have been registered as a recipe. Makes debugging missing recipes way easier!
      * Insertions will not default to vanilla but I'd rather the code be a little bit more verbose to be more explicit with recipe types.
      */
     testInsertions: function() {
          this.insertions.forEach(insert => {
               if (!insert.terminated)
                    console.error(`The following insertion hasn't been registered! result=${insert.result}, ingredientObjects=${JSON.stringify(insert.ingredients)}`)
          })
          this.insertions = []
     },

     /**
      * @param {Object} result
      * @param {Array} ingredientObjects 
      * @param {Number} size
      */
     vanillaInsert: function(result, ingredientObjects, size) {
          return this.insert(result, ingredientObjects, size).vanilla()
     },

     /**
      * @param {Object} result
      * @param {Array} ingredientObjects 
      * @param {Number} size
      */
     toolDamagingInsert: function(result, ingredientObjects, size) {
          return this.insert(result, ingredientObjects, size).toolDamaging()
     },

     /**
      * @param {Object} result
      * @param {Array} ingredientObjects 
      * @param {Number} size
      */
     mechanicalInsert: function(result, ingredientObjects, size) {
          return this.insert(result, ingredientObjects, size).mechanical()
     },

     //Pre-made patterns 
     /**
      * @param {Object} result
      * @param {Array} ingredientObjects 
      * @returns {RecipeInsertion}
      */
     plus: function(result, ingredient) {
          return this.insert(result, [ingredient, [1, 3, 4, 5, 7]], 3)
     },

     /**
      * @param {Object} result
      * @param {Array} ingredientObjects 
      * @returns {RecipeInsertion}
      */
     cross: function(result, ingredient) {
          return this.insert(result, [ingredient, [0, 2, 4, 6, 8]], 3)
     },

     /**
      * @param {Object} result
      * @param {Array} ingredientObjects 
      * @param {Number} size
      * @returns {RecipeInsertion}
      */
     flatSquare: function(result, ingredient, size) {
          return this.insert(result, [[ingredient, [], size * size - 1]], size)
     },

     /**
      * @param {Object} result
      * @param {Array} ingredientObjects 
      * @param {Number} size
      * @returns {RecipeInsertion}
      */
     rollingSquare: function(result, ingredients, gaps, size) {
          gaps = comfuncs.ensureArray(gaps)
          if (gaps == null || size == null)
               console.error('[recipes.generate.rollingSquare]: Invalid gaps and/or size!')
          var ingredientObjects = []
          comfuncs.quickerate(ingredients, (ingredient, index) => ingredientObjects[index] = [ingredient, []])
          comfuncs.forEasy(size, height => comfuncs.forEasy(size, width => {
               var ingredientIndex
               if (gaps.length == 1)
                    ingredientIndex = width + height * gaps[0]
               else if (gaps.length >= 2) {
                    ingredientIndex = width * gaps[1] + commaths.rotate1D(height * gaps[0], ingredients.length)
                    if (gaps.length == 3)
                         ingredientIndex = gaps[2](ingredientIndex, ingredients.length, size, width, height)
               }    
               ingredientObjects[commaths.rotate1D(ingredientIndex, ingredients.length)][1].push(width + height * size)
          }))
          return this.insert(result, ingredientObjects, size)
     },
     
     /**
      * @param {Object} result
      * @param {Array} ingredients 
      * @returns {RecipeInsertion}
      */
     twoSquare: function(result, ingredients) {
          return this.flatSquare(result, ingredients, 2)
     },

     /**
      * @param {Object} result
      * @param {Array} ingredients 
      * @returns {RecipeInsertion}
      */
     threeSquare: function(result, ingredients) {
          return this.flatSquare(result, ingredients, 3)
     },

     /**
      * @param {Object} result
      * @param {Array} ingredients 
      * @returns {RecipeInsertion}
      */
     twoSquareAlt: function(result, ingredients) {
          return this.rollingSquare(result, ingredients, 1, 2)
     },

     /**
      * @param {Object} result
      * @param {Array} ingredients 
      * @returns {RecipeInsertion}
      */
     threeSquareAlt: function(result, ingredients) {
          return this.rollingSquare(result, ingredients, 1, 3)
     },

     /**
      * @param {Object} result
      * @param {Object} inner 
      * @param {Object} outter 
      * @returns {RecipeInsertion}
      */
     planet: function(result, inner, outter) {
          return this.insert(result, [[inner, 4], [outter, [], 8]], 3)
     },

     /**
      * @param {Object} result
      * @param {Array} outters 
      * @param {Object} inner 
      * @returns {RecipeInsertion}
      */
     planetAlt: function(result, outters, inner) {
          return this.rollingSquare(result, outters, 1, 3).append([inner, 4])
     },

     /**
      * This is an example of why I should really by recompiling the insertions.
      * @param {Object} result
      * @param {Array} outter 
      * @returns {RecipeInsertion}
      */
     planetAltAlt: function(result, outter, inner) {
          return this.insert(result, [[outter[0], [0, 8]], [outter[1], [1, 7]], [outter[2], [2, 6]], [outter[3], [3, 5]], [inner, 4]])
     },

     /**
      * @param {Object} result
      * @param {Array} ingredients 
      * @returns {RecipeInsertion}
      */
     box: function(result, input) {
          return this.insert(result, [input, [4, 8]])
     },

     /**
      * @param {Object} result
      * @param {Array} ingredients 
      * @returns {RecipeInsertion}
      */
     stairs: function(result, input) {
          return this.insert(result, ['4x ' + input, [0, 3, 4, 6, 7, 8]])
     },

     /**
      * @param {Object} result
      * @param {Array} ingredients 
      * @returns {RecipeInsertion}
      */
     slab: function(result, input) {
          return this.insert(result, ['6x ' + input, [0, 1, 2]], 3)
     },

     /**
      * @param {Object} result
      * @param {Array} ingredients 
      * @returns {RecipeInsertion}
      */
     wall: function(result, input) {
          return this.insert(result, ['6x ' + input, [0, 1, 2, 3, 4, 5]])
     },

     loop: function(items) {
          comfuncs.quickerate(items.length, i => {
               var nextI = i + 1
               event.shapeless(items[i], items[nextI >= items.length ? 0 : nextI])
          })
          return this
     }
}