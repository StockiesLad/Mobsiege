ServerEvents.tags('item', event => {
     event.add(data + 'dusts/salt', ['primalstage:salt', 'ingredientsdelight:salt'])
     event.add(data + 'salt', dataTag + 'dusts/salt')
     event.add(data + 'dusts/niter', 'immersiveengineering:dust_saltpeter')
     event.remove(data + 'dusts/saltpeter', 'immersiveengineering:dust_saltpeter')
})

commonTags((event, funcs) => {
     event.add(data + 'storage_blocks/salt', 'mekanism:block_salt')
     event.add(data + 'ores/salt', 'primalstage:salt_block')
})

lootTables((event, funcs) => {
     event.addBlockLootModifier('primalstage:salt_block')
          .removeLoot('primalstage:salt_block')
          .removeLoot('primalstage:salt')
          .addAlternativesLoot(
               LootEntry.of('primalstage:salt_block').when(c => c.customCondition(conditionSilkTouch())),
               LootEntry.of('primalstage:salt_block').when(c => c.customCondition(conditionMatchTool(data + 'trowels'))),
               LootEntry.of(preferredItemId(data + 'dusts/salt'))
                    .customFunction(setCount(countUniform(4, 8), false))
                    .customFunction(funcFortune(formulaUniformBonus(1)))
          )

})

