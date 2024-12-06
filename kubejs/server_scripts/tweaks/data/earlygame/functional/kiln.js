recipes((event, funcs) => {
     /*var kilnSmeltingMaterials = [
          "aluminum",
          "elementium",
          "lead",
          "nickel",
          "osmium",
          "silver",
          "tin",
          "uranium",
          "zinc"
      ]*/
     funcs.replaceOutputRecipe('primalstage:kiln', r => funcs.vanillaInsert(r, [
          ['primalstage:kiln_bricks', [6, 3, 1, 5, 8]],
          [custom.high_grade_charcoal, 4],
          ['minecraft:campfire', 7]
     ]))

     comfuncs.unifiedCall(material => {
          var smelted = AlmostUnified.getPreferredItemForTag(`forge:storage_blocks/${material}`).getIdLocation().toString()
          var raw = AlmostUnified.getPreferredItemForTag(`forge:storage_blocks/raw_${material}`).getIdLocation().toString()
          funcs.kilnSmelting(smelted, raw)
     }, [
          "aluminum",
          "elementium",
          "lead",
          "nickel",
          "osmium",
          "silver",
          "tin",
          "uranium",
          "zinc"
     ])
     /*kilnSmeltingMaterials.forEach(material => {
          var smelted = AlmostUnified.getPreferredItemForTag(`forge:storage_blocks/${material}`).getIdLocation().toString()
          var raw = AlmostUnified.getPreferredItemForTag(`forge:storage_blocks/raw_${material}`).getIdLocation().toString()
          funcs.kilnSmelting(smelted, raw)
      })*/
})