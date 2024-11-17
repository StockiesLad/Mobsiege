const ALPHABET_INDEXES = [
    'A', 'B', 'C', 'D', 'E', 
    'F', 'G', 'H', 'I', 'J', 
    'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y'
]

const EXTRA_HEXA_DECIMALS = [
    '0', '1', '2', '3', '4', 
    '5', '6', '7', '8', '9', 
    'a', 'b', 'c', 'd', 'e', 
    'f', 'g', 'h', 'i', 'j', 
    'k', 'l', 'm', 'n', 'o'
]

function getRecipeFunctions(event) {
    /*  !!!DON'T ACCIDENTALLY DUPLICATE INDEXES! AN INDEX WILL ONLY CONSIDER THE FIRST KEY AND EVERY OTHER WILL BE IGNORED!!!
        !!!ALSO KEEP SIZE WITHIN THE RANGE OF (1 -> 5) AND INDEXES IN THE SQUARE OF THE SIZE!!!
        
        Examples:
            CORRECT: insertionRecipe(event, 'minecraft:diamond', [createIngredientObject('minecraft:stick', [0, 4, 8]), createIngredientObject('minecraft:redstone', 1)])
            INCORRECT: insertionRecipe(event, 'minecraft:emerald', [createIngredientObject('minecraft:stick', [0, 4, 8]), createIngredientObject('minecraft:redstone', 0)])
        Index Order:
            Left --> Right
            Top --> Bottom
    */
    var rawInsertion = (size, ingredientObjects, recipeCall) => {
        ingredientObjects = comfuncs.ensureArraySuper(ingredientObjects, ingredientObjects[0])
        var basePattern = []
        var pattern = []
        var keys = {}

        //Test size
        if (size > 5 || size < 1)
            console.error('rawInsertion]: Size for insertionRecipe is not within the correct range (1 -> 5)! ingredientObjects={' + ingredientObjects + '}')

        //Form basePattern
        for (var patternIndex = 0; patternIndex < size; patternIndex++) {
            var patternLayer = ''
            for (var layerIndex = 0; layerIndex < size; layerIndex++) {
                var index = layerIndex + patternIndex * size
                patternLayer = patternLayer + EXTRA_HEXA_DECIMALS[index]
            }
            basePattern.push(patternLayer.trim())
        }
        
        //Handle index type. Form pattern & keys
        for (var i = 0; i < size; i++) {
            var patternLayer = basePattern[i]
            comfuncs.quickerate(ingredientObjects, (ingredientObject, ingredientObjectIndex) => {
                var parsedIngredientIndexes = comfuncs.ensureArray(ingredientObject[1])
                if (parsedIngredientIndexes.length == 0)
                    console.error(`[rawInsertion]: Indexes are not present in ingredientObject ${ingredientObject}`)
                var ingredientObjectKey = ALPHABET_INDEXES[ingredientObjectIndex]
                var ingredientIndexes;
                if (ingredientObject.length >= 3 &&  ingredientObject[2]) {
                    ingredientIndexes = []
                    for (var index = 0; index < size * size; index++)
                        if (!parsedIngredientIndexes.includes(index))
                            ingredientIndexes.push(index)
                } else ingredientIndexes = parsedIngredientIndexes
                comfuncs.ensureArray(ingredientIndexes).forEach(rawInsertionIndex => {
                    var insertionIndex = EXTRA_HEXA_DECIMALS[rawInsertionIndex]
                    if (patternLayer.includes(insertionIndex)) {
                        patternLayer = patternLayer.replace(insertionIndex, ingredientObjectKey)
                        if (!Object.getOwnPropertyNames(keys).includes(ingredientObjectKey))
                            comfuncs.defineProperty(keys, ingredientObjectKey, ingredientObject[0])
                    }
                })
            })
            patternLayer = patternLayer.replace(' ', '')
            for (var num = 0; num < EXTRA_HEXA_DECIMALS.length; num++)
                patternLayer = patternLayer.replace(EXTRA_HEXA_DECIMALS[num], ' ')
            pattern[i] = patternLayer
        }

        //Debug
        if (global.debug) {
            var emptyPattern = true
            pattern.forEach(layer => {
                if (layer.trim() != null)
                    emptyPattern = false
            })
            if (Object.getOwnPropertyNames(keys).length == 0 || emptyPattern)
                console.error(`[rawInsertion]: Failed to parse recipe!\n        ingredientObjects=${ingredientObjects}\n        keys=${JSON.stringify(keys)}\n        pattern=${pattern}`)
        }
        
        return recipeCall(pattern, keys)
    }

    var variableInsertion = (size, result, ingredientObjects) => {
        rawInsertion(size, ingredientObjects, (pattern, keys) => {
            if (result == null && global.debug) 
                console.info('[VariableInsertion]: result=' + result)
            event.shaped(result, pattern, keys)
        })
    }
        
    var insertion = (result, ingredientObjects) => variableInsertion(3, result, ingredientObjects)

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
        console.info(`shapeless: ${comfuncs.handleProperties(ingredients, ingredient => Ingredient.of(ingredient))}`)
        event.custom({
            type: 'notreepunching:tool_damaging_shapeless',
            recipe: {
                type: 'minecraft:crafting_shapeless',
                ingredients: comfuncs.handleValues(ingredients, ingredient => Ingredient.of(ingredient)),
                result: Item.of(result)
            }
        })
    }

    var square = (size, result, ingredient) => variableInsertion(size, result, [ingredient, [], true])

    /*  
        Gap MULTIPLIES and doesn't ADD.
            Format = (int heightGap, int widthGap) or (int gap, @Nullable boolean snake)
        The anchor is a number for which orientation the rotating square will respect. 
        It is a number correlating to a corner as follows:

                    0         1
                       [ABC]
                       [DEF]
                       [HIK]
                    2         3

        PROPER ROTATION
            0  1  2
            3  4  5
            7  8  9

            index = index - height * size  
            
            0  1  2
            0  1  2
            0  1  2
            
            index = index + width * size
            
            0  3  6
            0  3  6
            0  3  6
            
            index = index + size - height
            
            2  5  8
            1  4  7
            0  3  6

  
  


    */
    var customSquare = (anchor, gaps, snake, size, result, ingredients) => {
        ingredients = comfuncs.ensureArray(ingredients)
        var ingredientObjects = []
        var right = anchor == 1 || anchor == 3
        var bottom = anchor == 2 || anchor == 3
        var heightGap = 1
        var widthGap = 1

        if (gaps.length == 0 || gaps.length > 2) console.error(`[customRotatingSquare]: Invalid gap format. gaps=${gaps}`)

        if (gaps.length == 2) {
            heightGap = gaps[0]
            widthGap = gaps[1]
        }

        comfuncs.quickerate(ingredients, (ingredient, index) => ingredientObjects[index] = [ingredient, []])
        comfuncs.forEasy(size, height => {
            var isHeightOdd = comfuncs.isOdd(height)
            var placementHeight = height
            if (bottom)
                placementHeight = size - 1 - height
            var heightIngredientIndex = comfuncs.rotate(height * heightGap, ingredientObjects.length)
            comfuncs.forEasy(size, width => {
                var placementWidth = width
                if (right)
                    placementWidth = size - 1 - width
                if (snake && isHeightOdd)
                    placementWidth = size - 1 - placementWidth
                var ingredientObject
                if (gaps.length == 1)
                    ingredientObject = ingredientObjects[comfuncs.rotate((width + height * size) * gaps[0], ingredientObjects.length)] 
                else ingredientObject = ingredientObjects[comfuncs.rotate(width * widthGap + heightIngredientIndex, ingredientObjects.length)] 
                ingredientObject[1].push(placementWidth + placementHeight * size)
            })
        })
        console.info(`result=${result}, ingredientOjects=${ingredientObjects}`)
        variableInsertion(size, result, ingredientObjects)
    }

    var snakeTrailingSquare = (size, result, ingredients) => customSquare(0, [1], true, size, result, ingredients)

    var trailingSquare = (size, result, ingredients) => customSquare(0, [1], false, size, result, ingredients)

    var rotatingSquare = (size, result, ingredients) => customSquare(0, [1, 1], false, size, result, ingredients)

    var smallRotatingSquare = (result, ingredients) => rotatingSquare(2, result, ingredients)

    var bigRotatingSquare = (result, ingredients) => rotatingSquare(3, result, ingredients)

    var planet = (result, innerInput, outterInput) => insertion(result, [[innerInput, 4], [outterInput, [], true]])

    var box = (result, input) => insertion(result, [input, 4, true])

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

    return {
        rawInsertion: rawInsertion,
        variableInsertion: variableInsertion,
        insertion: insertion,
        toolDamagingShaped: toolDamagingShaped,
        toolDamagingShapeless: toolDamagingShapeless,
        square: square,
        customSquare: customSquare,
        snakeTrailingSquare: snakeTrailingSquare,
        trailingSquare: trailingSquare,
        rotatingSquare: rotatingSquare,
        smallRotatingSquare : smallRotatingSquare,
        bigRotatingSquare: bigRotatingSquare,
        planet: planet,
        box: box,
        replace: replace,
        replaceTagRecipes: replaceTagRecipes,
        replaceOutputRecipe: replaceOutputRecipe,
        replaceIO: replaceIO,
        removeOutput: removeOutput,
        removeIO: removeIO,
        removeAndHide: removeAndHide,
        removeAll: removeAll,
        circleLoop: circleLoop,
        donutLoop: donutLoop
    }
}