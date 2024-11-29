recipes((event, funcs) => {
     event.remove({output: funcs.preferredItem('forge:dusts/lumium'), type: 'minecraft:crafting_shapeless'})
     funcs.replace({input: 'fire_charge', output: funcs.preferredItem('forge:ingots/lumium')}, r => funcs.componentAssembly(Item.of(r), [
          ofFluid('thermal:glowstone', 400),
          Item.of(funcs.preferredItem('forge:dusts/electrum')).withCount(4), 
          Item.of(funcs.preferredItem('forge:dusts/constantan')).withCount(3),
          Item.of(funcs.preferredItem('forge:dusts/invar')).withCount(2),
          Item.of(funcs.preferredItem('forge:dusts/bronze')).withCount(2)
     ]))
})