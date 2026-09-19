recipes((event, funcs) => {
     event.remove({input: '#aether:planks_crafting', output: 'minecraft:chest'})
     funcs.removeRecipes({type: 'minecraft:crafting_shaped', output: dataTag + 'chests/wooden'}, (result, ingredients) => {
          var outter = ingredients[0].withCount(1)
          var inner = ingredients[1].asStack().withCount(1)

          if (result.is('minecraft:chest'))
               outter = tags.non_aether_planks
          else if (result.is('aether_genesis:skyroot_chest'))
               outter = tags.aether_planks
          if (inner != null && outter != inner)
               funcs.planet(result, inner, outter).vanilla()
          else {
               funcs.toolDamagingInsert(result.withCount(2), [[dataTag + 'tools/saws', 4], [outter, 4, 8]])
               funcs.toolDamagingInsert(result.withCount(1), [[dataTag + 'tools/axes', 4], [outter, 4, 8]])
          }
     })

})