recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeInsurely({output: 'projectred_core:electrotine_generator'}), [
          [`#${main}:bricks`, [0, 2, 6, 8]],
          ['projectred_core:red_ingot', 1],
          [`#${main}:gears/copper`, [3, 5]],
          ['buildcraftcore:engine_stone', 4],
          [`#${main}:furnaces`, 7]
     ])
})