const WrapperBoolean = Java.loadClass('java.lang.Boolean')

var campfires = [
     {type: 'minecraft:campfire', torch: '#minecraft:torches/temp', fuel: custom.high_grade_charcoal, logs: '#minecraft:logs', sticks: 'minecraft:stick'},
     {type: 'minecraft:soul_campfire', torch: packTag('soul_torches'), fuel: 'minecraft:soul_soil', logs: '#minecraft:logs', sticks: 'minecraft:stick'},
     {type: 'ancient_aether:ambrosium_campfire', torch: 'aether:ambrosium_torch', fuel: 'aether:ambrosium_shard', logs: packTag('aether_logs'), sticks: 'aether:skyroot_stick'}
]

recipes((event, funcs) => {
     funcs.nuke('hardcore_torches:unlit_campfire')

     campfires.forEach(campfire => {
          funcs.vanillaInsert(funcs.removeByOutput(campfire.type), [
               [campfire.torch, [3, 5]],
               ['primalstage:primitive_grill', 4],  
               [campfire.fuel, 1], 
               [custom.campfire_rock, 7],
               [campfire.logs, [6, 8]] 
          ])
     })
})

lootTables((event, funcs) => {
     campfires.forEach(campfire => {
          event.addBlockLootModifier(campfire.type).removeLoot(Ingredient.all)
          .addLoot(
               LootEntry.of(campfire.type).when(c => c.customCondition(conditionSilkTouch())),
               LootEntry.of('primalstage:primitive_grill').when(c => c.customCondition(conditionInverted(conditionSilkTouch()))),
               LootEntry.of(campfire.fuel).when(c => c.randomChance(0.2).customCondition(conditionInverted(conditionSilkTouch()))),
               LootEntry.of(campfire.sticks).customFunction(setCount(countUniform(1, 3), false)).when(c => c.customCondition(conditionInverted(conditionSilkTouch())))
          )
     })
})

commonTags((event, funcs) => {
     event.add('forge:campfires', 'ancient_aether:ambrosium_campfire')
})

BlockEvents.rightClicked('ancient_aether:ambrosium_campfire', event => {
     var item = event.getItem()

     if (!item.is('aether:ambrosium_torch')) return 'pass'

     var block = event.getBlock()
     var state = block.getBlockState()

     if (state.getValue(Properties.LIT)) return 'pass'

     var player = event.getPlayer()
     var level = event.getLevel()
     var pos = block.getPos()

     item.use(event.getLevel(), event.getEntity(), event.getHand())
     if (player != null && !player.isCreative()) item.setCount(item.getCount() - 1)

     level.playSound(null, pos, 'item.firecharge.use', 'blocks')
     level.setBlockAndUpdate(pos, state.trySetValue(Properties.LIT, WrapperBoolean.valueOf(true)))

     return 'success'
})