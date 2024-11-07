ServerEvents.recipes(event => {
    /*event.smelting('ae2:smooth_sky_stone_chest', 'ae2:sky_stone_chest')
    let types = [
        {type: 'iron'},
        {type: 'gold'},
        {type: 'diamond', mat: 'gems'},
        {type: 'obsidian', mat: ''},
        {type:'netherite'}
    ]
    global.iterateWithIndex(types, (object, index) => {
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
    })*/
})