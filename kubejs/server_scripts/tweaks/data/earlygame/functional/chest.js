recipes((event, funcs) => {
     event.remove({input: '#aether:planks_crafting', output: 'minecraft:chest'})
     funcs.replaceTagRecipes({type: 'minecraft:crafting_shaped', output: '#forge:chests/wooden'}, (result, ingredients) => {
          result = Item.of(result)
          var outter = Item.of(ingredients[0])
          var inner = ingredients[1]

          if (result.is('minecraft:chest'))
               outter = packTag('non_aether_planks')
          else if (result.is('aether_genesis:skyroot_chest'))
               outter = packTag('aether_planks')

          if (inner != null && outter != inner)
               funcs.planet(result, inner, outter)
          else {
               funcs.toolDamagingInsert(result.withCount(2), [['#forge:tools/saws', 4], [outter, 4, 8]])
               funcs.toolDamagingInsert(result.withCount(1), [['#forge:tools/axes', 4], [outter, 4, 8]])
          }
     })

})