recipes((event, funcs) => {
     event.shapeless(
          Item.of(AlmostUnified.getPreferredItemForTag('forge:dusts/rose_gold').getIdLocation(), 2), 
          [AlmostUnified.getPreferredItemForTag('forge:dusts/copper'), AlmostUnified.getPreferredItemForTag('forge:dusts/gold')]
     )
})