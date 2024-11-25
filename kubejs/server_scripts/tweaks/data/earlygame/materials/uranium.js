recipes((event, funcs) => {
     event.remove([
          {id: 'biggerreactors:smelting/uranium_chunk'}, 
          {id: 'biggerreactors:blasting/uranium_chunk'}])
})

commonTags((event, funcs) => {
     event.remove('forge:nuggets/uranium', 'alexscaves:uranium_shard')
     funcs.replaceTag('alexscaves:uranium', 'forge:ingots/uranium', 'forge:raw_materials/uranium')
     funcs.replaceTag('alexscaves:block_of_uranium', 'forge:storage_blocks/uranium', 'forge:storage_blocks/raw_uranium')
})

basicLootTables((event, funcs) => { 
     funcs.replaceBasiclt(funcs.createBasicLt(
          () => funcs.preferredItem('forge:raw_materials/uranium'), 
          funcExplosionDecay(), 
          funcs.blockEntry({functions: [countSet(countUniform(3, 5), false), funcFortune(formulaUniformBonus(1))]}, 'alexscaves:radrock_uranium_ore')
     ))
})