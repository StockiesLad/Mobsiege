recipes((event, funcs) => {
     var types = [
          null,
          'smooth',
          'cut'
     ]

     types.forEach(type => {
          var bSandstone = type != null ? `blockus:${type}_soul_sandstone` : `blockus:soul_sandstone`
          var nSandstone = type != null ? `betternether:soul_sandstone_${type}` :  `betternether:soul_sandstone`

          if (type != null)
               funcs.globallyReplaceInput(bSandstone, nSandstone)
          funcs.nuke(bSandstone)
          if (type != 'cut') {
               funcs.globallyReplaceInput(`${bSandstone}_stairs`, `${nSandstone}_stairs`)
               funcs.nuke(`${bSandstone}_stairs`)
          }
          funcs.globallyReplaceInput(`${bSandstone}_slab`, `${nSandstone}_slab`)
          funcs.nuke(`${bSandstone}_slab`)
     })

     funcs.twoSquare('4x blockus:soul_sandstone_bricks', 'betternether:soul_sandstone_cut').vanilla()
     funcs.twoSquare('4x blockus:small_soul_sandstone_bricks', 'blockus:soul_sandstone_bricks').vanilla()
     
})