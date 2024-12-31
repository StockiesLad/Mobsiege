recipes((event, funcs) => {
     event.remove({output: preferredItemId('forge:dusts/signalum'), type: 'minecraft:crafting_shapeless'})
     funcs.replace({input: 'fire_charge', output: preferredItemId('forge:ingots/signalum')}, r => funcs.componentAssembly(Item.of(r), [
          ofFluid('thermal:redstone', 500),
          preferredStack('forge:dusts/lumium').withCount(4),
          preferredStack('forge:ingots/energetic_alloy').withCount(3),
          preferredStack('forge:dusts/rose_gold').withCount(2), 
          preferredStack('forge:ingots/brass').withCount(2)
     ]))
})