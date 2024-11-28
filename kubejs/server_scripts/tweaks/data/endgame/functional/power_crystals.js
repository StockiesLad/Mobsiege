recipes((event, funcs) => {
     funcs.replaceOutputRecipe('projecte:philosophers_stone', r => funcs.vanillaInsert(r, [
          ['deepresonance:resonating_crystal_natural_empty', [0, 2, 6, 8]], 
          ['betterend:eternal_crystal', [1, 7]], 
          ['enderio:vibrant_crystal', 3],
          ['mysticalagriculture:master_infusion_crystal', 4],
          ['enderio:pulsating_crystal', 5]
     ]))
})