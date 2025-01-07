recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeByOutput('ae2:charger'), [
          ['#forge:ingots/redstone_alloy', 4],
          ['#forge:ingots/copper', 3],
          ['thermal:rf_coil', 1],
          ['create:cogwheel', 2],
          ['#forge:plates/iron', 5],
          ['#forge:storage_blocks/iron', 8],
          ['#forge:ingots/iron', [0, 6, 7]]
     ])
})