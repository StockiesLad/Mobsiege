recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeInsurely({output: 'minecraft:stonecutter'}), [
          ['#forge:gears/iron', 1],
          ['#forge:stone', [3, 4, 5]]
     ])
})