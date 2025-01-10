recipes((event, funcs) => {
     event.replaceInput({input: 'minecraft:crying_obsidian'}, 'minecraft:crying_obsidian', packTag('obsidian/crying'))
     event.replaceInput({input: 'minecraft:obsidian'}, 'minecraft:obsidian', '#forge:obsidian')
})

itemTags((event, funcs) => {
     event.add(pack('obsidian/crying'), ['betternether:blue_weeping_obsidian', 'betternether:weeping_obsidian', 'betternether:blue_crying_obsidian'])
})

commonTags((event, funcs) => {
     event.add('forge:obsidian', 'betternether:blue_obsidian')
})