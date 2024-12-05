recipes((event, funcs) => {
     event.remove({type: 'primalstage:grill'})
     var addedRecipeResults = []
     event.forEachRecipe({type: 'minecraft:campfire_cooking'}, recipe => {
          var result = recipe.originalRecipeResult.toItemString().replace('\'', '')
          console.info(result)
          if (!addedRecipeResults.some(addedResult => addedResult == result)) {
               addedRecipeResults.push(result)
               funcs.grilling(result, Item.of(recipe.originalRecipeIngredients[0]).toItemString().replace('\'', ''))
          }
     })
})