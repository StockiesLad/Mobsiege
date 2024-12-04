recipes((event, funcs) => {
    event.remove({id: 'notreepunching:cobblestone_from_rocks'})
    event.replaceInput({input: 'twigs:pebble'}, 'twigs:pebble', '#notreepunching:loose_rocks')
    funcs.twoSquareAlt('minecraft:end_stone', 'betterend:endstone_dust')
    event.shapeless('primalstage:stone_pebble', ['#notreepunching:loose_rocks', '#notreepunching:loose_rocks'])
    event.shapeless('2x twigs:pebble', 'primalstage:stone_pebble')
})

itemTags((event, funcs) => {
    event.add('notreepunching:loose_rocks', 'twigs:pebble')
 })

 blockTags((event, funcs) => {
    event.add('notreepunching:loose_rock_placeable_on', [
        '#forge:terrain', '#forge:sand', '#forge:stone',
        '#aether:aether_dirt', '#aether:holystone',
        '#minecraft:dirt'
    ])
 })

 BlockEvents.rightClicked(event => {
    var item = event.getItem()
    var block = event.block
    if (item.hasTag('forge:tools/hammers') && block.hasTag('forge:cobblestone')) {
         var level = event.getLevel()
         var random = level.getRandom()
         var pos = block.getPos()
         item.hurtAndBreak(1, event.getEntity(), (entity) => level.broadcastEntityEvent(entity, event.getHand().name() == 'MAIN_HAND' ? 47 : 48))

         if (random.nextInt(5) == 0) {
              level.destroyBlock(pos, false)
              Containers.dropItemStack(level, pos.getX(), pos.getY(), pos.getZ(), Item.of('primalstage:stone_pebble').withCount(4 + random.nextInt(4)));
         } else level.playSound(null, pos.getX(), pos.getY(), pos.getZ(), "minecraft:block.stone.break", "blocks", 0.25, 0.5)
    }
})