recipes((event, funcs) => {
     funcs.replaceOutputRecipe('projecte:collector_mk1', r => funcs.toolDamagingInsert(r, [
          ['#forge:storage_blocks/glowstone', [0, 2, 6, 8]],
          ['miniutilities:unstable_block', [1, 7]],
          ['#forge:storage_blocks/enderium', [3, 5]],
          ['projecte:philosophers_stone', 4]
     ]))

     funcs.replaceOutputRecipe('projecte:collector_mk2', r => funcs.planet(r, 'projecte:collector_mk1', 'projecte:dark_matter'))
     funcs.replaceOutputRecipe('projecte:collector_mk3', r => funcs.planet(r, 'projecte:collector_mk2', 'projecte:red_matter'))
     funcs.replaceOutputRecipe('projecte:relay_mk1', r => funcs.planet(r, 'projecte:collector_mk1', 'bedrockium_awaken:bedrockium_ingot'))
     funcs.replaceOutputRecipe('projecte:relay_mk2', r => funcs.planet(r, 'projecte:relay_mk1', 'projecte:dark_matter'))
     funcs.replaceOutputRecipe('projecte:relay_mk3', r => funcs.planet(r, 'projecte:relay_mk2', 'projecte:red_matter'))
})