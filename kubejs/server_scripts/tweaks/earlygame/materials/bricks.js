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

     funcs.twoSquareAlt(custom.campfire_rock, ['#forge:ingots/brick', '#notreepunching:loose_rocks']).vanilla()
     funcs.twoSquare(custom.fire_brick_block, custom.fire_brick).vanilla()

     funcs.globalPrimitiveDrying(custom.dry_clay_brick, 'notreepunching:clay_brick')
     funcs.globalPrimitiveCooking('minecraft:brick', custom.dry_clay_brick, 0.1)
     funcs.globalSmelting('minecraft:brick', custom.dry_clay_brick, 0.1)

     funcs.globalPrimitiveDrying(custom.dry_ash_clay_brick, custom.wet_ash_clay_brick)
     funcs.globalPrimitiveCooking('supplementaries:ash_brick', custom.dry_ash_clay_brick, 0.1)
     funcs.globalSmelting('supplementaries:ash_brick', custom.dry_ash_clay_brick, 0.1)

     funcs.globalPrimitiveDrying(custom.dry_silt_brick, custom.wet_silt_brick)
     funcs.globalPrimitiveCooking('twigs:silt_brick', custom.dry_silt_brick, 0.1)
     funcs.globalSmelting('twigs:silt_brick', custom.dry_silt_brick, 0.1)

     funcs.globalPrimitiveDrying(custom.dry_holysilt_brick, custom.wet_holysilt_brick)
     funcs.globalPrimitiveCooking(custom.holysilt_brick, custom.dry_holysilt_brick, 0.1)
     funcs.globalSmelting(custom.holysilt_brick, custom.dry_holysilt_brick, 0.1)
     funcs.twoSquare(custom.holysilt_bricks, custom.holysilt_brick).vanilla()
     funcs.stairs(custom.holysilt_brick_stairs, custom.holysilt_bricks).vanilla()
     funcs.slab(custom.holysilt_brick_slab, custom.holysilt_bricks).vanilla()
     funcs.wall(custom.holysilt_brick_wall, custom.holysilt_bricks).vanilla()

     funcs.globalPrimitiveDrying(custom.dry_mud_brick, custom.wet_mud_brick)
     funcs.globalPrimitiveCooking(custom.mud_brick, custom.dry_mud_brick, 0.1)
     funcs.globalSmelting(custom.mud_brick, custom.dry_mud_brick, 0.1)
     funcs.twoSquare(funcs.removeByOutput('minecraft:mud_bricks'), custom.mud_brick).vanilla()
     event.shapeless('minecraft:mud_bricks', Item.of('minecraft:packed_mud', 2))

     funcs.globalPrimitiveDrying(custom.dry_aether_mud_brick, custom.wet_aether_mud_brick)
     funcs.globalPrimitiveCooking(custom.aether_mud_brick, custom.dry_aether_mud_brick, 0.1)
     funcs.globalSmelting(custom.aether_mud_brick, custom.dry_aether_mud_brick, 0.1)
     funcs.twoSquare(funcs.removeByOutput('deep_aether:aether_mud_bricks'), custom.aether_mud_brick).vanilla()
     event.shapeless('deep_aether:aether_mud_bricks', Item.of('deep_aether:packed_aether_mud', 2))

     funcs.globalPrimitiveDrying(custom.dry_mortar_brick, custom.wet_mortar_brick)
     funcs.globalCooking('primalstage:kiln_brick', custom.dry_mortar_brick, 0.2)
     funcs.globalSmelting('primalstage:kiln_brick', custom.dry_mortar_brick, 0.2)

     funcs.globalPrimitiveDrying(custom.dry_cement_brick, custom.wet_cement_brick)
     funcs.kilnSmelting(custom.fire_brick, custom.dry_cement_brick)
     funcs.globalSmelting(custom.fire_brick, custom.dry_cement_brick, 0.3)

     //funcs.kilnSmelting('immersivegeology:refractory_brick', custom.wet_cement_brick)
     //funcs.globalSmelting('immersivegeology:refractory_brick', custom.wet_cement_brick, 0.3)
})

itemTags((event, funcs) => {
     event.add('notreepunching:ceramics', 'ceramicbucket:ceramic_bucket')
     event.add('forge:ingots/brick', ['twigs:silt_brick', 'primalstage:kiln_brick', custom.fire_brick, 'minecraft:nether_brick', custom.mud_brick, custom.holysilt_brick, custom.aether_mud_brick, 'immersivegeology:refractory_brick'])
     event.add('supplementaries:throwable_bricks', [
          'notreepunching:clay_brick',
          custom.wet_ash_clay_brick,
          custom.dry_ash_clay_brick,
          custom.wet_silt_brick,
          custom.dry_silt_brick,
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
     var silt_brick_set = [custom.holysilt_bricks, custom.holysilt_brick_stairs, custom.holysilt_brick_slab, custom.holysilt_brick_wall]
     event.add('minecraft:need_stone_tool', silt_brick_set)
     event.add('minecraft:mineable/pickaxe', silt_brick_set)
})

commonTags((event, funcs) => {
     event.add('minecraft:walls', custom.holysilt_brick_wall)
})

lootTables((event, funcs) => {
     event.addBlockLootModifier(custom.holysilt_brick_slab).addLoot(LootEntry.of(custom.holysilt_brick_slab).customFunction(functionSlab(custom.holysilt_brick_slab)))
     funcs.blockDropsItself(custom.holysilt_brick_stairs)
     funcs.blockDropsItself(custom.holysilt_brick_wall)
})

addBrickDrop('minecraft:clay', 'notreepunching:clay_brick')
addBrickDrop(custom.ash_clay, custom.wet_ash_clay_brick)
addBrickDrop('twigs:silt', custom.wet_silt_brick)
addBrickDrop('aether_redux:holysilt', custom.wet_holysilt_brick)
addBrickDrop('minecraft:mud', custom.wet_mud_brick)
addBrickDrop('deep_aether:aether_mud', custom.wet_aether_mud_brick)
addBrickDrop(custom.packed_mortar, custom.wet_mortar_brick)
addBrickDrop(custom.packed_cement, custom.wet_cement_brick)

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