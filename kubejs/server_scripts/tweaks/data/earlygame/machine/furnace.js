recipes((event, funcs) => {
     var {generate} = funcs

     funcs.removeAll([
          {id: 'quark:building/crafting/furnaces/blackstone_blast_furnace'},
          {id: 'quark:building/crafting/furnaces/deepslate_blast_furnace'},
          {id: 'aether_genesis:holystone_blast_furnace'}
     ])
     funcs.removeAndHide('betternether:blackstone_furnace')

     event.replaceInput({input: 'minecraft:furnace'}, 'minecraft:furnace', '#forge:furnaces')
     event.replaceInput({output: 'minecraft:blast_furnace'}, 'primalstage:diamond_plate', funcs.preferredItem('forge:plates/iron'))
     funcs.replaceOutputRecipe('minecraft:furnace', result => generate(result, ['#forge:stone', comfuncs.packDef('advanced_fire_bricks')]).rollingSquare(1, 3).override(['primalstage:kiln', 4]).next().vanilla())
     funcs.replaceTagRecipes({type: 'minecraft:crafting_shaped', output: funcs.def('|primitive_furnaces')}, (output, ingredients) => {
          generate(output, [ingredients[0], comfuncs.packDef('advanced_fire_bricks')]).rollingSquare(1, 3).override(['primalstage:kiln', 4]).next().vanilla()
      })
})

itemTags((event, funcs) => {
     funcs.unifiedAdd([
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
