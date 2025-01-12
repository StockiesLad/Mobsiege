recipes((event, funcs) => {
     event.shapeless(preferredStack('forge:dusts/rose_gold').withCount(3), [preferredStack('forge:dusts/copper').withCount(2), preferredItemId('forge:dusts/gold')])

     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_rose_gold', 90), preferredItemId('forge:ingots/rose_gold'))
     event.recipes.thermal.crucible(ofFluid('tconstruct:molten_rose_gold', 90), preferredItemId('forge:dusts/rose_gold'))
     funcs.globalFluidFreezing([preferredStack('forge:ingots/rose_gold')], [ofFluid('#forge:molten_rose_gold', 90), Item.of('thermal:chiller_ingot_cast')])
     funcs.globalFluidMixing(ofFluid('tconstruct:molten_rose_gold', 200), [ofFluid('#forge:gold', 100), ofFluid('#forge:copper', 100)])
})