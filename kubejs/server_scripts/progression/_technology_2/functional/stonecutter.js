recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeInsurely({output: 'minecraft:stonecutter'}), [
          [dataTag + 'gears/iron', 1],
          [dataTag + 'stone', [3, 4, 5]]
     ])
})