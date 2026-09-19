recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeByOutput('create:transmitter'), [
          ['immersiveengineering:wirecoil_copper', [3, 4, 5]],
          ['buildcraftsilicon:chipset_redstone', 7], 
          ['minecraft:redstone_torch', 1]
     ])
})