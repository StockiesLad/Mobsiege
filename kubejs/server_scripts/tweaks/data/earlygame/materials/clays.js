recipes((event, funcs) => {
     event.replaceInput({input: 'minecraft:clay'}, 'minecraft:clay', funcs.def('|clay_blocks'))
     event.replaceInput({input: 'minecraft:clay_ball'}, 'minecraft:clay_ball', '#forge:clay')

     funcs.twoSquareAlt('2x minecraft:clay', ['#forge:sand', funcs.def('|jelly_blocks')])
     funcs.twoSquareAlt('2x minecraft:clay', ['#forge:sand', funcs.def('wart_blocks')])
     funcs.twoSquareAlt('2x minecraft:clay', [funcs.def('|silt_blocks'), funcs.def('|mud_blocks')])
     funcs.twoSquareAlt('2x minecraft:clay_ball', ['#forge:silt', '#forge:mud'])
     funcs.twoSquareAlt(custom.packed_mortar, ['#forge:sand', funcs.def('|clay_blocks')])
     funcs.twoSquareAlt(custom.packed_mortar, ['#forge:sand', funcs.def('|clay_blocks')])
     funcs.twoSquare('aether_redux:holysilt', custom.holysilt_ball)
     funcs.twoSquare('minecraft:mud', custom.mud_ball)
     funcs.twoSquare('deep_aether:aether_mud', custom.aether_mud_ball)
     funcs.twoSquare(custom.ash_clay, custom.ash_clay_ball)
     funcs.twoSquare(custom.packed_mortar, 'primalstage:sandy_clay_compound')
     funcs.twoSquare(custom.packed_cement, custom.cement_compound)

     event.shapeless(Item.of(custom.cement_compound).withCount(3), ['minecraft:gravel', '#forge:mortar', '#forge:mortar', '#forge:raw_materials/iron'])
})

itemTags((event, funcs) => {
     funcs.unifiedAdd([
          ['forge:mortar', 'primalstage:sandy_clay_compound'],
          ['forge:clay', custom.ash_clay_ball],
          ['forge:mud', custom.mud_ball],
          ['forge:silt', ['twigs:silt_ball', custom.holysilt_ball]],
          ['|mud_blocks', ['minecraft:mud', 'deep_aether:aether_mud']],
          ['|silt_blocks', ['aether_redux:holysilt', 'twigs:silt']],
          ['|clay_blocks', [custom.ash_clay, 'minecraft:clay']],
          ['|jelly_blocks', [
              'aether_redux:jellyshroom_jelly_block', 
              'betterend:jellyshroom_cap_purple', 
              'betterend:umbrella_tree_membrane', 
              'edenring:volvox_block'
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

     clayLike('aether_redux:holysilt', custom.holysilt_ball)
     clayLike('minecraft:mud', custom.mud_ball)
     clayLike('deep_aether:aether_mud', custom.aether_mud_ball)
     clayLike(custom.packed_mortar, 'primalstage:sandy_clay_compound')
     clayLike(custom.packed_cement, custom.cement_compound)
})