recipes((event, funcs) => {
     funcs.replaceCrafting('create:water_wheel', [
          ['create:shaft', [1, 7]],
          ['create:andesite_casing', 4],
          ['#minecraft:planks', [3, 5]],
          ['#minecraft:logs', [0, 2, 6, 8]],
     ])

     funcs.replaceCrafting('create:large_water_wheel', [
          ['create:andesite_alloy', [1, 3, 5, 7]],
          ['create:water_wheel', 4],
          ['#minecraft:logs', [0, 2, 6, 8]]
     ])
})