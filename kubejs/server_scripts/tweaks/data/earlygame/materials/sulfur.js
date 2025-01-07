ServerEvents.tags('item', event => {
     event.add('forge:dusts/sulfur', '#forge:sulfurs')
})

commonTags((event, funcs) => {
     //event.add('forge:storage_blocks/sulfur', 'cinderscapes:sulfur_block')
     event.add('forge:storage_blocks/sulfur', [
          'cinderscapes:sulfur_block', 
          'alexscaves:sulfur'
      ])
})

/*

basicLootTables((event, funcs) => {
     funcs.replaceBasiclt(funcs.createBasicLt(
          () => preferredItemId('forge:gems/sulfur'), 
          [funcFortune(formulaUniformBonus(1)), funcExplosionDecay()], 
          [
              funcs.blockEntry({functions: countSet(countUniform(3, 4), false)}, 'alexscaves:sulfur_cluster'),
              funcs.blockEntry({functions: countSet(countUniform(2, 3), false)}, 'alexscaves:sulfur_bud_large'),
              funcs.blockEntry({functions: countSet(countUniform(1, 2), false)}, 'alexscaves:sulfur_bud_medium'),
              funcs.blockEntry({functions: countSet(countUniform(0, 1), false)}, 'alexscaves:sulfur_bud_small'),
              funcs.blockEntry({functions: countSet(countUniform(0, 1), false)}, 'betterend:sulphur_crystal')
          ]
     ))
})*/

lootTables((event, funcs) => {
     function crystalDrop(block, min, max) {
          event.addBlockLootModifier(block).removeLoot(Ingredient.all).addAlternativesLoot(
               LootEntry.of(block).when(c => c.customCondition(conditionSilkTouch())),
               LootEntry.of(preferredStack('forge:gems/sulfur')).customFunction(funcFortune(formulaUniformBonus(1))).customFunction(funcExplosionDecay())
               .customFunction(setCount(countUniform(min, max), false))
          )
     }

     crystalDrop('alexscaves:sulfur_cluster', 3, 4),
     crystalDrop('alexscaves:sulfur_bud_large', 2, 3),
     crystalDrop('alexscaves:sulfur_bud_medium', 1, 2),
     crystalDrop('alexscaves:sulfur_bud_small', 0, 1),
     crystalDrop('betterend:sulphur_crystal', 0, 1)
})