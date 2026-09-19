recipes((event, funcs) => {
     funcs.planetAltAlt(content.thermoregulator, ['minecraft:blaze_powder', 'betterend:eternal_crystal', 'thermal:blizz_powder', 'ae2:charged_certus_quartz_crystal'], 'enderio:weather_crystal').toolDamaging()
})

itemTags((event, funcs) => {
     funcs.add(tags.thermoregulators, content.thermoregulator)
 })