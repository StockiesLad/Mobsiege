recipes((event, funcs) => {
     event.replaceInput({input: 'minecraft:crying_obsidian'}, 'minecraft:crying_obsidian', tag.crying_obsidian)
     event.replaceInput({input: 'minecraft:obsidian'}, 'minecraft:obsidian', data + 'obsidian')
})

itemTags((event, funcs) => {
     event.add(tags.crying_obsidian, ['betternether:blue_weeping_obsidian', 'betternether:weeping_obsidian', 'betternether:blue_crying_obsidian'])
})

commonTags((event, funcs) => {
     event.add(data + 'obsidian', 'betternether:blue_obsidian')
})