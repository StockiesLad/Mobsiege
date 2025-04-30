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

          if (filter['output'] != null) {
               output = filter.output
               filter.output = Item.of(output)
          } else output = null
               
          if (filter['input'] != null) {
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
      * @param {Internal.List<Internal.Ingredient>} ingredients
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

     /**
      * @callback BasicRecipeContext
      * @param {Internal.RecipeJS} recipe
      */
     /**
      * @param {Object} filter 
      * @param {BasicRecipeContext} recipeCall 
      */
     removeRecipesRaw: function(filter, recipeCall) {
          var runnables = []
          this.event.forEachRecipe(filter, recipe => {
               var id = recipe.getId()
               runnables.push(() => this.removeById(id))
               if (recipeCall != null)
                    recipeCall(recipe)
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

     /**
      * @param {String[]|String} ids 
      * @returns 
      */
     removeById: function(ids) {
          common.alwaysArray(ids).forEach(id => this.removeInsurely({id: id}))
          return this
     },

     remove: function(filters) {
          common.alwaysArray(filters).forEach(filter => {
               this.removeInsurely(filter)
          })
     },

     /**
      * Removes an item from the Recipe Viewers as well as from Recipes by IO.
      */
     nuke: function(items) {
          common.alwaysArray(items).forEach(item => {
               stacks.hide(item)
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
                    key: common.mapProperties(keys, ingredient => Ingredient.of(ingredient)), //ingredientEntries,
                    result: Item.of(result)
               }
          })
          return this
     },

     /**
      * @param {String|Internal.Item} result 
      * @param {(String|Internal.Item|Internal.Ingredient)[]} ingredients 
      */
     toolDamagingShapeless: function(result, ingredients) {
          this.event.custom({
               type: 'notreepunching:tool_damaging_shapeless',
               recipe: {
                    type: 'minecraft:crafting_shapeless',
                    ingredients: common.alwaysArray(ingredients).map(ingredient => Ingredient.of(ingredient)),
                    result: Item.of(result)
               }
          })
          return this
     },

     kilnSmelting: function(result, ingredient, cookingTime) {
          this.event.custom({
               type: "primalstage:kiln",
               input: findId(ingredient),
               cookingtime: common.insure(cookingTime, 1200),
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
               input: findId(ingredient),
               cookingtime: common.insure(cookingTime, 600),
               result: findId(result)
          })
          return this
     },

     /**
      * 
      * @param {String|Item} result 
      * @param {String|Ingredient} ingredient 
      * @param {Number} cookingTime 
      */
     basinDrying: function(result, ingredient, cookingTime) {
          this.event.custom({
               type: "integrateddynamics:drying_basin",
               item: ingredient,
               duration: common.insure(cookingTime, 100),
               result: Item.of(result)
          })
          return this
     },

     endothermicDehydration: function(result, ingredient, energy) {
          this.event.custom({
               type: "thermal_extra:endothermic_dehydrator",
               energy: common.insure(energy, 4000),
               ingredients: [Ingredient.of(ingredient)],
               result: [Item.of(result)]
          })
          return this
     },

     grilling: function(result, ingredient, cookingTime) {
          this.event.custom({
               type: "primalstage:grill",
               input: Item.of(ingredient).getIdLocation().toString(),
               cookingtime: common.insure(cookingTime, 600),
               result: Item.of(result).getIdLocation().toString()
          })
          return this
     },

     fluidMixing: function(results, ingredients, energy) {
          this.event.custom({
               type: "thermal_extra:fluid_mixer",
               energy: common.insure(energy, 10000),
               ingredients: common.alwaysArray(ingredients),
               result: common.alwaysArray(results)
          })
          return this
     },

     componentAssembly: function(results, ingredients, energy) {
          this.event.custom({
               type: "thermal_extra:component_assembly",
               energy: common.insure(energy, 25000),
               ingredients: common.alwaysArray(ingredients),
               result: common.alwaysArray(results)
          })
          return this
     },

     fluidChilling: function(results, ingredients, energy) {
          this.event.custom({
               type: "thermal:chiller",
               energy: common.insure(energy, 15000),
               ingredients: common.alwaysArray(ingredients),
               result: common.alwaysArray(results),
          })
          return this
     },

     advancedFluidRefining: function(results, ingredients, energy) {
          this.event.custom({
               type: "thermal_extra:advanced_refinery",
               energy: common.insure(energy, 4000),
               ingredients: common.alwaysArray(ingredients),
               result: common.alwaysArray(results),
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

     icestoneFreezing: function(result, ingredient) {
          return this.event.custom({
               type: "aether:icestone_freezable",
               ingredient: {
                 block: ingredient
               },
               result: {
                 block: result
               }
          })
     },

     aetherFreezing: function(result, ingredient, xp, cookingTime) {
          return this.event.custom({
               type: "aether:freezing",
               category: "freezable_blocks",
               cookingtime: common.insure(cookingTime, 500),
               experience: common.insure(xp, 0),
               ingredient: Item.of(ingredient),
               result: Item.of(result).getIdLocation().toString()
          })
     },

     //Remove this for now because create:dd is not updated
     bulkFreezing: function(results, ingredients) {
          /*return this.event.custom({
               type: "create_dd:freezing",
               ingredients: common.alwaysArray(ingredients).map(i => Item.of(i)),
               results: common.alwaysArray(results).map(i => Item.of(i))
          })*/
     },

     basinCasting: function(result, fluidIngredient, cast, consumeCast) {
          if (fluidIngredient['fluid_tag'] != null)
               fluidIngredient = {tag: fluidIngredient.fluid_tag, amount: fluidIngredient.amount}
          this.event.custom({
               type: "tconstruct:casting_basin",
               cast: Item.of(cast),
               cast_consumed: consumeCast,
               cooling_time: 20,
               fluid: fluidIngredient,
               result: result
             })
     },

     siliconAssemly: function(result, ingredients, requiredJoules) {
          this.event.custom({
               type: "buildcraftsilicon:assembly",
               output: Item.of(result),
               requiredMicroJoules: common.insure(requiredJoules, 10000) * 1000000,
               requiredStacks: common.alwaysArray(ingredients).map(ingredient => InputItem.of(ingredient)),
               subType: "BASIC"
          })
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
          xp = common.insure(xp, 0)
          this.event.smelting(result, ingredient).xp(xp)
          this.event.blasting(result, ingredient).xp(xp)
          return this
     },

     globalCooking: function(result, ingredient, xp) {
          xp = common.insure(xp, 0)
          this.event.campfireCooking(result, ingredient).xp(xp)
          this.globalSmelting(result, ingredient, xp)
          return this
     },

     globalPrimitiveCooking: function(result, ingredient, xp) {
          xp = common.insure(xp, 0)
          this.grilling(result, ingredient)
          this.globalCooking(result, ingredient, xp)
          return this
     },

     /**
      * Try to only use a max of 3 ingredients.
      * @param {Internal.ItemStack} results 
      * @param {Array<Internal.ItemStack>} ingredients 
      * @returns 
      */
     globalAlloySmelting: function(results, ingredients) {
          var r = this.event.recipes
          r.enderio.alloy_smelting(results, ingredients)
          r.thermal.smelter(results, ingredients)
          r.create.mixing(results, ingredients).heated()
          Array.isArray(ingredients) && ingredients.length > 1 ? r.immersiveengineering.arc_furnace(results, ingredients.pop(), ingredients) : r.immersiveengineering.arc_furnace(results, ingredients)
          return this
     },

     globalFluidMixing: function(results, ingredients) {
          this.fluidMixing(results, ingredients)
          return this
     },

     globalFluidFreezing: function(results, ingredients) {
          this.fluidChilling(results, ingredients)
          return this
     },

     globalFreezing: function(result, ingredient, xp, inWorld) {
          if (common.insure(inWorld, false)) this.icestoneFreezing(result, ingredient)
          this.aetherFreezing(result, ingredient, xp)
          this.bulkFreezing(result, ingredient)
     },

     /**
      * @param {string} type 
      * @returns 
      */
     globalPressing: function(result, ingredient, type) {
          if (type == null)
               type = Item.of(result).getId()

          if (type.includes('packing'))
               this.event.recipes.create.compacting(result, ingredient)
          else this.event.recipes.create.pressing(result, ingredient)
          
          if (type.includes('plate') || type.includes('brick')) {
               this.event.recipes.thermal.press(result, ingredient)
               this.event.recipes.immersiveengineering.metal_press(result, ingredient, 'immersiveengineering:mold_plate')
          } else if (type.includes('rod')) {
               this.event.recipes.immersiveengineering.metal_press(result, ingredient, 'immersiveengineering:mold_rod')
          } else if (type.includes('packing_2x2')) {
               this.event.recipes.thermal.press(result, common.alwaysArray(ingredient).concat(['thermal:press_packing_2x2_die']))
               this.event.recipes.immersiveengineering.metal_press(result, ingredient, 'immersiveengineering:mold_packing_4')
          } else {
               this.event.recipes.thermal.press(result, ingredient)
               this.event.recipes.immersiveengineering.metal_press(result, ingredient, 'createdieselgenerators:mold')
          }

          return this
     },

     globalLiquefaction: function(resultFluid, resultItem, ingredient) {
          resultItem = common.insure(resultItem, 'minecraft:air')
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

     replaceCrafting: function(result, ingredientObjects, size) {
          return this.replaceWithInsert(result, ingredientObjects, size).vanilla()
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
      * @param {[]} ingredients 
      * @param {Number} gaps
      * @param {Number} size
      * @returns {RecipeInsertion}
      */
     rollingSquare: function(result, ingredients, gaps, size) {
          gaps = common.alwaysArray(gaps)
          if (gaps == null || size == null)
               console.error('[recipes.generate.rollingSquare]: Invalid gaps and/or size!')
          var ingredientObjects = []
          ingredients.forEach((ingredient, index) => ingredientObjects[index] = [ingredient, []])
          for (var height = 0; height < size; height++) for (var width = 0; width < size; width++) {
               var ingredientIndex
               if (gaps.length == 1)
                    ingredientIndex = width + height * gaps[0]
               else if (gaps.length >= 2) {
                    ingredientIndex = width * gaps[1] + maths.locateLine(height * gaps[0], ingredients.length)
                    if (gaps.length == 3)
                         ingredientIndex = gaps[2](ingredientIndex, ingredients.length, size, width, height)
               }    
               ingredientObjects[maths.locateLine(ingredientIndex, ingredients.length)][1].push(width + height * size)
          }
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

     /**
      * 
      * @param {(Internal.Item|String)[]} items 
      * @returns 
      */
     loop: function(items) {
          for (var i = 0; i < items.length; i++) {
               var nextI = i + 1
               this.event.shapeless(items[i], items[nextI >= items.length ? 0 : nextI])
          }
          return this
     }
}