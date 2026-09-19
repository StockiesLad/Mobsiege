recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeInsurely({output: 'immersiveengineering:workbench'}) , [
          [`#${main}:gears/iron`, [0, 2]],
          [`#${main}:storage_blocks/iron`, [3, 5]],
          [`#${main}:ingots/netherite`, [6, 8]],
          ['buildcraftfactory:autoworkbench_item', 7],
          ['tconstruct:crafting_station', 4],
          ['betterend:diamond_hammer', 1]
     ])
})