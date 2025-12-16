recipes((event, funcs) => {
     funcs.threeSquare('2x minecraft:gravel', dataTag + 'regolith').vanilla()
})

commonTags(event => {
     event.add(data + 'regolith', [
          'unearthed:phyllite_regolith',
          'unearthed:slate_regolith',
          'unearthed:gabbro_regolith',
          'unearthed:granodiorite_regolith',
          'unearthed:rhyolite_regolith',
          'unearthed:white_granite_regolith',
          'unearthed:limestone_regolith',
          'unearthed:beige_limestone_regolith',
          'unearthed:grey_limestone_regolith',
          'unearthed:siltstone_regolith',
          'unearthed:mudstone_regolith',
          'unearthed:conglomerate_regolith',
          'unearthed:sandstone_regolith',
          'unearthed:stone_regolith',
          'unearthed:regolith'
     ])
})