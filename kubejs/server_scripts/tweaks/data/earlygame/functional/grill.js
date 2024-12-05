recipes((event, funcs) => {
     event.forEachRecipe({type: 'minecraft:campfire_cooking'}, recipe => {
          funcs.grilling(recipe.originalRecipeResult, recipe.originalRecipeIngredients)
     })
})
/*
ServerEvents.recipes(event => {
     event.forEachRecipe(null, recipe => {
          
     })
})*/