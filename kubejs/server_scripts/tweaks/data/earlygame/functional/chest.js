recipes((event, funcs) => {
     event.remove({input: '#aether:planks_crafting', output: 'minecraft:chest'})
     funcs.replaceTagRecipes({type: 'minecraft:crafting_shaped', output: '#forge:chests/wooden'}, (output, ingredients) => {
          var outter = ingredients[0]
          var inner = ingredients[1]

          if (inner != null && outter != inner)
               funcs.planet(output, inner, outter)
          else {
               funcs.toolDamagingInsert(output.withCount(2), [[outter, [0, 1, 2, 3, 5, 6, 7, 8]], ['#forge:tools/saws', 4]])
               funcs.toolDamagingInsert(output.withCount(1), [[outter, [0, 1, 2, 3, 5, 6, 7, 8]], ['#forge:tools/axes', 4]])
          }
     })

})