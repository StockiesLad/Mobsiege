recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeInsurely({output: 'create:cogwheel'}), [
          [`#${main}:gears/wood`, [1, 3, 5, 7, 0, 2, 6, 8]],
          ['create:shaft', 4]
     ])

     funcs.vanillaInsert(funcs.removeInsurely({output: 'create:large_cogwheel'}), [
          [`#${main}:gears/wood`, [1, 3, 5, 7, 0, 2, 6, 8]],
          ['create:cogwheel', 4]
     ])
})