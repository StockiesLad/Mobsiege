const Containers = Java.loadClass('net.minecraft.world.Containers')

const modpackId = global.modpackId
const comfuncs = global.functions.common({})
const commaths = global.functions.math
const custom = global.customImpl

ServerEvents.tags('item', event => {
    comfuncs.invokeSignedCalls('commonTags', {
        event: event,
        funcs: getTagFunctions(event)
    })
})

ServerEvents.tags('block', event => {
    comfuncs.invokeSignedCalls('commonTags', {
        event: event,
        funcs: getTagFunctions(event)
    })
})

ServerEvents.lowPriorityData(event => {
    comfuncs.invokeSignedCalls('basicLootTables', {
        event: event,
        funcs: getBasicLootTableFunctions(event)
    })
})

LootJS.modifiers(event => {
    comfuncs.invokeSignedCalls('complexLootTables', {
        event: event,
        funcs: getComplexLootTableFunctions(event)
    })
})

ServerEvents.recipes(event => {
    comfuncs.invokeSignedCalls('recipes', {
        event: event,
        funcs: getRecipeFunctions(event)
    })
})

function register(ids, calls) {
    comfuncs.addSignedCalls(ids, calls)
}

function impl(ids, call) {
    register(ids, context => call(context.event, context.funcs))
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