//Refer to progression:technology_1
//Refer to progression:mechanical_1

itemTags((event, funcs) => {
     //Sodium Chloride
     event.add(data + 'dusts/salt', ['primalstage:salt', 'ingredientsdelight:salt'])
     event.add(data + 'salt', dataTag + 'dusts/salt')

     //Nitrate Salts
     funcs.add(data + 'dusts/saltpeter', preferredItemId(data + 'dusts/niter'))
     funcs.add(`${main}:dusts/niter`, 'tfmg:nitrate_dust')
     funcs.remove(`${main}:niter`, 'tfmg:nitrate_dust')
     funcs.switchTagsUniformly('immersiveengineering:dust_saltpeter', `${main}:dusts/saltpeter`, `${main}:dusts/niter`)
     funcs.add('%niter', [`#${main}:dusts/niter`, `#${main}:gems/niter`])
})

commonTags((event, funcs) => {
     //Sodium Chloride
     event.add(data + 'storage_blocks/salt', 'mekanism:block_salt')
     event.add(data + 'ores/salt', 'primalstage:salt_block')
})