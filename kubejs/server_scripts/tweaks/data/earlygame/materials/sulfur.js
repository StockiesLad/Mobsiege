ServerEvents.tags('item', event => {
     event.add('forge:dusts/sulfur', '#forge:sulfurs')
})

commonTags((event, funcs) => {
     //event.add('forge:storage_blocks/sulfur', 'cinderscapes:sulfur_block')
     event.add('forge:storage_blocks/sulfur', [
          'cinderscapes:sulfur_block', 
          'alexscaves:sulfur'
      ])
})