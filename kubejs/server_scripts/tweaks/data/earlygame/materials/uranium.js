recipes((event, funcs) => {
     funcs.globalPressing(preferredStack('forge:ingots/uranium', 2), 'alexscaves:uranium')
})

commonTags((event, funcs) => {
     event.remove('forge:nuggets/uranium', 'alexscaves:uranium_shard')
     funcs.switchTagsRespectively([
          ['alexscaves:uranium', 'forge:ingots/uranium', 'forge:raw_materials/uranium'],
          ['alexscaves:block_of_uranium', 'forge:storage_blocks/uranium', 'forge:storage_blocks/raw_uranium']
     ])
})

basicLootTables((event, funcs) => { 
     funcs.replaceBasiclt(funcs.createBasicLt(
          () => preferredItemId('forge:raw_materials/uranium'), 
          funcExplosionDecay(), 
          funcs.blockEntry({functions: [countSet(countUniform(3, 5), false), funcFortune(formulaUniformBonus(1))]}, 'alexscaves:radrock_uranium_ore')
     ))
})