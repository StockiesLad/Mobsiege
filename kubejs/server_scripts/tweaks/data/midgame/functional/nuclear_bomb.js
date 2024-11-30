recipes((event, funcs) => {
     var thermal = event.recipes.thermal
     event.replaceInput({output: 'alexscaves:nuclear_bomb'}, 'minecraft:iron_block', 'minecraft:tnt')
     funcs.replaceOutputRecipe('4x alexscaves:uranium_rod', r => thermal.press(r, ['#forge:storage_blocks/uranium', '4x #forge:rods/iron']))
     funcs.replaceOutputRecipe('alexscaves:fissile_core', r => thermal.press(r, ['#forge:storage_blocks/uranium', '4x #forge:plates/tungsten']))
})