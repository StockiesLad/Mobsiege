recipes((event, funcs) => {
     event.remove({input: 'fire_charge', output: preferredItemId('forge:ingots/bronze')})

     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_bronze', 90), preferredItemId('forge:ingots/bronze'))
     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_bronze', 90), preferredItemId('forge:dusts/bronze'))
     funcs.globalChilling([Item.of(preferredItemId('forge:ingots/bronze'))], [ofFluid('#forge:molten_bronze', 90), Item.of('thermal:chiller_ingot_cast')])
     funcs.globalFluidMixing(ofFluid('tconstruct:molten_bronze', 400), [ofFluid('#forge:copper', 100), ofFluid('#forge:tin', 100)])
})