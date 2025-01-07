ServerEvents.tags('block', event => {
     event.add('minecraft:infiniburn_nether', comfuncs.packDef('corpstone'))
})

commonTags((event, funcs) => {
     event.add('forge:soil/grass', comfuncs.packDef('corpstone'))
     event.add('forge:terrain/nether', comfuncs.packDef('corpstone'))
     event.add('forge:stones/nether', comfuncs.packDef('corpstone'))
     event.add('forge:netherrack', comfuncs.packDef('corpstone'))
})

lootTables((event, funcs) => {
     event.addBlockLootModifier(custom.decapitated_debris).addAlternativesLoot(
          LootEntry.of(custom.decapitated_debris).when(c => c.customCondition(conditionSilkTouch())),
          LootEntry.ofJson(childGroupPool([
               ltItemEntry('minecraft:rotten_flesh', ofFunctions(setCount(countUniform(1, 4)))),
               ltItemEntry('minecraft:bone', ofFunctions(setCount(countUniform(0, 3))))
          ]))
     )
})
