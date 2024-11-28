recipes((event, funcs) => {
     funcs.replaceOutputRecipe('ae2:controller', r => funcs.insert(r, [
          ['ae2:engineering_processor', 12], 
          ['#forge:ingots/enderium', [7, 17]], 
          ['ae2:smooth_sky_stone_block', [11, 13]], 
          ['ae2:fluix_crystal', [6, 8, 16, 18]], 
          ['#forge:ingots/copper', [1, 3, 5, 9, 15, 19, 21, 23]], 
          ['#forge:ingots/redstone_alloy', [2, 10, 14, 22]], 
          ['ae2:calculation_processor', [0, 24]], 
          ['ae2:logic_processor', [4, 20]]
     ]).mechanical())

     funcs.replaceOutputRecipe('ae2:chest', r => funcs.vanillaInsert(r, [
          ['projecte:alchemical_chest', 4],
          ['#forge:ingots/redstone_alloy', [3, 5]],
          ['#ae2:glass_cable', 1],
          ['#forge:ingots/enderium', 7],
          ['#forge:ingots/iron', [0, 2, 6, 8]]
     ]))

     funcs.replaceOutputRecipe('ae2:drive', r => funcs.vanillaInsert(r, [
          ['#ae2:glass_cable', 4],
          ['#forge:ingots/redstone_alloy', 1],
          ['ae2:engineering_processor', 7],
          ['#forge:ingots/enderium', [3, 5]],
          ['#forge:ingots/conductive_alloy', [0, 2, 6, 8]]
     ]))
})
