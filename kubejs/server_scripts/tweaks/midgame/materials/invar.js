recipes((event, funcs) => {
     event.remove({input: 'fire_charge', output: preferredItemId('forge:ingots/invar')})

     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_invar', 90), preferredItemId('forge:ingots/invar'))
     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_invar', 90), preferredItemId('forge:dusts/invar'))
     funcs.globalChilling([preferredStack('forge:ingots/invar')], [ofFluid('#forge:molten_invar', 90), Item.of('thermal:chiller_ingot_cast')])
     funcs.globalFluidMixing(ofFluid('tconstruct:molten_invar', 300), [ofFluid('#forge:iron', 200), ofFluid('#forge:nickel', 100)])
})