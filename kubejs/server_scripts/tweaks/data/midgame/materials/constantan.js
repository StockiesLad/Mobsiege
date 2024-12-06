recipes((event, funcs) => {
     event.remove({input: 'fire_charge', output: funcs.preferredItem('forge:ingots/constantan')})

     event.recipes.thermal.crucible(ofFluid('embers:molten_constantan', 90), funcs.preferredItem('forge:ingots/constantan'))
     event.recipes.thermal.crucible(ofFluid('embers:molten_constantan', 90), funcs.preferredItem('forge:dusts/constantan'))
     funcs.globalChilling([Item.of(funcs.preferredItem('forge:ingots/constantan'))], [ofFluid('#forge:molten_constantan', 90), Item.of('thermal:chiller_ingot_cast')])
     funcs.globalFluidMixing(ofFluid('embers:molten_constantan', 200), [ofFluid('#forge:copper', 100), ofFluid('#forge:nickel', 100)])
})