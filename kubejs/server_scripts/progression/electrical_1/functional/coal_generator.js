recipes((event, funcs) => {
     event.forEachRecipe({output: 'actuallyadditions:coal_generator'}, recipe => {
          recipe.replaceInput('minecraft:coal', 'buildcraftcore:engine_stone')
          recipe.replaceInput('minecraft:cobblestone', '#forge:ingots/steel')
     })
})