ServerEvents.tags('item', event => {
     event.add('forge:raw_materials/redstone', 'createoreexcavation:raw_redstone')
})

recipes((event, funcs) => {
     funcs.globalSmelting('2x minecraft:redstone', 'createoreexcavation:raw_redstone', 0.7)
})