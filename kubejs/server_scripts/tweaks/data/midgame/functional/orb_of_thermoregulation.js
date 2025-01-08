recipes((event, funcs) => {
     funcs.planetAltAlt(custom.thermoregulator, ['minecraft:blaze_powder', 'deeperdarker:soul_crystal', 'thermal:blizz_powder', 'ae2:charged_certus_quartz_crystal'], 'enderio:weather_crystal').toolDamaging()
})

ServerEvents.tags('item', event => {
     event.add(pack('thermoregulators'), custom.thermoregulator)
 })