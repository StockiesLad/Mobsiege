const Containers = Java.loadClass('net.minecraft.world.Containers')

const modpackId = global.modpackId
const comfuncs = global.functions.common({})
const commaths = global.functions.math
const custom = global.customImpl

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

ServerEvents.tags('fluid', event => {
    comfuncs.invokeSignedCalls('fluidTags', {
        event: event,
        funcs: getTagFunctions(event)
    })
})

ServerEvents.highPriorityData(event => {
    comfuncs.invokeSignedCalls('basicLootTables', {
        event: event,
        funcs: comfuncs.incorpProperties(getBasicLootTableFunctions(event), getTagFunctions(null))
    })
})

LootJS.modifiers(event => {
    comfuncs.invokeSignedCalls('complexLootTables', {
        event: event,
        funcs: comfuncs.incorpProperties(getComplexLootTableFunctions(event), getTagFunctions(null))
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

function impl(ids, call) {
    register(ids, context => call(context.event, context.funcs))
}

function itemTags(call) {
    impl('itemTags', call)
}

function blockTags(call) {
    impl('blockTags', call)
}

function fluidTags(call) {
    impl('fluidTags', call)
}

function commonTags(call) {
    impl('commonTags', call)
}

function basicLootTables(call) {
    impl('basicLootTables', call)
}

function complexLootTables(call) {
    impl('complexLootTables', call)
}

function recipes(call) {
    impl('recipes', call)
}

/*
    //impl:    recipes('shapeless')('minecraft:torch', 'minecraft:stick')

    disabled: earlygame.js, world.js, midgame.js, mobsieges
*/