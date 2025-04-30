var defaultSand = []

recipes((event, funcs) => {
     //event.shapeless('4x primalstage:sand_dust', '#forge:sand')
     event.replaceInput({input: 'minecraft:sand'}, 'minecraft:sand', '#forge:sand')
     funcs.twoSquare(funcs.removeByOutput('blockus:redstone_sand'), 'minecraft:redstone').vanilla()
     funcs.twoSquare(funcs.removeByOutput('betterend:charcoal_block'), content.medium_grade_charcoal).vanilla()
     funcs.twoSquare('betterend:endstone_dust', content.end_dust).vanilla()
     funcs.twoSquare('aether:quicksoil', content.quicksoil_dust).vanilla()
     funcs.twoSquare('minecraft:sand', content.sand_dust).vanilla()
     funcs.twoSquare('minecraft:soul_sand', content.soulsand_dust).vanilla()
})

itemTags((event, funcs) => {
     event.add(pack('dusts/sand'), [content.sand_dust, 'minecraft:redstone', content.quicksoil_dust, content.end_dust, content.soulsand_dust])
})

commonTags((event, funcs) => {
     event.add('forge:sand', '#minecraft:sand')

     defaultSand = funcs.getIdsOfTags('forge:sand')

     event.add('forge:sand', [
          'blockus:redstone_sand',
          'aether:quicksoil', 
          'betterend:endstone_dust', 
          'carbonize:ash_block', 
          'minecraft:soul_sand', 
          '#forge:storage_blocks/ash',
          content.packed_ash
     ])
})

blockTags((event, funcs) => {
     event.add('notreepunching:always_breakable', '#forge:sand')
     event.add('notreepunching:always_drops', '#forge:sand')
})

lootTables((event, funcs) => {
     event.addBlockLootModifier(content.packed_ash).addLoot(
          LootEntry.of(content.packed_ash).when(c => c.customCondition(conditionSilkTouch())),
          LootEntry.of('supplementaries:ash', 9)
     )

     function sandDrop(block, dust) {
          event.addBlockLootModifier(block)
               .removeLoot(Ingredient.all)
               .addAlternativesLoot(
                    LootEntry.ofJson(
                         ltItemEntry(block, ofConditions(conditionSilkTouch())),
                    ),
                    LootEntry.ofJson(
                         ltItemEntry(dust, ofFuncConds(
                              conditionMatchTool('minecraft:clubs'),
                              setCount(countConstant(4), false)
                         ))
                    ),
                    LootEntry.ofJson(childAlternativesPool([
                         ltItemEntry('minecraft:bone', ofFuncConds(
                              conditionTableBonus([0.125, 0.25, 0.5, 1.0], "minecraft:fortune"), 
                              setCount(countUniform(1, 2), false)
                         )),
                         ltItemEntry(dust, ofFuncConds(
                              conditionRandomChance(0.33), 
                              setCount(countUniform(1, 3), false)
                         )),
                         ltItemEntry(block)
                    ]))
               )
     }

     defaultSand.forEach(block => sandDrop(block, content.sand_dust))
     sandDrop('aether:quicksoil', content.quicksoil_dust)
     sandDrop('betterend:charcoal_block', content.medium_grade_charcoal)
     sandDrop('betterend:endstone_dust', content.end_dust)
     sandDrop('blockus:redstone_sand', 'minecraft:redstone')
     sandDrop('carbonize:ash_block', 'carbonize:ash')
     sandDrop('cinderscapes:ash_block', 'cinderscapes:ash_pile')
     sandDrop('minecraft:soul_sand', content.soulsand_dust)

     defaultSand = []
})

//Compat with betterend because their loot tables are broken asf
BlockEvents.rightClicked(event => {
     var item = event.getItem()
     var block = event.block
     var state = block.getBlockState()
     var isCharcoalSand = state.is('betterend:charcoal_block')
     var isEndSand = state.is('betterend:endstone_dust')

     if (item.hasTag('forge:tools/shovels') && (isCharcoalSand || isEndSand)) {
          var level = event.getLevel()
          var random = level.getRandom()
          var pos = block.getPos()
          item.use(event.getLevel(), event.getEntity(), event.getHand())
          item.hurtAndBreak(1, event.getEntity(), (entity) => level.broadcastEntityEvent(entity, event.getHand().name() == 'MAIN_HAND' ? 47 : 48))
          if (random.nextInt(2) == 0) {
               var drop = isCharcoalSand ? content.medium_grade_charcoal : content.end_dust
               level.destroyBlock(pos, false)
               Containers.dropItemStack(level, pos.getX(), pos.getY(), pos.getZ(), Item.of(drop).withCount(2 + random.nextInt(3)))
               if (random.nextInt(2) == 0)
                    Containers.dropItemStack(level, pos.getX(), pos.getY(), pos.getZ(), Item.of('minecraft:bone').withCount(1 + random.nextInt(2)))
          } else level.playSound(null, pos.getX(), pos.getY(), pos.getZ(), "minecraft:block.sand.hit", "blocks", 0.25, 0.5)
     }
})