StartupEvents.registry('block', (event) => {
    Mobsiege2Fabric.fabricTagFlammability(stacks.packId('carbonize/extra_flammability'), 5, 5)
    Mobsiege2Fabric.fabricTagFlammability(stacks.packId('carbonize/extra_flammability_leaves'), 30, 60)

    var blocks = [
        {id: content.gravitium_block, sound: 'METAL', hardness: 5, resistance: 6, tagBlock: ['mineable/pickaxe', 'needs_diamond_tool']},
        {id: content.campfire_rock, sound: 'STONE', hardness: 1, resistance: 1, tagBlock: ['mineable/pickaxe', 'needs_stone_tool']},
        {id: content.holysilt_bricks, sound: 'STONE', hardness: 2, resistance: 6, tagBlock: ['mineable/pickaxe', 'needs_stone_tool']},
        {id: content.packed_mortar, sound: 'GRAVEL', hardness: 0.6, resistance: 0.6, tagBlock: ['mineable/shovel', 'needs_stone_tool']},
        {id: content.packed_cement, sound: 'GRAVEL', hardness: 0.6, resistance: 0.6, tagBlock: ['mineable/shovel', 'needs_stone_tool']},
        {id: content.fire_brick_block, sound: 'STONE', hardness: 2, resistance: 6, tagBlock: ['mineable/pickaxe', 'needs_stone_tool']},
        {id: content.corpstone, sound: 'NETHERRACK', hardness: 0.4, resistance: 0.4, tagBlock: ['mineable/pickaxe', 'needs_stone_tool']},
        {id: content.decapitated_debris, sound: 'SCULK', hardness: 0.5, resistance: 0.5, box: [1, 0, 1, 15, 12, 15], tagBlock: ['mineable/axe', 'needs_stone_tool']}

    ]

    blocks.forEach(block => {
        if (block['box'] != null) {
            var box = block.box
            event.create(block.id)
                .soundType(block.sound)
                .hardness(block.hardness)
                .resistance(block.resistance)
                .requiresTool(true)
                .tagBlock(block.tagBlock[0])
                .tagBlock(block.tagBlock[1])
                .fullBlock(false)
                .box(box[0], box[1], box[2], box[3], box[4], box[5])
        } else {
            event.create(block.id)
                .soundType(block.sound)
                .hardness(block.hardness)
                .resistance(block.resistance)
                .requiresTool(true)
                .tagBlock(block.tagBlock[0])
                .tagBlock(block.tagBlock[1])
        }
    })
})
 
BlockEvents.modification(event => {
    stacks.soundMap('setSoundType', {event: event})
    event.modify('aether:cold_aercloud', block => block.properties.isValidSpawn(() => true))
    event.modify('carbonize:charcoal_block', block => {
        block.destroySpeed = 0.5
        block.explosionResistance = 0.5
    })
 })