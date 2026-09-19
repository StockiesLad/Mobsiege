recipes((event, funcs) => {
     event.forEachRecipe({output: 'actuallyadditions:wood_casing'}, recipe => {
          recipe.replaceInput('#minecraft:logs', `#${main}:ingots/steel`)
          recipe.replaceInput('#minecraft:planks', `#${main}:nuggets/iron`)
          recipe.replaceInput(`#${main}:rods/wooden`, '#minecraft:logs')
     })
})