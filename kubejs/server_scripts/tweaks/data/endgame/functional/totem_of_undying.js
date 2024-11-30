recipes((event, funcs) => {
     funcs.planetAlt('minecraft:totem_of_undying', 'bedrockium_awaken:awakened_bedrockium_ingot', 'projecte:dark_matter', 'projecte:red_matter')
})

complexLootTables((event, funcs) => {
     event.addEntityLootModifier('minecraft:evoker').replaceLoot('minecraft:totem_of_undying', 'bedrockium_awaken:awakened_bedrockium_ingot')
})
