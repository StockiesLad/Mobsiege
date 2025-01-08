recipes((event, funcs) => {
     event.remove({output: preferredItemId('forge:dusts/signalum'), type: 'minecraft:crafting_shapeless'})
     funcs.componentAssembly(Item.of(funcs.removeInsurely({input: 'fire_charge', output: preferredItemId('forge:ingots/signalum')})), [
          ofFluid('thermal:redstone', 500),
          preferredStack('forge:dusts/lumium').withCount(4),
          preferredStack('forge:ingots/energetic_alloy').withCount(3),
          preferredStack('forge:dusts/rose_gold').withCount(2), 
          preferredStack('forge:ingots/brass').withCount(2)
     ])
})