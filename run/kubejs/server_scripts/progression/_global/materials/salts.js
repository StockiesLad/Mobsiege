//Refer to progression:technology_1
//Refer to progression:mechanical_1

itemTags((event, funcs) => {
     //Sodium Chloride
     funcs.add(`${main}:dusts/salt`, ['primalstage:salt', 'ingredientsdelight:salt'])
     funcs.add(`${main}:salt`, `#${main}:dusts/salt`)

     //Nitrate Salts
     funcs.add(`${main}:dusts/saltpeter`, preferredItemId(`${main}:dusts/niter`))
     funcs.add(`${main}:dusts/niter`, 'tfmg:nitrate_dust')
     funcs.remove(`${main}:niter`, 'tfmg:nitrate_dust')
     funcs.switchTagsUniformly('immersiveengineering:dust_saltpeter', `${main}:dusts/saltpeter`, `${main}:dusts/niter`)
     funcs.add('%niter', [`#${main}:dusts/niter`, `#${main}:gems/niter`])
})

commonTags((event, funcs) => {
     //Sodium Chloride
     funcs.add(`${main}:storage_blocks/salt`, 'mekanism:block_salt')
     funcs.add(`${main}:ores/salt`, 'primalstage:salt_block')
})