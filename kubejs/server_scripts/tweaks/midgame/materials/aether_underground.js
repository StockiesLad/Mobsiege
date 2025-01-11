const holystone = ['aether:icestone', 'aether:holystone', 'aether_redux:gilded_holystone', 'aether_redux:blightmoss_holystone', 'aether:mossy_holystone', 'aether_genesis:blood_moss_holystone']

recipes((event, funcs) => {
     // one too many entries, also look at ancient aether 
     funcs.twoSquareAlt('2x aether:icestone', ['minecraft:packed_ice', 'minecraft:glowstone']).vanilla()
     event.recipes.create.crushing([
          Item.of(content.holy_pebble).withCount(2),
          Item.of('aether:ambrosium_shard').withChance(0.05),
          Item.of('aether:zanite_gemstone').withChance(0.025),
          Item.of('aether_redux:raw_veridium').withChance(0.015),
          Item.of('aether_redux:raw_gravitite').withChance(0.0025),
          Item.of('deep_aether:skyjade').withChance(0.005),
          Item.of('aether_genesis:continuum_orb').withChance(0.01)
     ], packTag('holystone'))
})

ServerEvents.tags('item', event => {
     event.add(pack('holystone'), holystone)
})

commonTags((event) => {
     event.add('forge:ores', ['aether:ambrosium_ore', 'ancient_aether:aether_quartz_ore', 'aether:zanite_ore', 'aether_redux:veridium_ore', 'aether:gravitite_ore', 'ancient_aether:valkyrum_ore', 'deep_aether:skyjade_ore', 'aether_genesis:continuum_ore'])
})