recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeInsurely({output: 'immersiveengineering:workbench'}) , [
          ['#forge:gears/iron', [0, 2]],
          ['#forge:storage_blocks/iron', [3, 5]],
          ['#forge:ingots/netherite', [6, 8]],
          ['buildcraftfactory:autoworkbench_item', 7],
          ['tconstruct:crafting_station', 4],
          ['betterend:diamond_hammer', 1]
     ])
})