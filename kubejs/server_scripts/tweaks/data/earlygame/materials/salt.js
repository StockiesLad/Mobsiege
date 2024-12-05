itemTags((event, funcs) => {
     event.add('forge:salt', ['primalstage:salt', 'ingredientsdelight:salt'])
     event.add('forge:dusts/salt', '#forge:salt')
})

commonTags((event, funcs) => {
     event.add('forge:storage_blocks/salt', ['primalstage:salt_block', 'mekanism:block_salt'])
})

LootJS.modifiers(event => {
     event.addBlockLootModifier('primalstage:salt_block')
          .removeLoot('primalstage:salt_block')
          .removeLoot('primalstage:salt')
          .addAlternativesLoot(
               LootEntry.of(block).when(c => c.customCondition(conditionSilkTouch())),
               LootEntry.of(block).when(c => c.customCondition(conditionMatchTool('minecraft:trowels'))),
               LootEntry.of(Item.of('primalstage:salt', 4))
          )

})

