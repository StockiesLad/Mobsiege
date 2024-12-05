recipes((event, funcs) => {
     funcs.vanillaInsert('minecraft:campfire', [
          ['#minecraft:torches/temp', [3, 5]],
          ['primalstage:primitive_grill', 1],  
          ['#forge:coal/high_grade', 4], 
          [custom.campfire_rock, 7],
          ['#minecraft:logs', [6, 8]] 
     ])
})