recipes((event, funcs) => {
     var excempted = [
          'minecraft:brick',
          'minecraft:charcoal',
          'minecraft:flower_pot',
          'notreepunching:ceramic_small_vessel',
          'notreepunching:ceramic_large_vessel',
          'notreepunching:ceramic_bucket'
     ]

     event.remove({type: 'primalstage:grill'})
     event.forEachRecipe({type: 'minecraft:campfire_cooking'}, recipe => {
          var result = recipe.originalRecipeResult.toItemString().replace('\'', '')
          if (!excempted.some(exempt => exempt == result)) {
               excempted.push(result)
               funcs.grilling(result, Item.of(recipe.originalRecipeIngredients[0]).toItemString().replace('\'', ''))
          }
     })
})