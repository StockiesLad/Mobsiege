recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeByOutput('buildcraftsilicon:assembly_table'), [
          ['projectred_core:plate', 1],
          [dataTag + 'obsidian', [3, 5]],
          [dataTag + 'storage_blocks/redstone', 4],
          [dataTag + 'gems/diamond', [6, 8]],
          [dataTag + 'plates/netherite', 7]
     ])
})