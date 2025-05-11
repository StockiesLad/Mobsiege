recipes((event, funcs) => {
     funcs.forEachRemovedRecipe({input: '#forge:ender_pearls', output: '#elevatorid:elevators'}, recipe => {
          event.recipes.create.mixing(recipe.getOriginalRecipeResult(), [
               `#forge:dyes/${getCraftingIngredients(recipe)[0].replace('minecraft:', '').replace('_wool', '')}`, 
               '2x magical_utilities:ender_cloud', 
               '12x magical_utilities:steam_cloud'
          ])
     })
})