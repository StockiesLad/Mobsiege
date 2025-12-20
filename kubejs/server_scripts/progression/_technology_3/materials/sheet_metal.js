recipes((event, funcs) => {
     event.forEachRecipe({input: `#${main}:plates`, output: `#${main}:sheetmetals`}, recipe => {
          var ingredient = getCraftingIngredients(recipe)[0]
          var result = recipe.originalRecipeResult.id
          funcs.globalPressing(result, '4x ' + ingredient, 'packing_2x2')
          funcs.plus(result, ingredient).append(['actuallyadditions:void_crystal', 4]).vanilla()
     })

     event.remove({input: `#${main}:plates`, output: `#${main}:sheetmetals`})
})