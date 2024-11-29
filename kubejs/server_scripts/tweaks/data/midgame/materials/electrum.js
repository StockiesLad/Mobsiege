recipes((event, funcs) => {
     event.remove({input: 'fire_charge', output: funcs.preferredItem('forge:ingots/electrum')})

     event.recipes.thermal.crucible(ofFluid('embers:molten_electrum', 90), funcs.preferredItem('forge:ingots/electrum'))
     event.recipes.thermal.crucible(ofFluid('embers:molten_electrum', 90), funcs.preferredItem('forge:dusts/electrum'))
     funcs.globalChilling([Item.of(funcs.preferredItem('forge:ingots/electrum'))], [ofFluid('#forge:molten_electrum', 90), Item.of('thermal:chiller_ingot_cast')])
     funcs.globalFluidMixing(ofFluid('embers:molten_electrum', 200), [ofFluid('#forge:gold', 100), ofFluid('#forge:silver', 100)])
     
})