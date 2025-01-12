var planks = []
var hollow_logs = []
var quark_posts = []

recipes((event, funcs) => {
     event.remove({id: 'enderio:stick'}),
     event.remove({id: 'utilitarian:utility/logs_to_bowls'})

     common.alwaysArray([
          'oak',
          'dark_oak',
          'birch',
          'jungle',
          'acacia',
          'mangrove',
          'crimson',
          'warped'
     ]).forEach(type => common.alwaysArray([
          `primalstage:${type}_hedge`,
          `primalstage:${type}_bark`,
          `primalstage:${type}_lattice`,
          `primalstage:${type}_logs`,
          `primalstage:${type}_drying_rack`,
          `primalstage:${type}_shelf`
     ]).forEach(i => funcs.nuke(i)))

     funcs.nuke('primalstage:cutting_log')
     event.remove({input: '#notreepunching:h/saws', output: 'minecraft:stick'})
     event.remove({input: '#notreepunching:weak_saws', output: 'minecraft:stick'})
     event.remove({input: '#aether:skyroot_repairing', output: 'aether:skyroot_stick'})

     event.replaceInput({input: 'farmersdelight:tree_bark'}, 'farmersdelight:tree_bark', packTag('bark'))
     event.replaceInput({input: 'minecraft:stick'}, 'minecraft:stick', '#forge:rods/wooden')
     event.replaceInput({input: 'minecraft:spruce_planks', output: 'primalstage:spruce_drying_rack'}, 'minecraft:spruce_planks', 'decorative_blocks:lattice')
     funcs.planet(funcs.removeByOutput('carbonize:wood_stack'), packTag('primitive_string'), 'primalstage:spruce_logs').vanilla()

     funcs.removeRecipes({type: 'minecraft:crafting_shapeless', input: ['#minecraft:logs', '#forge:tools/axes'], output: '#minecraft:planks'}, (output, ingredients) => {
          funcs.toolDamagingShapeless(Item.of(output).withCount(1), [ingredients[0], '#forge:tools/axes'])
          funcs.toolDamagingShapeless(Item.of(output).withCount(2), [ingredients[0], '#forge:tools/saws'])
     })
     funcs.removeRecipes({type: 'minecraft:crafting_shaped', output: '#minecraft:wooden_slabs'}, (output, ingredients) => {
          if (!Item.of(ingredients[0]).hasTag('minecraft:logs')) {
               funcs.toolDamagingShapeless(Item.of(output).withCount(2), [ingredients[0], '#forge:tools/axes'])
               funcs.toolDamagingShapeless(Item.of(output).withCount(4), [ingredients[0], '#forge:tools/saws'])
          }
     })
     funcs.removeRecipes({type: 'minecraft:crafting_shaped', output: '#minecraft:wooden_stairs'}, (output, ingredients) => {
          if (!Item.of(ingredients[0]).hasTag('minecraft:logs')) {
               funcs.toolDamagingShapeless(Item.of(output).withCount(2), [Item.of(ingredients[0]).withCount(2), '#forge:tools/axes'])
               funcs.toolDamagingShapeless(Item.of(output).withCount(3), [Item.of(ingredients[0]).withCount(2), '#forge:tools/saws'])
          }
     })

     funcs.removeRecipes({input: '#minecraft:logs', output: '#minecraft:walls'}, (result, ingredients) => {
          var ingredient = ingredients[0]
          funcs.toolDamagingShapeless(Item.of(result, 1), ['#forge:tools/axes', ingredient, ingredient])
          funcs.toolDamagingShapeless(Item.of(result, 2), ['#forge:tools/saws', ingredient, ingredient])
     })

     funcs.removeRecipes({input: '#blockus:wooden_posts', output: '#minecraft:planks'}, (result, ingredients) => {
          var ingredient = ingredients[0]
          funcs.toolDamagingShapeless(Item.of(result, 1), ['#forge:tools/saws', ingredient])
     })

     quark_posts.forEach(post => {
          var type = post.split(':')[1].replace('stripped_', '').replace('_post', '')
          var matchingPlanks = filterBiasedly(planks, 'quark:ancient', type)
          funcs.toolDamagingShapeless(matchingPlanks, ['#forge:tools/saws', post])
     })

     hollow_logs.forEach(hollog => {
          var type = hollog.split(':')[1].replace('stripped_', '').replace('fallen_', '').replace('hollow_', '').replace('_log', '').replace('_stem', '').replace('_hyphae', '')
          type = type.replace('vangrove', 'mangrove') //Typo by twilight forest....
          var matchingPlanks = planks.find(plank => plank.includes(type))
          funcs.toolDamagingShapeless(matchingPlanks, ['#forge:tools/saws', hollog])
     })
     
     funcs.removeRecipes({input: '#minecraft:logs', output: '#minecraft:boats'})
     funcs.removeRecipes({input: '#minecraft:logs', output: '#minecraft:wooden_doors'})
     funcs.removeRecipes({input: '#minecraft:logs', output: '#minecraft:wooden_trapdoors'})
     funcs.removeRecipes({input: '#minecraft:logs', output: '#minecraft:wooden_pressure_plates'})

     event.shapeless(funcs.removeByOutput('primalstage:spruce_lattice'), Item.of('decorative_blocks:lattice').withCount(2))
     event.shapeless(funcs.removeByOutput('primalstage:spruce_hedge'), ['decorative_blocks:lattice', 'primalstage:spruce_logs'])
     funcs.toolDamagingShapeless(funcs.removeByOutput('2x decorative_blocks:lattice'), ['#minecraft:wooden_slabs', '#forge:tools/axes'])
     funcs.toolDamagingShapeless(funcs.removeByOutput('3x decorative_blocks:lattice'), ['#minecraft:wooden_slabs', '#forge:tools/saws'])

     funcs.toolDamagingShapeless('2x minecraft:stick', ['#forge:tools/axes', packTag('bark')])
     funcs.toolDamagingShapeless('3x minecraft:stick', ['#forge:tools/saws', packTag('bark')])
     funcs.toolDamagingShapeless('minecraft:stick', ['#blockus:wooden_posts', '#forge:tools/axes'])
     funcs.toolDamagingShapeless('minecraft:stick', ['#quark:posts', '#forge:tools/axes'])
     funcs.toolDamagingShapeless('minecraft:stick', [packTag('hollow_logs'), '#forge:tools/axes'])

     funcs.toolDamagingShapeless('1x minecraft:stick', [packTag('non_aether_planks'), '#forge:tools/axes'])
     funcs.toolDamagingShapeless('2x minecraft:stick', [packTag('non_aether_planks'), '#forge:tools/saws'])
     funcs.toolDamagingShapeless('4x minecraft:stick', [packTag('non_aether_logs'), '#forge:tools/axes'])
     funcs.toolDamagingShapeless('8x minecraft:stick', [packTag('non_aether_logs'), '#forge:tools/saws'])
     funcs.toolDamagingShapeless('1x aether:skyroot_stick', [packTag('aether_planks'), '#forge:tools/axes'])
     funcs.toolDamagingShapeless('2x aether:skyroot_stick', [packTag('aether_planks'), '#forge:tools/saws'])
     funcs.toolDamagingShapeless('4x aether:skyroot_stick', [packTag('aether_logs'), '#forge:tools/axes'])
     funcs.toolDamagingShapeless('8x aether:skyroot_stick', [packTag('aether_logs'), '#forge:tools/saws'])

     funcs.planet('primalstage:spruce_logs', packTag('primitive_string'), '#forge:rods/wooden').vanilla()

     hollow_logs = []
     planks = []
     quark_posts = []
})

//Fucking shitty mods can't tag their blocks properly
ServerEvents.tags('item', event => {
     event.add(pack('bark'), ['farmersdelight:tree_bark', 'primalstage:spruce_bark'])

     event.add('missingwilds:fallen_logs', ['missingwilds:fallen_birch_log', 'missingwilds:fallen_spruce_log', 'missingwilds:fallen_jungle_log', 'missingwilds:fallen_dark_oak_log', 'missingwilds:fallen_acacia_log',  'missingwilds:fallen_mangrove_log', 'missingwilds:fallen_crimson_stem', 'missingwilds:fallen_warped_stem', 'missingwilds:fallen_cherry_log'])

     event.add('twilightforest:hollow_logs', ['twilightforest:hollow_twilight_oak_log', 'twilightforest:hollow_canopy_log', 'twilightforest:hollow_mangrove_log', 'twilightforest:hollow_dark_log', 'twilightforest:hollow_time_log', 'twilightforest:hollow_transformation_log', 'twilightforest:hollow_mining_log', 'twilightforest:hollow_sorting_log', 'twilightforest:hollow_oak_log', 'twilightforest:hollow_spruce_log', 'twilightforest:hollow_birch_log', 'twilightforest:hollow_jungle_log', 'twilightforest:hollow_acacia_log', 'twilightforest:hollow_dark_oak_log', 'twilightforest:hollow_warped_stem', 'twilightforest:hollow_crimson_stem', 'twilightforest:hollow_vangrove_log', 'twilightforest:hollow_cherry_log'])

     event.add('blockus:wooden_posts', ['blockus:oak_post', 'blockus:stripped_oak_post', 'blockus:spruce_post', 'blockus:stripped_spruce_post', 'blockus:birch_post', 'blockus:stripped_birch_post', 'blockus:jungle_post', 'blockus:stripped_jungle_post', 'blockus:acacia_post', 'blockus:stripped_acacia_post', 'blockus:dark_oak_post', 'blockus:stripped_dark_oak_post', 'blockus:mangrove_post', 'blockus:stripped_mangrove_post', 'blockus:cherry_post', 'blockus:stripped_cherry_post', 'blockus:warped_post', 'blockus:stripped_warped_post', 'blockus:crimson_post', 'blockus:stripped_crimson_post', 'blockus:white_oak_post', 'blockus:stripped_white_oak_post', 'blockus:oak_post'])

     event.add('minecraft:walls', ['aether_redux:fieldsproot_wood_wall', 'aether_redux:stripped_fieldsproot_wood_wall', 'aether_redux:blightwillow_wood_wall', 'aether_redux:stripped_blightwillow_wood_wall', 'aether_redux:crystal_wood_wall', 'aether_redux:stripped_crystal_wood_wall', 'aether_redux:glacia_wood_wall', 'aether_redux:stripped_glacia_wood_wall'])

     event.add(pack('hollow_logs'), ['#missingwilds:fallen_logs', '#quark:hollow_logs', '#twilightforest:hollow_logs'])

     //This is truly the peak of human intelligence. Just break mod pack why dont ya
     event.add('minecraft:planks', getIdsOfTags(event, 'aether:planks_crafting'))

     planks = getIdsOfTags(event, 'minecraft:planks')
     hollow_logs = getIdsOfTags(event, pack('hollow_logs'))
     quark_posts = getIdsOfTags(event, 'quark:posts')

     var aether_planks = []
     var non_aether_planks = planks.filter(plank => {
          if (!plank.includes('aether')) return true
          aether_planks.push(plank)
          return false
     })

     event.add(pack('aether_planks'), aether_planks)
     event.add(pack('non_aether_planks'), non_aether_planks)
})

ServerEvents.tags('block', event => {
     event.add(pack('carbonize/extra_flammability'), ['#forge:chests/wooden', '#forge:workbench'])
     event.add('minecraft:needs_stone_tool', '#minecraft:logs')
     event.add('minecraft:planks', ['#aether:planks_crafting', '#c:planks_that_burn'])
     event.add('notreepunching:always_breaks', 'supplementaries:stick')
     event.add('notreepunching:always_drops', 'supplementaries:stick')
})

commonTags((event, funcs) => {
     //GOOD JOB LADS... GREAT JOB! YA CANT EVEN TAG YOUR LOGS
     event.add('minecraft:logs', funcs.getIdsOfTags('aether_genesis:log_walls').concat([
          'minecraft:bamboo_block',
          'minecraft:stripped_bamboo_block',
          'aether:golden_oak_log', 
          'aether:stripped_skyroot_log', 
          'aether:skyroot_log', 
          'aether_redux:glacia_log', 
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
     ]))

     var logs = funcs.getIdsOfTags('minecraft:logs')
     var stripped_logs = []
     var raw_logs = logs.filter(log => {
          if (!log.includes('stripped')) return true
          stripped_logs.push(log)
          return false;
     })

     var aether_logs = []
     var non_aether_logs = logs.filter(log => {
          if (!log.includes('aether')) return true
          aether_logs.push(log)
          return false
     })

     event.add(pack('aether_logs'),aether_logs)
     event.add(pack('non_aether_logs'), non_aether_logs)
     event.add('forge:stripped_logs', stripped_logs.concat(funcs.getIdsOfTags('forge:logs/stripped')))
     event.add(pack('raw_logs'), raw_logs)
})

LootJS.modifiers(event => {
     event.addBlockLootModifier('carbonize:wood_stack').removeLoot(Ingredient.all).addAlternativesLoot(
          LootEntry.of('carbonize:wood_stack').when(c => c.customCondition(conditionSilkTouch())),
          LootEntry.of('primalstage:spruce_logs', 8).when(c => c.customCondition(condSurvivesExplosion()))
     )
})

PrimalStageItems.REGISTERED_BARKS = new HashMap()

BlockEvents.rightClicked(event => {
     var item = event.getItem()
     var block = event.block
     var level = event.getLevel()
     var random = level.getRandom()
     var pos = block.getPos()
     if (item.hasTag('forge:tools/saws') && block.hasTag('forge:stripped_logs')) {
          item.hurtAndBreak(1, event.getEntity(), (entity) => level.broadcastEntityEvent(entity, event.getHand().name() == 'MAIN_HAND' ? 47 : 48))
          level.playSound(null, pos.getX(), pos.getY(), pos.getZ(), "minecraft:block.bamboo.hit", "blocks", 0.25, 0.5)
          if (random.nextInt(4) == 0) {
               level.destroyBlock(pos, false)
               Containers.dropItemStack(level, pos.getX(), pos.getY(), pos.getZ(), Item.of('primalstage:spruce_logs').withCount(2 + random.nextInt(3)))
          } 
     } else if (item.hasTag('forge:tools/axes') && block.hasTag(pack('raw_logs')))
          Containers.dropItemStack(level, pos.getX(), pos.getY(), pos.getZ(), Item.of('primalstage:spruce_bark').withCount(1 + random.nextInt(2)))
})