recipes((event, funcs) => {
     funcs.nuke('pointblank:gunmetal_mesh')
     event.remove({output: 'pointblank:gunmetal_ingot'})
     funcs.globalAlloySmelting('pointblank:gunmetal_ingot', ['3x #forge:ingots/signalum', '3x #forge:ingots/vibrant_alloy', '3x #forge:ingots/steel'])
     funcs.componentAssembly(Item.of(funcs.removeByOutput('pointblank:guninternals')), [
          ofFluid('#forge:molten_iron', 100),
          Item.of('pointblank:gunmetal_ingot', 4),
          Item.of(preferredItemId('forge:ingots/invar'), 2),
          Item.of(preferredItemId('forge:ingots/aluminum'), 2)
     ])
})