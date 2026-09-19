recipes((event, funcs) => {
     funcs.remove([
          {id: 'enderio:wood_gear'},
          {id: 'enderio:wood_gear_corner'},
          {id: 'enderio:stone_gear'},
          {id: 'enderio:iron_gear'},
          {id: 'hammerlib:gears/wooden'},
          {id: 'thermal:parts/gold_gear'},
          {id: 'thermal:parts/diamond_gear'},
          {id: 'buildcraftcore:gear_diamond'}
     ])
     
     let thermalPressed = []
     let immengPressed = []

     event.forEachRecipe({type: 'thermal:press', output: `#${main}:gears`}, recipe => {
          thermalPressed.push(recipe.json.get('result').getAsJsonArray().get(0).getAsJsonObject().get('item').getAsString())
     })

     event.forEachRecipe({type: 'immersiveengineering:metal_press', output: `#${main}:gears`}, recipe => {
          immengPressed.push(recipe.json.get('result').getAsJsonObject().get('item').getAsString())
     })

     let removed = []

     event.forEachRecipe({type: 'minecraft:crafting_shaped', output: `#${main}:gears`}, recipe => {
          var ingredient = '4x ' + getCraftingIngredients(recipe)[0]

          if (ingredient.includes('wood') || ingredient.includes('stone')) return

          removed.push(recipe.getId())

          if (!thermalPressed.some(output => recipe.getOriginalRecipeResult().id === output))
               event.recipes.thermal.press(recipe.getOriginalRecipeResult().id, [ingredient, 'thermal:press_gear_die'])
          if (!immengPressed.some(output => recipe.getOriginalRecipeResult().id === output))
               event.recipes.immersiveengineering.metal_press(recipe.getOriginalRecipeResult().id, ingredient, 'immersiveengineering:mold_gear')
     })

     funcs.removeById(removed)
     funcs.box(preferredStack(`${main}:gears/wood`), `#${main}:rods/wooden`).vanilla()
     //event.remove({type: 'minecraft:crafting_shaped', output: `#${main}:gears`})
})

itemTags(event => {
     event.add(`${main}:gears/wood`, 'hammerlib:gears/wooden')
     event.add(`${main}:gears`, ['redstone_arsenal:flux_gear', 'thermalendergy:prismalium_gear', 'thermalendergy:melodium_gear', 'thermalendergy:stellarium_gear'])
})