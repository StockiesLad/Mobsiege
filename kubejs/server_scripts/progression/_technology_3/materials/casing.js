recipes((event, funcs) => {
     event.forEachRecipe({output: 'actuallyadditions:wood_casing'}, recipe => {
          recipe.replaceInput('#minecraft:logs', '#forge:ingots/steel')
          recipe.replaceInput('#minecraft:planks', '#forge:nuggets/iron')
          recipe.replaceInput('#forge:rods/wooden', '#minecraft:logs')
     })
})