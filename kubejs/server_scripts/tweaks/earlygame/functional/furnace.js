recipes((event, funcs) => {
     funcs.nuke('betternether:blackstone_furnace')

     funcs.removeById([
          'quark:building/crafting/furnaces/blackstone_blast_furnace',
          'quark:building/crafting/furnaces/deepslate_blast_furnace',
          'aether_genesis:holystone_blast_furnace'
     ])

     event.replaceInput({input: 'minecraft:furnace'}, 'minecraft:furnace', '#forge:furnaces')
     event.replaceInput({output: 'minecraft:blast_furnace'}, 'primalstage:diamond_plate', preferredItemId('forge:plates/iron'))
     funcs.planetAlt(funcs.removeByOutput('minecraft:furnace'), 'primalstage:kiln', '#forge:stone', custom.fire_brick_block).vanilla()
     funcs.removeRecipes({type: 'minecraft:crafting_shaped', output: packTag('primitive_furnaces')}, (result, ingredients) => {
          funcs.planetAlt(result.withCount(1), [ingredients[0], custom.fire_brick_block], 'primalstage:kiln').vanilla()
     })
})

itemTags((event, funcs) => {
     funcs.addEntriesRespectively([
          ['%furnaces', [
               'aether_genesis:holystone_furnace',
               'betterend:sulphuric_rock_furnace', 
               'betterend:sandy_jadestone_furnace', 
               'betterend:umbralith_furnace', 
               'betterend:flavolite_furnace', 
               'betterend:virid_jadestone_furnace', 
               'betterend:end_stone_furnace', 
               'betterend:azure_jadestone_furnace', 
               'betterend:violecite_furnace',
               'betternether:basalt_furnace', 
               'betternether:netherrack_furnace', 
               'betternether:blackstone_furnace',
               'quark:deepslate_furnace',
               'quark:blackstone_furnace',
          ]], 
          ['|primitive_furnaces', [
               'minecraft:furnace',
               'betternether:basalt_furnace',
               'betternether:netherrack_furnace',
               'betterend:flavolite_furnace',
               'betterend:violecite_furnace',
               'betterend:sulphuric_rock_furnace',
               'betterend:virid_jadestone_furnace',
               'betterend:azure_jadestone_furnace',
               'betterend:sandy_jadestone_furnace',
               'betterend:umbralith_furnace',
               'betterend:end_stone_furnace',
               'aether_genesis:holystone_furnace',
               'quark:blackstone_furnace',
               'quark:deepslate_furnace'
          ]]
     ])
})