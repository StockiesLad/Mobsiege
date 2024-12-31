recipes((event, funcs) => {
     event.remove({output: preferredItemId('forge:dusts/enderium'), type: 'minecraft:crafting_shapeless'})
     funcs.replace({input: 'fire_charge', output: preferredItemId('forge:ingots/enderium')}, r => funcs.componentAssembly(Item.of(r), [
          ofFluid('thermal:ender', 600),
          preferredStack('forge:dusts/signalum').withCount(4),
          preferredStack('forge:dusts/prismalium').withCount(4), 
          preferredStack('forge:dusts/diamond').withCount(2), 
          preferredStack('forge:dusts/lead').withCount(2),
          Item.of('thermal:blitz_powder'),
          Item.of('thermal:blizz_powder'),
     ]))        
})
