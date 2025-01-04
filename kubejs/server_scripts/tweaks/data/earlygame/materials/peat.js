LootJS.modifiers(event => {
     event.addBlockLootModifier('biomeswevegone:peat')
          .removeLoot(Ingredient.all)
          .addAlternativesLoot(
               LootEntry.of('biomeswevegone:peat').when(c => c.customCondition(conditionSilkTouch())),
               LootEntry.ofJson(childAlternativesPool([
                    ofChild('twigs:pebble', ofFuncConds(
                         conditionTableBonus([0.125, 0.25, 0.5, 1.0], "minecraft:fortune"), 
                         countSet(countUniform(1, 3), false)
                    )),
                    ofChild('biomeswevegone:peat')
               ]))
          )
})