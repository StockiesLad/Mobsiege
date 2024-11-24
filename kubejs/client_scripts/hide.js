global.functions.common.incorp(global.hiddenItems, [
    'natprog:stick_block_item',
    'geologicexpansion:duck_spawn_egg', 
    'geologicexpansion:duck_egg',
    'betternether:nether_lapis_ore', 
    'betternether:nether_redstone_ore'
    /*'alexscaves:limestone', 
    'alexscaves:limestone_stairs', 
    'alexscaves:limestone_slab', 
    'alexscaves:limestone_wall', 
    'alexscaves:limestone_pillar', 
    'alexscaves:limestone_chiseled', 
    'alexscaves:smooth_limestone', 
    'alexscaves:smooth_limestone_stairs', 
    'alexscaves:smooth_limestone_slab', 
    'alexscaves:smooth_limestone_wall',*/
    /*'what_is_stone:scoria', ,
    'what_is_stone:scoria_slab', 
    'what_is_stone:scoria_stairs',
    'what_is_stone:marble', 
    'what_is_stone:polished_marble', 
    'what_is_stone:polished_marble_bricks', 
    'what_is_stone:marble_slab', 
    'what_is_stone:marble_stairs', 
    'what_is_stone:polished_marble_brick_slab', 
    'what_is_stone:polished_marble_brick_stairs', 
    'what_is_stone:polished_marble_slab', 
    'what_is_stone:polished_marble_stairs',*/
])

JEIEvents.hideItems(event => {
    global.hiddenItems.forEach(element => event.hide(element))
})

REIEvents.hide('item', event => {
    global.hiddenItems.forEach(element => event.hide(element))
})

