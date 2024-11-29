recipes((event, funcs) => {
     event.remove({input: 'fire_charge', output: funcs.preferredItem('forge:ingots/invar')})

     event.recipes.thermal.crucible(ofFluid('embers:molten_invar', 90), funcs.preferredItem('forge:ingots/invar'))
     event.recipes.thermal.crucible(ofFluid('embers:molten_invar', 90), funcs.preferredItem('forge:dusts/invar'))
     funcs.globalChilling([Item.of(funcs.preferredItem('forge:ingots/invar'))], [ofFluid('#forge:molten_invar', 90), Item.of('thermal:chiller_ingot_cast')])
     funcs.globalFluidMixing(ofFluid('embers:molten_invar', 300), [ofFluid('#forge:iron', 200), ofFluid('#forge:nickel', 100)])
})