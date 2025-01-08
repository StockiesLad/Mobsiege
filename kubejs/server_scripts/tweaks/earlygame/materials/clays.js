recipes((event, funcs) => {
     event.replaceInput({input: 'minecraft:clay'}, 'minecraft:clay', '#forge:storage_blocks/clay')
     event.replaceInput({input: 'minecraft:clay_ball'}, 'minecraft:clay_ball', '#forge:clay')
     funcs.twoSquareAlt(funcs.removeByOutput(Item.of(custom.mortar, 2)), [packTag('dusts/sand'), '#forge:clay']).vanilla()

     funcs.twoSquareAlt('2x minecraft:clay', ['#forge:sand', '#forge:storage_blocks/jelly']).vanilla()
     funcs.twoSquareAlt('2x minecraft:clay', ['#forge:sand', tag('wart_blocks')]).vanilla()
     funcs.twoSquareAlt('2x minecraft:clay', ['#forge:storage_blocks/silt', '#forge:storage_blocks/mud']).vanilla()
     funcs.twoSquareAlt('2x minecraft:clay_ball', ['#forge:silt', '#forge:mud']).vanilla()
     funcs.twoSquareAlt(custom.packed_mortar, ['#forge:sand', '#forge:storage_blocks/clay']).vanilla()
     funcs.twoSquareAlt(custom.packed_mortar, ['#forge:sand', '#forge:storage_blocks/clay']).vanilla()
     funcs.twoSquare('aether_redux:holysilt', custom.holysilt_ball).vanilla()
     funcs.twoSquare('minecraft:mud', custom.mud_ball).vanilla()
     funcs.twoSquare('deep_aether:aether_mud', custom.aether_mud_ball).vanilla()
     funcs.twoSquare(custom.ash_clay, custom.ash_clay_ball).vanilla()
     funcs.twoSquare(custom.packed_mortar, custom.mortar).vanilla()
     funcs.twoSquare(custom.packed_cement, custom.cement_compound).vanilla()

     event.shapeless(Item.of(custom.cement_compound).withCount(3), ['minecraft:gravel', '#forge:mortar', '#forge:mortar', 'aether:ambrosium_shard'])
     event.shapeless(Item.of(custom.cement_compound).withCount(3), ['minecraft:gravel', '#forge:mortar', '#forge:mortar', '#forge:raw_materials/iron'])
})

ServerEvents.tags('item', event => {
     addEntriesRespectively(event, [
          ['forge:mortar', 'primalstage:sandy_clay_compound'],
          ['forge:clay', custom.ash_clay_ball],
          ['forge:mud', custom.mud_ball],
          ['forge:silt', ['twigs:silt_ball', custom.holysilt_ball]]
     ])
})

ServerEvents.tags('block', event => {
     var primitives = ['#forge:storage_blocks/jelly', '#forge:storage_blocks/clay', '#forge:storage_blocks/silt', '#forge:storage_blocks/mortar', '#forge:storage_blocks/cement', '#forge:storage_blocks/mud', '#forge:storage_blocks/mud']
     event.add('minecraft:mineable/shovel', [custom.packed_ash, custom.ash_clay])
     event.add('notreepunching:always_drops', primitives)
     event.add('notreepunching:always_breaks', primitives)
})

commonTags((event, funcs) => {
     event.add('forge:storage_blocks/jelly', ['aether_redux:jellyshroom_jelly_block', 'betterend:jellyshroom_cap_purple', 'betterend:umbrella_tree_membrane', 'edenring:volvox_block'])
     event.add('forge:storage_blocks/clay', [custom.ash_clay, 'minecraft:clay'])
     event.add('forge:storage_blocks/silt', ['twigs:silt', 'aether_redux:holysilt'])
     event.add('forge:storage_blocks/cement', [custom.packed_cement])
     event.add('forge:storage_blocks/mortar', [custom.packed_mortar])
     event.add('forge:storage_blocks/mud', ['minecraft:mud', 'deep_aether:aether_mud'])
})

lootTables((event, funcs) => {
     event.addBlockLootModifier(custom.ash_clay).removeLoot(Ingredient.all).addAlternativesLoot(
          LootEntry.ofJson(
               ltItemEntry(custom.ash_clay, [ofConditions(conditionSilkTouch()), condSurvivesExplosion()])
          ),
          LootEntry.ofJson(childAlternativesPool([
               ltItemEntry(preferredItemId('forge:dusts/niter'), ofFuncConds(
                    conditionTableBonus([0.125, 0.25, 0.5, 1.0], "minecraft:fortune"), 
                    setCount(countUniform(1, 2), false)
               )),
               ltItemEntry(custom.ash_clay, ofFuncConds(
                    setCount(countConstant(4), false)
               ))
          ], {conditions: condSurvivesExplosion()}))
     )

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