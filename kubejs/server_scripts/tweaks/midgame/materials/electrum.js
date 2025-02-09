recipes((event, funcs) => {
     event.remove({input: 'fire_charge', output: preferredItemId('forge:ingots/electrum')})

     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_electrum', 90), preferredItemId('forge:ingots/electrum'))
     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_electrum', 90), preferredItemId('forge:dusts/electrum'))
     funcs.globalFluidFreezing([preferredStack('forge:ingots/electrum')], [ofFluid('#forge:molten_electrum', 90), Item.of('thermal:chiller_ingot_cast')])
     funcs.globalFluidMixing(ofFluid('tconstruct:molten_electrum', 200), [ofFluid('#forge:gold', 100), ofFluid('#forge:silver', 100)])
     
})