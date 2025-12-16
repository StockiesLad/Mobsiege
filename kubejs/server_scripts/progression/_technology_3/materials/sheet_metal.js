recipes((event, funcs) => {
     event.forEachRecipe({input: dataTag + 'plates', output: dataTag + 'sheetmetals'}, recipe => {
          var ingredient = getCraftingIngredients(recipe)[0]
          var result = recipe.originalRecipeResult.id
          funcs.globalPressing(result, '4x ' + ingredient, 'packing_2x2')
          funcs.plus(result, ingredient).append(['actuallyadditions:void_crystal', 4]).vanilla()
     })

     event.remove({input: dataTag + 'plates', output: dataTag + 'sheetmetals'})
})