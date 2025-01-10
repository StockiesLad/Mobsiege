recipes((event, funcs) => {
     var recipes = [
          {output: 'createendertransmission:fluid_transmitter'},
          {output: 'createendertransmission:item_transmitter'}, 
          {output: 'createendertransmission:energy_transmitter'}
     ]

     recipes.forEach(recipe => {
          event.replaceInput(recipe, 'minecraft:ender_eye', 'enderstorage:ender_chest')
          event.replaceInput(recipe, 'minecraft:ender_pearl', preferredItemId('forge:ingots/enderium'))
     })
})