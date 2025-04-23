recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeInsurely({output: 'create:gearbox'}), [
          ['create:cogwheel', [0, 2, 6, 8]],
          ['#forge:gears/steel', [1, 3, 5, 7]],
          ['create:andesite_casing', 4]
     ])
})