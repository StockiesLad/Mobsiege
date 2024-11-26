recipes((event, funcs) => {
     comfuncs.hide('primalstage:plant_twine')

     //plant twine to string
     event.replaceInput({input: 'primalstage:plant_twine'}, 'primalstage:plant_twine', 'notreepunching:plant_string')
     funcs.replace({input: 'minecraft:vine', output: 'notreepunching:plant_fiber'}, result => 
          funcs.toolDamagingShapeless('3x ' + result, [funcs.def('|vines'), '#notreepunching:knives'])
     )

     funcs.toolDamagingShapeless('2x notreepunching:plant_fiber', ['#minecraft:wart_blocks', '#notreepunching:knives'])    
     funcs.generate('2x betterend:neon_cactus', ['betternether:nether_cactus', 'betternether:neon_equisetum']).rollingSquare(1, 2).next().vanilla()

})

blockTags((event, funcs) => {
     funcs.unifiedRemove([
          ['minecraft:mineable/pickaxe', 'betterend:charcoal_block'],
          ['minecraft:nylium', ['edenring:eden_grass', 'edenring:eden_mycelium']]
     ])
     funcs.unifiedAdd([     
          ['minecraft:mineable/hoe', 'betterend:glowing_pillar_luminophor'],
          ['minecraft:mineable/shovel', 'betterend:charcoal_block'],
          ['mycelium', [
               'betterend:end_mycelium', 
               'betterend:end_mycelium_path',
               'betternether:nether_mycelium', 
               'edenring:eden_mycelium'
          ]],
          ['nylium', [
               'betterend:mossy_obsidian', 
               'betternether:netherrack_moss'
          ]],
          ['%soil/grass', [
               'edenring:eden_grass', 
               'edenring:mossy_stone'
          ]]
     ])
}) 