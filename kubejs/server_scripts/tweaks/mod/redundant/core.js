//Includes 'mobsiege', 'forge' & 'minecraft'

/*global.pushAll(global.HIDDEN_ITEMS, [
    'natprog:stick_block_item',
    'geologicexpansion:duck_spawn_egg', 
    'geologicexpansion:duck_egg',
    /*'alexscaves:limestone', 
    'alexscaves:limestone_stairs', 
    'alexscaves:limestone_slab', 
    'alexscaves:limestone_wall', 
    'alexscaves:limestone_pillar', 
    'alexscaves:limestone_chiseled', 
    'alexscaves:smooth_limestone', 
    'alexscaves:smooth_limestone_stairs', 
    'alexscaves:smooth_limestone_slab', 
    'alexscaves:smooth_limestone_wall',
    'what_is_stone:scoria', ,
    'what_is_stone:scoria_slab', 
    'what_is_stone:scoria_stairs',
    'what_is_stone:marble', 
    'what_is_stone:polished_marble', 
    'what_is_stone:polished_marble_bricks', 
    'what_is_stone:marble_slab', 
    'what_is_stone:marble_stairs', 
    'what_is_stone:polished_marble_brick_slab', 
    'what_is_stone:polished_marble_brick_stairs', 
    'what_is_stone:polished_marble_slab', 
    'what_is_stone:polished_marble_stairs',
    'betternether:nether_lapis_ore', 
    'betternether:nether_redstone_ore'
])*/

ServerEvents.recipes(event => {
    /*event.remove({output: 'minecraft:charcoal', type: 'minecraft:smelting'})
    event.shapeless('5x minecraft:bone', ['minecraft:bone_block', 'minecraft:bone_block'])
    event.shapeless('minecraft:stick', '#minecraft:saplings')
    event.replaceInput({input: 'minecraft:crafting_table'}, 'minecraft:crafting_table', '#forge:workbench')
    event.replaceInput({input: 'minecraft:furnace'}, 'minecraft:furnace', '#forge:furnaces')*/
})

global.signedCall(f => f.wholeTagsCore = (event, type) => {
    handleTags(event, type)
    /*event.add('forge:furnaces', [
        'betterend:sulphuric_rock_furnace', 
        'betterend:sandy_jadestone_furnace', 
        'betterend:umbralith_furnace', 
        'betterend:flavolite_furnace', 
        'betterend:virid_jadestone_furnace', 
        'betterend:end_stone_furnace', 
        'betternether:basalt_furnace', 
        'betternether:netherrack_furnace', 
        'betternether:blackstone_furnace', 
        'betterend:azure_jadestone_furnace', 
        'betterend:violecite_furnace'
    ])*/
    /*event.add('forge:workbench', [
        'aether_genesis:skyroot_crafting_table',
        'biomeswevegone:aspen_crafting_table',
        'biomeswevegone:baobab_crafting_table',
        'biomeswevegone:blue_enchanted_crafting_table',
        'biomeswevegone:cika_crafting_table',
        'biomeswevegone:cypress_crafting_table',
        'biomeswevegone:ebony_crafting_table',
        'biomeswevegone:fir_crafting_table',
        'biomeswevegone:florus_crafting_table',
        'biomeswevegone:green_enchanted_crafting_table',
        'biomeswevegone:holly_crafting_table',
        'biomeswevegone:ironwood_crafting_table',
        'biomeswevegone:mahogany_crafting_table',
        'biomeswevegone:maple_crafting_table',
        'biomeswevegone:jacaranda_crafting_table',
        'biomeswevegone:palm_crafting_table',
        'biomeswevegone:pine_crafting_table',
        'biomeswevegone:rainbow_eucalyptus_crafting_table',
        'biomeswevegone:redwood_crafting_table',
        'biomeswevegone:sakura_crafting_table',
        'biomeswevegone:zelkova_crafting_table',
        'biomeswevegone:witch_hazel_crafting_table',
        'biomeswevegone:willow_crafting_table',
        'biomeswevegone:white_mangrove_crafting_table',
        'biomeswevegone:skyris_crafting_table',
        'minecraft:crafting_table'
    ])*/
    /*event.add('minecraft:logs', [
        'aether_redux:fieldsproot_log', 
        'aether_redux:stripped_fieldsproot_log', 
        'aether_redux:sporing_blightwillow_log', 
        'aether_redux:blightwillow_log', 
        'aether_redux:stripped_blightwillow_log', 
        'aether_redux:crystal_log', 
        'aether_redux:stripped_crystal_log', 
        'aether_redux:glacia_log', 
        'aether_redux:stripped_glacia_log',
        'aether_redux:jellyshroom_planks', 
        'aether_redux:cloudcap_planks', 
        'aether_redux:jellyshroom_stem', 
        'aether_redux:jellyshroom_hyphae', 
        'aether_redux:cloudcap_stem', 
        'aether_redux:cloudcap_hyphae',
        'minecraft:stripped_bamboo_block'
    ])*/
    /*event.add('mobsiege:aether_logs', [
        'aether_redux:cloudcap_planks', 
        'aether_redux:jellyshroom_planks',
        'aether_redux:cloudcap_stem', 
        'aether_redux:stripped_cloudcap_stem', 
        'aether_redux:jellyshroom_stem', 
        'aether_redux:jellyshroom_hyphae', 
        'aether_redux:crystal_log', 
        'deep_aether:cruderoot_log', 
        'deep_aether:conberry_log', 
        'aether_redux:stripped_cloudcap_hyphae', 
        'aether_redux:cloudcap_hyphae', 
        'deep_aether:stripped_conberry_log', 
        'deep_aether:stripped_roseroot_log', 
        'aether:golden_oak_log', 
        'deep_aether:yagroot_log', 
        'aether_redux:stripped_fieldsproot_log', 
        'aether:stripped_skyroot_log', 
        'aether_redux:sporing_blightwillow_log', 
        'deep_aether:sunroot_log', 
        'aether:skyroot_log', 
        'aether_redux:glacia_log', 
        'deep_aether:stripped_yagroot_log', 
        'aether_redux:blightwillow_log', 
        'aether_redux:stripped_glacia_log', 
        'aether_redux:stripped_blightwillow_log', 
        'deep_aether:stripped_sunroot_log', 
        'aether_redux:stripped_crystal_log', 
        'deep_aether:roseroot_log', 
        'deep_aether:stripped_cruderoot_log', 
        'aether_redux:fieldsproot_log'
    ])*/
    /*event.add('mobsiege:aether_vines', [
        'aether_redux:corrupted_vines',
        'aether_redux:golden_vines',
        'aether_redux:gilded_vines',
        'deep_aether:yagroot_vine'
    ])
    event.add('mobsiege:vines', [
        'betterend:bulb_vine',
        'betterend:jungle_vine',
        'betterend:twisted_vine',
        'betterend:dense_vine',
        'betternether:neon_equisetum',
        'betternether:blooming_vine',
        'betternether:golden_vine',
        'betternether:black_vine',
        'edenring:eden_vine',
        'minecraft:weeping_vines',
        'minecraft:twisting_vines',
        'minecraft:vine',
        '#mobsiege:aether_vines'
    ])*/

    
    //event.add('forge:storage_blocks/charcoal', 'carbonize:charcoal_block')
    //event.add('forge:storage_blocks/sulfur', ['cinderscapes:sulfur_block', 'alexscaves:sulfur'])
    //event.add('forge:soil/grass', 'edenring:eden_grass', 'edenring:mossy_stone')
    //event.add('forge:sand', ['aether:quicksoil', 'betterend:endstone_dust', 'carbonize:ash_block', 'minecraft:soul_sand', 'betterend:charcoal_block'])

    //event.add('minecraft:mycelium', ['betternether:nether_mycelium', 'edenring:eden_mycelium', 'betterend:end_mycelium', 'betterend:end_mycelium_path'])
    //event.add('minecraft:nylium', ['betterend:mossy_obsidian', 'betternether:netherrack_moss'])
    //event.add('minecraft:planks', '#aether:planks_crafting')
    //event.add('minecraft:sand', '#forge:sand')

})
/*
ServerEvents.tags('item', event => {
    global.signedCall(f => f.wholeTagsCore(event, 'item'))
    //handleTags(event, 'item')

    event.add('forge:dusts/ender_pearl', ['railcraft:ender_dust', 'betterend:ender_dust'])
    event.add('forge:dusts/sulfur', '#forge:sulfurs')
    event.add('minecraft:axes', ['notreepunching:flint_axe', 'natprog:flint_hatchet'])
    event.add('minecraft:saws', '#notreepunching:saws')
    event.add('minecraft:trowels', 'notreepunching:clay_tool')
    event.add('mobsiege:mud', ['minecraft:mud', 'deep_aether:aether_mud'])
    event.add('mobsiege:jelly_blocks', ['aether_redux:jellyshroom_jelly_block', 'betterend:jellyshroom_cap_purple', 'betterend:umbrella_tree_membrane', 'edenring:volvox_block'])
})

ServerEvents.tags('block', event => {
    global.signedCall(f => f.wholeTagsCore(event, 'block'))
    global.accessSoundMap(handler => handler.invoke('setSoundTag', {event: event}))
    //handleTags(event, 'block')

    event.add('minecraft:needs_stone_tool', [
        'carbonize:charcoal_block', 
        'carbonize:charcoal_log', 
        'carbonize:charcoal_planks', 
        'carbonize:charcoal_stairs', 
        'carbonize:charcoal_slab', 
        '#minecraft:logs'
    ])

    //event.add('mobsiege:mycelium_step', '#forge:mycelium')
    //event.add('mobsiege:grass_step', ['#minecraft:mycelium', 'biomeswevegone:overgrown_dacite', 'biomeswevegone:overgrown_stone'])

    event.add('carbonize:charcoal_block', ['notreepunching:mineable','minecraft:mineable/pickaxe', 'forge:storage_blocks/charcoal'])
    event.add('minecraft:mineable/hoe', 'betterend:glowing_pillar_luminophor')
    event.add('minecraft:mineable/shovel', 'betterend:charcoal_block')

    event.remove('forge:storage_block/charcoal', 'betterend:charcoal_block')
    event.remove('minecraft:mineable/pickaxe', 'betterend:charcoal_block')
    event.remove('minecraft:nylium', ['edenring:eden_grass', 'edenring:eden_mycelium'])
})*/
/*
const tancc = 'toughasnails:climate_clemency'
PlayerEvents.tick(event => {
    var player = event.player
    var playerName = player.getGameProfile().getName()
    if (player.inventory.contains(global.REGULATOR) && !player.hasEffect(tancc))
        player.server.runCommandSilent('execute run effect give ' + playerName + ' ' + tancc + ' infinite')
    if (!player.inventory.contains(global.REGULATOR) && player.hasEffect(tancc)) 
        player.server.runCommandSilent('execute run effect clear ' + playerName + ' ' + tancc)
})*/