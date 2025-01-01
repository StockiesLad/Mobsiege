const NTPSounds = Java.loadClass('com.alcatrazescapee.notreepunching.client.ModSounds')
const NTPConfig = Java.loadClass('com.alcatrazescapee.notreepunching.Config')
const SoundType = Java.loadClass('net.minecraft.world.level.block.SoundType')

var gravel = []

recipes((event, funcs) => {
     var generate = funcs.generate

     funcs.replace({input: 'minecraft:gravel', output: 'minecraft:flint'}, r => event.shapeless(r, Item.of('minecraft:gravel').withCount(3)))
     funcs.twoSquare('minecraft:gravel', 'biomeswevegone:peat')
     funcs.insertAll(insertion => insertion.vanilla(), [
          generate('2x minecraft:gravel', ['aether_redux:driftshale', '#mobsiege:mud']).rollingSquare(1, 2)
     ])
})

commonTags((event, funcs) => {
     event.add('forge:gravel', 'ancient_aether:gravity_gravel')
     gravel = event.get('forge:gravel').getObjectIds().toArray().map(location => location.toString())
})

ServerEvents.tags('block', event => {
     event.add('notreepunching:always_breakable', '#forge:gravel')
     event.add('notreepunching:always_drops', '#forge:gravel')
})

complexLootTables((event, funcs) => {
     gravel.forEach(block => {
          event.addBlockLootModifier(block)
               .removeLoot(Ingredient.all)
               .addAlternativesLoot(
                    LootEntry.ofJson(
                         ofChild(block, ofConditions(conditionSilkTouch()))
                         
                    ),
                    LootEntry.ofJson(
                         ofChild('twigs:pebble', ofFuncConds(
                              conditionMatchTool('minecraft:clubs'),
                              countSet(countConstant(4), false)
                         ))
                    ),
                    LootEntry.ofJson(childAlternativesPool([
                         ofChild('minecraft:flint', ofFuncConds(
                              conditionTableBonus([0.125, 0.25, 0.5, 1.0], "minecraft:fortune"), 
                              countSet(countUniform(1, 2), false)
                         )),
                         ofChild('twigs:pebble', ofFuncConds(
                              conditionRandomChance(0.33), 
                              countSet(countUniform(1, 3), false)
                         )),
                         ofChild(block)
                    ]))
               )
     })
})

//search for my stone tag on top of sound? requires mixin to notreepunching as well for consistency
BlockEvents.rightClicked(event => {
     var stack = event.getItem()
     var block = event.block
     var level = event.getLevel()
     var pos = block.getPos()
     var state = level.getBlockState(pos)
     if (stack.is('notreepunching:flint_shard') && state.getSoundType() == SoundType.STONE) {
          var random = level.getRandom()
          var player = event.getPlayer()
          var hand = event.getHand()
          if (random.nextFloat() < NTPConfig.INSTANCE.flintKnappingConsumeChance.getAsFloat()) {
               if (random.nextFloat() < NTPConfig.INSTANCE.flintKnappingSuccessChance.getAsFloat()) {
                    pos = pos.relative(event.getFacing())
                    Containers.dropItemStack(level, pos.getX(), pos.getY(), pos.getZ(), Item.of(custom.pointed_flint).withCount(1 + random.nextInt(2)));
                }
               stack.shrink(1);
               player.setItemInHand(hand, stack);
          }
          level.playSound(null, pos.getX(), pos.getY(), pos.getZ(), NTPSounds.KNAPPING.get(), "blocks", 0.25, 0.5)
     }
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
               Containers.dropItemStack(level, pos.getX(), pos.getY(), pos.getZ(), Item.of('twigs:pebble').withCount(2 + random.nextInt(2)))
               if (random.nextInt(2) == 0)
                    Containers.dropItemStack(level, pos.getX(), pos.getY(), pos.getZ(), Item.of('minecraft:flint').withCount(1 + random.nextInt(2)))
          } else level.playSound(null, pos.getX(), pos.getY(), pos.getZ(), "minecraft:block.gravel.hit", "blocks", 0.25, 0.5)
     }
})

