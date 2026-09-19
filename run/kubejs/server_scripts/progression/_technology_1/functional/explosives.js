recipes((event, funcs) => {
     funcs.threeSquareAlt(funcs.removeByOutput('minecraft:tnt'), ['minecraft:gunpowder', content.mortar]).vanilla()
})

itemTags((event, funcs) => {
     event.add('coalexplosion:igniters', ['hardcore_torches:smoldering_torch', 'hardcore_torches:lit_torch', 'minecraft:flint_and_steel'])
})