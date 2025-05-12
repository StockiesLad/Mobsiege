recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeInsurely({output: 'buildcraftfactory:distiller'}), [
          ['minecraft:redstone_torch', [0, 2]],
          ['buildcraftfactory:tank', [1, 3, 5]],
          ['#buildcraft:pipe/fluids_iron', 4],
          ['buildcraftsilicon:chipset_redstone', 7],
          ['#forge:gears/invar', [6, 8]]
     ])
})