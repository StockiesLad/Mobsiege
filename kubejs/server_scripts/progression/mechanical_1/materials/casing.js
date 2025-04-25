recipes((event, funcs) => {
     funcs.remove({id: 'create:item_application/andesite_casing_from_log'})
     funcs.remove({id: 'create:item_application/brass_casing_from_log'})
     funcs.remove({id: 'create:item_application/copper_casing_from_log'})
     event.replaceInput({output: '#create:casing'}, '#minecraft:logs', 'actuallyadditions:wood_casing')
})