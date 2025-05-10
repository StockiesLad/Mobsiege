var stones = []
var limestones = []

recipes((event, funcs) => {
    funcs.nuke('supplementaries:gravel_bricks')
    funcs.removeRecipes({input: '#notreepunching:loose_rocks', type: 'minecraft:crafting_shaped'})
    event.replaceInput({input: 'twigs:pebble'}, 'twigs:pebble', 'minecraft:gravel')
    event.replaceInput({input: 'minecraft:cobblestone', output: 'projecte:low_covalence_dust'}, 'minecraft:cobblestone', '#forge:cobblestone')
    funcs.threeSquare(funcs.removeByOutput('9x twigs:gravel_bricks'), 'minecraft:gravel').vanilla()
    funcs.twoSquare('minecraft:end_stone', 'betterend:endstone_dust').vanilla()
    funcs.twoSquare('minecraft:cobblestone', 'minecraft:gravel').vanilla()
    funcs.twoSquare('aether:holystone', 'ancient_aether:gravity_gravel').vanilla()
    event.shapeless('primalstage:stone_pebble', ['#notreepunching:loose_rocks', '#notreepunching:loose_rocks'])
    event.shapeless('notreepunching:stone_loose_rock', 'primalstage:stone_pebble')
    event.shapeless('2x notreepunching:stone_loose_rock', 'minecraft:gravel')
})

ServerEvents.tags('item', event => {
	event.add(pack('limestone'), [
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
	
	limestones = getIdsOfTags(event, pack('limestone'))
	
	event.add('forge:cobblestone', [
		'unearthed:cobbled_phyllite', 
        'unearthed:cobbled_slate', 
        'unearthed:cobbled_limestone', 
        'unearthed:cobbled_beige_limestone', 
        'unearthed:cobbled_grey_limestone',
	])

    event.add('forge:cobblestone/mossy', [
        'minecraft:mossy_cobblestone', 
        'terrestria:mossy_basalt_cobblestone', 
        'unearthed:mossy_cobbled_slate', 
        'unearthed:mossy_cobbled_phyllite',
    ])

    event.add(pack('stone/mossy'), ['aether:mossy_holystone', 'biomeswevegone:mossy_stone'])
	
	event.add(pack('weak_stones'), [
        'minecraft:netherrack',
        content.corpstone,
		'unearthed:siltstone', 
		'unearthed:mudstone', 
		'unearthed:conglomerate'
	])
	
    event.add('minecraft:stone_crafting_materials', [
		packTag('limestone'),
	    '#forge:cobblestone',
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
	

    event.add('notreepunching:loose_rocks', ['twigs:pebble', 'spelunkers_charm:deepslate_rock', 'spelunkers_charm:rock', 'spelunkers_charm:dripstone_rock', 'spelunkers_charm:basalt_rock'])
    event.remove('notreepunching:loose_rocks', 'notreepunching:sandstone_loose_rock')
    event.add(pack('overworld_rocks'), getIdsOfTags(event, 'notreepunching:loose_rocks'))
    event.add(pack('aether_rocks'), content.holy_pebble)
    event.add('notreepunching:loose_rocks', content.holy_pebble)
    
    stones = getIdsOfTags(event, 'minecraft:stone_crafting_materials').concat(getIdsOfTags(event, pack('weak_stones')))
})


ServerEvents.tags('block', event => {
    //event.add('notreepunching:loose_rock_placeable_on', ['#forge:terrain', '#forge:sand', '#forge:stone','#aether:aether_dirt', '#aether:holystone','#minecraft:dirt'])
    event.add(pack('stone'), stones.concat(['#forge:stone', packTag('holystone')]))
    event.add(pack('limestone'), limestones)
    stones = []
	limestones = []
})

BlockEvents.rightClicked(event => {
    var item = event.getItem()
    var block = event.block
    if (item.hasTag('forge:tools/hammers') && block.hasTag(pack('stone'))) {
        var level = event.getLevel()
        var random = level.getRandom()
        var pos = block.getPos()
        item.hurtAndBreak(1, event.getEntity(), (entity) => level.broadcastEntityEvent(entity, event.getHand().name() == 'MAIN_HAND' ? 47 : 48))
        level.playSound(null, pos.getX(), pos.getY(), pos.getZ(), "minecraft:block.stone.break", "blocks", 0.25, 0.5)
        if (random.nextInt(5) == 0) {
            level.destroyBlock(pos, false)
            var pebble = block.getId().includes('aether') ? content.holy_pebble : 'twigs:pebble'
            Containers.dropItemStack(level, pos.getX(), pos.getY(), pos.getZ(), Item.of(pebble).withCount(2 + random.nextInt(3)))
            if (block.hasTag(pack('limestone')) && random.nextInt(4) == 0)
                Containers.dropItemStack(level, pos.getX(), pos.getY(), pos.getZ(), Item.of(AlmostUnified.getPreferredItemForTag('forge:gems/sulfur').getIdLocation().toString()).withCount(2 + random.nextInt(2)))
        } 
    }
})