recipes((event, funcs) => {
     funcs.replaceOutputRecipe(comfuncs.packDef('orb_of_thermoregulation'), 
          r => funcs.planetOrbit(r, ['blue_skies:diopside_gem', 'betterend:amber_gem', 'deeperdarker:soul_crystal', 'ae2:charged_certus_quartz_crystal', 'enderio:weather_crystal']).toolDamaging())
})