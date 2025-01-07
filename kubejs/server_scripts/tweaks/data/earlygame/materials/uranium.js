recipes((event, funcs) => {
     funcs.globalPressing(preferredStack('forge:ingots/uranium', 2), 'alexscaves:uranium')
})

commonTags((event, funcs) => {
     event.remove('forge:nuggets/uranium', 'alexscaves:uranium_shard')
     funcs.switchTagsRespectively([
          ['alexscaves:uranium', 'forge:ingots/uranium', 'forge:raw_materials/uranium'],
          ['alexscaves:block_of_uranium', 'forge:storage_blocks/uranium', 'forge:storage_blocks/raw_uranium']
     ])
})

lootTables((event, funcs) => {
     event.addBlockLootModifier('alexscaves:radrock_uranium_ore').removeLoot(Ingredient.all).addAlternativesLoot(
          LootEntry.of('alexscaves:radrock_uranium_ore').when(c => c.customCondition(conditionSilkTouch())),
          LootEntry.of(preferredItemId('forge:raw_materials/uranium')).customFunction(setCount(countUniform(3, 5), false)).customFunction(funcFortune(formulaUniformBonus(1))).customFunction(funcExplosionDecay())
     )
})