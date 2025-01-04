const NTPSounds = Java.loadClass('com.alcatrazescapee.notreepunching.client.ModSounds')
const NTPConfig = Java.loadClass('com.alcatrazescapee.notreepunching.Config')
const SoundType = Java.loadClass('net.minecraft.world.level.block.SoundType')


recipes((event, funcs) => {
     funcs.replace({input: 'minecraft:gravel', output: 'minecraft:flint'}, r => event.shapeless(r, Item.of('minecraft:gravel').withCount(3)))
})

ServerEvents.tags('block', event => {
     event.add('notreepunching:always_breakable', '#forge:gravel')
     event.add('notreepunching:always_drops', '#forge:gravel')
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
