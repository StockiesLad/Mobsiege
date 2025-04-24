recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeInsurely({output: 'create:mechanical_press'}), [
          ['buildcraftsilicon:chipset_iron', [0, 2]],
          ['create:shaft', 1],
          ['create:andesite_casing', 4],
          ['#forge:gears/bronze', [3, 5]],
          ['minecraft:piston', [6, 8]],
          ['#forge:storage_blocks/invar', 7]
     ])
})