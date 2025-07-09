StartupEvents.registry('block', (event) => {
    Mobsiege2Fabric.fabricTagFlammability(stacks.packId('carbonize/extra_flammability'), 5, 5)
    Mobsiege2Fabric.fabricTagFlammability(stacks.packId('carbonize/extra_flammability_leaves'), 30, 60)

    typedContent.filter(c => c.registerable && c.type === 'block').forEach(block => {
        var displayName = block.id
            .split(':').pop()
            .split('/').pop()
            .replace(/[-]/g, '_')
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        if (block['box'] != null) {
            var box = block.box
            event.create(block.id)
                .soundType(block.sound)
                .hardness(block.hardness)
                .resistance(block.resistance)
                .requiresTool(true)
                .tagBlock(block.tags[0])
                .tagBlock(block.tags[1])
                .fullBlock(false)
                .box(box[0], box[1], box[2], box[3], box[4], box[5])
                .displayName(displayName)
        } else {
            event.create(block.id)
                .soundType(block.sound)
                .hardness(block.hardness)
                .resistance(block.resistance)
                .requiresTool(true)
                .tagBlock(block.tags[0])
                .tagBlock(block.tags[1])
                .displayName(displayName)
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