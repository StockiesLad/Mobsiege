recipes((event, funcs) => {
     event.remove({output: funcs.preferredItem('forge:dusts/enderium'), type: 'minecraft:crafting_shapeless'})
     funcs.replace({input: 'fire_charge', output: funcs.preferredItem('forge:ingots/enderium')}, r => funcs.componentAssembly(Item.of(r), [
          ofFluid('thermal:ender', 600),
          Item.of(funcs.preferredItem('forge:dusts/signalum')).withCount(4),
          Item.of(funcs.preferredItem('forge:dusts/prismalium')).withCount(4), 
          Item.of(funcs.preferredItem('forge:dusts/diamond')).withCount(2), 
          Item.of(funcs.preferredItem('forge:dusts/lead')).withCount(2),
          Item.of('thermal:blitz_powder'),
          Item.of('thermal:blizz_powder'),
     ]))        
})
