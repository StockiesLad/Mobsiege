recipes((event, funcs) => {
     funcs.replaceOutputRecipe('minecraft:tnt', result => funcs.generate(result, ['minecraft:gunpowder', 'primalstage:sandy_clay_compound']).rollingSquare(1, 3).next().vanilla())
})

ServerEvents.tags('item', event => {
     event.add('coalexplosion:igniters', ['hardcore_torches:smoldering_torch', 'hardcore_torches:lit_torch', 'minecraft:flint_and_steel'])
})

