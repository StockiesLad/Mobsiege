recipes((event, funcs) => {
     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_brass', 90), preferredItemId('forge:ingots/bronze'))
     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_brass', 90), preferredItemId('forge:dusts/bronze'))
     funcs.globalFluidFreezing([preferredStack('forge:ingots/brass')], [ofFluid('#forge:molten_brass', 90), Item.of('thermal:chiller_ingot_cast')])
     funcs.globalFluidMixing(ofFluid('tconstruct:molten_brass', 200), [ofFluid('#forge:copper', 100), ofFluid('#forge:zinc', 100)])
})