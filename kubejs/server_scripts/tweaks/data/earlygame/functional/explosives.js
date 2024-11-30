recipes((event, funcs) => {
     funcs.replaceOutputRecipe('minecraft:tnt', result => funcs.generate(result, ['minecraft:gunpowder', 'primalstage:sandy_clay_compound']).rollingSquare(1, 3).next().vanilla())
})
itemTags((event, funcs) => {
     event.add('coalexplosion:igniters', ['hardcore_torches:smoldering_torch', 'hardcore_torches:lit_torch', /*'notreepunching:fire_starter', 'hardcore_torches:fire_starter',*/'minecraft:flint_and_steel'])
})

