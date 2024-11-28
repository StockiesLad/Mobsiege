recipes((event, funcs) => {
     funcs.replaceOutputRecipe('ad_astra:nasa_workbench', r => funcs.insert(r, [
          ['create:large_cogwheel', 12], 
          ['#forge:ingots/rose_gold', 17], 
          ['create:mechanical_arm', [7, 11, 13]], 
          ['immersiveengineering:wirecoil_redstone', [16, 18]], 
          ['ae2:engineering_processor', [6, 8]], 
          ['ae2:logic_processor', [2, 10, 14, 22]], 
          ['#forge:ingots/redstone_alloy', [1, 3, 5, 9, 15, 19, 21, 23]], 
          ['thermal:machine_frame', [0, 4, 20, 24]]
     ]).mechanical())

     funcs.replaceOutputRecipe('ad_astra_giselle_addon:automation_nasa_workbench', r => funcs.vanillaInsert(r, [
          ['ad_astra:nasa_workbench', 4],
          ['#forge:ingots/constantan', [3, 5]],
          ['ae2:engineering_processor', 1],
          ['enderio:z_logic_controller', 7],
          ['#forge:ingots/electrum', [0, 2, 6, 8]]
     ]))

})