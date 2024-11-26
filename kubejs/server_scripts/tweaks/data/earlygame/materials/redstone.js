itemTags((event, funcs) => {
     event.add('forge:raw_materials/redstone', 'createoreexcavation:raw_redstone')
})

recipes((event, funcs) => {
     event.smelting('2x minecraft:redstone', 'createoreexcavation:raw_redstone').xp(0.7)
     event.blasting('2x minecraft:redstone', 'createoreexcavation:raw_redstone').xp(0.7)
})