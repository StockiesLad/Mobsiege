recipes((event, funcs) => {
     common.alwaysArray([
          {output: `constructionwand:stone_wand`, input: `#${main}:rods/wooden`},
          {output: `constructionwand:iron_wand`, input: `#${main}:rods/wooden`},
          {output: `constructionwand:diamond_wand`, input: `#${main}:rods/wooden`}
     ]).forEach(object => funcs.nuke(object.output))

     funcs.vanillaInsert(funcs.removeInsurely({output: `constructionwand:infinity_wand`, input: `#${main}:rods/wooden`}), [[`#${main}:rods/wooden`, 6], [`#${main}:storage_blocks/gravitium_alloy`, 4], [`bedrockium_awaken:bedrockium_block`, 2]])
})