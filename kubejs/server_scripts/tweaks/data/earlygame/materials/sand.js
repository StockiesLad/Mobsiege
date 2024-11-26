recipes((event, funcs) => {
     event.shapeless('4x primalstage:sand_dust', '#forge:sand')
     funcs.generate('minecraft:sand', 'primalstage:sand_dust').flatSquare(2).next().vanilla()
     event.blasting('ae2:silicon', 'primalstage:sand_dust').xp(0.05) // Needs to be super hot
})

commonTags((event, funcs) => {
     event.add('forge:sand', [
          'aether:quicksoil', 
          'betterend:endstone_dust', 
          'carbonize:ash_block', 
          'minecraft:soul_sand', 
          'betterend:charcoal_block'
     ])
})