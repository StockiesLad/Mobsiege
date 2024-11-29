const holystone = ['aether:icestone', 'aether:holystone', 'aether_redux:gilded_holystone', 'aether_redux:blightmoss_holystone', 'aether:mossy_holystone', 'aether_genesis:blood_moss_holystone']

recipes((event, funcs) => {
     funcs.twoSquareAlt('2x aether:icestone', ['minecraft:packed_ice', 'minecraft:glowstone'])
     event.recipes.create.crushing([
          Item.of('twigs:pebble').withCount(2),
          Item.of('twigs:pebble').withChance(0.5),
          Item.of('aether:ambrosium_shard').withChance(0.05),
          Item.of('aether:zanite_gemstone').withChance(0.025),
          Item.of('aether_redux:raw_veridium').withChance(0.015),
          Item.of('aether_redux:raw_gravitite').withChance(0.0025),
          Item.of('deep_aether:skyjade').withChance(0.005),
          Item.of('aether_genesis:continuum_orb').withChance(0.01)
     ], funcs.def('|holystone'))
})

itemTags((event, funcs) => {
     event.add(comfuncs.packDef('holystone'), holystone)
})
