var woodSet = (modid, type) => {
     return [
          `${modid}:${type}_leaves`, 
          `${modid}:${type}_sapling`, 
          `${modid}:potted_${type}_sapling`, 
          `${modid}:${type}_log`, 
          `${modid}:${type}_wood`, 
          `${modid}:stripped_${type}_log`, 
          `${modid}:stripped_${type}_wood`, 
          `${modid}:${type}_planks`, 
          `${modid}:${type}_slab`, 
          `${modid}:${type}_bookshelf`, 
          `${modid}:${type}_crafting_table`,
          `${modid}:${type}_pressure_plate`, 
          `${modid}:${type}_fence`, 
          `${modid}:${type}_trapdoor`, 
          `${modid}:${type}_fence_gate`, 
          `${modid}:${type}_stairs`, 
          `${modid}:${type}_button`, 
          `${modid}:${type}_door`, 
          `${modid}:${type}_sign`, 
          `${modid}:${type}_hanging_sign`, 
          `${modid}:${type}_boat`, 
          `${modid}:${type}_chest_boat`,
     ]
}

comfuncs.hide([
     'primalstage:diamond_plate',
     'primalstage:charcoal_log',
     'biomeswevegone:tall_prairie_grass', 
     'biomeswevegone:prairie_grass'
])

comfuncs.hide(woodSet('traverse', 'fir'))
comfuncs.hide(woodSet('biomeswevegone', 'cypress'))
comfuncs.hide(woodSet('biomeswevegone', 'fir'))
comfuncs.hide(woodSet('biomeswevegone', 'mahogany'))
comfuncs.hide(woodSet('biomesoplenty', 'redwood'))

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