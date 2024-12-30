var sand = []

recipes((event, funcs) => {
     //event.shapeless('4x primalstage:sand_dust', '#forge:sand')
     funcs.generate('minecraft:sand', 'primalstage:sand_dust').flatSquare(3).next().vanilla()
     event.blasting('ae2:silicon', 'primalstage:sand_dust').xp(0.05) // Needs to be super hot
})

commonTags((event, funcs) => {
     event.add('minecraft:sand', [
          'aether:quicksoil', 
          'betterend:endstone_dust', 
          'carbonize:ash_block', 
          'minecraft:soul_sand', 
          'betterend:charcoal_block'
     ])
     event.add('forge:sand', '#minecraft:sand')
     sand = event.get('minecraft:sand').getObjectIds().toArray().map(location => location.toString())
})
     /*
basicLootTables((event, funcs) => {
     console.info(sand)
     sand.forEach(block => {
          var json = {
               pools: [
                    alternativesPool([
                         ofChild(block, ofConditions(conditionSilkTouch())),
                         childAlternativesPool([
                              ofChild('minecraft:bone_meal', ofFuncConds(
                                   conditionTableBonus([0.1, 0.14285715, 0.25,1.0], "minecraft:fortune"), 
                                   countSet(countUniform(1, 2), false)
                              )),
                              ofChild(funcs.preferredItem('forge:dusts/salt'), ofFuncConds(
                                   conditionRandomChance(0.1), 
                                   countSet(countUniform(0, 2), false)
                              )),
                              ofChild(block)
                         ])
                    ], ofConditions(survivesExplosion()))
               ]
          }
          console.info(JSON.stringify(json))
          funcs.raw('block', block, json)
     })
          
})*/

complexLootTables((event, funcs) => {
     sand.forEach(block => {
          event.addBlockLootModifier(block)
               .removeLoot(Ingredient.all)
               .addAlternativesLoot(
                    LootEntry.ofJson(
                         ofChild(block, ofConditions(conditionSilkTouch()))
                    ),
                    LootEntry.ofJson(childAlternativesPool([
                         ofChild('minecraft:bone_meal', ofFuncConds(
                              conditionTableBonus([0.125, 0.25, 0.5, 1.0], "minecraft:fortune"), 
                              countSet(countUniform(1, 2), false)
                         )),
                         ofChild(funcs.preferredItem('forge:dusts/salt'), ofFuncConds(
                              conditionRandomChance(0.33), 
                              countSet(countUniform(1, 3), false)
                         )),
                         ofChild(block)
                    ]))
               )
     })
})

BlockEvents.rightClicked(event => {
     var item = event.getItem()
     var block = event.block
     if (item.hasTag('forge:tools/hammers') && block.hasTag('minecraft:sand')) {
          var level = event.getLevel()
          var random = level.getRandom()
          var pos = block.getPos()
          item.use(event.getLevel(), event.getEntity(), event.getHand())
          item.hurtAndBreak(1, event.getEntity(), (entity) => level.broadcastEntityEvent(entity, event.getHand().name() == 'MAIN_HAND' ? 47 : 48))

          if (random.nextInt(4) == 0) {
               level.destroyBlock(pos, false)
               Containers.dropItemStack(level, pos.getX(), pos.getY(), pos.getZ(), Item.of('primalstage:sand_dust').withCount(4 + random.nextInt(4)))
               if (random.nextInt(2) == 0)
                    Containers.dropItemStack(level, pos.getX(), pos.getY(), pos.getZ(), Item.of('minecraft:bone').withCount(1 + random.nextInt(1)))
          } else level.playSound(null, pos.getX(), pos.getY(), pos.getZ(), "minecraft:block.sand.hit", "blocks", 0.25, 0.5)
     }
})