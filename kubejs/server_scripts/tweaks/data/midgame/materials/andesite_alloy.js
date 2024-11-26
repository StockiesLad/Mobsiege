recipes((event, funcs) => {
     event.remove({id: 'create:crafting/materials/andesite_alloy_from_zinc'})
     funcs.replace({id: 'create:crafting/materials/andesite_alloy'}, () => event.shapeless(
          '2x create:andesite_alloy', ['#forge:dusts/invar', 'andesite', '#forge:dusts/zinc', 'andesite']
     ))
})
