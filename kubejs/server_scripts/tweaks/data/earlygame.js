const ForgeRegistries = Java.loadClass('net.minecraftforge.registries.ForgeRegistries')
const Shapes = Java.loadClass('net.minecraft.world.phys.shapes.Shapes')
const Blocks = Java.loadClass('net.minecraft.world.level.block.Blocks')

var kilnSmeltingMaterials = [
    "aluminum",
    "copper",
    "elementium",
    "gold",
    "iron",
    "lead",
    "nickel",
    "osmium",
    "silver",
    "tin",
    "uranium",
    "zinc"
]

// Covers Wood and Stone Age
register('recipes', context => {
    var {event, funcs} = context
    var {generate} = funcs

    funcs.removeAll([
        {output: 'minecraft:charcoal', type: 'minecraft:smelting'},
        {id: 'ancient_aether:skyroot_crafting_table_from_ancient_aether_planks'},
        {id: 'deep_aether:skyroot_crafting_table'},
        {id: 'hardcore_torches:lit_torch'},
        {id: 'hardcore_torches:light_torch_free_item'},
        {id: 'quark:building/crafting/furnaces/blackstone_blast_furnace'},
        {id: 'quark:building/crafting/furnaces/deepslate_blast_furnace'},
        {id: 'aether_genesis:holystone_blast_furnace'}
    ])
    funcs.removeIO('hardcore_torches:smoldering_torch')
    funcs.removeAndHide('betternether:blackstone_furnace')
    funcs.removeAndHide('primalstage:flint_pickaxe')
    funcs.removeAndHide('primalstage:flint_shovel')
    funcs.removeAndHide('primalstage:plant_fiber')
    comfuncs.hide('primalstage:plant_twine')
    comfuncs.regexEach(
        entry => [`aether:${entry}_sword`, `aether:${entry}_pickaxe`, `aether:${entry}_axe`, `aether:${entry}_shovel`, `aether:${entry}_hoe`],
        ['skyroot', 'holystone'], 
        funcs.removeAndHide
    )
    comfuncs.regexEach(
        entry => [`minecraft:${entry}_sword`, `minecraft:${entry}_pickaxe`, `minecraft:${entry}_axe`, `minecraft:${entry}_shovel`, `minecraft:${entry}_hoe`],
        ['wooden', 'stone'], 
        funcs.removeAndHide
    )

    event.replaceInput({input: 'minecraft:crafting_table'}, 'minecraft:crafting_table', '#forge:workbench')
    event.replaceInput({input: 'minecraft:furnace'}, 'minecraft:furnace', '#forge:furnaces')
    event.replaceInput({input: 'primalstage:plant_twine'}, 'primalstage:plant_twine', 'notreepunching:plant_string')
    funcs.replaceOutputRecipe('minecraft:furnace', result => generate(result, ['#forge:stone', comfuncs.packDef('advanced_fire_bricks')]).rollingSquare(1, 3).override(['primalstage:kiln', 4]).next().vanilla())
    funcs.replaceOutputRecipe('4x hardcore_torches:unlit_torch', result => funcs.vanillaInsert(result,[['#minecraft:coals', 0], ['#forge:rods/wooden', 3]]))
    funcs.replaceOutputRecipe('hardcore_torches:fire_starter', result => funcs.vanillaInsert(result, [['#notreepunching:string', 0], ['#forge:rods/wooden', [1, 2]]]))
    funcs.replaceOutputRecipe('2x minecraft:torch', result => event.shapeless(result, ['minecraft:glowstone_dust', '#minecraft:torches/temp', '#minecraft:torches/temp']))
    funcs.replaceOutputRecipe('4x minecraft:torch', result => funcs.vanillaInsert(result, [['minecraft:glowstone_dust', 0], ['#minecraft:coals', 3], ['#forge:rods/wooden', 6]]))
    funcs.replaceOutputRecipe('primalstage:flint_hatchet', result => funcs.vanillaInsert(result, [['notreepunching:flint_shard', [0, 1]], ['#forge:rods/wooden', 2], ['#forge:string', 3]]))
    funcs.replaceOutputRecipe('notreepunching:flint_axe', result => funcs.vanillaInsert(result, [['#notreepunching:string', 0], ['#forge:rods/wooden', [3, 6]], ['notreepunching:flint_shard', [1, 4]]]))
    funcs.replace({input: '#notreepunching:h/saws', output: 'minecraft:stick'}, result => {
        funcs.toolDamagingShapeless('2x ' + result, ['#minecraft:saws', '#minecraft:planks'])
        funcs.toolDamagingShapeless('8x ' + result, ['#minecraft:saws', '#minecraft:logs'])
    })
    funcs.replace({input: '#notreepunching:weak_saws', output: 'minecraft:stick'}, result => {
        funcs.toolDamagingShapeless(result, ['#minecraft:axes', '#minecraft:planks'])
        funcs.toolDamagingShapeless('6x ' + result, ['#minecraft:axes', '#minecraft:logs'])
    })
    funcs.replace({input: 'minecraft:vine', output: 'notreepunching:plant_fiber'}, result => 
        funcs.toolDamagingShapeless('3x ' + result, [funcs.def('|vines'), '#notreepunching:knives'])
    )
    funcs.replaceTagRecipes({type: 'minecraft:crafting_shaped', input: '#aether:skyroot_repairing', output: 'aether:skyroot_stick'}, (output, ingredients) => {
        funcs.toolDamagingShapeless(Item.of(output).withCount(1), [ingredients[0], '#minecraft:axes'])
        funcs.toolDamagingShapeless(Item.of(output).withCount(2), [ingredients[0], '#minecraft:saws'])
        funcs.toolDamagingShapeless(Item.of(output).withCount(6), [funcs.def('|aether_logs'), '#minecraft:axes'])
        funcs.toolDamagingShapeless(Item.of(output).withCount(8), [funcs.def('|aether_logs'), '#minecraft:saws'])
    })
    funcs.replaceTagRecipes({type: 'minecraft:crafting_shapeless', input: ['#minecraft:logs', '#minecraft:axes'], output: '#minecraft:planks'}, (output, ingredients) => {
        funcs.toolDamagingShapeless(Item.of(output).withCount(3), [ingredients[0], '#minecraft:axes'])
        funcs.toolDamagingShapeless(Item.of(output).withCount(4), [ingredients[0], '#minecraft:saws'])
    })
    funcs.replaceTagRecipes({type: 'minecraft:crafting_shaped', output: '#forge:workbench'}, (output, ingredients) => { //can I ignore excess params???
        /*if (output.equalsIgnoringCount(Item.of('aether_genesis:skyroot_crafting_table')))
            ingredients[0] = '#aether:planks_crafting'
        else if (output.equalsIgnoringCount(Item.of('minecraft:crafting_table'))) 
            ingredients[0] = '#minecraft:planks'*/
        funcs.toolDamagingShapeless(output, [ingredients[0], ingredients[0], '#minecraft:axes'])
        funcs.toolDamagingShapeless(output, [ingredients[0], '#minecraft:saws'])
    })
    funcs.replaceTagRecipes({type: 'minecraft:crafting_shaped', output: funcs.def('|primitive_furnaces')}, (output, ingredients) => {
        generate(output, [ingredients[0], comfuncs.packDef('advanced_fire_bricks')]).rollingSquare(1, 3).override(['primalstage:kiln', 4]).next().vanilla()
    })

    kilnSmeltingMaterials.forEach(material => {
        var smelted = AlmostUnified.getPreferredItemForTag(`forge:storage_blocks/${material}`).getIdLocation().toString()
        var raw = AlmostUnified.getPreferredItemForTag(`forge:storage_blocks/raw_${material}`).getIdLocation().toString()
        funcs.kilnSmelting(smelted, raw)
    })
    event.shapeless('minecraft:stick', '#minecraft:saplings')
    event.shapeless('minecraft:crafting_table', '#forge:workbench')
    event.shapeless('4x primalstage:sand_dust', '#forge:sand')
    event.shapeless('minecraft:clay_ball', ['#forge:ash', 'minecraft:bone_meal'])
    event.campfireCooking(comfuncs.packDef('advanced_fire_brick'), comfuncs.packDef('advanced_clay_compound'))
    event.campfireCooking('primalstage:kiln_brick', 'primalstage:sandy_clay_compound')
    event.smelting(comfuncs.packDef('advanced_fire_brick'), comfuncs.packDef('advanced_clay_compound')).xp(0.05)
    event.smelting('primalstage:kiln_brick', 'primalstage:sandy_clay_compound').xp(0.05)
    event.smelting('ae2:silicon', 'primalstage:sand_dust').xp(0.05)
    funcs.toolDamagingShapeless('2x notreepunching:plant_fiber', ['#minecraft:wart_blocks', '#notreepunching:knives'])    
    funcs.toolDamagingShapeless('notreepunching:clay_brick', ['minecraft:clay_ball', 'minecraft:clay_ball', '#minecraft:shovels'])
    funcs.toolDamagingShapeless('2x notreepunching:clay_brick', ['minecraft:clay', '#minecraft:shovels'])
    funcs.planet('8x hardcore_torches:unlit_torch', '#minecraft:coals', 'hardcore_torches:burnt_torch')
    funcs.vanillaInsert('2x minecraft:stick', [[funcs.def('|vines'), [0, 2]]])
    funcs.vanillaInsert('2x aether:skyroot_stick', [[funcs.def('|aether_vines'), [0, 2]]])
    funcs.vanillaInsert('minecraft:campfire', [['#minecraft:torches/temp', [1, 3, 5]], 
        ['#minecraft:coals', 4], ['#minecraft:planks', [6, 7, 8]] ])
    funcs.insertAll(insertion => insertion.vanilla(), [
        generate('minecraft:sand', 'primalstage:sand_dust').flatSquare(2),
        generate(comfuncs.packDef('advanced_fire_bricks'), comfuncs.packDef('advanced_fire_brick')).flatSquare(2),
        generate(comfuncs.packDef('advanced_clay_compound'), ['thermal:constantan_dust', 'primalstage:sandy_clay_compound', 'thermal:invar_dust']).rollingSquare(1, 2),
        generate('4x primalstage:sandy_clay_compound', ['#forge:sand', 'minecraft:clay']).rollingSquare(1, 2),
        generate('2x minecraft:clay', ['#forge:sand', '#mobsiege:jelly_blocks']).rollingSquare(1, 2),
        generate('2x minecraft:clay', ['#forge:sand', '#minecraft:wart_blocks']).rollingSquare(1, 2),
        generate('2x minecraft:clay', ['aether_redux:holysilt', '#mobsiege:mud']).rollingSquare(1, 2),
        generate('2x minecraft:gravel', ['minecraft:end_stone', 'promenade:dark_amaranth_wart_block']).rollingSquare(1, 2),
        generate('2x minecraft:gravel', ['aether_redux:driftshale', '#mobsiege:mud']).rollingSquare(1, 2)
    ])
})

register('lootTables', context => {
    var {event, funcs} = context

    funcs.replaceBasiclt(
        funcs.createBasicLt(
            (materialTag, block) => 'minecraft:charcoal', 
            funcExplosionDecay(), 
            [
                funcs.blockEntry({functions: [countSet(countUniform(4, 6), false), funcFortune(formulaUniformBonus(1))]}, 'carbonize:charcoal_log'),
                funcs.blockEntry({functions: [countSet(countConstant(1), false), funcFortune(formulaBinomialBonus(1, 0.75))]}, 'carbonize:charcoal_planks'),
                funcs.blockEntry({functions: [countSet(countBinomial(1, 0.75), false), funcFortune(formulaBinomialBonus(1, 0.56))]}, 'carbonize:charcoal_stairs'),
                funcs.blockEntry({functions: [countSet(countBinomial(1, 0.5), false), funcFortune(formulaBinomialBonus(1, 0.28))]}, 'carbonize:charcoal_slab')
            ]
        )
    )
})

register('itemTags', context => {
    var {event, funcs} = context

    funcs.unifiedRemove([
        ['hardcore_torches:free_torch_light_items', 'minecraft:lava_bucket']
    ])
    funcs.unifiedAdd([
        ['minecraft:torches/temp', ['hardcore_torches:unlit_torch', 'hardcore_torches:lit_torch']],
        ['minecraft:axes', ['notreepunching:flint_axe', 'primalstage:flint_hatchet']],
        ['notreepunching:weak_saws', '#minecraft:axes'],
        ['minecraft:saws', '#notreepunching:saws'],
        ['minecraft:trowels', 'notreepunching:clay_tool'],
        ['%plates/copper', 'primalstage:copper_plate'],
        ['%plates/iron', 'primalstage:iron_plate'],
        ['%plates/diamond', 'primalstage:diamond_plate']
        //['notreepunching:knives', '#minecraft:axes']
    ])
})

register('blockTags', context => {
    var {event, funcs} = context

    funcs.unifiedAdd([
        ['notreepunching:loose_rock_placeable_on', '#forge:stone'],
        ['carbonize:charcoal_block', ['minecraft:mineable/pickaxe']],
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
                    event.add('carbonize:charcoal_pile_valid_wall', blockEntry.getKey().location().toString())
        } catch (err) {}
    })
})

/*
ServerEvents.tags('block', event => {
    ForgeRegistries.BLOCKS.getEntries().forEach(blockEntry => {
        try {
            let blockState = blockEntry.getValue().defaultBlockState()
            let fabricfbr = Blocks.FIRE.fabric_getVanillaEntry(blockState)
            if (Shapes.block().equals(blockState.getCollisionShape(null, null, null)))
                if (!blockState.isFlammable(null, null, null) && !(fabricfbr.getSpreadChance() > 0 || fabricfbr.getSpreadChance() > 0)) 
                    event.add('carbonize:charcoal_pile_valid_wall', blockEntry.getKey().location().toString())
        } catch (err) {}
    })
})*/

register('commonTags', context => {
    var {event, funcs} = context

    funcs.unifiedAdd([
        ['planks', '#aether:planks_crafting'],
        ['carbonize:charcoal_block', 'forge:storage_blocks/charcoal'],
        ['sand', '#forge:sand'],
        ['wart_blocks', 'voidscape:thuder_wart'],
        ['|mud', ['minecraft:mud', 'deep_aether:aether_mud']],
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
            funcs.def('|aether_logs'),
            'minecraft:bamboo_block',
            'minecraft:stripped_bamboo_block'
        ]],
        ['|aether_vines', [
            'aether_redux:corrupted_vines',
            'aether_redux:golden_vines',
            'aether_redux:gilded_vines',
            'deep_aether:yagroot_vine'
        ]],
        ['|vines', [
            funcs.def('|aether_vines'),
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
        ]],
        ['|jelly_blocks', [
            'aether_redux:jellyshroom_jelly_block', 
            'betterend:jellyshroom_cap_purple', 
            'betterend:umbrella_tree_membrane', 
            'edenring:volvox_block'
        ]],
        ['%sand', [
            'aether:quicksoil', 
            'betterend:endstone_dust', 
            'carbonize:ash_block', 
            'minecraft:soul_sand', 
            'betterend:charcoal_block'
        ]],
        ['%workbench', [
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
        ]],
        ['%furnaces', [
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
        ]], 
        ['%ash', ['carbonize:ash', 'cinderscapes:ash_pile']],
        ['%storage_blocks/raw_elementium', 'mythicbotany:raw_elementium_block'],
        ['|primitive_furnaces', [
            'minecraft:furnace',
            'betternether:basalt_furnace',
            'betternether:netherrack_furnace',
            'betterend:flavolite_furnace',
            'betterend:violecite_furnace',
            'betterend:sulphuric_rock_furnace',
            'betterend:virid_jadestone_furnace',
            'betterend:azure_jadestone_furnace',
            'betterend:sandy_jadestone_furnace',
            'betterend:umbralith_furnace',
            'betterend:end_stone_furnace',
            'aether_genesis:holystone_furnace',
            'quark:blackstone_furnace',
            'quark:deepslate_furnace'
        ]]
    ])
})