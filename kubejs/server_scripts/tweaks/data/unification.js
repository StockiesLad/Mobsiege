//Covers World Gen & World Interaction like material unification, sounds, sky, time, etc
/*register('data', context => {
    var {globalTags, itemTags, blockTags, commonTags, lootTables, recipes} = context.functions

    //Footsteps
    global.accessSoundMap(handler => handler.invoke('setSoundTag', {event: blockTags}))
    //Charcoal
    blockTags.remove('forge:storage_block/charcoal', 'betterend:charcoal_block')
    commonTags.add('forge:storage_blocks/charcoal', [
        'carbonize:charcoal_block',
        'quark:charcoal_block',
        'blockus:charcoal_block',
    ])
    recipes.remove({id: 'betterend:charcoal_block'})
    recipes.rotatingSquare(2, '2x betterend:charcoal_block', ['#forge:storage_blocks/charcoal', 'minecraft:soul_sand'])
    //Sulfur
    itemTags.add('forge:dusts/sulfur', '#forge:sulfurs')
    commonTags.add('forge:storage_blocks/sulfur', [
        'cinderscapes:sulfur_block', 
        'alexscaves:sulfur'
    ])
    lootTables.replaceBasiclt(lootTables.createBasicLt(
        AlmostUnified.getPreferredItemForTag('forge:gems/sulfur').getIdLocation().toString(), 
        [basicFortuneLtFunction(1), limitCountFunction(1, 5), lootTables.explosionDecay()], [
            blockEntry({functions: [setCountFunction(rangeCount(0, 1), false), basicFortuneLtFunction(1)]}, 'carbonize:charcoal_log'),
            blockEntry({functions: [setCountFunction(rangeCount(1, 2), false), basicFortuneLtFunction(0.6)]}, 'carbonize:charcoal_planks'),
            blockEntry({functions: setCountFunction(constantCount(1), false)}, 'carbonize:charcoal_stairs'),
            blockEntry({functions: setCountFunction(rangeCount(0, 1), false)}, 'carbonize:charcoal_slab')
    ]))
    //Ender Pearl
    itemTags.add('forge:dusts/ender_pearl', ['railcraft:ender_dust', 'betterend:ender_dust'])
    //Gunpowder
    recipes.remove({id: 'alexscaves:gunpowder_from_sulfur'})
    recipes.replace({id: 'betterend:sulphur_gunpowder'}, () => local.insertion(
        AlmostUnified.getPreferredItemForTag('forge:dusts/sulfur'), local.insert('betterend:crystalline_sulphur', [0, 3])
    ))
    //Uranium
    itemTags.replaceTag('alexscaves:uranium', 'forge:raw_materials/uranium', 'forge:ingots/uranium')
    recipes.remove([{id: 'biggerreactors:smelting/uranium_chunk'}, {id: 'biggerreactors:blasting/uranium_chunk'}])
    //Rose Gold
    recipes.shapeless(
        Item.of(AlmostUnified.getPreferredItemForTag('forge:dusts/rose_gold').getIdLocation(), 2), 
        [AlmostUnified.getPreferredItemForTag('forge:dusts/copper'), AlmostUnified.getPreferredItemForTag('forge:dusts/gold')]
    )
    //Redstone
    itemTags.add('forge:raw_materials/redstone', 'createoreexcavation:raw_redstone')
    recipes.smelting('2x minecraft:redstone', 'createoreexcavation:raw_redstone').xp(0.7)
    //Ash
    recipes.insertion('3x carbonize:ash_layer', local.insert('carbonize:ash_block', [0, 1]))
    recipes.square(2, 'carbonize:ash_block', 'carbonize:ash')
    //Bone
    recipes.shapeless('5x minecraft:bone', ['minecraft:bone_block', 'minecraft:bone_block'])
    recipes.square(2, 'minecraft:bone_block', 'edenring:balloon_mushroom_stem')
    //Stone
    recipes.square(2, 'minecraft:end_stone', 'betterend:endstone_dust')
    //Plant
    blockTags.unifiedHandle([
        ['minecraft:mineable/hoe', 'betterend:glowing_pillar_luminophor'],
        ['minecraft:mineable/shovel', 'betterend:charcoal_block']
        ['minecraft:mineable/pickaxe', null, 'betterend:charcoal_block'],
        ['minecraft:nylium', null, ['edenring:eden_grass', 'edenring:eden_mycelium']]
    ])
    local.unifiedAdd([          
        ['mycelium', [
            'betterend:end_mycelium', 
            'betterend:end_mycelium_path',
            'betternether:nether_mycelium', 
            'edenring:eden_mycelium'
        ]],
        ['nylium', [
            'betterend:mossy_obsidian', 
            'betternether:netherrack_moss'
        ]],
        ['%soil/grass', [
            'edenring:eden_grass', 
            'edenring:mossy_stone'
        ]]
    ])
    recipes.rotatingSquare(2, '2x betterend:neon_cactus', ['betternether:nether_cactus', 'betternether:neon_equisetum'])
    //Ores
    lootTables.replaceBasiclt([
        {
            dropMaterial: (materialTag, block) => AlmostUnified.getPreferredItemForTag('forge:raw_materials/uranium').getIdLocation().toString(),
            functions: [lootTables.basicFortuneLtFunction(1), {function: "minecraft:explosion_decay"}],
            blocks: [
                lootTables.blockEntry({functions: lootTables.setCountFunction(rangeCount(2, 5), false)}, 'alexscaves:radrock_uranium_ore'),
                lootTables.blockEntry({functions: lootTables.setCountFunction(rangeCount(1, 2), false)}, [
                    'beo:end_uranium_ore', 
                    'bno:nether_uranium_ore',
                    'mekanism:uranium_ore',
                    'mekanism:deepslate_uranium_ore',
                    'mekanismaaa:glacio_uranium_ore',
                    'mekanismaaa:mars_uranium_ore',
                    'mekanismaaa:mercury_uranium_ore',
                    'mekanismaaa:venus_uranium_ore'
                ])
            ]
        },
        {
            dropMaterial: (materialTag, block) => AlmostUnified.getPreferredItemForTag(materialTag + block.toString().split('_')[1]).getIdLocation().toString(),
            functions: [lootTables.setCountFunction(lootTables.rangeCount(1, 4), false), lootTables.basicFortuneLtFunction(1), {function: "minecraft:explosion_decay"}],
            blocks: [
                lootTables.simpleBlockEntry([
                    'beo:end_silver_ore', 
                    'beo:end_osmium_ore', 
                    'beo:end_lead_ore', 
                    'beo:end_aluminum_ore', 
                    'beo:end_nickel_ore', 
                    'beo:end_tin_ore', 
                    'beo:end_zinc_ore',
                    'bno:nether_silver_ore',
                    'bno:nether_lead_ore',
                    'bno:nether_nickel_ore',
                    'bno:nether_aluminum_ore',
                    'bno:nether_tin_ore',
                    'bno:nether_osmium_ore',
                    'bno:nether_zinc_ore'
                ])
            ]
        },
        {
            dropMaterial: (materialTag, block) => AlmostUnified.getPreferredItemForTag(materialTag + block.toString().split(':')[1].split('_')[0]).getIdLocation().toString(),
            functions: [lootTables.setCountFunction(lootTables.constantCount(1), false), lootTables.basicFortuneLtFunction(1), {function: "minecraft:explosion_decay"}],
            blocks: [
                lootTables.blockEntry({literalDrop: 'createoreexcavation:raw_redstone'}, 'gravelores:redstone_gravel_ore'),
                lootTables.blockEntry({literalDrop: 'minecraft:coal'}, 'gravelores:coal_gravel_ore'),
                lootTables.blockEntry({materialTag: 'forge:dusts/'}, [
                    'gravelores:cobalt_gravel_ore'
                ]),
                lootTables.blockEntry({materialTag: 'forge:gems/'}, [
                    'gravelores:emerald_gravel_ore',
                    'gravelores:diamond_gravel_ore',
                    'gravelores:lapis_gravel_ore',
                    'gravelores:quartz_gravel_ore'
                ]),
                lootTables.simpleBlockEntry([
                    'gravelores:uranium_gravel_ore',
                    'gravelores:silver_gravel_ore', 
                    'gravelores:aluminum_gravel_ore', 
                    'gravelores:copper_gravel_ore', 
                    'gravelores:iron_gravel_ore', 
                    'gravelores:osmium_gravel_ore', 
                    'gravelores:nickel_gravel_ore', 
                    'gravelores:zinc_gravel_ore', 
                    'gravelores:lead_gravel_ore', 
                    'gravelores:tin_gravel_ore', 
                    'gravelores:gold_gravel_ore'
                ])
            ]
        }
    ])
})*/


  

  
