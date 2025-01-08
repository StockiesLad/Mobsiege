recipes((event, funcs) => {
     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_iron', 90), preferredItemId('forge:ingots/iron'))
     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_iron', 90), preferredItemId('forge:dusts/iron'))
     funcs.globalChilling([preferredStack('forge:ingots/iron')], [ofFluid('#forge:molten_iron', 90), Item.of('thermal:chiller_ingot_cast')])
})