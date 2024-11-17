const modpackId = global.modpackId
const comfuncs = global.functions.common
const commaths = global.functions.math

ServerEvents.recipes(event => {
    comfuncs.invokeSignedCalls('recipes', {tag: global.functions.tag(null), recipes: global.functions.recipe(event)})
})

ServerEvents.tags('item', event => {
    var functions = global.functions.tag(event)
    comfuncs.invokeSignedCalls('itemTags', functions)
    commonTags(event, functions)
})

ServerEvents.tags('block', event => {
    var functions = global.functions.tag(event)
    comfuncs.invokeSignedCalls('blockTags', functions)
    commonTags(functions)
})

function commonTags(functions) {
    comfuncs.invokeSignedCalls('commonTags', functions)
}

function register(ids, calls) {
    comfuncs.addSignedCalls(ids, calls)
}

/*
    //impl:    recipes('shapeless')('minecraft:torch', 'minecraft:stick')

    disabled: earlygame.js, world.js, midgame.js, mobsieges
*/