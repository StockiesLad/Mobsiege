recipes((event, funcs) => {
     var excepted = [
          'minecraft:brick',
          content.medium_grade_charcoal,
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

     funcs.replaceWithInsert('primalstage:primitive_grill', [
          [tags.stone_crafting, [0, 2, 6, 8]],
          ['primalstage:stone_pebble', [3, 5, 1, 7]],
          [content.stone_lattice, 4]
     ]).vanilla()
})