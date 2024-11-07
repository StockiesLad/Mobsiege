ServerEvents.recipes(event => {
    /*event.remove({id: 'hardcore_torches:lit_torch'})
    event.remove({id: 'hardcore_torches:light_torch_free_item'})
    removeUsage(event, 'hardcore_torches:smoldering_torch')
    replaceRecipeSmpl(event, '2x minecraft:torch', result => event.shapeless(result, ['minecraft:glowstone_dust', '#minecraft:torches/temp', '#minecraft:torches/temp']))

    planetRecipe(event, '8x hardcore_torches:unlit_torch', 'hardcore_torches:burnt_torch', '#minecraft:coals')
    replaceRecipeSmpl(event, '4x hardcore_torches:unlit_torch', result => event.shaped(result, [
        'A',
        'B'
    ], {
        A: '#minecraft:coals',
        B: '#forge:rods/wooden'
    }))
    replaceRecipeSmpl(event, '4x minecraft:torch', result => event.shaped(result, [
        'A',
        'B',
        'C'
    ], {
        A: 'minecraft:glowstone_dust',
        B: '#minecraft:coals',
        C: '#forge:rods/wooden'
    }))
    replaceRecipeSmpl(event, 'hardcore_torches:fire_starter', result => event.shaped(result, [
        'SW',
        'W '
    ], {
        S: '#notreepunching:string',
        W: '#forge:rods/wooden'
    }))*/
})

ServerEvents.tags('item', event => {
    //event.add('minecraft:torches/temp', ['hardcore_torches:unlit_torch', 'hardcore_torches:lit_torch'])
    //event.remove('hardcore_torches:free_torch_light_items', 'minecraft:lava_bucket')
})