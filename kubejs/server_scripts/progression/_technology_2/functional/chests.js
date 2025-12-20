//Electrical 3
//Mechanical 2

recipes((event, funcs) => {
     common.alwaysArray([
          'expandedstorage:old_wood_chest', 
          'expandedstorage:old_iron_chest', 
          'expandedstorage:old_gold_chest', 
          'expandedstorage:old_diamond_chest', 
          'expandedstorage:old_obsidian_chest', 
          'expandedstorage:old_netherite_chest',
          Item.of('expandedstorage:storage_mutator','{mode:0b}'),
          Item.of('expandedstorage:storage_mutator','{mode:1b}'),
          Item.of('expandedstorage:storage_mutator','{mode:2b}'),
          Item.of('expandedstorage:storage_mutator','{mode:3b}'),
          Item.of('expandedstorage:storage_mutator', "{display:{Name:'{\"italic\":true,\"text\":\"Sparrow\"}'},mode:3b}"),
          'expandedstorage:wood_to_copper_conversion_kit',
          'expandedstorage:wood_to_iron_conversion_kit',
          'expandedstorage:wood_to_gold_conversion_kit',
          'expandedstorage:copper_to_netherite_conversion_kit',
          'expandedstorage:copper_to_obsidian_conversion_kit',
          'expandedstorage:copper_to_diamond_conversion_kit',
          'expandedstorage:copper_to_gold_conversion_kit',
          'expandedstorage:copper_to_iron_conversion_kit',
          'expandedstorage:wood_to_netherite_conversion_kit',
          'expandedstorage:wood_to_obsidian_conversion_kit',
          'expandedstorage:wood_to_diamond_conversion_kit',
          'expandedstorage:diamond_to_obsidian_conversion_kit',
          'expandedstorage:gold_to_netherite_conversion_kit',
          'expandedstorage:gold_to_obsidian_conversion_kit',
          'expandedstorage:gold_to_diamond_conversion_kit',
          'expandedstorage:iron_to_netherite_conversion_kit',
          'expandedstorage:iron_to_obsidian_conversion_kit',
          'expandedstorage:iron_to_diamond_conversion_kit',
          'expandedstorage:iron_to_gold_conversion_kit',
          'expandedstorage:obsidian_to_netherite_conversion_kit',
          'expandedstorage:diamond_to_netherite_conversion_kit'
     ]).forEach(o => funcs.nuke(o))

     event.replaceInput({output: 'expandedstorage:copper_barrel'}, `#${main}:ingots/copper`, `#${main}:storage_blocks/copper`)
     funcs.planet(funcs.removeByOutput('expandedstorage:iron_barrel'), 'expandedstorage:copper_barrel', `#${main}:ingots/iron`).vanilla()

     funcs.globalSmelting('ae2:smooth_sky_stone_chest', 'ae2:sky_stone_chest', 0.2)
     funcs.planet(funcs.removeByOutput('expandedstorage:iron_chest'), 'ae2:smooth_sky_stone_chest', `#${main}:ingots/iron`).vanilla()
})

ServerEvents.tags('item', event => {
     event.add(`${main}:chests/wooden`, 'expandedstorage:wooden_chests')
})

function iterateESChest(toRecipe) {
     common.alwaysArray(['diamond', 'obsidian', 'netherite']).forEach((mat, i, arr) => {
          var matBefore = arr[i - 1]
          matBefore = matBefore != null ? matBefore : 'gold'
          var type = mat === 'diamond' ? 'gems/' : mat === 'obsidian' ? '' : 'ingots/'
          toRecipe(mat, `#${main}:${type}${mat}`, matBefore)
     })
}