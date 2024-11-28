recipes((event, funcs) => {
     funcs.removeAndHide('reliquary:interdiction_torch')
     funcs.replaceOutputRecipe('projecte:interdiction_torch', r => funcs.planetAlt(r, 'minecraft:soul_torch', 'enderio:pulsating_crystal', comfuncs.packDef('gravitium_alloy'))) 
})