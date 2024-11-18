const ForgeRegistries = Java.loadClass('net.minecraftforge.registries.ForgeRegistries')
const Shapes = Java.loadClass('net.minecraft.world.phys.shapes.Shapes')
const Blocks = Java.loadClass('net.minecraft.world.level.block.Blocks')

function register(ids, calls) {
    comfuncs.addSignedCalls(ids, calls)
}

// Covers Wood and Stone Age
register('recipes', context => {
    var {tag, recipes} = context
    
    recipes.generate('minecraft:dirt', ['minecraft:emerald', 'minecraft:apple', 'minecraft:diamond', 'minecraft:stone', 'minecraft:redstone'])
        .rollingSquare([1], 3)
        .rotate(1)
        .next()
        .vanilla()
    //recipes.vanillaInsert('minecraft:coal', ['minecraft:stick', [1, 3, 4, 5, 7]], 3)
    //recipes.snakeTrailingSquare(3, 'minecraft:dirt', ['minecraft:emerald', 'minecraft:apple', 'minecraft:diamond', 'minecraft:stone', 'minecraft:redstone'])
    //recipes.rotatingSquare(3, 'minecraft:dirt', ['minecraft:emerald', 'minecraft:apple', 'minecraft:diamond', 'minecraft:stone', 'minecraft:redstone'])
})

register('itemTags', itemTags => {
    
})

register('blockTags', blockTags => {
})

register('commonTags', commonTags => {

})


/*
register('data', context => {
    var {globalTags, itemTags, blockTags, commonTags, lootTables, recipes} = context.functions
   
    //////Wood//////Wood//////Wood//////Wood//////Wood//////Wood//////Wood//////
    commonTags.unifiedHandle([
        ['planks', '#aether:planks_crafting'],
        ['|aether_logs', [
            'aether:golden_oak_log', 
            'aether:stripped_skyroot_log', 
            'aether:skyroot_log', 
            'aether_redux:glacia_log', 
            'aether_redux:cloudcap_planks', 
            'aether_redux:jellyshroom_planks',
            'aether_redux:cloudcap_stem', 
            'aether_redux:stripped_cloudcap_stem', 
            'aether_redux:jellyshroom_stem', 
            'aether_redux:jellyshroom_hyphae', 
            'aether_redux:crystal_log', 
            'aether_redux:stripped_cloudcap_hyphae', 
            'aether_redux:cloudcap_hyphae', 
            'aether_redux:stripped_fieldsproot_log', 
            'aether_redux:sporing_blightwillow_log', 
            'aether_redux:blightwillow_log', 
            'aether_redux:stripped_glacia_log', 
            'aether_redux:stripped_blightwillow_log', 
            'aether_redux:stripped_crystal_log', 
            'aether_redux:fieldsproot_log',
            'deep_aether:cruderoot_log', 
            'deep_aether:conberry_log', 
            'deep_aether:stripped_conberry_log', 
            'deep_aether:stripped_roseroot_log', 
            'deep_aether:yagroot_log', 
            'deep_aether:sunroot_log', 
            'deep_aether:stripped_yagroot_log', 
            'deep_aether:stripped_sunroot_log', 
            'deep_aether:roseroot_log', 
            'deep_aether:stripped_cruderoot_log'
        ]],
        ['logs', [
            globalTags.defaultTag('|aether_logs'),
            'minecraft:bamboo_block',
            'minecraft:stripped_bamboo_block'
        ]],
    ])
    recipes.replace({input: '#notreepunching:h/saws', output: 'minecraft:stick'}, result => {
        recipes.toolDamagingShapeless('2x ' + result, ['#minecraft:saws', '#minecraft:planks'])
        recipes.toolDamagingShapeless('8x ' + result, ['#minecraft:saws', '#minecraft:logs'])
    })
    recipes.replace({input: '#notreepunching:weak_saws', output: 'minecraft:stick'}, result => {
        recipes.toolDamagingShapeless(result, ['#minecraft:axes', '#minecraft:planks'])
        recipes.toolDamagingShapeless('6x ' + result, ['#minecraft:axes', '#minecraft:logs'])
    })
    recipes.replaceTagRecipes({type: 'minecraft:crafting_shaped', input: '#aether:skyroot_repairing', output: 'aether:skyroot_stick'}, (output, ingredients) => {
            recipes.toolDamagingShapeless(Item.of(output).withCount(1), [ingredients[0], '#minecraft:axes'])
            recipes.toolDamagingShapeless(Item.of(output).withCount(2), [ingredients[0], '#minecraft:saws'])
            recipes.toolDamagingShapeless(Item.of(output).withCount(6), [globalTags.defaultTag('|aether_logs'), '#minecraft:axes'])
            recipes.toolDamagingShapeless(Item.of(output).withCount(8), [globalTags.defaultTag('|aether_logs'), '#minecraft:saws'])
    })
    recipes.replaceTagRecipes({type: 'minecraft:crafting_shapeless', input: ['#minecraft:logs', '#minecraft:axes'], output: '#minecraft:planks'}, (output, ingredients) => {
        recipes.toolDamagingShapeless(Item.of(output).withCount(3), [ingredients[0], '#minecraft:axes'])
        recipes.toolDamagingShapeless(Item.of(output).withCount(4), [ingredients[0], '#minecraft:saws'])
    })
    recipes.shapeless('minecraft:stick', '#minecraft:saplings')
    recipes.insertion('2x minecraft:stick', recipes.insert(globalTags.defaultTag('|vines'), [0, 3]))
    recipes.insertion('2x aether:skyroot_stick', recipes.insert(globalTags.defaultTag('|aether_vines'), [0, 3]))
    //////Stone//////Stone//////Stone//////Stone//////Stone//////Stone//////Stone//////
    blockTags.add('notreepunching:loose_rock_placeable_on', '#forge:stone')
    //////Plant//////Plant//////Plant//////Plant//////Plant//////Plant//////Plant//////
    commonTags.unifiedHandle([
        ['|aether_vines', [
            'aether_redux:corrupted_vines',
            'aether_redux:golden_vines',
            'aether_redux:gilded_vines',
            'deep_aether:yagroot_vine'
        ]],
        ['|vines', [
            local.defaultTag('|aether_vines'),
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
        ]]
    ])
    recipes.replace({input: 'minecraft:vine', output: 'notreepunching:plant_fiber'}, result => 
        recipes.toolDamagingShapeless('3x ' + result, [globalTags.defaultTag('|vines'), '#notreepunching:knives'])
    )
    recipes.toolDamagingShapeless('2x notreepunching:plant_fiber', ['#minecraft:wart_blocks', '#notreepunching:knives'])    
    //////Charcoal//////Charcoal//////Charcoal//////Charcoal//////Charcoal//////Charcoal//////Charcoal//////
    blockTags.unifiedHandle([
        ['carbonize:charcoal_block', ['notreepunching:mineable','minecraft:mineable/pickaxe']],
        ['minecraft:needs_stone_tool', [
        'carbonize:charcoal_block', 
        'carbonize:charcoal_log', 
        'carbonize:charcoal_planks', 
        'carbonize:charcoal_stairs', 
        'carbonize:charcoal_slab', 
        '#minecraft:logs'
        ]]
    ])
    ForgeRegistries.BLOCKS.getEntries().forEach(blockEntry => {
        try {
            let blockState = blockEntry.getValue().defaultBlockState()
            let fabricfbr = Blocks.FIRE.fabric_getVanillaEntry(blockState)
            if (Shapes.block().equals(blockState.getCollisionShape(null, null, null)))
                if (!blockState.isFlammable(null, null, null) && !(fabricfbr.getSpreadChance() > 0 || fabricfbr.getSpreadChance() > 0))
                    blockTags.add('carbonize:charcoal_pile_valid_wall', blockEntry.getKey().location().toString())
        } catch (err) {}
    });
    commonTags.add('carbonize:charcoal_block', 'forge:storage_blocks/charcoal')
    lootTables.replaceBasiclt(lootTables.createBasicLt((materialTag, block) => 'minecraft:charcoal', lootTables.explosionDecay(), [
        blockEntry({functions: [setCountFunction(rangeCount(0, 1), false), basicFortuneLtFunction(1)]}, 'carbonize:charcoal_log'),
        blockEntry({functions: [setCountFunction(rangeCount(1, 2), false), basicFortuneLtFunction(0.6)]}, 'carbonize:charcoal_planks'),
        blockEntry({functions: setCountFunction(constantCount(1), false)}, 'carbonize:charcoal_stairs'),
        blockEntry({functions: setCountFunction(rangeCount(0, 1), false)}, 'carbonize:charcoal_slab')
    ]))
    recipes.remove({output: 'minecraft:charcoal', type: 'minecraft:smelting'})
    //////Clay//////Clay//////Clay//////Clay//////Clay//////Clay//////Clay//////
    commonTags.unifiedHandle([
        ['|mud', ['minecraft:mud', 'deep_aether:aether_mud']]
        ['|jelly_blocks', ['aether_redux:jellyshroom_jelly_block', 'betterend:jellyshroom_cap_purple', 'betterend:umbrella_tree_membrane', 'edenring:volvox_block']],
        ['%sand', [
            'aether:quicksoil', 
            'betterend:endstone_dust', 
            'carbonize:ash_block', 
            'minecraft:soul_sand', 
            'betterend:charcoal_block'
        ]],
        ['sand', '#forge:sand'],
        ['wart_blocks', 'voidscape:thuder_wart']
    ])
    recipes.toolDamagingShapeless('notreepunching:clay_brick', ['minecraft:clay_ball', 'minecraft:clay_ball', '#minecraft:shovels'])
    recipes.toolDamagingShapeless('2x notreepunching:clay_brick', ['minecraft:clay', '#minecraft:shovels'])
    recipes.rotatingSquare(2, '2x minecraft:clay', ['#forge:sand', '#mobsiege:jelly_blocks'])
    recipes.rotatingSquare(2, '2x minecraft:clay', ['#forge:sand', '#minecraft:wart_blocks'])
    recipes.rotatingSquare(2, '2x minecraft:clay', ['aether_redux:holysilt', '#mobsiege:mud'])
    recipes.rotatingSquare(2, '2x minecraft:gravel', ['minecraft:end_stone', 'promenade:dark_amaranth_wart_block'])
    recipes.rotatingSquare(2, '2x minecraft:gravel', ['aether_redux:driftshale', '#mobsiege:mud'])
    //////Workbench//////Workbench//////Workbench//////Workbench//////Workbench//////Workbench//////Workbench//////
    commonTags.add('forge:workbench', [
        '#blue_skies:crafting_tables',
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
    ])
    recipes.remove({id: 'ancient_aether:skyroot_crafting_table_from_ancient_aether_planks'})
    recipes.remove({id: 'deep_aether:skyroot_crafting_table'})
    recipes.replaceInput({input: 'minecraft:crafting_table'}, 'minecraft:crafting_table', '#forge:workbench')
    recipes.replaceTagRecipes({type: 'minecraft:crafting_shaped', output: '#forge:workbench'}, (output, ingredients) => { //can I ignore excess params???
        if (output.equalsIgnoringCount(Item.of('aether_genesis:skyroot_crafting_table')))
            ingredients[0] = '#aether:planks_crafting'
        else if (output.equalsIgnoringCount(Item.of('minecraft:crafting_table'))) 
            ingredients[0] = '#minecraft:planks'
        recipes.toolDamagingShapeless(output, [ingredients[0], ingredients[0], '#minecraft:axes'])
        recipes.toolDamagingShapeless(output, [ingredients[0], '#minecraft:saws'])
    })
    recipes.shapeless('minecraft:crafting_table', '#forge:workbench')
    //////Furnace//////Furnace//////Furnace//////Furnace//////Furnace//////Furnace//////Furnace//////
    commonTags.add('forge:furnaces', [
        'aether_genesis:holystone_furnace',
        'betterend:sulphuric_rock_furnace', 
        'betterend:sandy_jadestone_furnace', 
        'betterend:umbralith_furnace', 
        'betterend:flavolite_furnace', 
        'betterend:virid_jadestone_furnace', 
        'betterend:end_stone_furnace', 
        'betterend:azure_jadestone_furnace', 
        'betterend:violecite_furnace',
        'betternether:basalt_furnace', 
        'betternether:netherrack_furnace', 
        'betternether:blackstone_furnace',
        'quark:deepslate_furnace',
        'quark:blackstone_furnace',
    ])
    recipes.replaceInput({input: 'minecraft:furnace'}, 'minecraft:furnace', '#forge:furnaces')
    recipes.replaceTagRecipes({type: 'minecraft:crafting_shaped', output: '#forge:furnaces'}, (output, ingredients, id) => {
        if (output.equalsIgnoringCount(Item.of('minecraft:furnace'))) {
            if (id == 'minecraft:furnace')
                recipes.planet(output, 'minecraft:bricks', ingredients[0])
        } else recipes.planet(output, 'minecraft:bricks', ingredients[0])
    })
    recipes.removeAndHide('betternether:blackstone_furnace')
    //////Campfire//////Campfire//////Campfire//////Campfire//////Campfire//////Campfire//////Campfire//////
    recipes.insertion('minecraft:campfire', [
        recipes.insert('#minecraft:torches/temp', [1, 3, 5]), local.insert('#minecraft:coals', 4), 
        recipes.insert('#minecraft:planks', [6, 7, 8])
    ])
    //////Torch//////Torch//////Torch//////Torch//////Torch//////Torch//////Torch//////
    itemTags.unifiedHandle([
        ['minecraft:torches/temp', ['hardcore_torches:unlit_torch', 'hardcore_torches:lit_torch']],
        ['hardcore_torches:free_torch_light_items', null, 'minecraft:lava_bucket']
    ])
    recipes.remove({id: 'hardcore_torches:lit_torch'})
    recipes.remove({id: 'hardcore_torches:light_torch_free_item'})
    recipes.removeIO('hardcore_torches:smoldering_torch')
    recipes.replaceOutput('2x minecraft:torch', result => recipes.shapeless(result, 
        ['minecraft:glowstone_dust', '#minecraft:torches/temp', '#minecraft:torches/temp']
    ))
    recipes.replaceOutput('4x hardcore_torches:unlit_torch', result => recipes.insertion(result,
        [recipes.insert('#minecraft:coals', 0), recipes.insert('#forge:rods/wooden', 3)]
    ))
    recipes.replaceOutput('4x minecraft:torch', result => recipes.insertion(result, 
        [local.insert('minecraft:glowstone_dust', 0), recipes.insert('#minecraft:coals', 3), recipes.insert('#forge:rods/wooden', 6)]
    ))
    recipes.replaceOutput('hardcore_torches:fire_starter', result => local.variableInsertion(2, result, 
        [recipes.insert('#notreepunching:string', 0), recipes.insert('#forge:rods/wooden', [1, 2])]
    ))
    recipes.planet('8x hardcore_torches:unlit_torch', '#minecraft:coals', 'hardcore_torches:burnt_torch')
    //////Tools//////Tools//////Tools//////Tools//////Tools//////Tools//////Tools//////
    itemTags.unifiedHandle([
        ['minecraft:axes', ['notreepunching:flint_axe', 'natprog:flint_hatchet']],
        ['minecraft:saws', '#notreepunching:saws'],
        ['minecraft:trowels', 'notreepunching:clay_tool']
        ['notreepunching:knives', '#minecraft:axes']
    ])
    comfuncs.regexEach(
        ['aether:{name}_sword', 'aether:{name}_pickaxe', 'aether:{name}_axe', 'aether:{name}_shovel', 'aether:{name}_hoe'],
        ['skyroot', 'holystone'], 
        output => recipes.remove({output: output})
    )
    recipes.insertion('notreepunching:flint_axe', [recipes.insert('#notreepunching:string', 0), 
        recipes.insert('#forge:rods/wooden', [3, 6]), recipes.insert('notreepunching:flint_shard', [1, 4])]
    )
})*/