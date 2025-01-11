commonTags((event, funcs) => {
    event.add(pack('sleeping_blocks'), ['#minecraft:beds', '#comforts:sleeping_bags', '#comforts:hammocks', '#upgrade_aquatic:bedrolls', '#valhelsia_structures:sleeping_bags'])
})

BlockEvents.rightClicked(event => {
    var level = event.getLevel()
    var block = event.getBlock()
    if (block.hasTag(pack('sleeping_blocks')) && !isChunkSafe(level, level.getChunkAt(block.getPos()).getPos())) {
        event.entity.tell('You are too vulnerable to sleep. Use an interdiction torch to protect yourself!')
        event.cancel()
    }
})