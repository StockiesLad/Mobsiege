recipes((event, funcs) => {
     funcs.replace({input: '#notreepunching:h/saws', output: 'minecraft:stick'}, result => {
          funcs.toolDamagingShapeless('2x ' + result, ['#minecraft:saws', '#minecraft:planks'])
          funcs.toolDamagingShapeless('8x ' + result, ['#minecraft:saws', '#minecraft:logs'])
     })
     funcs.replace({input: '#notreepunching:weak_saws', output: 'minecraft:stick'}, result => {
          funcs.toolDamagingShapeless(result, ['#minecraft:axes', '#minecraft:planks'])
          funcs.toolDamagingShapeless('6x ' + result, ['#minecraft:axes', '#minecraft:logs'])
     })
     funcs.replaceTagRecipes({type: 'minecraft:crafting_shapeless', input: ['#minecraft:logs', '#minecraft:axes'], output: '#minecraft:planks'}, (output, ingredients) => {
          funcs.toolDamagingShapeless(Item.of(output).withCount(3), [ingredients[0], '#minecraft:axes'])
          funcs.toolDamagingShapeless(Item.of(output).withCount(4), [ingredients[0], '#minecraft:saws'])
     })
     funcs.replaceTagRecipes({type: 'minecraft:crafting_shaped', input: '#aether:skyroot_repairing', output: 'aether:skyroot_stick'}, (output, ingredients) => {
          funcs.toolDamagingShapeless(Item.of(output).withCount(1), [ingredients[0], '#minecraft:axes'])
          funcs.toolDamagingShapeless(Item.of(output).withCount(2), [ingredients[0], '#minecraft:saws'])
          funcs.toolDamagingShapeless(Item.of(output).withCount(6), [funcs.def('|aether_logs'), '#minecraft:axes'])
          funcs.toolDamagingShapeless(Item.of(output).withCount(8), [funcs.def('|aether_logs'), '#minecraft:saws'])
     })

     event.shapeless('minecraft:stick', '#minecraft:saplings')
     funcs.vanillaInsert('2x minecraft:stick', [[funcs.def('|vines'), [0, 2]]])
     funcs.vanillaInsert('2x aether:skyroot_stick', [[funcs.def('|aether_vines'), [0, 2]]])
})

itemTags((event, funcs) => {
     funcs.unifiedAdd([
          ['|aether_vines', [
               'aether_redux:corrupted_vines',
               'aether_redux:golden_vines',
               'aether_redux:gilded_vines',
               'deep_aether:yagroot_vine'
          ]],
          ['|vines', [
          funcs.def('|aether_vines'),
               'betterend:bulb_vine',
               'betterend:jungle_vine',
               'betterend:twisted_vine',
               'betterend:dense_vine',
               'betternether:neon_equisetum',
               'betternether:blooming_vine',
               'betternether:golden_vine',
               'betternether:black_vine',
               'edenring:eden_vine',
               'minecraft:weeping_vines',
               'minecraft:twisting_vines',
               'minecraft:vine'
          ]]
     ])
})

blockTags((event, funcs) => {
     event.add('minecraft:needs_stone_tool', '#minecraft:logs')
     event.add('minecraft:planks', '#aether:planks_crafting')
})

commonTags((event, funcs) => {
     funcs.unifiedAdd([
          ['|aether_logs', [
               'aether:golden_oak_log', 
               'aether:stripped_skyroot_log', 
               'aether:skyroot_log', 
               'aether_redux:glacia_log', 
               'aether_redux:cloudcap_planks', 
               'aether_redux:jellyshroom_planks',
               'aether_redux:cloudcap_stem', 
               'aether_redux:stripped_cloudcap_stem', 
               'aether_redux:jellyshroom_stem', 
               'aether_redux:jellyshroom_hyphae', 
               'aether_redux:crystal_log', 
               'aether_redux:stripped_cloudcap_hyphae', 
               'aether_redux:cloudcap_hyphae', 
               'aether_redux:stripped_fieldsproot_log', 
               'aether_redux:sporing_blightwillow_log', 
               'aether_redux:blightwillow_log', 
               'aether_redux:stripped_glacia_log', 
               'aether_redux:stripped_blightwillow_log', 
               'aether_redux:stripped_crystal_log', 
               'aether_redux:fieldsproot_log',
               'deep_aether:cruderoot_log', 
               'deep_aether:conberry_log', 
               'deep_aether:stripped_conberry_log', 
               'deep_aether:stripped_roseroot_log', 
               'deep_aether:yagroot_log', 
               'deep_aether:sunroot_log', 
               'deep_aether:stripped_yagroot_log', 
               'deep_aether:stripped_sunroot_log', 
               'deep_aether:roseroot_log', 
               'deep_aether:stripped_cruderoot_log'
          ]],
          ['logs', [
               funcs.def('|aether_logs'),
               'minecraft:bamboo_block',
               'minecraft:stripped_bamboo_block'
           ]],
     ])
})