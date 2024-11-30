recipes((event, funcs) => {
     funcs.replaceOutputRecipe(comfuncs.packDef('orb_of_thermoregulation'), 
          r => funcs.planetOrbit(r, ['minecraft:blaze_powder', 'deeperdarker:soul_crystal', 'thermal:blizz_powder', 'ae2:charged_certus_quartz_crystal', 'enderio:weather_crystal']).toolDamaging())
})