recipes((event, funcs) => {
     comfuncs.iterate([
          {output: 'constructionwand:stone_wand', input: '#forge:rods/wooden'},
          {output: 'constructionwand:iron_wand', input: '#forge:rods/wooden'},
          {output: 'constructionwand:diamond_wand', input: '#forge:rods/wooden'}
     ], object => funcs.removeAndHide(object.output))

     funcs.replace({output: 'constructionwand:infinity_wand', input: '#forge:rods/wooden'}, r => funcs.vanillaInsert(r, [['#forge:rods/wooden', 6], ['#forge:storage_blocks/gravitium_alloy', 4], ['bedrockium_awaken:bedrockium_block', 2]]))
})