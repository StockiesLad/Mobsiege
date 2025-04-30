recipes((event, funcs) => {
     funcs.nuke('primalstage:fire_sticks')
     
     funcs.removeById([
          'hardcore_torches:lit_torch',
          'hardcore_torches:light_torch_free_item'
     ])

     funcs.vanillaInsert(funcs.removeByOutput('hardcore_torches:fire_starter'), [['#notreepunching:string', 0], ['#forge:rods/wooden', [1, 2]]])

     event.shapeless(funcs.removeByOutput('2x minecraft:torch'), ['minecraft:blaze_powder', '#minecraft:torches/temp', '#minecraft:torches/temp'])
     funcs.vanillaInsert('4x minecraft:torch', [['minecraft:blaze_powder', 0], [packTag('coal/grade/medium'), 3], ['#forge:rods/wooden', 6]])

     funcs.toolDamagingShapeless(funcs.removeInsurely({input: 'minecraft:stick', output: '8x hardcore_torches:unlit_torch'}), [packTag('coal/grade/high'), 'primalstage:spruce_logs', '#minecraft:saws'])
     funcs.toolDamagingShapeless('4x hardcore_torches:unlit_torch', [packTag('coal/grade/good'), 'primalstage:spruce_logs', '#minecraft:saws'])
     funcs.vanillaInsert(funcs.removeByOutput('2x hardcore_torches:unlit_torch'), [[packTag('coal/grade/medium'), 0], ['#forge:rods/wooden', 2]])
     funcs.toolDamagingShapeless('hardcore_torches:unlit_torch', [packTag('coal/grade/low'), 'primalstage:spruce_logs', '#minecraft:saws'])

     event.shapeless('hardcore_torches:unlit_torch', [packTag('coal/grade/poor'), 'hardcore_torches:burnt_torch'])
     event.shapeless('2x hardcore_torches:unlit_torch', [packTag('coal/grade/low'), Item.of('hardcore_torches:burnt_torch').withCount(2)])
     event.shapeless('4x hardcore_torches:unlit_torch', [packTag('coal/grade/medium'), Item.of('hardcore_torches:burnt_torch').withCount(4)])
     event.shapeless('6x hardcore_torches:unlit_torch', [packTag('coal/grade/good'), Item.of('hardcore_torches:burnt_torch').withCount(6)])
     event.shapeless('8x hardcore_torches:unlit_torch', [packTag('coal/grade/high'), Item.of('hardcore_torches:burnt_torch').withCount(8)])
})

itemTags((event, funcs) => {
     var cooling = [
          'blockus:soul_lantern_block', 
          'hardcore_torches:lit_soul_lantern', 
          'minecraft:soul_lantern', 
     ]

     var heating = [
          'ancient_aether:sun_lantern',
          'hardcore_torches:lit_lantern',  
          'ancient_aether:ambrosium_lantern',
          'minecraft:lantern', 
          'blockus:blaze_lantern', 
          'blockus:amethyst_lantern',
          'botania:fire_rod',
     ]

     funcs.addEntriesRespectively([
          [pack('igniters/consumable'), ['hardcore_torches:fire_starter']],
          [pack('igniters/damageable'), 'notreepunching:fire_starter', 'minecraft:flint_and_steel'],

          ['hardcore_torches:consume_torch_light_items', packTag('igniters/consumable')],
          ['hardcore_torches:consume_lantern_light_items', packTag('igniters/consumable')],
          ['carbonize:consume_igniters', [packTag('igniters/consumable'), '#hardcore_torches:free_torch_light_items']],
          ['hardcore_torches:damage_torch_light_items', packTag('igniters/damageable')],
          ['hardcore_torches:damage_lantern_light_items', packTag('igniters/damageable')],
          ['carbonize:damage_igniters', packTag('igniters/damageable')],

          ['minecraft:torches/temp', ['hardcore_torches:unlit_torch', 'hardcore_torches:lit_torch']],
          ['ad_astra:destroyed_in_space', '#hardcore_torches:torches/temp'],
          ['|soul_torches', ['minecraft:soul_torch', 'framedblocks:framed_soul_torch']],
          ['toughasnails:cooling_held_items', cooling],
          ['toughasnails:heating_held_items', heating]
     ])
})

blockTags((event, funcs) => {
     var cooling = [
          'blockus:soul_lantern_block', 
          'decorative_blocks:soul_brazier', 
          'decorative_blocks:soul_chandelier',
          'hardcore_torches:lit_soul_lantern', 
          'hardcore_torches:lit_soul_torch',
          'minecraft:soul_lantern', 
          'minecraft:soul_torch',
          'supplementaries:sconce_soul',
          'twigs:soul_lamp',
          'enderio:cold_fire',
     ]
     var heating = [
          'ancient_aether:sun_lantern',
          'ancient_aether:ambrosium_lantern',
          'aether:ambrosium_torch',
          'botania:fire_rod',
          'blockus:blaze_lantern', 
          'blockus:lantern_block', 
          'blockus:amethyst_lantern_block',
          'blockus:amethyst_lantern',
          'cinderscapes:pyracinth',
          'cinderscapes:bramble_berries', 
          'cinderscapes:scorched_tendrils', 
          'cinderscapes:pyracinth', 
          'cinderscapes:scorched_shrub',
          'cinderscapes:scorched_hyphae',
          'carbonize:charring_wood', 
          'hardcore_torches:lit_lantern',  
          'hardcore_torches:lit_torch', 
          'hardcore_torches:smoldering_torch',
          'minecraft:lantern', 
          'minecraft:torch',
          'supplementaries:fire_pit',
          //'buildcraftcore:engine_wood',
          'buildcraftcore:engine_stone',
          'buildcraftcore:engine_iron'
     ]

     funcs.add('minecraft:wall_post_override', ['hardcore_torches:smoldering_torch', 'hardcore_torches:lit_torch'])
          .add('hardcore_torches:free_torch_light_blocks', '#forge:campfires')
          .add('toughasnails:cooling_blocks', cooling)
          .add('toughasnails:heating_blocks', heating)
          .add('primalstage:lit_blocks', ['#forge:campfires', 'minecraft:soul_campfire'])
})

//REFACTOR
/**
 * @param {Internal.Level} level 
 * @param {BlockPos} pos 
 * @param {Internal.BlockState} state 
 * @returns 
 */
Mobsiege2ToughAsNails.checkBlockTemp = (level, pos, state) => {
     if (!Mobsiege2Minecraft.hasTag(state, TanTags.Blocks.HEATING_BLOCKS))
         return false

     if (state.hasProperty(BlazeBurnerBlock.HEAT_LEVEL) && state.getValue(BlazeBurnerBlock.HEAT_LEVEL).ordinal() > 1)
          return true

     var entity = level.getBlockEntity(pos)
     if (entity instanceof TileEngineBase_BC8) {
         if (entity.isBurning())
             return true
     }

     return false;
}