const NTPSounds = Java.loadClass('com.alcatrazescapee.notreepunching.client.ModSounds')
const NTPConfig = Java.loadClass('com.alcatrazescapee.notreepunching.Config')
const SoundType = Java.loadClass('net.minecraft.world.level.block.SoundType')

recipes((event, funcs) => {
     var generate = funcs.generate

     funcs.replace({input: 'minecraft:gravel', output: 'minecraft:flint'}, r => event.shapeless(r, Item.of('minecraft:gravel').withCount(3)))
     
     funcs.insertAll(insertion => insertion.vanilla(), [
          generate('2x minecraft:gravel', ['minecraft:end_stone', 'promenade:dark_amaranth_wart_block']).rollingSquare(1, 2),
          generate('2x minecraft:gravel', ['aether_redux:driftshale', '#mobsiege:mud']).rollingSquare(1, 2)
     ])
})

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
                    Containers.dropItemStack(level, pos.getX(), pos.getY(), pos.getZ(), Item.of(custom.pointed_flint).withCount(1));
                }
               stack.shrink(1);
               player.setItemInHand(hand, stack);
          }
          level.playSound(null, pos.getX(), pos.getY(), pos.getZ(), NTPSounds.KNAPPING.get(), "blocks", 0.25, 0.5)
     }
})

