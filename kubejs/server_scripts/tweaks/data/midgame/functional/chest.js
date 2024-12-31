recipes((event, funcs) => {
     comfuncs.iterate([
          'expandedstorage:old_wood_chest', 
          'expandedstorage:old_iron_chest', 
          'expandedstorage:old_gold_chest', 
          'expandedstorage:old_diamond_chest', 
          'expandedstorage:old_obsidian_chest', 
          'expandedstorage:old_netherite_chest'
     ], funcs.removeAndHide)
     comfuncs.iterate([
          ['expandedstorage:iron_chest', 'ae2:smooth_sky_stone_chest', '#forge:ingots/iron'],
          ['expandedstorage:gold_chest', 'expandedstorage:iron_chest', '#forge:ingots/gold'],
          ['expandedstorage:diamond_chest', 'expandedstorage:gold_chest', '#forge:gems/diamond'],
          ['expandedstorage:obsidian_chest', 'expandedstorage:diamond_chest', '#forge:obsidian'],
          ['expandedstorage:netherite_chest', 'expandedstorage:obsidian_chest', '#forge:ingots/netherite']
     ], items => funcs.replaceOutputRecipe(items[0], r => funcs.planet(r, items[1], items[2])))

     event.smelting('ae2:smooth_sky_stone_chest', 'ae2:sky_stone_chest').xp(0.2)
     event.blasting('ae2:smooth_sky_stone_chest', 'ae2:sky_stone_chest').xp(0.2)  
})

ServerEvents.tags('item', event => {
     event.add('forge:chests/wooden', 'expandedstorage:wooden_chests')
})