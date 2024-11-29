recipes((event, funcs) => {
     event.remove({output: funcs.preferredItem('forge:dusts/signalum'), type: 'minecraft:crafting_shapeless'})
     funcs.replace({input: 'fire_charge', output: funcs.preferredItem('forge:ingots/signalum')}, r => funcs.componentAssembly(Item.of(r), [
          ofFluid('thermal:redstone', 500),
          Item.of(funcs.preferredItem('forge:dusts/lumium')).withCount(4),
          Item.of(funcs.preferredItem('forge:ingots/energetic_alloy')).withCount(3),
          Item.of(funcs.preferredItem('forge:dusts/rose_gold')).withCount(2), 
          Item.of(funcs.preferredItem('forge:ingots/brass')).withCount(2)
     ]))
})