recipes((event, funcs) => {
     /*
     let pressed = []
     event.forEachRecipe({type: 'thermal:press', output: '#forge:gears'}, recipe => {
          pressed.push(recipe.json.get('result').getAsJsonArray().get(0).getAsJsonObject().get('item').getAsString())
     })

     console.info(pressed)

     event.forEachRecipe({type: 'minecraft:crafting_shaped', output: '#forge:gears'}, recipe => {
          if (!pressed.some(r => recipe.getOriginalRecipeResult().id === r)) {
               console.info(InputItem.of(recipe.originalRecipeIngredients[0]))
               console.info([
                    recipe.getOriginalRecipeIngredients(),
                    recipe.getOriginalRecipeIngredients().get(0),
                    recipe.originalRecipeIngredients[0],
                    recipe.originalRecipeIngredients[0].asStack(),
                    recipe.originalRecipeIngredients[0].getFirst(),
                    recipe.originalRecipeIngredients[0].itemIds
               ])
               event.recipes.thermal.press(recipe.getOriginalRecipeResult().id, [InputItem.of(recipe.originalRecipeIngredients[0]), 'thermal:press_gear_die'])
          }
     })*/
})

itemTags(event => {
     event.add('forge:gears/wood', 'hammerlib:gears/wooden')
})