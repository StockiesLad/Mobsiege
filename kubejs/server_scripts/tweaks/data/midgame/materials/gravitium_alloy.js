recipes((event, funcs) => {
     funcs.globalAlloySmelting(custom.gravitium, ['4x create_new_age:magnetite_block', 'aether_redux:gravitite_block', '4x edenring:gravilite_block'])
     funcs.globalAlloySmelting(custom.gravitium, ['4x alexscaves:scarlet_neodymium_pillar', 'aether_redux:gravitite_block', '4x edenring:gravilite_block'])
     funcs.globalAlloySmelting(custom.gravitium, ['4x alexscaves:azure_neodymium_pillar', 'aether_redux:gravitite_block', '4x edenring:gravilite_block'])
     funcs.generate(custom.gravitium_block, '#forge:ingots/gravitium_alloy').rollingSquare(1, 3).next().vanilla()
     event.shapeless('9x ' + custom.gravitium, '#forge:storage_blocks/gravitium_alloy')
})

ServerEvents.tags('item', event => {
     event.add('forge:ingots/gravitium_alloy', custom.gravitium)
})

commonTags((event, funcs) => {
     event.add('forge:storage_blocks/gravitium_alloy', custom.gravitium_block)
})