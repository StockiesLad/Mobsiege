const HashMap = Java.loadClass('java.util.HashMap')
const PrimalStageItems = Java.loadClass('com.nanokulon.primalstage.init.ModItems')

recipes((event, funcs) => {
     comfuncs.iterate([
          'oak',
          'dark_oak',
          'birch',
          'jungle',
          'acacia',
          'mangrove',
          'crimson',
          'warped'
     ], type => comfuncs.iterate([
          `primalstage:${type}_hedge`,
          `primalstage:${type}_bark`,
          `primalstage:${type}_lattice`,
          `primalstage:${type}_logs`,
          `primalstage:${type}_drying_rack`,
          `primalstage:${type}_shelf`
     ], funcs.removeAndHide))

     funcs.removeAndHide('primalstage:cutting_log')
     
     event.replaceInput({input: 'minecraft:spruce_planks', output: 'primalstage:spruce_drying_rack'}, 'minecraft:spruce_planks', 'decorative_blocks:lattice')
     funcs.replace({input: '#notreepunching:h/saws', output: 'minecraft:stick'}, result => {
          funcs.toolDamagingShapeless('2x ' + result, ['#minecraft:saws', '#minecraft:planks'])
          funcs.toolDamagingShapeless('8x ' + result, ['#minecraft:saws', '#minecraft:logs'])
     })
     funcs.replace({input: '#notreepunching:weak_saws', output: 'minecraft:stick'}, result => {
          funcs.toolDamagingShapeless(result, ['#minecraft:axes', '#minecraft:planks'])
          funcs.toolDamagingShapeless('6x ' + result, ['#minecraft:axes', '#minecraft:logs'])
     })
     funcs.replaceTagRecipes({type: 'minecraft:crafting_shapeless', input: ['#minecraft:logs', '#minecraft:axes'], output: '#minecraft:planks'}, (output, ingredients) => {
          funcs.toolDamagingShapeless(Item.of(output).withCount(1), [ingredients[0], '#minecraft:axes'])
          funcs.toolDamagingShapeless(Item.of(output).withCount(2), [ingredients[0], '#minecraft:saws'])
     })
     funcs.replaceTagRecipes({type: 'minecraft:crafting_shaped', input: '#aether:skyroot_repairing', output: 'aether:skyroot_stick'}, (output, ingredients) => {
          funcs.toolDamagingShapeless(Item.of(output).withCount(1), [ingredients[0], '#minecraft:axes'])
          funcs.toolDamagingShapeless(Item.of(output).withCount(2), [ingredients[0], '#minecraft:saws'])
          funcs.toolDamagingShapeless(Item.of(output).withCount(6), [funcs.def('|aether_logs'), '#minecraft:axes'])
          funcs.toolDamagingShapeless(Item.of(output).withCount(8), [funcs.def('|aether_logs'), '#minecraft:saws'])
     })
     funcs.replaceTagRecipes({type: 'minecraft:crafting_shaped', output: '#minecraft:wooden_slabs'}, (output, ingredients) => {
          if (!Item.of(ingredients[0]).hasTag('minecraft:logs')) {
               funcs.toolDamagingShapeless(Item.of(output).withCount(1), [ingredients[0], '#minecraft:axes'])
               funcs.toolDamagingShapeless(Item.of(output).withCount(2), [ingredients[0], '#minecraft:saws'])
          }
     })
     funcs.replaceTagRecipes({type: 'minecraft:crafting_shaped', output: '#minecraft:wooden_stairs'}, (output, ingredients) => {
          if (!Item.of(ingredients[0]).hasTag('minecraft:logs')) {
               funcs.toolDamagingShapeless(Item.of(output).withCount(1), [Item.of(ingredients[0]).withCount(2), '#minecraft:axes'])
               funcs.toolDamagingShapeless(Item.of(output).withCount(2), [Item.of(ingredients[0]).withCount(2), '#minecraft:saws'])
          }
     })

     funcs.planet(custom.log_stack, funcs.def('|primitive_string'), 'primalstage:spruce_logs')
     funcs.replaceOutputRecipe('primalstage:spruce_lattice', r => event.shapeless(r, Item.of('decorative_blocks:lattice').withCount(2))) 
     funcs.replaceOutputRecipe('primalstage:spruce_hedge', r => event.shapeless(r, ['decorative_blocks:lattice', 'primalstage:spruce_logs']))
     funcs.replaceOutputRecipe('2x decorative_blocks:lattice', r => funcs.toolDamagingShapeless(r, ['#minecraft:wooden_slabs', '#minecraft:axes']))
     funcs.replaceOutputRecipe('3x decorative_blocks:lattice', r => funcs.toolDamagingShapeless(r, ['#minecraft:wooden_slabs', '#minecraft:saws']))

})

blockTags((event, funcs) => {
     event.add('minecraft:needs_stone_tool', '#minecraft:logs')
     event.add('minecraft:planks', '#aether:planks_crafting')
})

commonTags((event, funcs) => {
     funcs.unifiedAdd([
          ['forge:stripped_logs', '#forge:logs/stripped'],
          ['|stacks', [comfuncs.packDef('charcoal_stacks'), comfuncs.packDef('log_stacks')]],
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
     event.add('forge:stripped_logs', event.get('minecraft:logs').getObjectIds().toArray().filter(log => log.toString().includes('stripped')))
     event.add(comfuncs.packDef('raw_logs'), event.get('minecraft:logs').getObjectIds().toArray().filter(log => !log.toString().includes('stripped')))
})

ServerEvents.tags('block', event => {
     
})

complexLootTables((event, funcs) => {
     event.addBlockLootModifier(custom.log_stack)
         .removeLoot(custom.log_stack)
         .addAlternativesLoot(
             LootEntry.of(custom.log_stack).when(c => c.customCondition(conditionSilkTouch())),
             LootEntry.of('primalstage:spruce_logs', 8)
         )
})

/*
ServerEvents.tags('worldgen/biome', event => {
     event.add('twigs:spawns_twig', '#')
})*/
PrimalStageItems.REGISTERED_BARKS = new HashMap()
//PrimalStageItems.REGISTERED_BARKS.put(comfuncs.packLocation('raw_logs'), PrimalStageItems.SPRUCE_BARK)

BlockEvents.rightClicked(event => {
     var item = event.getItem()
     var block = event.block
     var level = event.getLevel()
     var random = level.getRandom()
     var pos = block.getPos()
     if (item.hasTag('forge:tools/hammers') && block.hasTag('forge:stripped_logs')) {
          item.hurtAndBreak(1, event.getEntity(), (entity) => level.broadcastEntityEvent(entity, event.getHand().name() == 'MAIN_HAND' ? 47 : 48))
          if (random.nextInt(5) == 0) {
               level.destroyBlock(pos, false)
               Containers.dropItemStack(level, pos.getX(), pos.getY(), pos.getZ(), Item.of('primalstage:spruce_logs').withCount(2 + random.nextInt(3)))
          } else level.playSound(null, pos.getX(), pos.getY(), pos.getZ(), "minecraft:block.bamboo.hit", "blocks", 0.25, 0.5)
     } else if (item.hasTag('forge:tools/axes') && block.hasTag(comfuncs.packDef('raw_logs')))
          Containers.dropItemStack(level, pos.getX(), pos.getY(), pos.getZ(), Item.of('primalstage:spruce_bark').withCount(1 + random.nextInt(2)))
})