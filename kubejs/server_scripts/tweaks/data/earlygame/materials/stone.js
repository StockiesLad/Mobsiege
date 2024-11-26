recipes((event, funcs) => {
    funcs.twoSquareAlt('minecraft:end_stone', 'betterend:endstone_dust')
})

itemTags((event, funcs) => {
     funcs.unifiedAdd([
         ['notreepunching:loose_rock_placeable_on', '#forge:stone']
     ])
 })