recipes((event, funcs) => {
     funcs.replaceOutputRecipe('minecraft:tnt', result => funcs.generate(result, ['minecraft:gunpowder', 'primalstage:sandy_clay_compound']).rollingSquare(1, 3).next().vanilla())
})