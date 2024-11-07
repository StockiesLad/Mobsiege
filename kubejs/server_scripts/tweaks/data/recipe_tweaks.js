ServerEvents.recipes(event => {
    hardcoretorchesRecipes(event)
    notreepunchingRecipes(event)
    thermalRecipes(event)

    /*insertionRecipe(event, 'minecraft:diamond', [createIngredientObject('minecraft:stick', [0, 4, 8]), createIngredientObject('minecraft:redstone', [1, 2, 3])])
    insertionRecipe(event, 'minecraft:emerald', [createIngredientObject('minecraft:stick', [0, 4, 8]), createIngredientObject('minecraft:redstone', [0, 4])])
    insertionRecipe(event, 'minecraft:emerald', [createIngredientObject('minecraft:stick', [0, 4, 8]), createIngredientObject('minecraft:redstone', [0, 4, 5])])*/
})

function progressionRecipes(event) {
    event.replaceInput({id: 'alexscaves:nuclear_furnace_component'}, '#forge:raw_materials/uranium', '#forge:ingots/uranium')
    event.replaceInput({id: 'alexscaves:nuclear_siren'}, '#forge:raw_materials/uranium', '#forge:ingots/uranium')
    event.replaceInput({id: 'alexscaves:uranium_rod'}, '#forge:raw_materials/uranium', '#forge:ingots/uranium')
    event.replaceInput({input: 'minecraft:crafting_table'}, 'minecraft:crafting_table', '#forge:workbench')
    event.replaceInput({input: 'minecraft:furnace'}, 'minecraft:furnace', '#forge:furnaces')

    replaceRecipeCmplx(event, {id: 'create:crafting/materials/andesite_alloy'}, r => event.shapeless('2x create:andesite_alloy', ['#forge:dusts/invar', 'andesite', '#forge:dusts/zinc', 'andesite']))
    replaceRecipeSmpl(event, '4x create:shaft', r => horizontalABARecipe(event, r, 'create:andesite_alloy', '#forge:ingots/titanium'))

    alternate2x2Recipe(event, '2x betterend:neon_cactus', 'betternether:nether_cactus', 'betternether:neon_equisetum')
    horizontal2x1Recipe(event, '3x carbonize:ash_layer', 'carbonize:ash_block')
    square2x2Recipe(event, 'carbonize:ash_block', 'carbonize:ash')
    square2x2Recipe(event, 'minecraft:bone_block', 'edenring:balloon_mushroom_stem')
    square2x2Recipe(event, 'minecraft:end_stone', 'betterend:endstone_dust')
    event.smelting('ae2:smooth_sky_stone_chest', 'ae2:sky_stone_chest')
    global.iterateWithIndex([
        {type: 'iron'},
        {type: 'gold'},
        {type: 'diamond', mat: 'gems'},
        {type: 'obsidian', mat: ''},
        {type:'netherite'}
    ], (object, index) => {
        let chest = global.appendResourceLocation('expandedstorage', object.type + '_chest')
        event.remove({id: chest.replace(':', ':old_')})
        let inputChest = 'ae2:smooth_sky_stone_chest'
        var inputMat
        if (object.mat != null)
            if (object.mat != '')
                inputMat = global.appendResourceLocation('#forge', object.mat + '/' + object.type)
            else inputMat = global.appendResourceLocation('#forge', object.type)
        else inputMat = global.appendResourceLocation('#forge', 'ingots/' + object.type)
        if (object.type != 'iron')
            inputChest = global.appendResourceLocation('expandedstorage', types[index - 1].type + '_chest')
        replaceRecipeCmplx(event, {id: chest}, result => planetRecipe(event, chest, inputMat, inputChest))
    }) 
}

function materialRecipes(event) {
    global.TOOLS.forEach(tool => event.remove([{output: 'aether:skyroot_' + tool}, {output: 'aether:holystone_' + tool}]))
    event.remove({id: 'alexscaves:gunpowder_from_sulfur'})
    event.remove({id: 'ancient_aether:skyroot_crafting_table_from_ancient_aether_planks'})
    event.remove({id: 'betterend:charcoal_block'})
    event.remove({id: 'biggerreactors:smelting/uranium_chunk'})
    event.remove({id: 'biggerreactors:blasting/uranium_chunk'})
    event.remove({id: 'create:crafting/materials/andesite_alloy_from_zinc'})
    event.remove({id: 'deep_aether:skyroot_crafting_table'})
    event.remove({output: 'minecraft:charcoal', type: 'minecraft:smelting'})

    replaceRecipeCmplx(event, {id: 'betterend:sulphur_gunpowder'}, result => vertical2x1Recipe(event, AlmostUnified.getPreferredItemForTag('forge:dusts/sulfur'), 'betterend:crystalline_sulphur'))
    
    alternate2x2Recipe(event, '2x betterend:charcoal_block', '#forge:storage_blocks/charcoal', 'minecraft:soul_sand')
    event.shapeless('5x minecraft:bone', ['minecraft:bone_block', 'minecraft:bone_block'])
    event.shapeless('minecraft:stick', '#minecraft:saplings')
    event.smelting('2x minecraft:redstone', 'createoreexcavation:raw_redstone').xp(0.7)
}





function hardcoretorchesRecipes(event) {
    event.remove({id: 'hardcore_torches:lit_torch'})
    event.remove({id: 'hardcore_torches:light_torch_free_item'})
    removeUsage(event, 'hardcore_torches:smoldering_torch')
    replaceRecipeSmpl(event, '2x minecraft:torch', result => event.shapeless(result, ['minecraft:glowstone_dust', '#minecraft:torches/temp', '#minecraft:torches/temp']))

    planetRecipe(event, '8x hardcore_torches:unlit_torch', 'hardcore_torches:burnt_torch', '#minecraft:coals')
    
    replaceRecipeSmpl(event, '4x hardcore_torches:unlit_torch', result => verticalABRecipe(event, result, '#minecraft:coals', '#forge:rods/wooden'))
    
    replaceRecipeSmpl(event, '4x minecraft:torch', result => verticalABCRecipe(event, result, 'minecraft:glowstone_dust', '#minecraft:coals', '#forge:rods/wooden'))
    replaceRecipeSmpl(event, 'hardcore_torches:fire_starter', result => event.shaped(result, [
        'SW',
        'W '
    ], {
        S: '#notreepunching:string',
        W: '#forge:rods/wooden'
    }))
}

function notreepunchingRecipes(event) {
    removeAndHide(event, 'betternether:blackstone_furnace')
    replaceRecipeCmplx(event, {input: '#notreepunching:weak_saws', output: 'minecraft:stick'}, result => {
    toolDamagingShapeless(event, result, ['#minecraft:axes', '#minecraft:planks'])
    toolDamagingShapeless(event, '6x ' + result, ['#minecraft:axes', '#minecraft:logs'])
    })

    replaceRecipeCmplx(event, {input: '#notreepunching:h/saws', output: 'minecraft:stick'}, result => {
    toolDamagingShapeless(event, '2x ' + result, ['#minecraft:saws', '#minecraft:planks'])
    toolDamagingShapeless(event, '8x ' + result, ['#minecraft:saws', '#minecraft:logs'])
    })

    let runnables = []
        event.forEachRecipe({type: 'minecraft:crafting_shaped', input: '#aether:skyroot_repairing', output: 'aether:skyroot_stick'}, recipe => {
            let ingredients = recipe.originalRecipeIngredients
            let output = recipe.originalRecipeResult

            runnables.push(() => event.remove({id: recipe.getId()}))
            toolDamagingShapeless(event, Item.of(output).withCount(1), [ingredients[0], '#minecraft:axes'])
            toolDamagingShapeless(event, Item.of(output).withCount(2), [ingredients[0], '#minecraft:saws'])
            toolDamagingShapeless(event, Item.of(output).withCount(6), ['#mobsiege:aether_logs', '#minecraft:axes'])
            toolDamagingShapeless(event, Item.of(output).withCount(8), ['#mobsiege:aether_logs', '#minecraft:saws'])
        })
        event.forEachRecipe({type: 'minecraft:crafting_shapeless', input: ['#minecraft:logs', '#minecraft:axes'], output: '#minecraft:planks'}, recipe => {
            let ingredients = recipe.originalRecipeIngredients
            let output = recipe.originalRecipeResult

            runnables.push(() => event.remove({id: recipe.getId()}))
            toolDamagingShapeless(event, Item.of(output).withCount(3), [ingredients[0], '#minecraft:axes'])
            toolDamagingShapeless(event, Item.of(output).withCount(4), [ingredients[0], '#minecraft:saws'])
        })
        event.forEachRecipe({type: 'minecraft:crafting_shaped', output: '#forge:workbench'}, recipe => {
            let ingredients = recipe.originalRecipeIngredients
            let ingredient = ingredients[0]
            let output = recipe.originalRecipeResult
            let newRecipe = () => {
                toolDamagingShapeless(event, output, [ingredient, ingredient, '#minecraft:axes'])
                toolDamagingShapeless(event, output, [ingredient, '#minecraft:saws'])
            }

            runnables.push(() => event.remove({id: recipe.getId()}))

            if (output.equalsIgnoringCount(Item.of('aether_genesis:skyroot_crafting_table')))
                ingredient = '#aether:planks_crafting'
            else if (output.equalsIgnoringCount(Item.of('minecraft:crafting_table'))) 
                ingredient = '#minecraft:planks'

            newRecipe()
        })
        event.forEachRecipe({type: 'minecraft:crafting_shaped', output: '#forge:furnaces' }, recipe => {
            let ingredients = recipe.originalRecipeIngredients
            let ingredient = ingredients[0]
            let output = recipe.originalRecipeResult

            runnables.push(() => event.remove({id: recipe.getId()}))
            if (output.equalsIgnoringCount(Item.of('minecraft:furnace'))) {
                if (recipe.getId() == 'minecraft:furnace')
                planetRecipe(event, output, ingredient, 'minecraft:bricks')
            } else planetRecipe(event, output, ingredient, 'minecraft:bricks')
        })
    runnables.forEach(runnable => runnable())
  
    replaceRecipeSmpl(event, 'notreepunching:flint_axe', result => event.shaped(result, [
        'SF',
        'WF',
        'W '
    ], {
        S: '#notreepunching:string',
        W: '#forge:rods/wooden',
        F: 'notreepunching:flint_shard'
    }))

    event.shaped('minecraft:campfire', [
        ' T ',
        'TCT',
        'PPP'
    ], {
        T: '#minecraft:torches/temp',
        C: '#minecraft:coals',
        P: '#minecraft:planks'
    })

    vertical2x1Recipe(event, '2x minecraft:stick', '#mobsiege:vines')
    vertical2x1Recipe(event, '2x aether:skyroot_stick', '#mobsiege:aether_vines')
    alternate2x2Recipe(event, '2x minecraft:clay', '#forge:sand', '#mobsiege:jelly_blocks')
    alternate2x2Recipe(event, '2x minecraft:clay', '#forge:sand', '#minecraft:wart_blocks')
    alternate2x2Recipe(event, '2x minecraft:clay', 'aether_redux:holysilt', '#mobsiege:mud')
    alternate2x2Recipe(event, '2x minecraft:gravel', 'minecraft:end_stone', 'promenade:dark_amaranth_wart_block')
    alternate2x2Recipe(event, '2x minecraft:gravel', 'aether_redux:driftshale', '#mobsiege:mud')
    toolDamagingShapeless(event, 'notreepunching:clay_brick', ['minecraft:clay_ball', 'minecraft:clay_ball', '#minecraft:shovels'])
    toolDamagingShapeless(event, '2x notreepunching:clay_brick', ['minecraft:clay', '#minecraft:shovels'])
    toolDamagingShapeless(event, '2x notreepunching:plant_fiber', ['#minecraft:wart_blocks', '#notreepunching:knives'])
    replaceRecipeCmplx(event, {input: 'minecraft:vine', output: 'notreepunching:plant_fiber'}, result => toolDamagingShapeless(event, '3x ' + result, ['#mobsiege:vines', '#notreepunching:knives']))
}

function thermalRecipes(event) {
    event.shapeless(Item.of(AlmostUnified.getPreferredItemForTag('forge:dusts/rose_gold').getIdLocation(), 2), [
        AlmostUnified.getPreferredItemForTag('forge:dusts/copper'), AlmostUnified.getPreferredItemForTag('forge:dusts/gold')
    ])
}
