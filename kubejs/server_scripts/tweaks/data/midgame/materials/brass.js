recipes((event, funcs) => {
     event.recipes.thermal.crucible(ofFluid('embers:molten_brass', 90), preferredItemId('forge:ingots/bronze'))
     event.recipes.thermal.crucible(ofFluid('embers:molten_brass', 90), preferredItemId('forge:dusts/bronze'))
     funcs.globalChilling([preferredStack('forge:ingots/brass')], [ofFluid('#forge:molten_brass', 90), Item.of('thermal:chiller_ingot_cast')])
     funcs.globalFluidMixing(ofFluid('embers:molten_brass', 200), [ofFluid('#forge:copper', 100), ofFluid('#forge:zinc', 100)])
})