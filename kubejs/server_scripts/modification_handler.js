const modpackId = global.modpackId
const comfuncs = global.functions.common
const commaths = global.functions.math

ServerEvents.tags('item', event => {
    var context = {
        event: event,
        funcs: getTagFunctions(event)
    }
    comfuncs.invokeSignedCalls('itemTags', context)
    comfuncs.invokeSignedCalls('commonTags', context)
})

ServerEvents.tags('block', event => {
    var context = {
        event: event,
        funcs: getTagFunctions(event)
    }
    comfuncs.invokeSignedCalls('blockTags', context)
    comfuncs.invokeSignedCalls('commonTags', context)
})

ServerEvents.highPriorityData(event => {
    comfuncs.invokeSignedCalls('lootTables', {
        event: event,
        funcs: comfuncs.incorpProperties(getLootTableFunctions(event), getTagFunctions(null))
    })
})

ServerEvents.recipes(event => {
    comfuncs.invokeSignedCalls('recipes', {
        event: event,
        funcs: comfuncs.incorpProperties(getRecipeFunctions(event), getTagFunctions(null))
    })
})

function register(ids, calls) {
    comfuncs.addSignedCalls(ids, calls)
}

/*
    //impl:    recipes('shapeless')('minecraft:torch', 'minecraft:stick')

    disabled: earlygame.js, world.js, midgame.js, mobsieges
*/