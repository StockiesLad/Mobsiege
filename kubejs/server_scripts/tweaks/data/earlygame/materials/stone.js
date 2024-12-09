var stones = []

recipes((event, funcs) => {
    event.remove({id: 'notreepunching:cobblestone_from_rocks'})
    event.replaceInput({input: 'twigs:pebble'}, 'twigs:pebble', '#notreepunching:loose_rocks')
    funcs.twoSquareAlt('minecraft:end_stone', 'betterend:endstone_dust')
    event.shapeless('primalstage:stone_pebble', ['#notreepunching:loose_rocks', '#notreepunching:loose_rocks'])
    event.shapeless('2x twigs:pebble', 'primalstage:stone_pebble')
    event.shapeless('3x twigs:pebble', Item.of('minecraft:gravel').withCount(2))
})

itemTags((event, funcs) => {
    event.add('minecraft:stone_crafting_materials', [
        'blockus:limestone', 
        'blockus:marble', 
        'blockus:bluestone', 
        'blockus:viridite',
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
        'twigs:schist',
        'twigs:rhyolite',
        'twigs:bloodstone',
        custom.corpstone
    ])
    event.add('notreepunching:loose_rocks', 'twigs:pebble')
    stones = event.get('minecraft:stone_crafting_materials').getObjectIds().toArray()
    console.info(stones)
 })

blockTags((event, funcs) => {
    event.add('notreepunching:loose_rock_placeable_on', [
        '#forge:terrain', '#forge:sand', '#forge:stone',
        '#aether:aether_dirt', '#aether:holystone',
        '#minecraft:dirt'
    ])
    event.add(comfuncs.packDef('stone'), stones.concat(['#forge:stone', funcs.def('|holystone')]))
 })

 BlockEvents.rightClicked(event => {
    var item = event.getItem()
    var block = event.block
    if (item.hasTag('forge:tools/hammers') && block.hasTag(comfuncs.packDef('stone'))) {
         var level = event.getLevel()
         var random = level.getRandom()
         var pos = block.getPos()
         item.hurtAndBreak(1, event.getEntity(), (entity) => level.broadcastEntityEvent(entity, event.getHand().name() == 'MAIN_HAND' ? 47 : 48))

         if (random.nextInt(5) == 0) {
              level.destroyBlock(pos, false)
              Containers.dropItemStack(level, pos.getX(), pos.getY(), pos.getZ(), Item.of('twigs:pebble').withCount(4 + random.nextInt(4)));
         } else level.playSound(null, pos.getX(), pos.getY(), pos.getZ(), "minecraft:block.stone.break", "blocks", 0.25, 0.5)
    }
})