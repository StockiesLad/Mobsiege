recipes((event, funcs) => {
     event.remove({output: 'minecraft:bucket', type: 'minecraft:crafting_shaped'})
     event.recipes.thermal.press('minecraft:bucket', `#${main}:plates/iron`)
     funcs.globalPressing('minecraft:bucket', `#${main}:plates/iron`)
})