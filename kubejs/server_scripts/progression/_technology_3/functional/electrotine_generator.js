recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeInsurely({output: 'projectred_core:electrotine_generator'}), [
          ['#forge:bricks', [0, 2, 6, 8]],
          ['projectred_core:red_ingot', 1],
          ['#forge:gears/copper', [3, 5]],
          ['buildcraftcore:engine_stone', 4],
          ['#forge:furnaces', 7]
     ])
})