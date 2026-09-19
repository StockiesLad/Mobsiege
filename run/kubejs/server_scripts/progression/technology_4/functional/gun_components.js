recipes((event, funcs) => {
     funcs.nuke('pointblank:gunmetal_mesh')
     event.remove({output: 'pointblank:gunmetal_ingot'})
     funcs.globalAlloySmelting('pointblank:gunmetal_ingot', [`3x #${main}:ingots/signalum`, `3x #${main}:ingots/vibrant_alloy`, `3x #${main}:ingots/steel`])
     funcs.componentAssembly(Item.of(funcs.removeByOutput('pointblank:guninternals')), [
          ofFluid(`#${main}:molten_iron`, 100),
          Item.of('pointblank:gunmetal_ingot', 4),
          Item.of(preferredItemId(`${main}:ingots/invar`), 2),
          Item.of(preferredItemId(`${main}:ingots/aluminum`), 2)
     ])
})