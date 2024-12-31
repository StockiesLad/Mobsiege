recipes((event, funcs) => {
     event.remove({output: preferredItemId('forge:dusts/lumium'), type: 'minecraft:crafting_shapeless'})
     funcs.replace({input: 'fire_charge', output: preferredItemId('forge:ingots/lumium')}, r => funcs.componentAssembly(Item.of(r), [
          ofFluid('thermal:glowstone', 400),
          Item.of(preferredItemId('forge:dusts/electrum')).withCount(4), 
          Item.of(preferredItemId('forge:dusts/constantan')).withCount(3),
          Item.of(preferredItemId('forge:dusts/invar')).withCount(2),
          Item.of(preferredItemId('forge:dusts/bronze')).withCount(2)
     ]))
})