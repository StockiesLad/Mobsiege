recipes((event, funcs) => {
     funcs.removeAndHide('pointblank:gunmetal_mesh')
     event.remove({output: 'pointblank:gunmetal_ingot'})
     funcs.globalAlloySmelting('pointblank:gunmetal_ingot', ['3x #forge:ingots/signalum', '3x #forge:ingots/vibrant_alloy', '3x #forge:ingots/titanium'])
     funcs.replaceOutputRecipe('pointblank:guninternals', r => funcs.componentAssembly(Item.of(r), [
          ofFluid('#forge:molten_iron', 100),
          Item.of('pointblank:gunmetal_ingot', 4),
          Item.of(funcs.preferredItem('forge:ingots/invar'), 2),
          Item.of(funcs.preferredItem('forge:ingots/aluminum'), 2)
     ]))
})