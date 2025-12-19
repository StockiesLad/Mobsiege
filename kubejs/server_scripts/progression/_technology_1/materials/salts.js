//Refer to progression:global

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

