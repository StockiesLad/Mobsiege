recipes((event, funcs) => {
     var generate = funcs.generate
     
     event.shapeless('minecraft:clay_ball', ['#forge:ash', 'minecraft:bone_meal'])
     funcs.toolDamagingShapeless('notreepunching:clay_brick', ['minecraft:clay_ball', 'minecraft:clay_ball', '#minecraft:shovels'])
     funcs.toolDamagingShapeless('2x notreepunching:clay_brick', ['minecraft:clay', '#minecraft:shovels'])
     funcs.insertAll(insertion => insertion.vanilla(), [
          generate('4x primalstage:sandy_clay_compound', ['#forge:sand', 'minecraft:clay']).rollingSquare(1, 2),
          generate(comfuncs.packDef('advanced_fire_bricks'), comfuncs.packDef('advanced_fire_brick')).flatSquare(2),
          generate(comfuncs.packDef('advanced_clay_compound'), ['thermal:constantan_dust', 'primalstage:sandy_clay_compound', 'thermal:invar_dust']).rollingSquare(1, 2),
          generate('2x minecraft:clay', ['#forge:sand', '#mobsiege:jelly_blocks']).rollingSquare(1, 2),
          generate('2x minecraft:clay', ['#forge:sand', '#minecraft:wart_blocks']).rollingSquare(1, 2),
          generate('2x minecraft:clay', ['aether_redux:holysilt', '#mobsiege:mud']).rollingSquare(1, 2),
     ])
     event.campfireCooking('primalstage:kiln_brick', 'primalstage:sandy_clay_compound')
     event.smelting('primalstage:kiln_brick', 'primalstage:sandy_clay_compound').xp(0.05)
     event.blasting('primalstage:kiln_brick', 'primalstage:sandy_clay_compound').xp(0.05)
     event.campfireCooking(comfuncs.packDef('advanced_fire_brick'), comfuncs.packDef('advanced_clay_compound'))
     event.smelting(comfuncs.packDef('advanced_fire_brick'), comfuncs.packDef('advanced_clay_compound')).xp(0.05)
     event.blasting(comfuncs.packDef('advanced_fire_brick'), comfuncs.packDef('advanced_clay_compound')).xp(0.05)
})

itemTags((event, funcs) => {
     funcs.unifiedAdd([
          ['wart_blocks', 'voidscape:thuder_wart'],
          ['|mud', ['minecraft:mud', 'deep_aether:aether_mud']],
          ['|jelly_blocks', [
              'aether_redux:jellyshroom_jelly_block', 
              'betterend:jellyshroom_cap_purple', 
              'betterend:umbrella_tree_membrane', 
              'edenring:volvox_block'
          ]]
     ])
})
