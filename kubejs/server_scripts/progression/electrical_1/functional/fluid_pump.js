recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeInsurely({output: 'immersiveengineering:fluid_pump'}), [
          [`#${main}:gears/iron`, [0, 2]],
          [`#${main}:plates/iron`, [1, 3, 5]],
          ['immersiveengineering:component_iron', [4]],
          ['immersiveengineering:fluid_pipe', [6, 8]],
          ['buildcraftfactory:pump', 7]
     ])
})