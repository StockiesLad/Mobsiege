BlockEvents.modification(event => {
    var blocks = [
        'log',
        'planks',
        'stairs',
        'slab'
    ]
    blocks.forEach(type => event.modify('carbonize:charcoal_' + type, block => block.soundType = 'SAND'))
    event.modify('carbonize:charcoal_block', block => {
        block.destroySpeed = 5.0
        block.requiresTool = true;
    })
})