recipes((event, funcs) => {
     funcs.forEachRemovedRecipe({input: `#${main}:ender_pearls`, output: '#elevatorid:elevators'}, recipe => {
          event.recipes.create.mixing(recipe.getOriginalRecipeResult(), [
               `#${main}:dyes/${getCraftingIngredients(recipe)[0].replace('minecraft:', '').replace('_wool', '')}`, 
               '2x magical_utilities:ender_cloud', 
               '12x magical_utilities:steam_cloud'
          ])
     })
})