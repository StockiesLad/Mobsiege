recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeInsurely({output: 'immersiveengineering:conveyor_basic'}), [
          ['minecraft:leather', [0, 1, 2]],
          ['create:cogwheel', [3, 4, 5]],
          ['#forge:ingots/invar', [6, 8]],
          ['buildcraftsilicon:chipset_gold', 7]
     ])
})