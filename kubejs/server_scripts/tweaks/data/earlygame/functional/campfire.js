recipes((event, funcs) => {
     funcs.removeAndHide('hardcore_torches:unlit_campfire')
     event.remove({output: 'minecraft:campfire'})

     funcs.vanillaInsert('minecraft:campfire', [
          ['#minecraft:torches/temp', [3, 5]],
          ['primalstage:primitive_grill', 4],  
          [packTag('coal/grade/high'), 1], 
          [custom.campfire_rock, 7],
          ['#minecraft:logs', [6, 8]] 
     ])

     funcs.vanillaInsert('minecraft:soul_campfire', [
          [packTag('soul_torches'), [3, 5]],
          ['primalstage:primitive_grill', 4],  
          ['minecraft:soul_soil', 1], 
          [custom.campfire_rock, 7],
          ['#minecraft:logs', [6, 8]] 
     ])

     funcs.replaceOutputRecipe('ancient_aether:ambrosium_campfire', r => funcs.vanillaInsert(r, [
          ['aether:ambrosium_torch', [3, 5]],
          ['primalstage:primitive_grill', 4],  
          ['aether:ambrosium_shard', 1], 
          [custom.campfire_rock, 7],
          ['#minecraft:logs', [6, 8]] 
     ]))
})

commonTags((event, funcs) => {
     event.add('forge:campfires', 'ancient_aether:ambrosium_campfire')
})

LootJS.modifiers(event => {
     event.addBlockLootModifier('minecraft:campfire').removeLoot('minecraft:charcoal')
          .addSequenceLoot(
               LootEntry.of('primalstage:primitive_grill').when(c => c.customCondition(conditionInverted(conditionSilkTouch()))),
               LootEntry.of('minecraft:charcoal').customFunction(countSet(countUniform(1, 2), false)).when(c => c.customCondition(conditionInverted(conditionSilkTouch()))),
               LootEntry.of('minecraft:stick').customFunction(countSet(countUniform(1, 3), false)).when(c => c.customCondition(conditionInverted(conditionSilkTouch())))
          )
     event.addBlockLootModifier('minecraft:soul_campfire').removeLoot('minecraft:soul_soil')
          .addSequenceLoot(
               LootEntry.of('primalstage:primitive_grill').when(c => c.customCondition(conditionInverted(conditionSilkTouch()))),
               LootEntry.of('minecraft:soul_sand').customFunction(countSet(countUniform(1, 2), false)).when(c => c.customCondition(conditionInverted(conditionSilkTouch()))),
               LootEntry.of('minecraft:stick').customFunction(countSet(countUniform(1, 3), false)).when(c => c.customCondition(conditionInverted(conditionSilkTouch())))
          )
})