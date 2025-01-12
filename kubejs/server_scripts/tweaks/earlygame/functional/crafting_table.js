recipes((event, funcs) => {
     funcs.removeById('ancient_aether:skyroot_crafting_table_from_ancient_aether_planks')
          .removeById('deep_aether:skyroot_crafting_table')

     event.replaceInput({input: 'minecraft:crafting_table'}, 'minecraft:crafting_table', '#forge:workbenches')
     funcs.removeRecipes({type: 'minecraft:crafting_shaped', output: '#forge:workbenches'}, (result, ingredients) => {
          result = Item.of(result)
          var ingredient = ingredients[0]
          if (result.is('tconstruct:crafting_station')) return //Do this at crafting_station.js
          if (result.is('minecraft:chest'))
               ingredient = packTag('non_aether_planks')
          else if (result.is('aether_genesis:skyroot_crafting_table'))
               ingredient = packTag('aether_planks')

          funcs.toolDamagingInsert(result, [['decorative_blocks:lattice', [0, 1]], [ingredient, 2], ['#minecraft:axes', 3]])
     })

     event.shapeless('minecraft:crafting_table', '#forge:workbenches')
})

commonTags(event => {
     event.add('forge:workbenches', [
          '#blue_skies:crafting_tables',
          'aether_genesis:skyroot_crafting_table',
          'biomeswevegone:aspen_crafting_table',
          'biomeswevegone:baobab_crafting_table',
          'biomeswevegone:blue_enchanted_crafting_table',
          'biomeswevegone:cika_crafting_table',
          'biomeswevegone:cypress_crafting_table',
          'biomeswevegone:ebony_crafting_table',
          'biomeswevegone:fir_crafting_table',
          'biomeswevegone:florus_crafting_table',
          'biomeswevegone:green_enchanted_crafting_table',
          'biomeswevegone:holly_crafting_table',
          'biomeswevegone:ironwood_crafting_table',
          'biomeswevegone:mahogany_crafting_table',
          'biomeswevegone:maple_crafting_table',
          'biomeswevegone:jacaranda_crafting_table',
          'biomeswevegone:palm_crafting_table',
          'biomeswevegone:pine_crafting_table',
          'biomeswevegone:rainbow_eucalyptus_crafting_table',
          'biomeswevegone:redwood_crafting_table',
          'biomeswevegone:sakura_crafting_table',
          'biomeswevegone:zelkova_crafting_table',
          'biomeswevegone:witch_hazel_crafting_table',
          'biomeswevegone:willow_crafting_table',
          'biomeswevegone:white_mangrove_crafting_table',
          'biomeswevegone:skyris_crafting_table',
          'minecraft:crafting_table'
     ])
})