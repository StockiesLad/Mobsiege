ServerEvents.tags('item', event => {
     event.add('forge:dusts/salt', ['primalstage:salt', 'ingredientsdelight:salt'])
     event.add('forge:salt', '#forge:dusts/salt')
     event.add('forge:dusts/niter', 'immersiveengineering:dust_saltpeter')
})

commonTags((event, funcs) => {
     event.add('forge:storage_blocks/salt', 'mekanism:block_salt')
     event.add('forge:ores/salt', 'primalstage:salt_block')
})

lootTables((event, funcs) => {
     event.addBlockLootModifier('primalstage:salt_block')
          .removeLoot('primalstage:salt_block')
          .removeLoot('primalstage:salt')
          .addAlternativesLoot(
               LootEntry.of('primalstage:salt_block').when(c => c.customCondition(conditionSilkTouch())),
               LootEntry.of('primalstage:salt_block').when(c => c.customCondition(conditionMatchTool('minecraft:trowels'))),
               LootEntry.of(preferredItemId('forge:dusts/salt'))
                    .customFunction(setCount(countUniform(4, 8), false))
                    .customFunction(funcFortune(formulaUniformBonus(1)))
          )

})

