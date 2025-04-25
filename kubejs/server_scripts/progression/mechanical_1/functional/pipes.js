recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeInsurely({output: 'create:fluid_pipe'}), [
          ['#buildcraft:pipe/fluids_iron', 4],
          ['#forge:plates/copper', [1, 3, 5, 7]]
     ])
})