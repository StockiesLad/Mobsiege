recipes((event, funcs) => {
     funcs.toolDamagingInsert(funcs.removeByOutput('projecte:collector_mk1'), [
          ['#forge:storage_blocks/glowstone', [0, 2, 6, 8]],
          ['miniutilities:unstable_block', [1, 7]],
          ['#forge:storage_blocks/enderium', [3, 5]],
          ['projecte:philosophers_stone', 4]
     ])

     funcs.planet(funcs.removeByOutput('projecte:collector_mk2'), 'projecte:collector_mk1', 'projecte:dark_matter').vanilla()
     funcs.planet(funcs.removeByOutput('projecte:collector_mk3'), 'projecte:collector_mk2', 'projecte:red_matter').vanilla()
     funcs.planet(funcs.removeByOutput('projecte:relay_mk1'), 'projecte:collector_mk1', 'bedrockium_awaken:bedrockium_ingot').vanilla()
     funcs.planet(funcs.removeByOutput('projecte:relay_mk2'), 'projecte:relay_mk1', 'projecte:dark_matter').vanilla()
     funcs.planet(funcs.removeByOutput('projecte:relay_mk3'), 'projecte:relay_mk2', 'projecte:red_matter').vanilla()
})