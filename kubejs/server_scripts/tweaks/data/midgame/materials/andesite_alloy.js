recipes((event, funcs) => {
     event.remove({id: 'create:crafting/materials/andesite_alloy_from_zinc'})
     event.shapeless(funcs.removeInsurely({id: 'create:crafting/materials/andesite_alloy'}, '2x create:andesite_alloy'), ['#forge:dusts/invar', 'andesite', '#forge:dusts/zinc', 'andesite'])
})
