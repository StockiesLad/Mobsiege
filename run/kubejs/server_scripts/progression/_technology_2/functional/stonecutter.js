recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeInsurely({output: 'minecraft:stonecutter'}), [
          [`#${main}:gears/iron`, 1],
          [`#${main}:stone`, [3, 4, 5]]
     ])
})