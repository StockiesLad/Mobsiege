recipes((event, funcs) => {
     funcs.vanillaInsert('minecraft:campfire', [
          ['#minecraft:torches/temp', [1, 3, 5]], 
          ['#forge:coal/high_grade', 4], 
          [custom.campfire_rock, 7],
          ['#minecraft:logs', [6, 8]] 
     ])
})