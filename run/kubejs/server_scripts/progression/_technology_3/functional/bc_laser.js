recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeByOutput(`buildcraftsilicon:laser`), [
          [`#${main}:obsidian`, [0, 6]],
          [`#${main}:storage_blocks/redstone`, 3],
          [`#${main}:gears/diamond`, [1, 7]],
          [`#${main}:rods/gold`, 4],
          [`#${main}:dusts/glowstone`, [2, 8]],
          [`projectred_core:pointer`, 5]
     ])
})