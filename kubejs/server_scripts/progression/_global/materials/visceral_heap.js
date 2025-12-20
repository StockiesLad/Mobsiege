ServerEvents.tags('block', event => {
     event.add('minecraft:infiniburn_nether', content.corpstone)
})

commonTags((event, funcs) => {
     funcs.add(tags.grass, content.corpstone)
     funcs.add(tags.nether_terrain, content.corpstone)
     funcs.add(tags.nether_stone, content.corpstone)
     funcs.add(tags.netherrack, content.corpstone)
})

lootTables((event, funcs) => {
     event.addBlockLootModifier(content.decapitated_debris).addAlternativesLoot(
          LootEntry.of(content.decapitated_debris).when(c => c.customCondition(conditionSilkTouch())),
          LootEntry.ofJson(childGroupPool([
               ltItemEntry('minecraft:rotten_flesh', ofFunctions(setCount(countUniform(1, 4)))),
               ltItemEntry('minecraft:bone', ofFunctions(setCount(countUniform(0, 3))))
          ]))
     )
})
