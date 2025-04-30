recipes((event, funcs) => {
     funcs.removeById('bclib:tag_cauldron')
     funcs.planet(funcs.removeByOutput('create:basin'), '#forge:basins', ['create:andesite_alloy']).vanilla()
})

itemTags((event, funcs) => {
     funcs.add('forge:basins', ['tconstruct:seared_basin', 'tconstruct:scorched_basin'])
})