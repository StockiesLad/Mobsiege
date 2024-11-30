recipes((event, funcs) => {
     funcs.globalAlloySmelting(comfuncs.packDef('gravitium_alloy'), ['4x create_new_age:magnetite_block', 'aether_redux:gravitite_block', '4x edenring:gravilite_block'])
     funcs.globalAlloySmelting(comfuncs.packDef('gravitium_alloy'), ['4x alexscaves:scarlet_neodymium_pillar', 'aether_redux:gravitite_block', '4x edenring:gravilite_block'])
     funcs.globalAlloySmelting(comfuncs.packDef('gravitium_alloy'), ['4x alexscaves:azure_neodymium_pillar', 'aether_redux:gravitite_block', '4x edenring:gravilite_block'])
     funcs.generate(comfuncs.packDef('gravitium_alloy_block'), '#forge:ingots/gravitium_alloy').rollingSquare(1, 3).next().vanilla()
     event.shapeless('9x ' + comfuncs.packDef('gravitium_alloy'), '#forge:storage_blocks/gravitium_alloy')
})

itemTags((event, funcs) => {
     event.add('forge:ingots/gravitium_alloy', comfuncs.packDef('gravitium_alloy'))
})

commonTags((event, funcs) => {
     event.add('forge:storage_blocks/gravitium_alloy', comfuncs.packDef('gravitium_alloy_block'))
})