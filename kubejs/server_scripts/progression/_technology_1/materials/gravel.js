var gravel_drops = [
     {type: 'minecraft:gravel', common_drop: 'notreepunching:stone_loose_rock', ingredient: packTag('overworld_rocks')},
     {type: 'ancient_aether:gravity_gravel', common_drop: content.holy_pebble, ingredient: packTag('aether_rocks')},
     {type: 'immersiveengineering:slag_gravel', common_drop: preferredItemId('forge:slag'), ingredient: '#forge:slag'}
]

recipes((event, funcs) => {
     event.replaceInput({input: 'minecraft:gravel'}, 'minecraft:gravel', '#forge:gravel')
     event.replaceInput({input: '#forge:slag', output: 'thermal:slag_block'}, '#forge:slag', 'immersiveengineering:slag_gravel')
     gravel_drops.forEach(gravel => {
          funcs.twoSquare(gravel.type, gravel.ingredient).vanilla()
     })
})

blockTags((event, funcs) => {
     event.add('notreepunching:always_breakable', '#forge:gravel')
     event.add('notreepunching:always_drops', '#forge:gravel')
})

commonTags((event, funcs) => {
     event.add('forge:gravel', 'ancient_aether:gravity_gravel')
})

lootTables((event, funcs) => {
     event.addBlockLootModifier('twigs:pebble').replaceLoot('twigs:pebble', 'notreepunching:stone_loose_rock', true)

     gravel_drops.forEach(gravel => {
          event.addBlockLootModifier(gravel.type)
               .removeLoot(Ingredient.all)
               .addAlternativesLoot(
                    LootEntry.ofJson(
                         ltItemEntry(gravel.type, ofConditions(conditionSilkTouch()))
                    ),
                    LootEntry.ofJson(
                         ltItemEntry(gravel.common_drop, ofFuncConds(
                              conditionMatchTool('minecraft:clubs'),
                              setCount(countConstant(4), false)
                         ))
                    ),
                    LootEntry.ofJson(childAlternativesPool([
                         ltItemEntry('minecraft:flint', ofFuncConds(
                              conditionTableBonus([0.125, 0.25, 0.5, 1.0], "minecraft:fortune"), 
                              setCount(countUniform(1, 2), false)
                         )),
                         ltItemEntry(gravel.common_drop, ofFuncConds(
                              conditionRandomChance(0.33), 
                              setCount(countUniform(1, 3), false)
                         )),
                         ltItemEntry(gravel.type)
                    ]))
               )
     })
})

BlockEvents.rightClicked(event => {
     var item = event.getItem()
     var block = event.block
     if (item.hasTag('forge:tools/hammers') && block.hasTag('forge:gravel')) {
          var level = event.getLevel()
          var random = level.getRandom()
          var pos = block.getPos()
          item.hurtAndBreak(1, event.getEntity(), (entity) => level.broadcastEntityEvent(entity, event.getHand().name() == 'MAIN_HAND' ? 47 : 48))

          if (random.nextInt(4) == 0) {
               level.destroyBlock(pos, false)
               Containers.dropItemStack(level, pos.getX(), pos.getY(), pos.getZ(), Item.of('notreepunching:stone_loose_rock').withCount(2 + random.nextInt(2)))
               if (random.nextInt(2) == 0)
                    Containers.dropItemStack(level, pos.getX(), pos.getY(), pos.getZ(), Item.of('minecraft:flint').withCount(1 + random.nextInt(2)))
          } else level.playSound(null, pos.getX(), pos.getY(), pos.getZ(), "minecraft:block.gravel.hit", "blocks", 0.25, 0.5)
     }
})
