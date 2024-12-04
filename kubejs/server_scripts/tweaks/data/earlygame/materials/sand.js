recipes((event, funcs) => {
     event.shapeless('4x primalstage:sand_dust', '#forge:sand')
     funcs.generate('minecraft:sand', 'primalstage:sand_dust').flatSquare(3).next().vanilla()
     event.blasting('ae2:silicon', 'primalstage:sand_dust').xp(0.05) // Needs to be super hot
})

commonTags((event, funcs) => {
     event.add('forge:sand', [
          'aether:quicksoil', 
          'betterend:endstone_dust', 
          'carbonize:ash_block', 
          'minecraft:soul_sand', 
          'betterend:charcoal_block'
     ])
})

BlockEvents.rightClicked(event => {
     var item = event.getItem()
     var block = event.block
     if (item.hasTag('forge:tools/mallets') && block.hasTag('forge:sand')) {
          var level = event.getLevel()
          var random = level.getRandom()
          var pos = block.getPos()
          item.hurtAndBreak(1, event.getEntity(), (entity) => level.broadcastEntityEvent(entity, event.getHand().name() == 'MAIN_HAND' ? 47 : 48))

          if (random.nextInt(5) == 0) {
               level.destroyBlock(pos, false)
               Containers.dropItemStack(level, pos.getX(), pos.getY(), pos.getZ(), Item.of('primalstage:sandy_dust').withCount(4 + random.nextInt(4)));
          } else level.playSound(null, pos.getX(), pos.getY(), pos.getZ(), "minecraft:block.bamboo.hit", "blocks", 0.25, 0.5)
     }
})