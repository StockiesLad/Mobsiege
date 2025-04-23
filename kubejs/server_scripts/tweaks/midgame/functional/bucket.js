recipes((event, funcs) => {
     event.remove({output: 'minecraft:bucket', type: 'minecraft:crafting_shaped'})
     event.recipes.thermal.press('minecraft:bucket', '#forge:plates/iron')
})