recipes((event, funcs) => {
     funcs.removeAll([
          {id: 'hardcore_torches:lit_torch'},
          {id: 'hardcore_torches:light_torch_free_item'}
     ])

     funcs.replaceOutputRecipe('4x hardcore_torches:unlit_torch', result => funcs.vanillaInsert(result,[['#minecraft:coals', 0], ['#forge:rods/wooden', 3]]))
     funcs.replaceOutputRecipe('hardcore_torches:fire_starter', result => funcs.vanillaInsert(result, [['#notreepunching:string', 0], ['#forge:rods/wooden', [1, 2]]]))
     funcs.replaceOutputRecipe('2x minecraft:torch', result => event.shapeless(result, ['minecraft:glowstone_dust', '#minecraft:torches/temp', '#minecraft:torches/temp']))
     funcs.replaceOutputRecipe('4x minecraft:torch', result => funcs.vanillaInsert(result, [['minecraft:glowstone_dust', 0], ['#minecraft:coals', 3], ['#forge:rods/wooden', 6]]))

     funcs.planet('8x hardcore_torches:unlit_torch', '#minecraft:coals', 'hardcore_torches:burnt_torch')
})

itemTags((event, funcs) => {
     event.remove('hardcore_torches:free_torch_light_items', 'minecraft:lava_bucket')
     event.add('minecraft:torches/temp', ['hardcore_torches:unlit_torch', 'hardcore_torches:lit_torch'])
})

blockTags((event, funcs) => {
     event.add('minecrat:wall_post_override', ['hardcore_torches:smoldering_torch', 'hardcore_torches:lit_torch'])
})

