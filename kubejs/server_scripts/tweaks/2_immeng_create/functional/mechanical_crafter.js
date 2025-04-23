recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeInsurely({output: 'create:mechanical_crafter'}), [
          ['minecraft:iron_block', [0, 2, 6, 8]],
          ['immersiveengineering:wirecoil_copper', 1],
          ['create:brass_casing', 4],
          ['create:cogwheel', [3, 5]],
          ['buildcraftsilicon:chipset_iron', 7]
     ])
})