//Insertion (Fucking Complicated)
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
