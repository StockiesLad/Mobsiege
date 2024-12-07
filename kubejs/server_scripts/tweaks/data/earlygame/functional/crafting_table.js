recipes((event, funcs) => {
     funcs.removeAll([
          {id: 'ancient_aether:skyroot_crafting_table_from_ancient_aether_planks'},
          {id: 'deep_aether:skyroot_crafting_table'},
     ])

     event.replaceInput({input: 'minecraft:crafting_table'}, 'minecraft:crafting_table', '#forge:workbench')
     funcs.replaceTagRecipes({type: 'minecraft:crafting_shaped', output: '#forge:workbench'}, (output, ingredients) => {
          funcs.toolDamagingInsert(output, [['decorative_blocks:lattice', [0, 1]], [ingredients[0], 2], ['#minecraft:axes', 3]])
          //funcs.toolDamagingShapeless(output, [ingredients[0], ingredients[0], '#minecraft:axes'])
          //funcs.toolDamagingShapeless(output, [ingredients[0], '#minecraft:saws'])
     })

     event.shapeless('minecraft:crafting_table', '#forge:workbench')
})

commonTags((event, funcs) => {
     event.add('forge:workbench', [
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