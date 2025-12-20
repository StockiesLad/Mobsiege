recipes((event, funcs) => {
     funcs.removeById('bclib:tag_cauldron')
     funcs.planet(funcs.removeByOutput('create:basin'), `#${main}:basins`, ['create:andesite_alloy']).vanilla()
})

itemTags((event, funcs) => {
     funcs.add(`#${main}:basins`, ['tconstruct:seared_basin', 'tconstruct:scorched_basin'])
})