recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeInsurely({output: 'immersiveengineering:rs_engineering'}), [
          ['immersiveengineering:sheetmetal_iron', [0, 2, 6, 8]],
          ['buildcraftsilicon:chipset_redstone', [1, 3, 5, 7]],
          ['minecraft:copper_block', 4]
     ])

     funcs.vanillaInsert(funcs.removeInsurely({output: 'immersiveengineering:heavy_engineering'}), [
          ['immersiveengineering:sheetmetal_iron', [0, 2, 6, 8]],
          ['buildcraftsilicon:chipset_gold', [1, 7]],
          ['immersiveengineering:component_steel', [3, 5]],
          ['#forge:storage_blocks/electrum', 4]
     ])
})