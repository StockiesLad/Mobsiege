recipes((event, funcs) => {
     funcs.removeAndHide('primalstage:fire_sticks')
     funcs.removeAll([
          {id: 'hardcore_torches:lit_torch'},
          {id: 'hardcore_torches:light_torch_free_item'}
     ])

     funcs.replaceOutputRecipe('hardcore_torches:unlit_torch', result => funcs.vanillaInsert(result,[['#minecraft:coals', 0], ['#forge:rods/wooden', 2]]))
     funcs.replaceOutputRecipe('hardcore_torches:fire_starter', result => funcs.vanillaInsert(result, [['#notreepunching:string', 0], ['#forge:rods/wooden', [1, 2]]]))
     funcs.replaceOutputRecipe('2x minecraft:torch', result => event.shapeless(result, ['minecraft:blaze_powder', '#minecraft:torches/temp', '#minecraft:torches/temp']))
     funcs.replaceOutputRecipe('4x minecraft:torch', result => funcs.vanillaInsert(result, [['minecraft:blaze_powder', 0], ['#minecraft:coals', 3], ['#forge:rods/wooden', 6]]))
     funcs.replace({input: 'minecraft:stick', output: '8x hardcore_torches:unlit_torch'}, r => funcs.toolDamagingShapeless(r, ['#forge:coal/high_grade', 'primalstage:spruce_logs', '#minecraft:saws'])) 
     event.shapeless('2x hardcore_torches:unlit_torch', ['#forge:coal', Item.of('hardcore_torches:burnt_torch').withCount(2)])
     event.shapeless('8x hardcore_torches:unlit_torch', ['#forge:coal/high_grade', Item.of('hardcore_torches:burnt_torch').withCount(8)])
})

itemTags((event, funcs) => {
     event.add('minecraft:torches/temp', ['hardcore_torches:unlit_torch', 'hardcore_torches:lit_torch'])
     event.add('hardcore_torches:damage_torch_light_items', 'notreepunching:fire_starter')
     event.add('hardcore_torches:damage_lantern_light_items', 'notreepunching:fire_starter')
     event.add('ad_astra:destroyed_in_space', '#hardcore_torches:torches/temp')
     event.add('carbonize:damage_igniters', 'notreepunching:fire_starter')
     event.add('carbonize:consume_igniters', 'hardcore_torches:fire_starter')
})

blockTags((event, funcs) => {
     var cooling = [
          'blockus:soul_lantern_block', 
          'minecraft:soul_lantern', 
          'hardcore_torches:lit_soul_lantern', 
          'minecraft:soul_torch'
     ]
     var heating = [
          'blockus:blaze_lantern', 
          'blockus:lantern_block', 
          'blockus:amethyst_lantern_block', 
          'minecraft:lantern', 
          'blockus:amethyst_lantern', 
          'hardcore_torches:lit_lantern', 
          'minecraft:torch', 
          'hardcore_torches:lit_torch', 
          'hardcore_torches:smoldering_torch'
     ]

     event.add('minecraft:wall_post_override', ['hardcore_torches:smoldering_torch', 'hardcore_torches:lit_torch'])
     
     event.add('toughasnails:cooling_blocks', cooling)
     event.add('toughasnails:cooling_held_items', cooling)
     event.add('toughasnails:heating_blocks', heating)
     event.add('toughasnails:heating_held_items', heating)
})

