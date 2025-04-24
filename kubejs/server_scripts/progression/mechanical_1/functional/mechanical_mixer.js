recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeInsurely({output: 'create:mechanical_mixer'}), [
          ['buildcraftsilicon:chipset_iron', [0, 2, 6, 8]],
          ['#forge:gears/copper', 1],
          ['create:andesite_casing', 4],
          ['immersiveengineering:wirecoil_copper', [3, 5]],
          ['create:whisk', 7]
     ])
})