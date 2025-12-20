recipes((event, funcs) => {
     function markerRecipe(result, additive) {
          funcs.replaceWithInsert(result, [
               ['minecraft:redstone_torch', 12],
               [`#${main}:dusts/glowstone`, [7, 11, 13, 17]],
               ['aether:ambrosium_shard', [6, 8, 16, 18]],
               [additive, [2, 10, 14, 22]]
          ]).mechanical()
     }

     markerRecipe('buildcraftcore:marker_volume', `#${main}:gems/lapis`)
     markerRecipe('buildcraftcore:marker_path', `#${main}:dyes/green`)
     markerRecipe('buildcraftbuilders:marker_construction', `#${main}:dusts/gold`)
})

