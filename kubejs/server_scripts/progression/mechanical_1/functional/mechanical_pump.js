recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeInsurely({output: 'create:mechanical_pump'}), [
          ['create:cogwheel', [3, 5]],
          ['create:fluid_pipe', [1, 7]],
          ['buildcraftfactory:pump', 4]
     ])
})