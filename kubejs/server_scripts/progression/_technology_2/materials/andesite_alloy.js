recipes((event, funcs) => {
     event.remove({id: 'create:crafting/materials/andesite_alloy_from_zinc'})
     event.shapeless(funcs.removeInsurely({output: '9x create:andesite_alloy'}), 'create:andesite_alloy_block')
     event.recipes.thermal.smelter('create:andesite_alloy', ['#forge:dusts/invar', 'andesite'])
     event.recipes.create.mixing('create:andesite_alloy', ['#forge:dusts/invar', 'andesite']).heated()
     funcs.basinCasting('create:andesite_alloy', ofFluid('#forge:molten_invar', 90), 'minecraft:andesite', true)
})
