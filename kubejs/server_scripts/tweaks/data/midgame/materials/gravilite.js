recipes((event, funcs) => {
     funcs.replaceOutputRecipe('edenring:gravilite_block', r => funcs.generate(r, 'edenring:gravilite_shards').rollingSquare(1, 3).next().vanilla())
     funcs.replaceOutputRecipe('9x edenring:gravilite_shards', r => event.shapeless(r, 'edenring:gravilite_block'))
})