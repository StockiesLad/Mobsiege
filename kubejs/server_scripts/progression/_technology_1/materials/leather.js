recipes((event, funcs) => {
     event.shapeless(funcs.removeFor({input: 'minecraft:rabbit_hide', output: 'minecraft:leather'}, 'primalstage:pelt'), Item.of('minecraft:rabbit_hide', 3))
     event.shapeless(funcs.removeFor({input: 'alexsmobs:kangaroo_hide', output: 'minecraft:leather'}, 'primalstage:pelt'), Item.of('alexsmobs:kangaroo_hide', 2))
     funcs.remove([{type: 'thermal:furnace', output: 'minecraft:leather'}, {type: 'integrateddynamics:drying_basin', output: 'minecraft:leather'}, {type: 'integrateddynamics:mechanical_drying_basin', output: 'minecraft:leather'}])

     funcs.toolDamagingShapeless('primalstage:skimmed_pelt', ['primalstage:pelt', '#forge:tools/knives'])
     funcs.globalDrying('primalstage:dried_pelt', 'primalstage:salted_pelt')
     event.shapeless('2x primalstage:tanned_pelt', ['thermal_extra:sticky_ball', Item.of('primalstage:dried_pelt', 2)])
     funcs.globalPrimitiveCooking(funcs.removeInsurely({input: 'primalstage:tanned_pelt', output: 'minecraft:leather'}), 'primalstage:tanned_pelt', 0.1)
})

LootJS.modifiers(event => {
     event.addEntityLootModifier('aether:flying_cow').replaceLoot('minecraft:leather', 'primalstage:pelt', true)
     event.addEntityLootModifier('aether_redux:shimmercow').replaceLoot('minecraft:leather', 'primalstage:pelt', true)
     event.addEntityLootModifier('minecraft:trader_llama').replaceLoot('minecraft:leather', 'primalstage:pelt', true)
     event.addEntityLootModifier('minecraft:hoglin').replaceLoot('minecraft:leather', 'primalstage:pelt', true)
     event.addEntityLootModifier('quark:foxhound').replaceLoot('minecraft:leather', 'primalstage:pelt', true)
     event.addEntityLootModifier('undead_revamp2:deadclogger').replaceLoot('minecraft:leather', 'primalstage:pelt', true)

})