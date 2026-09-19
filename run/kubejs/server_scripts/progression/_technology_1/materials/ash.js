recipes((event, funcs) => {
     funcs.vanillaInsert('3x carbonize:ash_layer', ['carbonize:ash_block', [0, 1]])
     funcs.twoSquare('carbonize:ash_block', 'carbonize:ash').vanilla()
     event.shapeless('carbonize:ash', `2x #${main}:ash`)
     funcs.threeSquare(content.packed_ash, `#${main}:ash`).vanilla()
})

itemTags((event, funcs) => {
     event.add(data + 'ash', ['carbonize:ash', 'cinderscapes:ash_pile', 'supplementaries:ash'])
     event.add(data + 'storage_blocks/ash', ['carbonize:ash_block', 'cinderscapes:ash_block'])
     event.add(data + 'fertilizer', 'carbonize:ash')
})

commonTags((event, funcs) => {
     event.add('minecraft:sand', dataTag + 'storage_blocks/ash')
})

lootTables((event, funcs) => {
     event.addBlockLootModifier(content.packed_ash).addAlternativesLoot(
          LootEntry.of(content.packed_ash).when(c => c.customCondition(conditionSilkTouch())),
          LootEntry.of(content.packed_ash).when(c => c.customCondition(conditionMatchTool('minecraft:trowels'))),
          LootEntry.of(Item.of('supplementaries:ash', 9))
     )
})