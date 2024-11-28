recipes((event, funcs) => {
     var wandRecipe = (result, mat) => funcs.vanillaInsert(result, [['#forge:rods/wooden', 6], ['#forge:storage_blocks/gravitium_alloy', 4], [mat, 2]])
     var oldRecipe = (wand) => comfuncs.functionalObject({output: wand, input: '#forge:rods/wooden'})

     funcs.replace(oldRecipe('constructionwand:stone_wand'), r => wandRecipe(r, 'bedrockium_awaken:compressed_cobblestone_5'))
     funcs.replace(oldRecipe('constructionwand:iron_wand'), r => wandRecipe(r, '#forge:storage_blocks/iron'))
     funcs.replace(oldRecipe('constructionwand:diamond_wand'), r => wandRecipe(r, '#forge:storage_blocks/diamond'))
     funcs.replace(oldRecipe('constructionwand:infinity_wand'), r => wandRecipe(r, 'bedrockium_awaken:bedrockium_block'))
})