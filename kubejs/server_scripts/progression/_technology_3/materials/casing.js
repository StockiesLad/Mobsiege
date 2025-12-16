recipes((event, funcs) => {
     event.forEachRecipe({output: 'actuallyadditions:wood_casing'}, recipe => {
          recipe.replaceInput('#minecraft:logs', dataTag + 'ingots/steel')
          recipe.replaceInput('#minecraft:planks', dataTag + 'nuggets/iron')
          recipe.replaceInput(dataTag + 'rods/wooden', '#minecraft:logs')
     })
})