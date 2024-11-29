recipes((event, funcs) => {
     event.remove({input: 'fire_charge', output: funcs.preferredItem('forge:ingots/bronze')})

     event.recipes.thermal.crucible(ofFluid('embers:molten_bronze', 90), funcs.preferredItem('forge:ingots/bronze'))
     event.recipes.thermal.crucible(ofFluid('embers:molten_bronze', 90), funcs.preferredItem('forge:dusts/bronze'))
     funcs.globalChilling([Item.of(funcs.preferredItem('forge:ingots/bronze'))], [ofFluid('#forge:molten_bronze', 90), Item.of('thermal:chiller_ingot_cast')])
     funcs.globalFluidMixing(ofFluid('embers:molten_bronze', 400), [ofFluid('#forge:copper', 100), ofFluid('#forge:tin', 100)])
})