recipes((event, funcs) => {
     comfuncs.iterate([
          'expandedstorage:old_wood_chest', 
          'expandedstorage:old_iron_chest', 
          'expandedstorage:old_gold_chest', 
          'expandedstorage:old_diamond_chest', 
          'expandedstorage:old_obsidian_chest', 
          'expandedstorage:old_netherite_chest'
     ],o => funcs.nuke(o))
     comfuncs.iterate([
          ['expandedstorage:iron_chest', 'ae2:smooth_sky_stone_chest', '#forge:ingots/iron'],
          ['expandedstorage:gold_chest', 'expandedstorage:iron_chest', '#forge:ingots/gold'],
          ['expandedstorage:diamond_chest', 'expandedstorage:gold_chest', '#forge:gems/diamond'],
          ['expandedstorage:obsidian_chest', 'expandedstorage:diamond_chest', '#forge:obsidian'],
          ['expandedstorage:netherite_chest', 'expandedstorage:obsidian_chest', '#forge:ingots/netherite']
     ], items => funcs.planet(funcs.removeByOutput(items[0]), items[1], items[2]).vanilla())

     funcs.globalSmelting('ae2:smooth_sky_stone_chest', 'ae2:sky_stone_chest', 0.2)
})

ServerEvents.tags('item', event => {
     event.add('forge:chests/wooden', 'expandedstorage:wooden_chests')
})