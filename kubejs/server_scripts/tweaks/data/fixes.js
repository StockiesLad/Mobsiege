comfuncs.hide('primalstage:diamond_plate')
comfuncs.hide('primalstage:charcoal_log')

recipes((event, funcs) => {
     event.remove({id: 'quark:tweaks/crafting/slab_to_block'})
})

itemTags((event, funcs) => {
     event.add('forge:storage_blocks/sulfur', 'cinderscapes:sulfur_block')
     event.add('forge:sandstone/venus_sandstone', ['ad_astra:venus_sandstone'])
     event.add('ad_astra:venus_sandstone', ['ad_astra:venus_sandstone'])
     
     funcs.unifiedAdd([
          ['%plates/copper', 'primalstage:copper_plate'],
          ['%plates/iron', 'primalstage:iron_plate'],
          ['%plates/diamond', 'primalstage:diamond_plate'],
          ['%storage_blocks/raw_elementium', 'mythicbotany:raw_elementium_block']
     ])
})

blockTags((event, funcs) => {
     global.functions.sound.invoke('setSoundTag', {event: event})
})