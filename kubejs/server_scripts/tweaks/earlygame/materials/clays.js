recipes((event, funcs) => {
     event.replaceInput({input: 'minecraft:clay'}, 'minecraft:clay', '#forge:storage_blocks/clay')
     event.replaceInput({input: 'minecraft:clay_ball'}, 'minecraft:clay_ball', '#forge:clay')
     funcs.twoSquareAlt(funcs.removeByOutput(Item.of(content.mortar, 2)), [packTag('dusts/sand'), '#forge:clay']).vanilla()

     funcs.twoSquareAlt('2x minecraft:clay', ['#forge:sand', '#forge:storage_blocks/jelly']).vanilla()
     funcs.twoSquareAlt('2x minecraft:clay', ['#forge:sand', tag('wart_blocks')]).vanilla()
     funcs.twoSquareAlt('2x minecraft:clay', ['#forge:storage_blocks/silt', '#forge:storage_blocks/mud']).vanilla()
     funcs.twoSquareAlt('2x minecraft:clay_ball', ['#forge:silt', '#forge:mud']).vanilla()
     funcs.twoSquareAlt(content.packed_mortar, ['#forge:sand', '#forge:storage_blocks/clay']).vanilla()
     funcs.twoSquareAlt(content.packed_mortar, ['#forge:sand', '#forge:storage_blocks/clay']).vanilla()
     funcs.twoSquare('aether_redux:holysilt', content.holysilt_ball).vanilla()
     funcs.twoSquare('minecraft:mud', content.mud_ball).vanilla()
     funcs.twoSquare('deep_aether:aether_mud', content.aether_mud_ball).vanilla()
     funcs.twoSquare(content.ash_clay, content.ash_clay_ball).vanilla()
     funcs.twoSquare(content.packed_mortar, content.mortar).vanilla()
     funcs.twoSquare(content.packed_cement, content.cement_compound).vanilla()

     event.shapeless(Item.of(content.cement_compound).withCount(3), ['minecraft:gravel', '#forge:mortar', '#forge:mortar', 'aether:ambrosium_shard'])
     event.shapeless(Item.of(content.cement_compound).withCount(3), ['minecraft:gravel', '#forge:mortar', '#forge:mortar', '#forge:raw_materials/iron'])
})

ServerEvents.tags('item', event => {
     event.remove('forge:clay', 'minecraft:clay')
     addEntriesRespectively(event, [
          ['forge:mortar', 'primalstage:sandy_clay_compound'],
          ['forge:clay', content.ash_clay_ball],
          ['forge:mud', content.mud_ball],
          ['forge:silt', ['twigs:silt_ball', content.holysilt_ball]]
     ])
})

ServerEvents.tags('block', event => {
     var primitives = ['#forge:storage_blocks/jelly', '#forge:storage_blocks/clay', '#forge:storage_blocks/silt', '#forge:storage_blocks/mortar', '#forge:storage_blocks/cement', '#forge:storage_blocks/mud', '#forge:storage_blocks/mud']
     event.add('minecraft:mineable/shovel', [content.packed_ash, content.ash_clay])
     event.add('notreepunching:always_drops', primitives)
     event.add('notreepunching:always_breaks', primitives)
})

commonTags((event, funcs) => {
     event.add('forge:storage_blocks/jelly', ['aether_redux:jellyshroom_jelly_block', 'betterend:jellyshroom_cap_purple', 'betterend:umbrella_tree_membrane', 'edenring:volvox_block'])
     event.add('forge:storage_blocks/clay', [content.ash_clay, 'minecraft:clay'])
     event.add('forge:storage_blocks/silt', ['twigs:silt', 'aether_redux:holysilt'])
     event.add('forge:storage_blocks/cement', [content.packed_cement])
     event.add('forge:storage_blocks/mortar', [content.packed_mortar])
     event.add('forge:storage_blocks/mud', ['minecraft:mud', 'deep_aether:aether_mud'])
})

lootTables((event, funcs) => {
     event.addBlockLootModifier(content.ash_clay).removeLoot(Ingredient.all).addAlternativesLoot(
          LootEntry.ofJson(
               ltItemEntry(content.ash_clay, [ofConditions(conditionSilkTouch()), condSurvivesExplosion()])
          ),
          LootEntry.ofJson(childAlternativesPool([
               ltItemEntry(preferredItemId('forge:dusts/niter'), ofFuncConds(
                    conditionTableBonus([0.125, 0.25, 0.5, 1.0], "minecraft:fortune"), 
                    setCount(countUniform(1, 2), false)
               )),
               ltItemEntry(content.ash_clay, ofFuncConds(
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

     clayLike('aether_redux:holysilt', content.holysilt_ball)
     clayLike('minecraft:mud', content.mud_ball)
     clayLike('deep_aether:aether_mud', content.aether_mud_ball)
     clayLike(content.packed_mortar, 'primalstage:sandy_clay_compound')
     clayLike(content.packed_cement, content.cement_compound)
})