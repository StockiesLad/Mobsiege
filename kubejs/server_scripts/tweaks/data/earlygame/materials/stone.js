recipes((event, funcs) => {
    event.remove({id: 'notreepunching:cobblestone_from_rocks'})
    event.replaceInput({input: 'twigs:pebble'}, 'twigs:pebble', '#notreepunching:loose_rocks')
    funcs.twoSquareAlt('minecraft:end_stone', 'betterend:endstone_dust')
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