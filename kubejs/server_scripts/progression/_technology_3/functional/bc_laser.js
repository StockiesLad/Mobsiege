recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeByOutput('buildcraftsilicon:laser'), [
          [dataTag + 'obsidian', [0, 6]],
          [dataTag + 'storage_blocks/redstone', 3],
          [dataTag + 'gears/diamond', [1, 7]],
          [dataTag + 'rods/gold', 4],
          [dataTag + 'dusts/glowstone', [2, 8]],
          ['projectred_core:pointer', 5]
     ])
})