recipes((event, funcs) => {
     event.forEachRecipe({output: 'create:crushing_wheel'}, recipe => {
          recipe.replaceInput('minecraft:andesite', 'immersiveengineering:steel_scaffolding_standard')
          recipe.replaceInput('#minecraft:planks', 'create:andesite_casing')
     })
})