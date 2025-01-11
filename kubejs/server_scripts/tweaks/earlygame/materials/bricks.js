recipes((event, funcs) => {
     funcs.remove([
          {output: 'minecraft:brick', type: 'minecraft:campfire_cooking'},
          {output: 'minecraft:brick', type: 'enderio:alloy_smelting'},
          {output: 'notreepunching:clay_brick'},
          {input: 'notreepunching:clay_brick'},
          {output: 'twigs:silt_brick'},
          {output: 'supplementaries:ash_brick'},
          {id: 'enderio:smelting/minecraft/cook_refractory_brick'}
     ])

     event.replaceOutput({output: 'notreepunching:ceramic_bucket'}, 'notreepunching:ceramic_bucket', 'ceramicbucket:ceramic_bucket')
     funcs.removeById('immersiveengineering:crafting/slag_brick')
     funcs.twoSquare('immersiveengineering:slag_brick', 'immersiveengineering:slag_gravel').vanilla()

     funcs.nuke('notreepunching:ceramic_water_bucket')
     funcs.nuke('immersivegeology:raw_fire_clay')

     funcs.twoSquareAlt(content.campfire_rock, ['#forge:ingots/brick', '#notreepunching:loose_rocks']).vanilla()
     funcs.twoSquare(content.fire_brick_block, content.fire_brick).vanilla()

     funcs.globalPrimitiveDrying(content.dry_clay_brick, 'notreepunching:clay_brick')
     funcs.globalPrimitiveCooking('minecraft:brick', content.dry_clay_brick, 0.1)
     funcs.globalSmelting('minecraft:brick', content.dry_clay_brick, 0.1)

     funcs.globalPrimitiveDrying(content.dry_ash_clay_brick, content.wet_ash_clay_brick)
     funcs.globalPrimitiveCooking('supplementaries:ash_brick', content.dry_ash_clay_brick, 0.1)
     funcs.globalSmelting('supplementaries:ash_brick', content.dry_ash_clay_brick, 0.1)

     funcs.globalPrimitiveDrying(content.dry_silt_brick, content.wet_silt_brick)
     funcs.globalPrimitiveCooking('twigs:silt_brick', content.dry_silt_brick, 0.1)
     funcs.globalSmelting('twigs:silt_brick', content.dry_silt_brick, 0.1)

     funcs.globalPrimitiveDrying(content.dry_holysilt_brick, content.wet_holysilt_brick)
     funcs.globalPrimitiveCooking(content.holysilt_brick, content.dry_holysilt_brick, 0.1)
     funcs.globalSmelting(content.holysilt_brick, content.dry_holysilt_brick, 0.1)
     funcs.twoSquare(content.holysilt_bricks, content.holysilt_brick).vanilla()
     funcs.stairs(content.holysilt_brick_stairs, content.holysilt_bricks).vanilla()
     funcs.slab(content.holysilt_brick_slab, content.holysilt_bricks).vanilla()
     funcs.wall(content.holysilt_brick_wall, content.holysilt_bricks).vanilla()

     funcs.globalPrimitiveDrying(content.dry_mud_brick, content.wet_mud_brick)
     funcs.globalPrimitiveCooking(content.mud_brick, content.dry_mud_brick, 0.1)
     funcs.globalSmelting(content.mud_brick, content.dry_mud_brick, 0.1)
     funcs.twoSquare(funcs.removeByOutput('minecraft:mud_bricks'), content.mud_brick).vanilla()
     event.shapeless('minecraft:mud_bricks', Item.of('minecraft:packed_mud', 2))

     funcs.globalPrimitiveDrying(content.dry_aether_mud_brick, content.wet_aether_mud_brick)
     funcs.globalPrimitiveCooking(content.aether_mud_brick, content.dry_aether_mud_brick, 0.1)
     funcs.globalSmelting(content.aether_mud_brick, content.dry_aether_mud_brick, 0.1)
     funcs.twoSquare(funcs.removeByOutput('deep_aether:aether_mud_bricks'), content.aether_mud_brick).vanilla()
     event.shapeless('deep_aether:aether_mud_bricks', Item.of('deep_aether:packed_aether_mud', 2))

     funcs.globalPrimitiveDrying(content.dry_mortar_brick, content.wet_mortar_brick)
     funcs.globalCooking('primalstage:kiln_brick', content.dry_mortar_brick, 0.2)
     funcs.globalSmelting('primalstage:kiln_brick', content.dry_mortar_brick, 0.2)

     funcs.globalPrimitiveDrying(content.dry_cement_brick, content.wet_cement_brick)
     funcs.kilnSmelting(content.fire_brick, content.dry_cement_brick)
     funcs.globalSmelting(content.fire_brick, content.dry_cement_brick, 0.3)

     //funcs.kilnSmelting('immersivegeology:refractory_brick', content.wet_cement_brick)
     //funcs.globalSmelting('immersivegeology:refractory_brick', content.wet_cement_brick, 0.3)
})

itemTags((event, funcs) => {
     event.add('notreepunching:ceramics', 'ceramicbucket:ceramic_bucket')
     event.add('forge:ingots/brick', ['twigs:silt_brick', 'primalstage:kiln_brick', content.fire_brick, 'minecraft:nether_brick', content.mud_brick, content.holysilt_brick, content.aether_mud_brick, 'immersivegeology:refractory_brick'])
     event.add('supplementaries:throwable_bricks', [
          'notreepunching:clay_brick',
          content.wet_ash_clay_brick,
          content.dry_ash_clay_brick,
          content.wet_silt_brick,
          content.dry_silt_brick,
          'mobsiege:wet_mud_brick', 
          'mobsiege:dry_mud_brick', 
          'mobsiege:mud_brick', 
          'mobsiege:wet_aether_mud_brick', 
          'mobsiege:dry_aether_mud_brick', 
          'mobsiege:aether_mud_brick', 
          'mobsiege:wet_holysilt_brick', 
          'mobsiege:dry_holysilt_brick', 
          'mobsiege:holysilt_brick',
          'mobsiege:dry_clay_brick',
          'mobsiege:wet_mortar_brick',
          'mobsiege:dry_mortar_brick',
          'primalstage:kiln_brick',
          'mobsiege:wet_cement_brick',
          'mobsiege:dry_cement_brick',
          'mobsiege:fire_brick'
     ])
})

blockTags((event, funcs) => {
     var silt_brick_set = [content.holysilt_bricks, content.holysilt_brick_stairs, content.holysilt_brick_slab, content.holysilt_brick_wall]
     event.add('minecraft:need_stone_tool', silt_brick_set)
     event.add('minecraft:mineable/pickaxe', silt_brick_set)
})

commonTags((event, funcs) => {
     event.add('minecraft:walls', content.holysilt_brick_wall)
})

lootTables((event, funcs) => {
     event.addBlockLootModifier(content.holysilt_brick_slab).addLoot(LootEntry.of(content.holysilt_brick_slab).customFunction(functionSlab(content.holysilt_brick_slab)))
     funcs.blockDropsItself(content.holysilt_brick_stairs)
     funcs.blockDropsItself(content.holysilt_brick_wall)
})

addBrickDrop('minecraft:clay', 'notreepunching:clay_brick')
addBrickDrop(content.ash_clay, content.wet_ash_clay_brick)
addBrickDrop('twigs:silt', content.wet_silt_brick)
addBrickDrop('aether_redux:holysilt', content.wet_holysilt_brick)
addBrickDrop('minecraft:mud', content.wet_mud_brick)
addBrickDrop('deep_aether:aether_mud', content.wet_aether_mud_brick)
addBrickDrop(content.packed_mortar, content.wet_mortar_brick)
addBrickDrop(content.packed_cement, content.wet_cement_brick)

function addBrickDrop(block, brick) {
     BlockEvents.rightClicked(block, event => {
          var item = event.getItem()
          if (item.hasTag('minecraft:shovels')) {
               var level = event.getLevel()
               var random = level.getRandom()
               var block = event.block
               var pos = block.getPos()
               item.hurtAndBreak(1, event.getEntity(), (entity) => level.broadcastEntityEvent(entity, event.getHand().name() == 'MAIN_HAND' ? 47 : 48))
               if (random.nextInt(5) == 0) {
                    level.destroyBlock(pos, false)
                    Containers.dropItemStack(level, pos.getX(), pos.getY(), pos.getZ(), Item.of(brick).withCount(4 + random.nextInt(4)));
               } else level.playSound(null, pos.getX(), pos.getY(), pos.getZ(), "minecraft:block.gravel.hit", "blocks", 0.25, 0.5)
          }
     })
}