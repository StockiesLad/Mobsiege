recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeInsurely({output: 'buildcraftbuilders:quarry'}), [
          ['#buildcraft:pipe/items_gold', [0, 2]],
          ['buildcraftfactory:mining_well', 1],
          ['#forge:gears/diamond', [3, 5]],
          ['minecraft:iron_block', 4],
          ['buildcraftsilicon:chipset_gold', [6, 8]],
          ['minecraft:diamond_pickaxe', 7]
     ])
})