recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeInsurely({output: 'immersiveengineering:fluid_pump'}), [
          ['#forge:gears/iron', [0, 2]],
          ['#forge:plates/iron', [1, 3, 5]],
          ['immersiveengineering:component_iron', [4]],
          ['immersiveengineering:fluid_pipe', [6, 8]],
          ['buildcraftfactory:pump', 7]
     ])
})