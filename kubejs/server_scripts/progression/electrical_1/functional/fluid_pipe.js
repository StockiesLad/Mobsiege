recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeInsurely({output: 'immersiveengineering:fluid_pipe'}), [
          [`#${main}:plates/iron`, [0, 1, 2, 6, 7, 8]],
          ['#buildcraft:pipe/fluids_gold', [3, 4, 5]],
     ])
})