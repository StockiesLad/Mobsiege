recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeInsurely({output: 'create:mechanical_crafter'}), [
          ['immersiveengineering:sheetmetal_iron', [0, 2, 6, 8]],
          ['forge:gears/netherite', 1],
          ['create:brass_casing', 4],
          ['create:cogwheel', [3, 5]],
          ['buildcraftsilicon:chipset_iron', 7]
     ])
})