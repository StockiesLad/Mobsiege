recipes((event, funcs) => {
     var thermal = event.recipes.thermal
     event.replaceInput({output: 'alexscaves:nuclear_bomb'}, preferredItemId('forge:storage_blocks/lead'), 'minecraft:tnt')
     funcs.replaceOutputRecipe('4x alexscaves:uranium_rod', r => funcs.globalPressing(r, [preferredStack('forge:storage_blocks/uranium'), preferredStack('forge:rods/lead', 4)]))
     funcs.replaceOutputRecipe('alexscaves:fissile_core', r => funcs.globalPressing(r, [preferredStack('forge:storage_blocks/uranium'), preferredStack('forge:plates/lead', 4)]))
})