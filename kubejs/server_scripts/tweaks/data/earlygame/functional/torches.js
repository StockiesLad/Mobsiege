recipes((event, funcs) => {
     funcs.removeAndHide('primalstage:fire_sticks')
     funcs.removeAll([
          {id: 'hardcore_torches:lit_torch'},
          {id: 'hardcore_torches:light_torch_free_item'}
     ])

     funcs.replaceOutputRecipe('4x hardcore_torches:unlit_torch', result => funcs.vanillaInsert(result,[['#minecraft:coals', 0], ['#forge:rods/wooden', 2]]))
     funcs.replaceOutputRecipe('hardcore_torches:fire_starter', result => funcs.vanillaInsert(result, [['#notreepunching:string', 0], ['#forge:rods/wooden', [1, 2]]]))
     funcs.replaceOutputRecipe('2x minecraft:torch', result => event.shapeless(result, ['minecraft:glowstone_dust', '#minecraft:torches/temp', '#minecraft:torches/temp']))
     funcs.replaceOutputRecipe('4x minecraft:torch', result => funcs.vanillaInsert(result, [['minecraft:glowstone_dust', 0], ['#minecraft:coals', 3], ['#forge:rods/wooden', 6]]))

     funcs.planet('8x hardcore_torches:unlit_torch', '#minecraft:coals', 'hardcore_torches:burnt_torch')
})

itemTags((event, funcs) => {
     event.add('minecraft:torches/temp', ['hardcore_torches:unlit_torch', 'hardcore_torches:lit_torch'])
     event.add('hardcore_torches:damage_torch_light_items', 'notreepunching:fire_starter')
     event.add('hardcore_torches:damage_lantern_light_items', 'notreepunching:fire_starter')
     event.add('carbonize:damage_igniters', 'notreepunching:fire_starter')
     event.add('carbonize:consume_igniters', 'hardcore_torches:fire_starter')
})

blockTags((event, funcs) => {
     event.add('minecrat:wall_post_override', ['hardcore_torches:smoldering_torch', 'hardcore_torches:lit_torch'])
})

