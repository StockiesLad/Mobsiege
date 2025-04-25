recipes((event, funcs) => {
     event.remove({input: 'minecraft:redstone', output: 'minecraft:piston'})
     funcs.vanillaInsert('minecraft:piston', [
          ['#minecraft:planks', [0, 1, 2]],
          ['#forge:cobblestone', [3, 6, 5, 8]],
          ['#forge:gears/steel', 4],
          ['minecraft:redstone', 7]
     ])
})