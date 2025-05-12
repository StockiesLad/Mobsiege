recipes((event, funcs) => {
     funcs.replaceCrafting('buildcraftfactory:flood_gate', [
          ['#forge:gears/gold', [0, 2, 6, 8]],
          [content.pulsating_chipset, [3, 5]],
          ['#forge:storage_blocks/iron', [1]],
          ['magical_utilities:gelid_cloud', [4]],
          ['#buildcraft:pipe/fluids_gold', [7]]
     ]);

     funcs.vanillaInsert(funcs.removeInsurely({output: 'buildcraftfactory:pump'}), [
          ['#forge:gears/constantan', [0, 2, 6, 8]],
          ['buildcraftfactory:mining_well', 1],
          ['buildcraftsilicon:chipset_redstone', [3, 5]],
          ['#buildcraft:pipe/fluids_gold', 4],
          ['minecraft:bucket', 7]
     ])
})