// Includes Better Nether, Better End & Eden Ring because the structure, style and development is practically the same.

ServerEvents.recipes(event => {
    /*event.remove({id: 'betterend:charcoal_block'})

    replaceRecipeCmplx(event, {id: 'betterend:sulphur_gunpowder'}, result => vertical2x1Recipe(event, AlmostUnified.getPreferredItemForTag('forge:dusts/sulfur'), 'betterend:crystalline_sulphur'))
    
    square2x2Recipe(event, 'minecraft:bone_block', 'edenring:balloon_mushroom_stem')
    square2x2Recipe(event, 'minecraft:end_stone', 'betterend:endstone_dust')
    alternate2x2Recipe(event, '2x betterend:charcoal_block', '#forge:storage_blocks/charcoal', 'minecraft:soul_sand')
    alternate2x2Recipe(event, '2x betterend:neon_cactus', 'betternether:nether_cactus', 'betternether:neon_equisetum')*/
})

ServerEvents.tags('block', event => {
    /*var nonSpecific = [
        ['betterend:mossy_obsidian', WART_COVERED_STONE],
        ['edenring:mossy_stone', GRASS_COVERED_STONE]
    ]
    nonSpecific.forEach(element => event.add(element[1], element[0]))*/
})