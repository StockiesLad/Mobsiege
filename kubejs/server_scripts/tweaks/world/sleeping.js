var sleepingBlocks = [
    'aether:skyroot_bed',
    'minecraft:red_bed',
    'minecraft:black_bed',
    'minecraft:blue_bed',
    'minecraft:brown_bed',
    'minecraft:cyan_bed',
    'minecraft:gray_bed',
    'minecraft:green_bed',
    'minecraft:light_blue_bed',
    'minecraft:light_gray_bed',
    'minecraft:lime_bed',
    'minecraft:magenta_bed',
    'minecraft:orange_bed',
    'minecraft:pink_bed',
    'minecraft:purple_bed',
    'minecraft:white_bed',
    'minecraft:yellow_bed',
    'comforts:sleeping_bag_black',
    'comforts:sleeping_bag_blue',
    'comforts:sleeping_bag_brown',
    'comforts:sleeping_bag_cyan',
    'comforts:sleeping_bag_gray',
    'comforts:sleeping_bag_green',
    'comforts:sleeping_bag_light_blue',
    'comforts:sleeping_bag_light_gray',
    'comforts:sleeping_bag_lime',
    'comforts:sleeping_bag_magenta',
    'comforts:sleeping_bag_orange',
    'comforts:sleeping_bag_pink',
    'comforts:sleeping_bag_purple',
    'comforts:sleeping_bag_red',
    'comforts:sleeping_bag_white',
    'comforts:sleeping_bag_yellow',
    'comforts:hammock_black',
    'comforts:hammock_blue',
    'comforts:hammock_brown',
    'comforts:hammock_cyan',
    'comforts:hammock_gray',
    'comforts:hammock_green',
    'comforts:hammock_light_blue',
    'comforts:hammock_light_gray',
    'comforts:hammock_lime',
    'comforts:hammock_magenta',
    'comforts:hammock_orange',
    'comforts:hammock_pink',
    'comforts:hammock_purple',
    'comforts:hammock_red',
    'comforts:hammock_white',
    'comforts:hammock_yellow'
]

commonTags((event, funcs) => {
    event.add(comfuncs.packDef('sleeping_blocks'), ['#minecraft:beds', '#comforts:sleeping_bags', '#comforts:hammocks', '#upgrade_aquatic:bedrolls'])
})

BlockEvents.rightClicked(event => {
    var level = event.getLevel()
    var block = event.getBlock()
    if (block.hasTag(comfuncs.packDef('sleeping_blocks')) && !isChunkSafe(level, level.getChunkAt(block.getPos()).getPos())) {
        event.entity.tell('You are too vulnerable to sleep. Use an interdiction torch to protect yourself!')
        event.cancel()
    }
})