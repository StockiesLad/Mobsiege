BlockEvents.rightClicked('aether:ambrosium_ore', event => {
     var item = event.getItem()
     if (!item.hasTag('forge:tools/knives')) return 
     
     var level = event.getLevel()
     var random = level.getRandom()
     var block = event.getBlock()
     var pos = block.getPos()
     item.hurtAndBreak(1, event.getEntity(), (entity) => level.broadcastEntityEvent(entity, event.getHand().name() == 'MAIN_HAND' ? 47 : 48))
     item.use(level, event.getPlayer(), event.getHand())
     level.playSound(null, pos.getX(), pos.getY(), pos.getZ(), "minecraft:block.stone.break", "blocks", 1, 1)

     if (!random.nextInt(3) == 0) return

     var extra = 0
     if (random.nextInt(4) == 0)
          extra = 1

     level.setBlockAndUpdate(pos, Block.getBlock('aether:holystone').defaultBlockState())
     Containers.dropItemStack(level, pos.getX(), pos.getY(), pos.getZ(), Item.of('aether:ambrosium_shard').withCount(1 + extra))
})