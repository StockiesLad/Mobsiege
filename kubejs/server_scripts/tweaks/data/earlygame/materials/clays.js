recipes((event, funcs) => {
     var generate = funcs.generate
     funcs.removeAll([
          {output: 'minecraft:brick', type: 'minecraft:campfire_cooking'},
          {output: 'minecraft:brick', type: 'enderio:alloy_smelting'},
          {output: 'notreepunching:clay_brick'},
          {input: 'notreepunching:clay_brick'},
          {output: 'twigs:silt_brick'},
          {output: 'supplementaries:ash_brick'}
     ])

     event.replaceInput({input: 'minecraft:clay'}, 'minecraft:clay', funcs.def('|clay_blocks'))

     event.replaceInput({output: 'primalstage:dark_oak_drying_rack'}, 'dark_oak_planks', '#minecraft:planks')
     
     funcs.insertAll(insertion => insertion.vanilla(), [
          generate('2x minecraft:clay', ['#forge:sand', funcs.def('|jelly_blocks')]).rollingSquare(1, 2),
          generate('2x minecraft:clay', ['#forge:sand', funcs.def('wart_blocks')]).rollingSquare(1, 2),
          generate('2x minecraft:clay', ['#forge:storage_blocks/silt', funcs.def('|mud')]).rollingSquare(1, 2),
          generate(custom.packed_mortar, ['#forge:sand', funcs.def('|clay_blocks')]).rollingSquare(1, 2),
          generate(custom.campfire_rock, ['#forge:ingots/brick', '#notreepunching:loose_rocks']).rollingSquare(1, 2),
          generate(custom.ash_clay, custom.ash_clay_ball).flatSquare(2),
          generate(custom.packed_mortar, 'primalstage:sandy_clay_compound').flatSquare(2),
          generate(custom.packed_cement, custom.cement_compound).flatSquare(2),
          generate(custom.fire_brick_block, custom.fire_brick).flatSquare(2),          
     ])

     event.shapeless(Item.of(custom.cement_compound).withCount(3), ['minecraft:gravel', '#forge:mortar', '#forge:mortar', '#forge:raw_materials/iron'])

     funcs.globalPrimitiveDrying(custom.dry_clay_brick, 'notreepunching:clay_brick')
     funcs.globalPrimitiveDrying(custom.dry_ash_clay_brick, custom.wet_ash_clay_brick)
     funcs.globalPrimitiveDrying(custom.dry_silt_brick, custom.wet_silt_brick)
     funcs.globalPrimitiveDrying(custom.dry_mortar_brick, custom.wet_mortar_brick)
     funcs.globalPrimitiveDrying(custom.dry_cement_brick, custom.wet_cement_brick)

     funcs.globalPrimitiveCooking('minecraft:brick', custom.dry_clay_brick, 0.1)
     funcs.globalPrimitiveCooking('supplementaries:ash_brick', custom.dry_ash_clay_brick, 0.1)
     funcs.globalPrimitiveCooking('twigs:silt_brick', custom.dry_silt_brick, 0.1)

     funcs.globalCooking('primalstage:kiln_brick', custom.dry_mortar_brick, 0.2)

     funcs.kilnSmelting(custom.fire_brick, custom.dry_cement_brick)
     funcs.globalSmelting(custom.fire_brick, custom.dry_cement_brick, 0.3)
     
     /*event.campfireCooking('primalstage:kiln_brick', 'primalstage:sandy_clay_compound').xp(0.05)
     event.smelting('primalstage:kiln_brick', 'primalstage:sandy_clay_compound').xp(0.05)
     event.blasting('primalstage:kiln_brick', 'primalstage:sandy_clay_compound').xp(0.05)
     event.campfireCooking(custom.fire_brick, custom.cement_compound).xp(0.05)
     event.smelting(custom.fire_brick,custom.cement_compound).xp(0.05)
     event.blasting(custom.fire_brick, custom.cement_compound).xp(0.05)*/
})

itemTags((event, funcs) => {
     funcs.unifiedAdd([
          ['forge:mortar', ['primalstage:sandy_clay_compound']],
          ['forge:clay', [custom.ash_clay_ball]],
          ['|mud', ['minecraft:mud', 'deep_aether:aether_mud']],
          ['|silt', ['aether_redux:holysilt', 'twigs:silt']],
          ['|clay_blocks', [custom.ash_clay, 'minecraft:clay']],
          ['forge:ingots/brick', ['twigs:silt_brick', 'primalstage:kiln_brick', custom.fire_brick, 'minecraft:nether_brick']],
          ['|jelly_blocks', [
              'aether_redux:jellyshroom_jelly_block', 
              'betterend:jellyshroom_cap_purple', 
              'betterend:umbrella_tree_membrane', 
              'edenring:volvox_block'
          ]],
          ['supplementaries:throwable_bricks', [
               'notreepunching:clay_brick',
               custom.wet_ash_clay_brick,
               custom.dry_ash_clay_brick,
               custom.wet_silt_brick,
               custom.dry_silt_brick,
               'mobsiege:dry_clay_brick',
               'mobsiege:wet_mortar_brick',
               'mobsiege:dry_mortar_brick',
               'primalstage:kiln_brick',
               'mobsiege:wet_cement_brick',
               'mobsiege:dry_cement_brick',
               'mobsiege:fire_brick'
          ]]
     ])
})

commonTags((event, funcs) => {
     event.add('forge:storage_blocks/silt', ['twigs:silt', 'aether_redux:holysilt'])
     event.add('forge:storage_blocks/mortar', [custom.packed_mortar])
})

blockTags((event, funcs) => {
     event.add('minecraft:mineable/shovel', [custom.packed_ash, custom.ash_clay])
})

basicLootTables((event, funcs) => {
     funcs.raw('block', custom.ash_clay, {
          pools: [
               alternativesPool([
                    ofChild(custom.ash_clay, ofConditions(conditionSilkTouch())),
                    childAlternativesPool([
                         ofChild(funcs.preferredItem('forge:dusts/niter'), ofFuncConds(
                              conditionTableBonus([0.125, 0.25, 0.5, 1.0], "minecraft:fortune"), 
                              countSet(countUniform(1, 2), false)
                         )),
                         ofChild(custom.ash_clay_ball, ofFunctions(
                              countSet(countConstant(4), false)
                         ))
                    ])
               ], ofConditions(survivesExplosion()))
          ]
     })
          
})

LootJS.modifiers(event => {
     var clayLike = (block, item) => {
          event.addBlockLootModifier(block).removeLoot(block)
          .addAlternativesLoot(
               LootEntry.of(block).when(c => c.customCondition(conditionSilkTouch())),
               LootEntry.of(block).when(c => c.customCondition(conditionMatchTool('minecraft:trowels'))),
               LootEntry.of(Item.of(item, 4))
          )
     }

     clayLike(custom.packed_mortar, 'primalstage:sandy_clay_compound')
     clayLike(custom.packed_cement, custom.cement_compound)
})

addBrickDrop('minecraft:clay', 'notreepunching:clay_brick')
addBrickDrop(custom.ash_clay, custom.wet_ash_clay_brick)
addTagBrickDrop('forge:storage_blocks/silt', custom.wet_silt_brick)
addTagBrickDrop('forge:storage_blocks/mortar', custom.wet_mortar_brick)
addBrickDrop(custom.packed_cement, custom.wet_cement_brick)

function addBrickDrop(block, brick) {
     BlockEvents.rightClicked(block, event => {
          var item = event.getItem()
          if (item.hasTag('minecraft:shovels')) {
               var level = event.getLevel()
               var random = level.getRandom()
               var block = event.block
               var pos = block.getPos()
               item.hurtAndBreak(1, event.getEntity(), (entity) => level.broadcastEntityEvent(entity, event.getHand().name() == 'MAIN_HAND' ? 47 : 48))
               if (random.nextInt(5) == 0) {
                    level.destroyBlock(pos, false)
                    Containers.dropItemStack(level, pos.getX(), pos.getY(), pos.getZ(), Item.of(brick).withCount(4 + random.nextInt(4)));
               } else level.playSound(null, pos.getX(), pos.getY(), pos.getZ(), "minecraft:block.gravel.hit", "blocks", 0.25, 0.5)
          }
     })
}

function addTagBrickDrop(tag, brick) {
     BlockEvents.rightClicked(event => {
          var item = event.getItem()
          var block = event.block
          if (block.hasTag(tag) && item.hasTag('minecraft:shovels')) {
               var level = event.getLevel()
               var random = level.getRandom()
               var pos = block.getPos()
               item.hurtAndBreak(1, event.getEntity(), (entity) => level.broadcastEntityEvent(entity, event.getHand().name() == 'MAIN_HAND' ? 47 : 48))
               if (random.nextInt(4) == 0) {
                    level.destroyBlock(pos, false)
                    Containers.dropItemStack(level, pos.getX(), pos.getY(), pos.getZ(), Item.of(brick).withCount(4 + random.nextInt(4)));
               } else level.playSound(null, pos.getX(), pos.getY(), pos.getZ(), "minecraft:block.gravel.hit", "blocks", 0.25, 0.5)
          }
     })
}





