function replaceRecipeCmplx(event, deletedRecipe, addedRecipe) {
    if (deletedRecipe.output != null)
        addedRecipe(deletedRecipe.output)
    else addedRecipe(deletedRecipe)
    event.remove(deletedRecipe)
}

function replaceRecipeSmpl(event, result, addedRecipe) {
    addedRecipe(result)
    var output = result.split(' ')
    event.remove({output: output[output.length - 1]})
}

function replaceUsage(event, item, newItem) {
    event.replaceInput({input: item}, item, newItem)
    event.replaceOutput({output: item}, item, newItem)
}

function removeUsage(event, item) {
    event.remove({input: item})
    event.remove({output: item})
}

function removeAndHide(event, item) {
    global.HIDDEN_ITEMS.push(item)
    removeUsage(event, item)
}

function removeEnMass(event, cmplxObjects) {
    cmplxObjects.forEach(element => event.remove(element))
}

function recipeLoop(event, items) {
    for (let i = 0; i < items.length; i++) {
        var nextI = i + 1
        if (nextI >= items.length)
            nextI = 0
        event.shapeless(items[i], items[nextI])
    }
}

/*function tool_damaging_shapeless(event, result, ingredients) {
    event.custom({
        type: 'notreepunching:tool_damaging_shapeless',
        recipe: {
            type: 'minecraft:crafting_shapeless',
            ingredients: global.compileArray(ingredients, element => parseRecipeEntryCount(element)),
            result: parseRecipeEntryCount(result)
        }
    })
}*/

function toolDamagingShapeless(event, result, ingredients) {
    event.custom({
        type: 'notreepunching:tool_damaging_shapeless',
        recipe: {
            type: 'minecraft:crafting_shapeless',
            ingredients: global.compileArray(ingredients, element => Ingredient.of(element)),
            result: Item.of(result)
        }
    })
}

/*function tool_damaging_shaped(event, result, pattern, ingredients) {
    event.custom({
        type: 'notreepunching:tool_damaging_shaped',
        recipe: {
            type: 'minecraft:crafting_shaped',
            pattern: pattern,
            key: global.compileObject(ingredients, (entry, entryObject) => parseRecipeEntryKey(entry, entryObject)),
            result: parseRecipeEntryCount(result)
        }
    })
}*/

function toolDamagingShaped(event, result, pattern, ingredients) {
    /*var ingredientEntries = {}
    for (const [key, value] of Object.entries(ingredients)) {
        Object.defineProperty(ingredientEntries, key, {value: Ingredient.of(value), writable: true, enumerable: true})
    }*/
    event.custom({
        type: 'notreepunching:tool_damaging_shaped',
        recipe: {
            type: 'minecraft:crafting_shaped',
            pattern: pattern,
            key: global.compileObject(ingredients, value => Ingredient.of(value)), //ingredientEntries,
            result: Item.of(result)
        }
    })
}

function parseRecipeEntryKey(entry, entryObject) {
    var char0 = Array.from(entry)[0];
        if (entry.includes(char0 + '@ ') && (/[A-Z]/).test(char0)) {
            Object.defineProperty(entryObject, char0, {value: parseRecipeEntryCount(entry.split('@ ')[1]), writable: true, enumerable: true})
    } else console.error('The Limit: Architected :: Error occured with parsing entry into key! | entry = " + entry')
}

function parseRecipeEntryCount(entry) {
    var char0 = Array.from(entry)[0];
    var num0 = parseInt(char0)
    if (entry.includes(char0 +  'x ') && Number.isInteger(num0)) {
        let parsedEntry = parseRecipeEntry(entry.split('x ')[1]);
        parsedEntry.count = num0
        return parsedEntry
    } else return parseRecipeEntry(entry)
}

function parseRecipeEntry(entry) {
    if (entry.includes('#'))
        return {tag: entry.replace('#', '')}
    else return {item: entry}
}