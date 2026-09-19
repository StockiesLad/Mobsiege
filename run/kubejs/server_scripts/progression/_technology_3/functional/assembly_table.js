recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeByOutput(`buildcraftsilicon:assembly_table`), [
          [`projectred_core:plate`, 1],
          [`#${main}:obsidian`, [3, 5]],
          [`#${main}:storage_blocks/redstone`, 4],
          [`#${main}:gems/diamond`, [6, 8]],
          [`#${main}:plates/netherite`, 7]
     ])
})