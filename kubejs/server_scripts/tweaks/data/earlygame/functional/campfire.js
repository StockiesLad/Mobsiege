recipes((event, funcs) => {
     funcs.vanillaInsert('minecraft:campfire', [
          ['#minecraft:torches/temp', [3, 5]],
          ['primalstage:primitive_grill', 4],  
          ['#forge:coal/high_grade', 1], 
          [custom.campfire_rock, 7],
          ['#minecraft:logs', [6, 8]] 
     ])

     funcs.vanillaInsert('minecraft:soul_campfire', [
          ['#minecraft:torches/temp', [3, 5]],
          ['primalstage:primitive_grill', 4],  
          ['#minecraft:soul_fire_base_blocks', 1], 
          [custom.campfire_rock, 7],
          ['#minecraft:logs', [6, 8]] 
     ])
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