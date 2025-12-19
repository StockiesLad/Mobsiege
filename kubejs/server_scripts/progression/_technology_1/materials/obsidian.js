recipes((event, funcs) => {
     event.replaceInput({input: 'minecraft:crying_obsidian'}, 'minecraft:crying_obsidian', tags.crying_obsidian)
     event.replaceInput({input: 'minecraft:obsidian'}, 'minecraft:obsidian', `${mains}:obsidian`)
})

itemTags((event, funcs) => {
     funcs.add(tags.crying_obsidian, ['betternether:blue_weeping_obsidian', 'betternether:weeping_obsidian', 'betternether:blue_crying_obsidian'])
})

commonTags((event, funcs) => {
     funcs.add(`${main}:obsidian`, 'betternether:blue_obsidian')
})