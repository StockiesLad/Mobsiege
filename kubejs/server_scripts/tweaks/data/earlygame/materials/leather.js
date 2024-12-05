recipes((event, funcs) => {
     funcs.toolDamagingShapeless('primalstage:skimmed_pelt', ['primalstage:pelt', '#forge:tools/knives'])
})

LootJS.modifiers(event => {
     event.addEntityLootModifier('minecraft:trader_llama').replaceLoot('minecraft:leather', 'primalstage:pelt')
     /*event.addEntityLootModifier('minecraft:llama').addAlternativesLoot(
          LootEntry.of('primalstage:pelt').withChance(0.5).customFunction(countSet(countUniform(1, 2), false)),
          LootEntry.of('primalstage:pelt').customFunction(countSet(countUniform(0, 0), false))
     )*/
})