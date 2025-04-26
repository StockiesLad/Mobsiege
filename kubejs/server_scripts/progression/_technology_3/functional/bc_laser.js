recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeByOutput('buildcraftsilicon:laser'), [
          ['#forge:obsidian', [0, 6]],
          ['#forge:storage_blocks/redstone', 3],
          ['#forge:gears/diamond', [1, 7]],
          ['#forge:rods/gold', 4],
          ['#forge:dusts/glowstone', [2, 8]],
          ['projectred_core:pointer', 5]
     ])
})