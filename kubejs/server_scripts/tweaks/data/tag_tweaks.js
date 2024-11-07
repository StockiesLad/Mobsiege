const BOTH = ['item', 'block']

const TAG_MAP = [ 
    entry('mobsiege', [
        entry('aether_logs',
            entry(BOTH, 
                entry('add', 
                    entry(null, [
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
                    ])
                )
            )
        ),
        entry('aether_vines',
            entry(BOTH,
                entry('add',
                    entry(null, [
                        'aether_redux:corrupted_vines',
                        'aether_redux:golden_vines',
                        'aether_redux:gilded_vines',
                        'deep_aether:yagroot_vine'
                    ])
                )
            )
        ),
        entry('vines', 
            entry(BOTH, 
                entry('add', 
                    entry(null, [
                        '#mobsiege:aether_vines',
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
                        'minecraft:vine'
                    ])
                )
            )
        ),
    ]),
    entry('forge', [
        entry('furnaces', 
            entry(BOTH, 
                entry('add', [
                    entry('betterend', [
                        'sulphuric_rock_furnace', 
                        'sandy_jadestone_furnace', 
                        'umbralith_furnace', 
                        'flavolite_furnace', 
                        'virid_jadestone_furnace', 
                        'end_stone_furnace', 
                        'azure_jadestone_furnace', 
                        'violecite_furnace',
                    ]),
                    entry(null, [
                        'aether_genesis:holystone_furnace',
                        'betternether:basalt_furnace', 
                        'betternether:netherrack_furnace', 
                        'betternether:blackstone_furnace',
                        'quark:deepslate_furnace',
                        'quark:blackstone_furnace'
                    ])
                ])
            )
        ),
        entry('workbench', 
            entry(BOTH,
                entry('add', [
                    entry(null, [
                        'aether_genesis:skyroot_crafting_table',
                        'minecraft:crafting_table'
                    ]),
                    entry('biomeswevegone', [
                        'aspen_crafting_table',
                        'baobab_crafting_table',
                        'blue_enchanted_crafting_table',
                        'cika_crafting_table',
                        'cypress_crafting_table',
                        'ebony_crafting_table',
                        'fir_crafting_table',
                        'florus_crafting_table',
                        'green_enchanted_crafting_table',
                        'holly_crafting_table',
                        'ironwood_crafting_table',
                        'mahogany_crafting_table',
                        'maple_crafting_table',
                        'jacaranda_crafting_table',
                        'palm_crafting_table',
                        'pine_crafting_table',
                        'rainbow_eucalyptus_crafting_table',
                        'redwood_crafting_table',
                        'sakura_crafting_table',
                        'zelkova_crafting_table',
                        'witch_hazel_crafting_table',
                        'willow_crafting_table',
                        'white_mangrove_crafting_table',
                        'skyris_crafting_table',
                        
                    ])
                ])
            )
        ),
        entry('storage_blocks/charcoal', 
            entry(BOTH, 
                entry('add', [
                    entry(null, [
                        'carbonize:charcoal_block',
                        'quark:charcoal_block',
                        'blockus:charcoal_block',
                    ])
                ])
            )
        ),
        entry('storage_blocks/sulfur', 
            entry(BOTH, 
                entry('add', [
                    entry(null, [
                        'cinderscapes:sulfur_block', 
                        'alexscaves:sulfur'
                    ])
                ])
            )
        ),
        entry('soil/grass', 
            entry(BOTH, 
                entry('add', [
                    entry(null, [
                        'edenring:eden_grass', 
                        'edenring:mossy_stone'
                    ])
                ])
            )
        ),
        entry('sand', 
            entry(BOTH, 
                entry('add', [
                    entry(null, [
                        'aether:quicksoil', 
                        'betterend:endstone_dust', 
                        'carbonize:ash_block', 
                        'minecraft:soul_sand', 
                        'betterend:charcoal_block'
                    ])
                ])
            )
        ),
        entry('raw_materials/redstone', 
            entry('item', 
                entry('add', entry(null, 'createoreexcavation:raw_redstone'))
            )
        ),
        entry('raw_materials/uranium', 
            entry('item', [
                entry('remove', entry(null,'alexscaves:uranium'))
            ])
        ),
        entry('ingots/uranium', 
            entry('item', [
                entry('add', entry(null, 'alexscaves:uranium'))
            ])
        )
    ]),
    entry('minecraft', [
        entry('logs',
            entry(BOTH, 
                entry('add', entry(null, [
                    '#mobsiege:aether_logs',
                    'minecraft:bamboo_block',
                    'minecraft:stripped_bamboo_block'
                ]))
            )
        ),
        entry('mycelium',
            entry(BOTH, 
                entry('add', 
                    entry(null, [
                        'betternether:nether_mycelium', 
                        'edenring:eden_mycelium', 
                        'betterend:end_mycelium', 
                        'betterend:end_mycelium_path'
                    ])
                )
            )
        ),
        entry('nylium',
            entry(BOTH, 
                entry('add', 
                    entry(null, [
                        'betterend:mossy_obsidian', 
                        'betternether:netherrack_moss'
                    ])
                )
            )
        ),
        entry('planks',
            entry(BOTH, 
                entry('add', entry(null, '#aether:planks_crafting'))
            )
        ),
        entry('sand',
            entry(BOTH, 
                entry('add', entry(null, '#forge:sand'))
            )
        )
    ]),
]

function entry(id, entries) {
    return {
        id: id,
        entries: entries
    }
}

function handleTags(event, eventType) {
    TAG_MAP.forEach(tagMod => {
        global.ensureArray(tagMod.entries).forEach(tagLocation => {
            let tag = global.appendResourceLocation(tagMod.id, tagLocation.id)
            global.ensureArray(tagLocation.entries).forEach(tagTypes => {
                global.ensureArray(tagTypes.id).forEach(tagType => {
                    if (eventType === tagType) {
                        global.ensureArray(tagTypes.entries).forEach(handleType => {
                            global.ensureArray(handleType.entries).forEach(identifier => {
                                if (identifier.id != null) {
                                    global.ensureArray(identifier.entries).forEach(locationId => {
                                        if (handleType.id === 'add') {
                                            event.add(tag, global.appendResourceLocation(identifier.id, locationId))
                                        } else if (handleType.id === 'remove') {
                                            event.remove(tag, global.appendResourceLocation(identifier.id, locationId))
                                        }
                                    })
                                } else {
                                    global.ensureArray(identifier.entries).forEach(locationId => {
                                        if (handleType.id === 'add') {
                                            event.add(tag, locationId)
                                        } else if (handleType.id === 'remove') {
                                            event.remove(tag, locationId)
                                        }
                                    })
                                }
                            })
                        })
                    }
                })
            })
        })
    })
}

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
})

const ForgeRegistries = Java.loadClass('net.minecraftforge.registries.ForgeRegistries')
const Shapes = Java.loadClass('net.minecraft.world.phys.shapes.Shapes')
const Blocks = Java.loadClass('net.minecraft.world.level.block.Blocks')
ServerEvents.tags('block', event => {
    ForgeRegistries.BLOCKS.getEntries().forEach(blockEntry => {
        let fullBlock = Shapes.block()
        let block = blockEntry.getValue()
        try {
            let blockState = block.defaultBlockState()
            let fabricfbr = Blocks.FIRE.fabric_getVanillaEntry(blockState)

            if (fullBlock.equals(blockState.getCollisionShape(null, null, null)))
                if (!blockState.isFlammable(null, null, null) && !(fabricfbr.getSpreadChance() > 0 || fabricfbr.getSpreadChance() > 0))
                    event.add('carbonize:charcoal_pile_valid_wall', blockEntry.getKey().location().toString())
        } catch (err) {}
    });
})

ServerEvents.tags('item', event => {
    event.add('minecraft:torches/temp', ['hardcore_torches:unlit_torch', 'hardcore_torches:lit_torch'])
    event.remove('hardcore_torches:free_torch_light_items', 'minecraft:lava_bucket')
})

ServerEvents.tags('item', event => {
    event.add('notreepunching:knives', '#minecraft:axes')
})
  
ServerEvents.tags('block', event => {
    event.add('notreepunching:loose_rock_placeable_on', '#forge:stone')
})
