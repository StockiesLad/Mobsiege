recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeInsurely({output: 'projectred_core:electrotine_generator'}), [
          [dataTag + 'bricks', [0, 2, 6, 8]],
          ['projectred_core:red_ingot', 1],
          [dataTag + 'gears/copper', [3, 5]],
          ['buildcraftcore:engine_stone', 4],
          [dataTag + 'furnaces', 7]
     ])
})