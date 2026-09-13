recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeByOutput('primalstage:kiln'), [
          ['primalstage:kiln_bricks', [6, 3, 1, 5, 8]],
          [content.high_grade_charcoal, 4],
          [content.stone_lattice, 7]
     ])

     funcs.vanillaInsert('primalstage:kiln', [
          ['primalstage:kiln_bricks', [6, 3, 1, 5, 8]],
          [content.high_grade_charcoal, 4],
          [content.stone_lattice, 7]
     ])

     funcs.vanillaInsert('primalstage:kiln', [
          ['primalstage:kiln_bricks', [6, 3, 1, 5, 8]],
          ['aether:ambrosium_shard', 4],
          [content.stone_lattice, 7]
     ])

     common.alwaysArray([
          "aluminum",
          "elementium",
          "lead",
          "nickel",
          "osmium",
          "silver",
          "tin",
          "uranium",
          "zinc"
     ]).forEach(material => {
          var smelted = AlmostUnified.getPreferredItemForTag(`${main}:storage_blocks/${material}`).getIdLocation().toString()
          var raw = AlmostUnified.getPreferredItemForTag(`${main}:storage_blocks/raw_${material}`).getIdLocation().toString()
          funcs.kilnSmelting(smelted, raw)
     })
})