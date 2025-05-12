recipes((event, funcs) => {
     //Brass
     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_brass', 90), preferredItemId('forge:ingots/bronze'))
     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_brass', 90), preferredItemId('forge:dusts/bronze'))
     funcs.globalFluidFreezing([preferredStack('forge:ingots/brass')], [ofFluid('#forge:molten_brass', 90), Item.of('thermal:chiller_ingot_cast')])
     funcs.globalFluidMixing(ofFluid('tconstruct:molten_brass', 200), [ofFluid('#forge:copper', 100), ofFluid('#forge:zinc', 100)])

     //Bronze
     event.remove({input: 'fire_charge', output: preferredItemId('forge:ingots/bronze')})

     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_bronze', 90), preferredItemId('forge:ingots/bronze'))
     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_bronze', 90), preferredItemId('forge:dusts/bronze'))
     funcs.globalFluidFreezing([Item.of(preferredItemId('forge:ingots/bronze'))], [ofFluid('#forge:molten_bronze', 90), Item.of('thermal:chiller_ingot_cast')])
     funcs.globalFluidMixing(ofFluid('tconstruct:molten_bronze', 400), [ofFluid('#forge:copper', 100), ofFluid('#forge:tin', 100)])

     //Constantan
     event.remove({input: 'fire_charge', output: preferredItemId('forge:ingots/constantan')})

     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_constantan', 90), preferredItemId('forge:ingots/constantan'))
     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_constantan', 90), preferredItemId('forge:dusts/constantan'))
     funcs.globalFluidFreezing([preferredStack('forge:ingots/constantan')], [ofFluid('#forge:molten_constantan', 90), Item.of('thermal:chiller_ingot_cast')])
     funcs.globalFluidMixing(ofFluid('tconstruct:molten_constantan', 200), [ofFluid('#forge:copper', 100), ofFluid('#forge:nickel', 100)])

     //Electrum
     event.remove({input: 'fire_charge', output: preferredItemId('forge:ingots/electrum')})

     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_electrum', 90), preferredItemId('forge:ingots/electrum'))
     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_electrum', 90), preferredItemId('forge:dusts/electrum'))
     funcs.globalFluidFreezing([preferredStack('forge:ingots/electrum')], [ofFluid('#forge:molten_electrum', 90), Item.of('thermal:chiller_ingot_cast')])
     funcs.globalFluidMixing(ofFluid('tconstruct:molten_electrum', 200), [ofFluid('#forge:gold', 100), ofFluid('#forge:silver', 100)])

     //Invar
     event.remove({input: 'fire_charge', output: preferredItemId('forge:ingots/invar')})

     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_invar', 90), preferredItemId('forge:ingots/invar'))
     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_invar', 90), preferredItemId('forge:dusts/invar'))
     funcs.globalFluidFreezing([preferredStack('forge:ingots/invar')], [ofFluid('#forge:molten_invar', 90), Item.of('thermal:chiller_ingot_cast')])
     funcs.globalFluidMixing(ofFluid('tconstruct:molten_invar', 300), [ofFluid('#forge:iron', 200), ofFluid('#forge:nickel', 100)])

     //Iron
     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_iron', 90), preferredItemId('forge:ingots/iron'))
     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_iron', 90), preferredItemId('forge:dusts/iron'))
     funcs.globalFluidFreezing([preferredStack('forge:ingots/iron')], [ofFluid('#forge:molten_iron', 90), Item.of('thermal:chiller_ingot_cast')])

     //Rose Gold
     event.shapeless(preferredStack('forge:dusts/rose_gold').withCount(3), [preferredStack('forge:dusts/copper').withCount(2), preferredItemId('forge:dusts/gold')])

     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_rose_gold', 90), preferredItemId('forge:ingots/rose_gold'))
     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_rose_gold', 90), preferredItemId('forge:dusts/rose_gold'))
     funcs.globalFluidFreezing([preferredStack('forge:ingots/rose_gold')], [ofFluid('#forge:molten_rose_gold', 90), Item.of('thermal:chiller_ingot_cast')])
     funcs.globalFluidMixing(ofFluid('tconstruct:molten_rose_gold', 200), [ofFluid('#forge:gold', 100), ofFluid('#forge:copper', 100)])
})