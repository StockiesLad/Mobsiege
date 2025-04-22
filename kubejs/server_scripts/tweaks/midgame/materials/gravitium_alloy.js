recipes((event, funcs) => {
     funcs.globalAlloySmelting(content.gravitium, ['4x create_new_age:magnetite_block', 'aether_redux:gravitite_block', '4x minecraft:iron_block']) // edenring:gravilite_block
     funcs.globalAlloySmelting(content.gravitium, ['4x alexscaves:scarlet_neodymium_pillar', 'aether_redux:gravitite_block', '4x minecraft:iron_block'])
     funcs.globalAlloySmelting(content.gravitium, ['4x alexscaves:azure_neodymium_pillar', 'aether_redux:gravitite_block', '4x minecraft:iron_block'])
     funcs.threeSquare(content.gravitium_block, '#forge:ingots/gravitium_alloy').vanilla()
     event.shapeless(Item.of(content.gravitium, 9), '#forge:storage_blocks/gravitium_alloy')
})

ServerEvents.tags('item', event => {
     event.add('forge:ingots/gravitium_alloy', content.gravitium)
})

commonTags((event, funcs) => {
     event.add('forge:storage_blocks/gravitium_alloy', content.gravitium_block)
})