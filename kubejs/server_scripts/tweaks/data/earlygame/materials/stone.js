var stones = []

recipes((event, funcs) => {
    funcs.replaceTagRecipes({input: '#notreepunching:loose_rocks', type: 'minecraft:crafting_shaped'}, () => {})
    event.replaceInput({input: 'twigs:pebble'}, 'twigs:pebble', 'minecraft:gravel')
    event.replaceInput({input: 'minecraft:cobblestone', output: 'projecte:low_covalence_dust'}, 'minecraft:cobblestone', '#forge:cobblestone')
    funcs.replaceOutputRecipe('5x supplementaries:gravel_bricks', r => event.shapeless(r, Item.of('minecraft:gravel').withCount(5)))
    funcs.replaceOutputRecipe('6x twigs:gravel_bricks', r => event.shapeless(r, Item.of('minecraft:gravel').withCount(6)))
    funcs.twoSquare('minecraft:end_stone', 'betterend:endstone_dust')
    funcs.twoSquare('minecraft:cobblestone', 'minecraft:gravel')
    funcs.twoSquare('minecraft:gravel', '#notreepunching:loose_rocks')
    event.shapeless('primalstage:stone_pebble', ['#notreepunching:loose_rocks', '#notreepunching:loose_rocks'])
    event.shapeless('twigs:pebble', 'primalstage:stone_pebble')
    event.shapeless('2x twigs:pebble', 'minecraft:gravel')
})

ServerEvents.tags('item', event => {
    event.add('minecraft:stone_crafting_materials', [
        'blockus:limestone', 
        'blockus:marble', 
        'blockus:bluestone',
        'blockus:rough_basalt', 
        'blockus:viridite',
        'create:limestone',
        'create:asurine',
        'create:ochrum',
        'create:crimsite',
        'alexscaves:limestone',
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
        'geologicexpansion:limestone',
        'minecraft:basalt',
        'minecraft:smooth_basalt',
        'twigs:schist',
        'twigs:rhyolite',
        'twigs:bloodstone',
        custom.corpstone
    ])
    event.add('notreepunching:loose_rocks', ['twigs:pebble', 'spelunkers_charm:deepslate_rock', 'spelunkers_charm:rock', 'spelunkers_charm:dripstone_rock', 'spelunkers_charm:basalt_rock'])
    stones = event.get('minecraft:stone_crafting_materials').getObjectIds().toArray()
})

ServerEvents.tags('block', event => {
    event.add('notreepunching:loose_rock_placeable_on', ['#forge:terrain', '#forge:sand', '#forge:stone','#aether:aether_dirt', '#aether:holystone','#minecraft:dirt'])
    event.add(pack('stone'), stones.concat(['#forge:stone', packTag('holystone')]))
    event.add(pack('limestone'), ['create:limestone', 'quark:limestone', 'geologicexpansion:limestone', 'alexscaves:limestone'])
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
            Containers.dropItemStack(level, pos.getX(), pos.getY(), pos.getZ(), Item.of('twigs:pebble').withCount(2 + random.nextInt(3)))
            if (block.hasTag(pack('limestone')) && random.nextInt(4) == 0)
                Containers.dropItemStack(level, pos.getX(), pos.getY(), pos.getZ(), Item.of(AlmostUnified.getPreferredItemForTag('forge:gems/sulfur').getIdLocation().toString()).withCount(2 + random.nextInt(2)))
        } 
    }
})