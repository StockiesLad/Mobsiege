recipes((event, funcs) => {
     funcs.replaceCrafting('create:depot', [
          [`#${main}:plates/steel`, 1],
          ['create:andesite_alloy', [3, 5]],
          ['create:andesite_casing', 4]
     ])
})