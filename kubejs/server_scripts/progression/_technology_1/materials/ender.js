itemTags((event, funcs) => {
     event.add('forge:dusts/ender_pearl', ['betterend:ender_dust'])
})

recipes((event, funcs) => {
     event.replaceInput({input: 'minecraft:ender_pearl'}, 'minecraft:ender_pearl', '#forge:ender_pearls')
})
