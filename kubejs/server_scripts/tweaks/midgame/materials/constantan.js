recipes((event, funcs) => {
     event.remove({input: 'fire_charge', output: preferredItemId('forge:ingots/constantan')})

     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_constantan', 90), preferredItemId('forge:ingots/constantan'))
     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_constantan', 90), preferredItemId('forge:dusts/constantan'))
     funcs.globalFluidFreezing([preferredStack('forge:ingots/constantan')], [ofFluid('#forge:molten_constantan', 90), Item.of('thermal:chiller_ingot_cast')])
     funcs.globalFluidMixing(ofFluid('tconstruct:molten_constantan', 200), [ofFluid('#forge:copper', 100), ofFluid('#forge:nickel', 100)])
})