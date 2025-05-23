common.unifyArrays([global.hiddenItems, [
    'natprog:stick_block_item',
    'geologicexpansion:duck_spawn_egg', 
    'geologicexpansion:duck_egg',
    'betternether:nether_lapis_ore', 
    'betternether:nether_redstone_ore'
    /*'alexscaves:limestone', 
    'alexscaves:limestone_stairs', 
    'alexscaves:limestone_slab', 
    'alexscaves:limestone_wall', 
    'alexscaves:limestone_pillar', 
    'alexscaves:limestone_chiseled', 
    'alexscaves:smooth_limestone', 
    'alexscaves:smooth_limestone_stairs', 
    'alexscaves:smooth_limestone_slab', 
    'alexscaves:smooth_limestone_wall',*/
    /*'what_is_stone:scoria', ,
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
    'what_is_stone:polished_marble_stairs',*/
]])

if (printHiddenItems) {
    var hiddenItemStrings = global.hiddenItems.map(item => {
        if (typeof(item) !== 'string') {
            return `Item.of(\'${item.id}\', \'${item.nbtString.replace("'", '\"')}\')`
        } else return '\'' + item + '\''
    })
    console.info(hiddenItemStrings)
}

//Statically add the hidden items for dedicated servers
function hiddenItems () {
    return ['betterend:crystalline_sulphur', 'primalstage:diamond_plate', 'primalstage:charcoal_log', 'traverse:fir_leaves', 'traverse:fir_sapling', 'traverse:potted_fir_sapling', 'traverse:fir_log', 'traverse:fir_wood', 'traverse:stripped_fir_log', 'traverse:stripped_fir_wood', 'traverse:fir_planks', 'traverse:fir_slab', 'traverse:fir_bookshelf', 'traverse:fir_crafting_table', 'traverse:fir_pressure_plate', 'traverse:fir_fence', 'traverse:fir_trapdoor', 'traverse:fir_fence_gate', 'traverse:fir_stairs', 'traverse:fir_button', 'traverse:fir_door', 'traverse:fir_sign', 'traverse:fir_hanging_sign', 'traverse:fir_boat', 'traverse:fir_chest_boat', 'biomeswevegone:cypress_leaves', 'biomeswevegone:cypress_sapling', 'biomeswevegone:potted_cypress_sapling', 'biomeswevegone:cypress_log', 'biomeswevegone:cypress_wood', 'biomeswevegone:stripped_cypress_log', 'biomeswevegone:stripped_cypress_wood', 'biomeswevegone:cypress_planks', 'biomeswevegone:cypress_slab', 'biomeswevegone:cypress_bookshelf', 'biomeswevegone:cypress_crafting_table', 'biomeswevegone:cypress_pressure_plate', 'biomeswevegone:cypress_fence', 'biomeswevegone:cypress_trapdoor', 'biomeswevegone:cypress_fence_gate', 'biomeswevegone:cypress_stairs', 'biomeswevegone:cypress_button', 'biomeswevegone:cypress_door', 'biomeswevegone:cypress_sign', 'biomeswevegone:cypress_hanging_sign', 'biomeswevegone:cypress_boat', 'biomeswevegone:cypress_chest_boat', 'biomeswevegone:fir_leaves', 'biomeswevegone:fir_sapling', 'biomeswevegone:potted_fir_sapling', 'biomeswevegone:fir_log', 'biomeswevegone:fir_wood', 'biomeswevegone:stripped_fir_log', 'biomeswevegone:stripped_fir_wood', 'biomeswevegone:fir_planks', 'biomeswevegone:fir_slab', 'biomeswevegone:fir_bookshelf', 'biomeswevegone:fir_crafting_table', 'biomeswevegone:fir_pressure_plate', 'biomeswevegone:fir_fence', 'biomeswevegone:fir_trapdoor', 'biomeswevegone:fir_fence_gate', 'biomeswevegone:fir_stairs', 'biomeswevegone:fir_button', 'biomeswevegone:fir_door', 'biomeswevegone:fir_sign', 'biomeswevegone:fir_hanging_sign', 'biomeswevegone:fir_boat', 'biomeswevegone:fir_chest_boat', 'biomeswevegone:mahogany_leaves', 'biomeswevegone:mahogany_sapling', 'biomeswevegone:potted_mahogany_sapling', 'biomeswevegone:mahogany_log', 'biomeswevegone:mahogany_wood', 'biomeswevegone:stripped_mahogany_log', 'biomeswevegone:stripped_mahogany_wood', 'biomeswevegone:mahogany_planks', 'biomeswevegone:mahogany_slab', 'biomeswevegone:mahogany_bookshelf', 'biomeswevegone:mahogany_crafting_table', 'biomeswevegone:mahogany_pressure_plate', 'biomeswevegone:mahogany_fence', 'biomeswevegone:mahogany_trapdoor', 'biomeswevegone:mahogany_fence_gate', 'biomeswevegone:mahogany_stairs', 'biomeswevegone:mahogany_button', 'biomeswevegone:mahogany_door', 'biomeswevegone:mahogany_sign', 'biomeswevegone:mahogany_hanging_sign', 'biomeswevegone:mahogany_boat', 'biomeswevegone:mahogany_chest_boat', 'biomesoplenty:redwood_leaves', 'biomesoplenty:redwood_sapling', 'biomesoplenty:potted_redwood_sapling', 'biomesoplenty:redwood_log', 'biomesoplenty:redwood_wood', 'biomesoplenty:stripped_redwood_log', 'biomesoplenty:stripped_redwood_wood', 'biomesoplenty:redwood_planks', 'biomesoplenty:redwood_slab', 'biomesoplenty:redwood_bookshelf', 'biomesoplenty:redwood_crafting_table', 'biomesoplenty:redwood_pressure_plate', 'biomesoplenty:redwood_fence', 'biomesoplenty:redwood_trapdoor', 'biomesoplenty:redwood_fence_gate', 'biomesoplenty:redwood_stairs', 'biomesoplenty:redwood_button', 'biomesoplenty:redwood_door', 'biomesoplenty:redwood_sign', 'biomesoplenty:redwood_hanging_sign', 'biomesoplenty:redwood_boat', 'biomesoplenty:redwood_chest_boat', 'hardcore_torches:unlit_campfire', 'betternether:blackstone_furnace', 'quark:blackstone_furnace', 'primalstage:fire_sticks', 'aether:skyroot_sword', 'aether:skyroot_pickaxe', 'aether:skyroot_axe', 'aether:skyroot_shovel', 'aether:skyroot_hoe', 'aether:holystone_sword', 'aether:holystone_pickaxe', 'aether:holystone_axe', 'aether:holystone_shovel', 'aether:holystone_hoe', 'minecraft:wooden_sword', 'minecraft:wooden_pickaxe', 'minecraft:wooden_axe', 'minecraft:wooden_shovel', 'minecraft:wooden_hoe', 'minecraft:stone_sword', 'minecraft:stone_pickaxe', 'minecraft:stone_axe', 'minecraft:stone_shovel', 'minecraft:stone_hoe', 'mekanismtools:stone_paxel', 'immersivegeology:ig_toolkit_2', 'projectred_exploration:stone_sickle', 'primalstage:flint_pickaxe', 'primalstage:flint_shovel', 'primalstage:plant_fiber', 'farmersdelight:flint_knife', 'notreepunching:iron_knife', 'notreepunching:gold_knife', 'notreepunching:gold_knife', 'notreepunching:diamond_knife', 'notreepunching:netherite_knife', 'notreepunching:ceramic_water_bucket', 'immersivegeology:raw_fire_clay', 'blockus:soul_sandstone', 'blockus:soul_sandstone_stairs', 'blockus:soul_sandstone_slab', 'blockus:smooth_soul_sandstone', 'blockus:smooth_soul_sandstone_stairs', 'blockus:smooth_soul_sandstone_slab', 'blockus:cut_soul_sandstone', 'blockus:cut_soul_sandstone_slab', 'supplementaries:gravel_bricks', 'primalstage:oak_hedge', 'primalstage:oak_bark', 'primalstage:oak_lattice', 'primalstage:oak_logs', 'primalstage:oak_drying_rack', 'primalstage:oak_shelf', 'primalstage:dark_oak_hedge', 'primalstage:dark_oak_bark', 'primalstage:dark_oak_lattice', 'primalstage:dark_oak_logs', 'primalstage:dark_oak_drying_rack', 'primalstage:dark_oak_shelf', 'primalstage:birch_hedge', 'primalstage:birch_bark', 'primalstage:birch_lattice', 'primalstage:birch_logs', 'primalstage:birch_drying_rack', 'primalstage:birch_shelf', 'primalstage:jungle_hedge', 'primalstage:jungle_bark', 'primalstage:jungle_lattice', 'primalstage:jungle_logs', 'primalstage:jungle_drying_rack', 'primalstage:jungle_shelf', 'primalstage:acacia_hedge', 'primalstage:acacia_bark', 'primalstage:acacia_lattice', 'primalstage:acacia_logs', 'primalstage:acacia_drying_rack', 'primalstage:acacia_shelf', 'primalstage:mangrove_hedge', 'primalstage:mangrove_bark', 'primalstage:mangrove_lattice', 'primalstage:mangrove_logs', 'primalstage:mangrove_drying_rack', 'primalstage:mangrove_shelf', 'primalstage:crimson_hedge', 'primalstage:crimson_bark', 'primalstage:crimson_lattice', 'primalstage:crimson_logs', 'primalstage:crimson_drying_rack', 'primalstage:crimson_shelf', 'primalstage:warped_hedge', 'primalstage:warped_bark', 'primalstage:warped_lattice', 'primalstage:warped_logs', 'primalstage:warped_drying_rack', 'primalstage:warped_shelf', 'primalstage:cutting_log', 'expandedstorage:old_wood_chest', 'expandedstorage:old_iron_chest', 'expandedstorage:old_gold_chest', 'expandedstorage:old_diamond_chest', 'expandedstorage:old_obsidian_chest', 'expandedstorage:old_netherite_chest', Item.of('expandedstorage:storage_mutator', '{mode:0b}'), Item.of('expandedstorage:storage_mutator', '{mode:1b}'), Item.of('expandedstorage:storage_mutator', '{mode:2b}'), Item.of('expandedstorage:storage_mutator', '{mode:3b}'), Item.of('expandedstorage:storage_mutator', '{display:{Name:"{"italic":true,"text":"Sparrow"}"},mode:3b}'), 'expandedstorage:wood_to_copper_conversion_kit', 'expandedstorage:wood_to_iron_conversion_kit', 'expandedstorage:wood_to_gold_conversion_kit', 'expandedstorage:copper_to_netherite_conversion_kit', 'expandedstorage:copper_to_obsidian_conversion_kit', 'expandedstorage:copper_to_diamond_conversion_kit', 'expandedstorage:copper_to_gold_conversion_kit', 'expandedstorage:copper_to_iron_conversion_kit', 'expandedstorage:wood_to_netherite_conversion_kit', 'expandedstorage:wood_to_obsidian_conversion_kit', 'expandedstorage:wood_to_diamond_conversion_kit', 'expandedstorage:diamond_to_obsidian_conversion_kit', 'expandedstorage:gold_to_netherite_conversion_kit', 'expandedstorage:gold_to_obsidian_conversion_kit', 'expandedstorage:gold_to_diamond_conversion_kit', 'expandedstorage:iron_to_netherite_conversion_kit', 'expandedstorage:iron_to_obsidian_conversion_kit', 'expandedstorage:iron_to_diamond_conversion_kit', 'expandedstorage:iron_to_gold_conversion_kit', 'expandedstorage:obsidian_to_netherite_conversion_kit', 'expandedstorage:diamond_to_netherite_conversion_kit', 'trials:crafter', 'tinyredstone:silicon_compound', 'pointblank:gunmetal_mesh', 'constructionwand:stone_wand', 'constructionwand:iron_wand', 'constructionwand:diamond_wand', 'reliquary:interdiction_torch', 'aetherdelight:quickroot_crate', 'aetherdelight:chromaberry_crate', 'aetherdelight:luxbuds_salad']
}

// Add both here so I don't have to keep switching if I change recipe viewers.

try {
    JEIEvents.hideItems(event => {
        hiddenItems().forEach(element => event.hide(element))
    })
} catch (err) {
    console.info("JEI is not installed; skipping. This is not an error, just a message!")
}
    
try {
    REIEvents.hide('item', event => {
        hiddenItems().forEach(element => event.hide(element))
    })
} catch (err) {
    console.info("REI is not installed; skipping. This is not an error, just a message!")
}
    

