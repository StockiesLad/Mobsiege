const AIR = 'minecraft:air'
const alphabet = 'abcdefghijklmnopqrstuv'

function getRecipeFunctions(event) {
     // <Definitions> //
     var toolDamagingShaped = (result, pattern, keys) => {
          return event.custom({
               type: 'notreepunching:tool_damaging_shaped',
               recipe: {
                    type: 'minecraft:crafting_shaped',
                    pattern: pattern,
                    key: comfuncs.handleProperties(keys, ingredient => Ingredient.of(ingredient)), //ingredientEntries,
                    result: Item.of(result)
               }
          })
     }
     var toolDamagingShapeless = (result, ingredients) => {
          return event.custom({
               type: 'notreepunching:tool_damaging_shapeless',
               recipe: {
                    type: 'minecraft:crafting_shapeless',
                    ingredients: comfuncs.handleValues(ingredients, ingredient => Ingredient.of(ingredient)),
                    result: Item.of(result)
               }
          })
     }

     var kilnSmelting = (result, ingredient) => {
          return event.custom({
               type: "primalstage:kiln",
               input: ingredient,
               cookingtime: 1200,
               result: result
          })
     }

     var globalCrushing = (results, ingredient) => {
          event.recipes.createCrushing(results, ingredient)
          event.recipes.thermal.pulverizer(results, ingredient)
     }

     // <Insertion> //
     /* 
          //  DON'T ACCIDENTALLY DUPLICATE INDEXES! AN INDEX WILL ONLY CONSIDER THE FIRST KEY AND EVERY OTHER WILL BE IGNORED!!!
          //  ALSO KEEP SIZE WITHIN THE RANGE OF (1 -> 5) AND INDEXES IN THE SQUARE OF THE SIZE!!!
          
               Formats:
                    IngredientObject -> [Item ingredientItem, [int indexes...], @Nullable[2] = [int dest, int origin]] 
                    InsertionRecipe  -> insert(Item result, [ingredientObjects...], @Nullable int size)

               Index Order:
                    Left --> Right
                    Top --> Bottom
     */
    
     var insert = (result, ingredientObjects, size) => {
          ingredientObjects = parseIngredients(ingredientObjects, size)
          size = size != null  ? size : inferPatternSize(ingredientObjects)
          var {pattern, keys} = insertion(ingredientObjects, size)

          return {
               dump: () => comfuncs.functionalObject({result: result, pattern: pattern, keys: keys}),
               vanilla: () => event.shaped(result, pattern, keys),
               toolDamaging: () => toolDamagingShaped(result, pattern, keys),
               mechanical: () => event.recipes.createMechanicalCrafting(result, pattern, keys)
          }    
     } 
     var modify = (result, ingredientObjects, size) => {
          ingredientObjects = parseIngredients(ingredientObjects, size)
          size = size != null  ? size : inferPatternSize(ingredientObjects)

          return {
               get: () =>  comfuncs.functionalObject({result: result, ingredientObjects: ingredientObjects}),
               next: () => insert(result, ingredientObjects, size),
               override: (ingredientObjectOverrides) =>  modify(result, comfuncs.incorp(parseIngredients(ingredientObjectOverrides, size), ingredientObjects), size),
               rotate: (anchor) => {
                    ingredientObjects.forEach(ingredientObject => ingredientObject.indexes = ingredientObject.indexes.map(point => commaths.findRotation(point, size, anchor)))
                    return modify(result, ingredientObjects, size)
               },
               flip: (anchor) => {
                    var vertical = anchor == 2 || anchor == 3
                    var horizontal = anchor == 1 || anchor == 3

                    ingredientObjects = ingredientObjects.map(ingredientObject => {
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

                    return modify(result, ingredientObjects, size)

               },
               snake: (anchor) => {
                    var vertical = anchor == 1 || anchor == 3 
                    var horizontal = anchor == 2 || anchor == 3

                    ingredientObjects = ingredientObjects.map(ingredientObject => {
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

                    return modify(result, ingredientObjects, size)
               }
          }
     }
     var generate = (result, ingredients) => {
          ingredients = comfuncs.ensureArray(ingredients)
          return {
               plus: () => {
                    var ingredientObjects = []
                    var pat = [1, 3, 4, 5, 7]
                    comfuncs.forEasy(pat.length, index => ingredientObjects.push([ingredients[commaths.rotate1D(index, ingredients.length)], index]))
                    return modify(result, ingredientObjects, 3)
               },
               cross: () => {
                    var ingredientObjects = []
                    var pat = [0, 2, 4, 6, 8]
                    comfuncs.forEasy(pat.length, index => ingredientObjects.push([ingredients[commaths.rotate1D(index, ingredients.length)], index]))
                    return modify(result, ingredientObjects, 3)
               },
               flatSquare: (size) => {
                    if (ingredients.length != 1)
                         console.error('[recipes.construct.flatSquare]: Only 1 ingredient is permitted')
                    return modify(result, [[ingredients[0], [], size * size - 1]], size)
               },
               rollingSquare: (gaps, size) => {
                    gaps = comfuncs.ensureArray(gaps)
                    if (gaps == null || size == null)
                         console.error('[recipes.generate.rollingSquare]: Invalid gaps and/or size!')
                    var ingredientObjects = []
                    comfuncs.quickerate(ingredients, (ingredient, index) => ingredientObjects[index] = [ingredient, []])
                    comfuncs.forEasy(size, height => comfuncs.forEasy(size, width => {
                         var ingredientIndex
                         if (gaps.length == 1)
                              ingredientIndex = width + height * gaps[0]
                         else ingredientIndex = width * gaps[1] + commaths.rotate1D(height * gaps[0], ingredients.length)
                         ingredientObjects[commaths.rotate1D(ingredientIndex, ingredients.length)][1].push(width + height * size)
                    }))
                    return modify(result, ingredientObjects, size)
               } 
          }
     }  
     var insertAll = (insertType, modificationObjects) => modificationObjects.forEach(modificationObject => insertType(modificationObject.next()))
     var vanillaInsert = (result, ingredientObjects, size) => insert(result, ingredientObjects, size).vanilla()
     var toolDamagingInsert = (result, ingredientObjects, size) => insert(result, ingredientObjects, size).toolDamaging()       
     var mechanicalInsert =  (result, ingredientObjects, size) => insert(result, ingredientObjects, size).mechanical()
     // <Recipe Wrap> //
     var replace = (info, recipeCall) => {
          if (Object.getOwnPropertyNames(info).includes('output'))
               recipeCall(info.output)
          else recipeCall()

          info.output = Item.of(info.output).getIdLocation().toString()

          if (global.debug && (info == null || recipeCall == null))
               console.info('[replaceRecipe]: info=' + JSON.stringify(info))

          event.remove(info)
     }
     var replaceTagRecipes = (discriminator, recipeCall) => {
          var runnables = []
          event.forEachRecipe(discriminator, recipe => {
               var id = recipe.getId()
               runnables.push(() => event.remove({id: id}))
               recipeCall(recipe.originalRecipeResult, recipe.originalRecipeIngredients, id)
          })
          runnables.forEach(run => run())
     }
     var replaceOutputRecipe = (output, recipeCall) => replace({output: output}, recipeCall)
     var replaceIO = (input, output) => {
          event.replaceInput({input: input}, input, output)
          event.replaceOutput({output: input}, input, output)
     }
     var removeOutput = (item) => {
          event.remove({output: item})
     }
     var removeIO = (item) => {
          event.remove({input: item})
          event.remove({output: item})
     }
     var removeAndHide = (item) => {
          comfuncs.hide(item)
          removeIO(item)
     }
     var removeAll = (flags) => {
          comfuncs.ensureArray(flags).forEach(flag => event.remove(flag))
     }
     var twoSquare = (result, ingredient) => generate(result, ingredient).flatSquare(2).next().vanilla()
     var twoSquareAlt = (result, ingredient) => generate(result, ingredient).rollingSquare(1, 2).next().vanilla()
     var planet = (result, innerInput, outterInput) => vanillaInsert(result, [[innerInput, 4], [outterInput, [], 8]], 3)
     var box = (result, input) => vanillaInsert(result, [input, [4, 8]])
     var stairs = (result, input) => vanillaInsert(result, [input, [0, 3, 4, 6, 7, 8]])
     var slab = (result, input) => vanillaInsert(result, [input, [0, 1, 2]], 3)
     var circleLoop = (items, recipeCall) => {
          comfuncs.quickerate(items.length, i => {
               var nextI = i + 1
               if (nextI >= items.length)
                    nextI = 0
               recipeCall(items[i], items[nextI])
               event.shapeless(items[i], items[nextI])
          })
     }
     var donutLoop = (items) => circleLoop(items, (output, input) => event.shapeless(output, input))

     return {
          // <Definitions> //
          toolDamagingShaped: toolDamagingShaped,
          toolDamagingShapeless: toolDamagingShapeless,
          kilnSmelting: kilnSmelting,
          globalCrushing: globalCrushing,
          // <Insertion> //
          insert: insert,
          modify: modify,
          generate: generate,
          insertAll: insertAll,
          vanillaInsert: vanillaInsert,
          toolDamagingInsert: toolDamagingInsert,
          mechanicalInsert: mechanicalInsert,
          // <Recipe Wrap> //
          replace: replace,
          replaceTagRecipes: replaceTagRecipes,
          replaceOutputRecipe: replaceOutputRecipe,
          replaceIO: replaceIO,
          removeOutput: removeOutput,
          removeIO: removeIO,
          removeAndHide: removeAndHide,
          removeAll: removeAll,
          twoSquare: twoSquare,
          twoSquareAlt: twoSquareAlt,
          planet: planet,
          box: box,
          stairs: stairs,
          slab: slab,
          circleLoop: circleLoop,
          donutLoop: donutLoop
     }
}

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
                         if (!exceptedIndexes.includes(index)) 
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