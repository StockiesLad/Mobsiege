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