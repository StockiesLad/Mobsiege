recipes((event, funcs) => {
     funcs.toolDamagingShapeless('primalstage:skimmed_pelt', ['primalstage:pelt', '#forge:tools/knives'])
     funcs.globalDrying('primalstage:dried_pelt', 'primalstage:salted_pelt')
})

LootJS.modifiers(event => {
     event.addEntityLootModifier('aether:flying_cow').replaceLoot('minecraft:leather', 'primalstage:pelt', true)
     event.addEntityLootModifier('aether_redux:shimmercow').replaceLoot('minecraft:leather', 'primalstage:pelt', true)
     event.addEntityLootModifier('minecraft:trader_llama').replaceLoot('minecraft:leather', 'primalstage:pelt', true)
})