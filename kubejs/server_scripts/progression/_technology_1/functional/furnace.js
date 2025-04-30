recipes((event, funcs) => {
     funcs.nuke('betternether:blackstone_furnace')
     funcs.nuke('quark:blackstone_furnace')

     funcs.removeById([
          'quark:building/crafting/furnaces/blackstone_blast_furnace',
          'quark:building/crafting/furnaces/deepslate_blast_furnace',
          'quark:building/crafting/furnaces/cobblestone_furnace',
          'quark:building/crafting/furnaces/mixed_furnace',
          'aether_genesis:holystone_blast_furnace'
     ])

     funcs.planetAlt(funcs.removeByOutput('nethersdelight:blackstone_furnace'), ['minecraft:blackstone', content.fire_brick_block], 'primalstage:kiln').vanilla()
     funcs.planetAlt(funcs.removeByOutput('minecraft:furnace'), ['#minecraft:stone_crafting_materials', content.fire_brick_block], 'primalstage:kiln').vanilla()
     event.replaceInput({input: 'minecraft:furnace'}, 'minecraft:furnace', '#forge:furnaces')
     event.shapeless(packTag('primitive_furnaces'), packTag('primitive_furnaces'))
     funcs.removeRecipes({type: 'minecraft:crafting_shaped', output: packTag('primitive_furnaces')}, (result, ingredients) => {
          funcs.planetAlt(result.withCount(1), [ingredients[0], content.fire_brick_block], 'primalstage:kiln').vanilla()
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
               'nethersdelight:blackstone_furnace',
               'quark:blackstone_furnace',
               'quark:deepslate_furnace'
          ]], 
          ['|primitive_furnaces', [
               'aether_genesis:holystone_furnace',
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
               'minecraft:furnace',
               'nethersdelight:blackstone_furnace',
               'quark:blackstone_furnace',
               'quark:deepslate_furnace'
          ]]
     ])
})