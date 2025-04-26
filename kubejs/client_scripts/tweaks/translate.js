ClientEvents.lang('en_us', event => {
    var rename = [
        ['hardcore_torches:fire_starter', 'Single Use Fire Starter'],
        ['notreepunching:fire_starter', 'Fire Bow'],
        ['betterend:crystalline_sulphur', 'Crystalline Sulphur'],
        ['betterend:charcoal_block', 'Charcoal Sand'],
        ['ae2:smooth_sky_stone_chest', 'Smooth Sky Stone Chest'],
        //[/*'biome.*/'biomeswevegone.orchard', 'Old Growth Orchard'],
        ['bluepower:tiles', 'Basalt & Beige Marble Tiles'],
        ['alexscaves:radrock_uranium_ore', 'Pure Uranium Ore'],
        ['alexscaves:uranium_shard', 'Pure Uranium Shard'],
        ['alexscaves:uranium', 'Pure Uranium'],
        ['alexscaves:block_of_uranium', 'Pure Uranium Block'],
        ['primalstage:sandy_clay_compound', 'Mortar Compound'],
        ['notreepunching:clay_brick', 'Wet Clay Brick'],
        ['primalstage:spruce_hedge', 'Hedge'],
        ['primalstage:spruce_lattice', 'Lattice'],
        ['primalstage:spruce_logs', 'Split Log'],
        ['primalstage:spruce_drying_rack', 'Drying Rack'],
        ['primalstage:spruce_shelf', 'Shelf'],
        ['minecraft:charcoal', 'Medium Grade Charcoal'],
        ['primalstage:stone_pebble', 'Large Stone Pebble'],
        ['primalstage:salt_block', 'Dense Salt Block'],
        ['primalstage:spruce_bark', "Bark"],
        ['biomesoplenty:bramble', 'Organic Bramble'],
        ['cinderscapes:ash_pile', 'Scorched Ash'],
        ['cinderscapes:ash_block', 'Scorched Ash Block'],
        ['carbonize:ash', 'Enriched Ash'],
        ['carbonize:ash_block', 'Enriched Ash Block'],
        ['carbonize:ash_layer', 'Enriched Ash Layer'],
        ['supplementaries:ash', 'Fine Ash'],
        ['cinderscapes:rose_quartz', 'Nether Rose Quartz'],
        ['projectred_core:silicon', 'Unfired Silicon Wafer']
    ]

    rename = concatSeries(rename, [
        regexIn('ancient_aether', ['sakura', 'aether_sakura'], woodSet),
        regexIn('biomesoplenty', ['jacaranda', 'white_jacaranda'], woodSet),
        regexIn('biomesoplenty', ['pine', 'dark_pine'], woodSet),
        regexIn('biomeswevegone', ['fir', 'dark_fir'], woodSet),
        regexIn('biomeswevegone', ['maple', 'dark_maple'], woodSet),
        regexIn('biomeswevegone', ['palm', 'dry_palm'], woodSet),
        regexIn('biomeswevegone', ['rainbow_eucalyptus', 'gloomy_eucalyptus'], woodSet),
        regexIn('biomeswevegone', ['sakura', 'red_sakura'], woodSet),
        regexIn('biomeswevegone', ['willow', 'dark_willow'], woodSet),
        regexIn('promenade', ['maple', 'white_maple'], woodSet),
        regexIn('promenade', ['palm', 'tropical_palm'], woodSet),
        regexIn('terrestria', ['sakura', 'dark_sakura'], woodSet),
        regexIn('terrestria', ['redwood', 'dark_redwood'], woodSet),
        getStandardStoneCategory('geologicexpansion', 'limestone', 'rocky_limestone'),
        getStandardStoneCategory('projectred_exploration', 'marble', 'grey_marble'),
        /*getStandardStoneCategory('bluepower', 'marble', 'beige_marble', [
            ['fancy_marble', 'fancy_beige_marble'],
            ['marble_brick_small', 'small_beige_marble_bricks'],
            ['marble_paver', 'beige_marble_paver']
        ]),*/
        getStandardStoneCategory('what_is_stone', 'dacite', 'grey_dacite'),
        getStandardStoneCategory('what_is_stone', 'schist', 'dark_schist'),
        getStandardStoneCategory('what_is_stone', 'rhyolite', 'light_rhyolite'),
        getStandardStoneCategory('alexscaves', 'limestone', 'old_beige_limestone', [
            ['limestone_chiseled', 'chiseled_old_beige_limestone'],
            ['smooth_limestone', 'smooth_old_beige_limestone'],
        ]),
        getStandardStoneCategory('blockus', 'limestone', 'beige_limestone', [
            ['limestone_line', 'beige_limestone_lines'],
            ['limestone_circular_paving', 'beige_limestone_circular_paving'],
            ['limestone_square', 'beige_limestone_square']
        ]),
        getStandardStoneCategory('create', 'limestone', 'smooth_limestone', [
            ['layered_limestone', 'layered_smooth_limestone'],
            ['cut_limestone', 'cut_smooth_limestone'],
            ['cut_limestone_brick', 'cut_smooth_limestone_brick'],
            ['polished_cut_limestone', 'polished_cut_smooth_limestone']
        ]),
        getStandardStoneCategory('quark', 'limestone', 'hardened_limestone', [
            ['chiseled_limestone_brick', 'chiseled_hardened_limestone_brick']
        ]),

    ])
    

    var add = [
        ['notreepunching.items', 'No Tree Punching'],
        ['block.betterend.end_stone_brick_cracked', 'Cracked End Stone Brick'],
        ['block.betterend.end_stone_brick_cracked_slab', 'Cracked End Stone Brick Slab'],
        ['block.betterend.end_stone_brick_cracked_stairs', 'Cracked End Stone Brick Stairs'],
        ['block.betterend.end_stone_brick_cracked_wall', 'Cracked End Stone Brick Wall'],
        ['block.betterend.end_stone_brick_weathered', 'Weathered End Stone Brick'],
        ['block.betterend.end_stone_brick_weathered_slab', 'Weathered End Stone Brick Slab'],
        ['block.betterend.end_stone_brick_weathered_stairs', 'Weathered End Stone Brick Stairs'],
        ['block.betterend.end_stone_brick_weathered_wall', 'Weathered End Stone Brick Wall']
    ]

    rename.forEach(element => {
        event.renameItem(element[0], element[1])
    })
    add.forEach(element => {
        event.add(element[0], element[1])
    })
})