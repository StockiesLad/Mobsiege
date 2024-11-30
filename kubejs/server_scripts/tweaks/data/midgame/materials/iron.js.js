recipes((event, funcs) => {
     event.recipes.thermal.crucible(ofFluid('embers:molten_iron', 90), funcs.preferredItem('forge:ingots/iron'))
     event.recipes.thermal.crucible(ofFluid('embers:molten_iron', 90), funcs.preferredItem('forge:dusts/iron'))
     funcs.globalChilling([Item.of(funcs.preferredItem('forge:ingots/iron'))], [ofFluid('#forge:molten_iron', 90), Item.of('thermal:chiller_ingot_cast')])
})