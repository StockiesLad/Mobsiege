recipes((event, funcs) => {
     funcs.vanillaInsert('3x carbonize:ash_layer', ['carbonize:ash_block', [0, 1]])
     funcs.generate('carbonize:ash_block', 'carbonize:ash').flatSquare(2).next().vanilla()
     event.shapeless('carbonize:ash', ['#forge:ash', '#forge:ash'])
     funcs.threeSquare(custom.packed_ash, '#forge:ash')
})

ServerEvents.tags('item', event => {
     event.add('forge:ash', ['carbonize:ash', 'cinderscapes:ash_pile', 'supplementaries:ash'])
     event.add('forge:storage_blocks/ash', ['carbonize:ash_block', 'cinderscapes:ash_block'])
     event.add('forge:fertilizer', 'carbonize:ash')
})

commonTags((event, funcs) => {
     event.add('minecraft:sand', '#forge:storage_blocks/ash')
})

LootJS.modifiers(event => {
     event.addBlockLootModifier(custom.packed_ash)
          .addAlternativesLoot(
               LootEntry.of(custom.packed_ash).when(c => c.customCondition(conditionSilkTouch())),
               LootEntry.of(custom.packed_ash).when(c => c.customCondition(conditionMatchTool('minecraft:trowels'))),
               LootEntry.of(Item.of('supplementaries:ash', 9))
          )
})
