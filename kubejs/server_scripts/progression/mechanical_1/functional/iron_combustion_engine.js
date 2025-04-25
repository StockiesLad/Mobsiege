recipes((event, funcs) => {
     funcs.mechanicalInsert(funcs.removeInsurely({output: 'buildcraftcore:engine_iron'}), [
          ['create_new_age:magnetite_block', [0, 1, 3, 4, 5, 9, 15, 19, 20, 21, 23, 24]],
          ['#forge:storage_blocks/iron', [6, 8, 16, 18]],
          ['#forge:gears/iron', [7, 17]],
          ['buildcraftcore:engine_stone', 12],
          ['#forge:rods/steel', [2, 22]],
          ['create_new_age:generator_coil', [11, 13]],
          ['minecraft:bucket', [10, 14]]
     ])
})