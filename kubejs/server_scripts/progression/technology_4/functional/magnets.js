recipes((event, funcs) => {
     var magnetRecipe = (type) => funcs.vanillaInsert(funcs.removeByOutput(`alexscaves:${type}_magnet`), [
          [`alexscaves:block_of_${type}_neodymium`, 7],
          ['#forge:ingots/gravitium_alloy', 4],
          ['#forge:ingots/redstone_alloy', 1],
          [`alexscaves:${type}_neodymium_ingot`, [0, 2, 3, 5, 6, 8]]
     ])

     magnetRecipe('azure')
     magnetRecipe('scarlet')

     funcs.vanillaInsert(funcs.removeByOutput('simplemagnets:basicmagnet'), [
          ['#forge:ingots/gravitium_alloy', 4],
          ['#forge:ingots/invar', [0, 1, 3, 6, 7]],
          [`alexscaves:azure_neodymium_ingot`, 2],
          [`alexscaves:scarlet_neodymium_ingot`, 8]
     ])

     funcs.vanillaInsert(funcs.removeByOutput('simplemagnets:advancedmagnet'), [
          ['#forge:storage_blocks/gravitium_alloy', 4],
          ['#forge:ingots/vibrant_alloy', [0, 1, 6, 7]],
          ['simplemagnets:basicmagnet', 3],
          [`alexscaves:block_of_azure_neodymium`, 2],
          [`alexscaves:block_of_scarlet_neodymium`, 8]
     ])
})