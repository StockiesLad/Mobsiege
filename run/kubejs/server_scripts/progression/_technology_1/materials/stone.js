var stones = []

recipes((event, funcs) => {
    funcs.nuke('supplementaries:gravel_bricks')
    funcs.removeRecipes({input: '#notreepunching:loose_rocks', type: 'minecraft:crafting_shaped'})
    event.replaceInput({input: 'twigs:pebble'}, 'twigs:pebble', 'minecraft:gravel')
    event.replaceInput({input: 'minecraft:cobblestone', output: 'projecte:low_covalence_dust'}, 'minecraft:cobblestone', dataTag + 'cobblestone')
    funcs.threeSquare(funcs.removeByOutput('9x twigs:gravel_bricks'), 'minecraft:gravel').vanilla()
    funcs.twoSquare('minecraft:end_stone', 'betterend:endstone_dust').vanilla()
    funcs.twoSquare('minecraft:cobblestone', 'minecraft:gravel').vanilla()
    funcs.twoSquare('aether:holystone', 'ancient_aether:gravity_gravel').vanilla()
    event.shapeless('primalstage:stone_pebble', ['#notreepunching:loose_rocks', '#notreepunching:loose_rocks'])
    event.shapeless('notreepunching:stone_loose_rock', 'primalstage:stone_pebble')
    event.shapeless('2x notreepunching:stone_loose_rock', 'minecraft:gravel')
    funcs.planet(content.stone_lattice, tags.slime, tags.stone_rod).vanilla()
    event.shapeless(funcs.removeByOutput('cb_microblock:stone_rod'), `2x ${tags.rocks}`)
})

commonTags((event, funcs) => {
    funcs.add(tags.limestone, [
		'alexscaves:limestone', 
		'blockus:limestone', 
		'create:limestone', 
		'geologicexpansion:limestone', 
		'unearthed:limestone', 
		'unearthed:beige_limestone', 
		'unearthed:grey_limestone', 
		'unearthed:cobbled_limestone', 
		'unearthed:cobbled_beige_limestone', 
        'unearthed:cobbled_grey_limestone'
	])
})

itemTags((event, funcs) => {	
	funcs.add(tags.cobblestone, [
		'unearthed:cobbled_phyllite', 
        'unearthed:cobbled_slate', 
        'unearthed:cobbled_limestone', 
        'unearthed:cobbled_beige_limestone', 
        'unearthed:cobbled_grey_limestone',
	])

    funcs.add(tags.mossy_cobblestone, [
        'minecraft:mossy_cobblestone', 
        'terrestria:mossy_basalt_cobblestone', 
        'unearthed:mossy_cobbled_slate', 
        'unearthed:mossy_cobbled_phyllite',
    ])

    funcs.add(tags.mossy_stone, ['aether:mossy_holystone', 'biomeswevegone:mossy_stone'])
	
	funcs.add(tags.weak_stones, [
        'minecraft:netherrack',
        tags.limestone,
        content.corpstone,
		'unearthed:siltstone', 
		'unearthed:mudstone', 
		'unearthed:conglomerate'
	])
	
    funcs.add('minecraft:stone_crafting_materials', [
	    tags.cobblestone,
        tags.mossy_cobblestone,
		'alexscaves:galena', 
		'alexscaves:radrock', 
        'blockus:marble', 
        'blockus:bluestone',
        'blockus:rough_basalt', 
        'blockus:viridite',
        'create:asurine',
        'create:ochrum',
        'create:crimsite',
        'create:scorchia',
        'create:scoria',
        'create:veridium',
        'geologicexpansion:white_prismatic_stone',
        'geologicexpansion:orange_prismatic_stone',
        'geologicexpansion:magenta_prismatic_stone',
        'geologicexpansion:light_blue_prismatic_stone',
        'geologicexpansion:yellow_prismatic_stone',
        'geologicexpansion:lime_prismatic_stone',
        'geologicexpansion:pink_prismatic_stone',
        'geologicexpansion:gray_prismatic_stone',
        'geologicexpansion:light_gray_prismatic_stone',
        'geologicexpansion:cyan_prismatic_stone',
        'geologicexpansion:purple_prismatic_stone',
        'geologicexpansion:blue_prismatic_stone',
        'geologicexpansion:brown_prismatic_stone',
        'geologicexpansion:green_prismatic_stone',
        'geologicexpansion:red_prismatic_stone',
        'geologicexpansion:black_prismatic_stone',
        'minecraft:basalt',
        'minecraft:smooth_basalt',
		'minecraft:tuff', 
		'minecraft:end_stone',
		'projectred_exploration:basalt',
		'projectred_exploration:marble',
        'twigs:schist',
        'twigs:rhyolite',
        'twigs:bloodstone',
        'unearthed:granodiorite', 
        'unearthed:rhyolite', 
        'unearthed:white_granite', 
        'unearthed:weathered_rhyolite', 
        'unearthed:dolerite', 
        'unearthed:schist', 
        'unearthed:pillow_basalt', 
        'unearthed:dacite',
		'unearthed:slate', 
		'unearthed:quartzite',
		'unearthed:phyllite'
    ])
	

    funcs.add(tags.rocks, ['twigs:pebble', 'spelunkers_charm:deepslate_rock', 'spelunkers_charm:rock', 'spelunkers_charm:dripstone_rock', 'spelunkers_charm:basalt_rock'])
    funcs.remove(tags.rocks, 'notreepunching:sandstone_loose_rock')
    funcs.add(tags.overworld_rocks, funcs.getIdsOfTags(tags.rocks))
    funcs.add(tags.aether_rocks, content.holy_pebble)
    funcs.add(tags.rocks, content.holy_pebble)
    
    stones = funcs.getIdsOfTags('minecraft:stone_crafting_materials').concat(funcs.getIdsOfTags(tags.weak_stones))
})


blockTags((event, funcs) => {
    //event.add('notreepunching:loose_rock_placeable_on', [dataTag + 'terrain', dataTag + 'sand', dataTag + 'stone','#aether:aether_dirt', '#aether:holystone','#minecraft:dirt'])
    funcs.add(tags.stone, common.unifyArrays(stones, [tags.stone, tags.holystone]));
    stones = [];
})

BlockEvents.rightClicked(event => {
    var item = event.getItem()
    var block = event.block
    if (item.hasTag(data + 'tools/hammers') && block.hasTag(tags.stone.replace('#', ''))) {
        var level = event.getLevel()
        var random = level.getRandom()
        var pos = block.getPos()
        item.hurtAndBreak(1, event.getEntity(), (entity) => level.broadcastEntityEvent(entity, event.getHand().name() == 'MAIN_HAND' ? 47 : 48))
        level.playSound(null, pos.getX(), pos.getY(), pos.getZ(), "minecraft:block.stone.break", "blocks", 0.25, 0.5)
        if (random.nextInt(5) == 0) {
            level.destroyBlock(pos, false)
            var pebble = block.getId().includes('aether') ? content.holy_pebble : 'twigs:pebble'
            Containers.dropItemStack(level, pos.getX(), pos.getY(), pos.getZ(), Item.of(pebble).withCount(2 + random.nextInt(3)))
            if (block.hasTag(tags.limestone.replace('#', '')) && random.nextInt(4) == 0)
                Containers.dropItemStack(level, pos.getX(), pos.getY(), pos.getZ(), Item.of(AlmostUnified.getPreferredItemForTag(data + 'gems/sulfur').getIdLocation().toString()).withCount(2 + random.nextInt(2)))
        } 
    }
})