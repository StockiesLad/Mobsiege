const alphabet = 'abcdefghijklmnopqrstuv'

function getRecipeFunctions(event) {
     // <Definitions> //
     var toolDamagingShaped = (result, pattern, keys) => {
          event.custom({
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
          event.custom({
               type: 'notreepunching:tool_damaging_shapeless',
               recipe: {
                    type: 'minecraft:crafting_shapeless',
                    ingredients: comfuncs.handleValues(ingredients, ingredient => Ingredient.of(ingredient)),
                    result: Item.of(result)
               }
          })
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
          if (size == null)
               size = inferPatternSize(ingredientObjects)
          
          var {pattern, keys} = insertion(ingredientObjects, size)
          
          return {
               dump: () => comfuncs.functionalObject({pattern: pattern, keys: keys}),
               vanilla: () => event.shaped(result, pattern, keys),
               toolDamaging: () => toolDamagingShaped(result, pattern, keys),
               mechanical: () => event.recipes.createMechanicalCrafting(result, pattern, keys)
          }    
     } 
     var modify = (result, ingredientObjects, size) => {
          if (size == null)
               size = inferPatternSize(ingredientObjects)

          processIngredients(size, ingredientObjects)

          return {
               get: () =>  comfuncs.functionalObject({result: result, ingredientObjects: ingredientObjects}),
               next: () => insert(result, ingredientObjects, size),
               rotate: (anchor) => {
                    ingredientObjects.forEach(ingredientObject => {
                         ingredientObject[1] = comfuncs.ensureArray(ingredientObject[1]).map(point => commaths.findRotation(point, size, anchor))
                    })
                    return modify(result, ingredientObjects, size)
               },
               flip: (anchor) => {
                    var vertical = anchor == 2 || anchor == 3
                    var horizontal = anchor == 1 || anchor == 3

                    ingredientObjects = comfuncs.ensureArray(ingredientObjects).map(ingredientObject => {
                         ingredientObject[1] = comfuncs.ensureArray(ingredientObject[1]).map(ingredientIndex => {
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

                    ingredientObjects = comfuncs.ensureArray(ingredientObjects).map(ingredientObject => {
                         ingredientObject[1] = comfuncs.ensureArray(ingredientObject[1]).map(ingredientIndex => {
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
                    return modify(result, [ingredients[0], [], size])
               },
               rollingSquare: (gaps, size) => {
                    if (gaps == null || size == null)
                         console.error('[recipes.generate.rollingSquare]: Invalid gaps and/or size!')
                    var ingredientObjects = []
                    comfuncs.quickerate(ingredients, (ingredient, index) => ingredientObjects[index] = [ingredient, []])
                    comfuncs.forEasy(size, height => comfuncs.forEasy(size, width => {
                         var ingredientIndex
                         if (gaps.length == 1)
                              ingredientIndex = commaths.roll(width, height, size) * gaps[0]
                         else ingredientIndex = width * gaps[1] + commaths.rotate1D(height * gaps[0], ingredients.length)
                         ingredientObjects[commaths.rotate1D(ingredientIndex, ingredients.length)][1].push(width + height * size)
                    }))
                    return modify(result, ingredientObjects, size)
               } 
          }
     }  
     var vanillaInsert = (result, ingredientObjects, size) => insert(result, ingredientObjects, size).vanilla()
     var toolDamagingInsert = (result, ingredientObjects, size) => insert(result, ingredientObjects, size).toolDamaging()       
     var mechanicalInsert =  (result, ingredientObjects, size) => insert(result, ingredientObjects, size).mechanical()

     // <Recipe Wrap> //
     var replace = (info, recipeCall) => {
          if (Object.getOwnPropertyNames(info).includes('output'))
               recipeCall(info.output)
          else recipeCall()

          info.output = Item.of(info.output).getIdLocation().toString()

          if (global.debug)
               console.info('[replaceRecipe]: info=' + JSON.stringify(info))

          event.remove(info)
     }
     var replaceTagRecipes = (discriminator, recipeCall) => {
          var run
          event.forEachRecipe(discriminator, recipe => {
               var id = recipe.getId()
               run = event.remove({id: id})
               recipeCall(recipe.originalRecipeResult, recipe.originalRecipeIngredients, id)
          })
          run()
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
     var planet = (result, innerInput, outterInput) => vanillaInsert(result, [[innerInput, 4], [outterInput, [], 8]])
     var box = (result, input) => vanillaInsert(result, [input, 4, 8])
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
          // <Insertion> //
          insert: insert,
          modify: modify,
          generate: generate,
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
          planet: planet,
          box: box,
          circleLoop: circleLoop,
          donutLoop: donutLoop
     }
}

//Helper Functions
function ingredientFillBox (ingredientObject) {
     var fillOrigin = 0
     var fillDest = ingredientObject[2]
     if (Array.isArray(fillDest)) {
          if (fillDest.length == 2) {
               fillDest = fillDest[0]
               fillOrigin = fillDest[1]
          } else fillDest = fillDest[0]
     }

     return {fillOrigin: fillOrigin, fillDest: fillDest}
}

function inferPatternSize (ingredientObjects) {
     var largest = -1
     
     comfuncs.ensureArraySuper(ingredientObjects, ingredientObjects[0]).forEach(ingredientObject => {
          ingredientObject[1] = comfuncs.ensureArray(ingredientObject[1])
          ingredientObject[1].forEach(index => comfuncs.functionalIf(index > largest, () => largest = index))
          if (ingredientObject.length == 3) {
               var {fillDest} = ingredientFillBox(ingredientObject)
               if (fillDest > largest)
                    largest = fillDest
          }
     })
     if (largest < 0)
          console.error('[recipe_functions.findSize]: Invalid indexes for ingredientObjects=' + ingredientObjects)

     return Math.ceil(Math.sqrt(largest + 1))

}

function processIngredients (size, ingredientObjects) {
     ingredientObjects.forEach(ingredientObject => {
          if (ingredientObject.length == 3) {
               var newIngredientIndexes = []
               var {fillOrigin, fillDest} = ingredientFillBox(ingredientObject)
               var origin = commaths.rotate2D(fillOrigin, size)
               var dest = commaths.rotate2D(fillDest, size)

               for (var height = origin.height; height <= dest.height; height++) {
                    for (var width = origin.width; width <= dest.width; width++) {
                         var fillIndex = commaths.roll(width, height, size)
                         if (!ingredientObject[1].includes(fillIndex)) {
                              newIngredientIndexes.push(fillIndex)
                         }
                    }
               }
               ingredientObjects[1] = newIngredientIndexes
          }
     })          
     return ingredientObjects
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

function fillPattern (originPattern, ingredientObjects) {
     var {pattern, size} = originPattern
     var fillPattern = []
     var keys = {}

     comfuncs.forEasy(pattern.length, height => {
          // <Create> //
          var newPatternLayer = pattern[height]
          // <Insert> //
          comfuncs.quickerate(comfuncs.ensureArraySuper(ingredientObjects, ingredientObjects[0]), (ingredientObject, ingredientPosition) => comfuncs.ensureArray(ingredientObject[1]).forEach(ingredientIndex => {
               var ingredientKey =  alphabet.charAt(ingredientPosition)
               newPatternLayer = newPatternLayer.replace(`$/${ingredientIndex}/`, ingredientKey)
               if (!Object.getOwnPropertyNames(keys).includes(ingredientKey))
                    comfuncs.defineProperty(keys, ingredientKey, ingredientObject[0])
          }))
          // <Clean> //
          newPatternLayer = newPatternLayer.replace(' ', '')
          comfuncs.forEasy(size * size, index => newPatternLayer = newPatternLayer.replace(`$/${index}/`, ' '))     
          // <Merge> //          
          fillPattern[height] = newPatternLayer
     })

     return {pattern: fillPattern, keys: keys}
}

function insertion(ingredientObjects, size) {
     ingredientObjects = comfuncs.ensureArraySuper(ingredientObjects, ingredientObjects[0])

     if (size == null)
          size = inferPatternSize(ingredientObjects)
     
     var {pattern, keys} = fillPattern(originPattern(size), processIngredients(size, ingredientObjects))

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