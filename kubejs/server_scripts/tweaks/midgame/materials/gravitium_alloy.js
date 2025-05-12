recipes((event, funcs) => {
     funcs.globalAlloySmelting('2x ' + content.gravitium, ['create_new_age:magnetite_block', '2x aether_redux:gravitite_ingot', '#forge:ingots/iron']) // edenring:gravilite_block
     funcs.globalAlloySmelting('2x ' + content.gravitium, ['alexscaves:scarlet_neodymium_ingot', '2x aether_redux:gravitite_ingot', 'alexscaves:azure_neodymium_ingot'])
     funcs.threeSquare(content.gravitium_block, '#forge:ingots/gravitium_alloy').vanilla()
     event.shapeless(Item.of(content.gravitium, 9), '#forge:storage_blocks/gravitium_alloy')
})

ServerEvents.tags('item', event => {
     event.add('forge:ingots/gravitium_alloy', content.gravitium)
})

commonTags((event, funcs) => {
     event.add('forge:storage_blocks/gravitium_alloy', content.gravitium_block)
})