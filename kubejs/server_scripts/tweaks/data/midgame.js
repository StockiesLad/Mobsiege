// Covers Metal and Machine Age
/*register('data', context => {
    var {globalTags, itemTags, blockTags, commonTags, lootTables, recipes} = context.functions
    //////Materials//////Materials//////Materials//////Materials//////Materials//////Materials//////
    recipes.remove({id: 'create:crafting/materials/andesite_alloy_from_zinc'})
    recipes.replace({id: 'create:crafting/materials/andesite_alloy'}, () => recipes.shapeless(
        '2x create:andesite_alloy', ['#forge:dusts/invar', 'andesite', '#forge:dusts/zinc', 'andesite']
    ))
    //////Components//////Components//////Components//////Components//////Components//////Components//////
    recipes.replaceOutputRecipe('4x create:shaft', r => recipes.insertion(r, [recipes.insert('create:andesite_alloy', [0, 6]), recipes.insert('#forge:ingots/titanium', [3])]))
    recipes.replaceInput({id: 'alexscaves:uranium_rod'}, '#forge:raw_materials/uranium', '#forge:ingots/uranium')
    //////Machines//////Machines//////Machines//////Machines//////Machines//////Machines//////
    comfuncs.iterate([
        ['expandedstorage:iron_chest', 'ae2:smooth_sky_stone_chest', 'forge:ingots/iron'],
        ['expandedstorage:gold_chest', 'expandedstorage:iron_chest', 'forge:ingots/gold'],
        ['expandedstorage:diamond_chest', 'expandedstorage:gold_chest', 'forge:gems/diamond'],
        ['expandedstorage:obsidian_chest', 'expandedstorage:diamond_chest', 'forge:obsidian'],
        ['expandedstorage:netherite_chest', 'expandedstorage:obsidian_chest', 'forge:ingots/netherite'],
    ], items => recipes.replace({id: items[0]}, () => recipes.planet(items[0], items[2], items[3])))
    recipes.replaceInput({id: 'alexscaves:nuclear_furnace_component'}, '#forge:raw_materials/uranium', '#forge:ingots/uranium')
    recipes.replaceInput({id: 'alexscaves:nuclear_siren'}, '#forge:raw_materials/uranium', '#forge:ingots/uranium')
    recipes.smelting('ae2:smooth_sky_stone_chest', 'ae2:sky_stone_chest').xp(0.2) 
})*/

