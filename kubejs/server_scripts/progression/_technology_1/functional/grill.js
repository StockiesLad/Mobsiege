recipes((event, funcs) => {
     var excepted = [
          'minecraft:brick',
          'minecraft:charcoal',
          'minecraft:flower_pot',
          'notreepunching:ceramic_small_vessel',
          'notreepunching:ceramic_large_vessel',
          'notreepunching:ceramic_bucket'
     ]

     event.remove({type: 'primalstage:grill'})
     event.forEachRecipe({type: 'minecraft:campfire_cooking'}, recipe => {
          var result = recipe.originalRecipeResult
          if (!excepted.some(exempt => exempt == result)) {
               excepted.push(result)
               funcs.grilling(result, recipe.originalRecipeIngredients[0])
          }
     })

     event.replaceInput({output: 'primalstage:grill'}, 'minecraft:cobblestone', '#minecraft:stone_crafting_materials')
})