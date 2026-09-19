recipes((event, funcs) => {
     //Brass
     event.recipes.thermal.crucible(ofFluid(`tconstruct:molten_brass`, 90), preferredItemId(`${main}:ingots/bronze`))
     event.recipes.thermal.crucible(ofFluid(`tconstruct:molten_brass`, 90), preferredItemId(`${main}:dusts/bronze`))
     funcs.globalFluidFreezing([preferredStack(`${main}:ingots/brass`)], [ofFluid(`#${main}:molten_brass`, 90), Item.of(`thermal:chiller_ingot_cast`)])
     funcs.globalFluidMixing(ofFluid(`tconstruct:molten_brass`, 200), [ofFluid(`#${main}:copper`, 100), ofFluid(`#${main}:zinc`, 100)])

     //Bronze
     event.remove({input: `fire_charge`, output: preferredItemId(`${main}:ingots/bronze`)})

     event.recipes.thermal.crucible(ofFluid(`tconstruct:molten_bronze`, 90), preferredItemId(`${main}:ingots/bronze`))
     event.recipes.thermal.crucible(ofFluid(`tconstruct:molten_bronze`, 90), preferredItemId(`${main}:dusts/bronze`))
     funcs.globalFluidFreezing([Item.of(preferredItemId(`${main}:ingots/bronze`))], [ofFluid(`#${main}:molten_bronze`, 90), Item.of(`thermal:chiller_ingot_cast`)])
     funcs.globalFluidMixing(ofFluid(`tconstruct:molten_bronze`, 400), [ofFluid(`#${main}:copper`, 100), ofFluid(`#${main}:tin`, 100)])

     //Constantan
     event.remove({input: `fire_charge`, output: preferredItemId(`${main}:ingots/constantan`)})

     event.recipes.thermal.crucible(ofFluid(`tconstruct:molten_constantan`, 90), preferredItemId(`${main}:ingots/constantan`))
     event.recipes.thermal.crucible(ofFluid(`tconstruct:molten_constantan`, 90), preferredItemId(`${main}:dusts/constantan`))
     funcs.globalFluidFreezing([preferredStack(`${main}:ingots/constantan`)], [ofFluid(`#${main}:molten_constantan`, 90), Item.of(`thermal:chiller_ingot_cast`)])
     funcs.globalFluidMixing(ofFluid(`tconstruct:molten_constantan`, 200), [ofFluid(`#${main}:copper`, 100), ofFluid(`#${main}:nickel`, 100)])

     //Electrum
     event.remove({input: `fire_charge`, output: preferredItemId(`${main}:ingots/electrum`)})

     event.recipes.thermal.crucible(ofFluid(`tconstruct:molten_electrum`, 90), preferredItemId(`${main}:ingots/electrum`))
     event.recipes.thermal.crucible(ofFluid(`tconstruct:molten_electrum`, 90), preferredItemId(`${main}:dusts/electrum`))
     funcs.globalFluidFreezing([preferredStack(`${main}:ingots/electrum`)], [ofFluid(`#${main}:molten_electrum`, 90), Item.of(`thermal:chiller_ingot_cast`)])
     funcs.globalFluidMixing(ofFluid(`tconstruct:molten_electrum`, 200), [ofFluid(`#${main}:gold`, 100), ofFluid(`#${main}:silver`, 100)])

     //Invar
     event.remove({input: `fire_charge`, output: preferredItemId(`${main}:ingots/invar`)})

     event.recipes.thermal.crucible(ofFluid(`tconstruct:molten_invar`, 90), preferredItemId(`${main}:ingots/invar`))
     event.recipes.thermal.crucible(ofFluid(`tconstruct:molten_invar`, 90), preferredItemId(`${main}:dusts/invar`))
     funcs.globalFluidFreezing([preferredStack(`${main}:ingots/invar`)], [ofFluid(`#${main}:molten_invar`, 90), Item.of(`thermal:chiller_ingot_cast`)])
     funcs.globalFluidMixing(ofFluid(`tconstruct:molten_invar`, 300), [ofFluid(`#${main}:iron`, 200), ofFluid(`#${main}:nickel`, 100)])

     //Iron
     event.recipes.thermal.crucible(ofFluid(`tconstruct:molten_iron`, 90), preferredItemId(`${main}:ingots/iron`))
     event.recipes.thermal.crucible(ofFluid(`tconstruct:molten_iron`, 90), preferredItemId(`${main}:dusts/iron`))
     funcs.globalFluidFreezing([preferredStack(`${main}:ingots/iron`)], [ofFluid(`#${main}:molten_iron`, 90), Item.of(`thermal:chiller_ingot_cast`)])

     //Rose Gold
     event.shapeless(preferredStack(`${main}:dusts/rose_gold`).withCount(3), [preferredStack(`${main}:dusts/copper`).withCount(2), preferredItemId(`${main}:dusts/gold`)])

     event.recipes.thermal.crucible(ofFluid(`tconstruct:molten_rose_gold`, 90), preferredItemId(`${main}:ingots/rose_gold`))
     event.recipes.thermal.crucible(ofFluid(`tconstruct:molten_rose_gold`, 90), preferredItemId(`${main}:dusts/rose_gold`))
     funcs.globalFluidFreezing([preferredStack(`${main}:ingots/rose_gold`)], [ofFluid(`#${main}:molten_rose_gold`, 90), Item.of(`thermal:chiller_ingot_cast`)])
     funcs.globalFluidMixing(ofFluid(`tconstruct:molten_rose_gold`, 200), [ofFluid(`#${main}:gold`, 100), ofFluid(`#${main}:copper`, 100)])
})