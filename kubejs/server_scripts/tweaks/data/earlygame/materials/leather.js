recipes((event, funcs) => {
     funcs.toolDamagingShapeless('primalstage:skimmed_pelt', ['primalstage:pelt', '#forge:tools/knives'])
     funcs.globalDrying('primalstage:dried_pelt', 'primalstage:salted_pelt')
})

LootJS.modifiers(event => {
     event.addEntityLootModifier('minecraft:trader_llama').replaceLoot('minecraft:leather', 'primalstage:pelt')
})