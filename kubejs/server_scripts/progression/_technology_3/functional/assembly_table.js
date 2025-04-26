recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeByOutput('buildcraftsilicon:assembly_table'), [
          ['projectred_core:plate', 1],
          ['#forge:obsidian', [3, 5]],
          ['#forge:storage_blocks/redstone', 4],
          ['#forge:gems/diamond', [6, 8]],
          ['#forge:plates/netherite', 7]
     ])
})