recipes((event, funcs) => {
     funcs.replaceOutputRecipe('miniutilities:unstable_ingot', r => event.shapeless(r, ['edenring:gravilite_shards', 'unstabletools:unstable_ingot']))
     funcs.replaceOutputRecipe('miniutilities:unstable_ingot', r => event.shapeless(r, ['edenring:gravilite_block', 'unstabletools:unstable_block']))
})