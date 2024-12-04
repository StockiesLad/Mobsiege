recipes((event, funcs) => {
     var generate = funcs.generate
     funcs.removeAll([
          {output: 'notreepunching:clay_brick'},
          {input: 'notreepunching:clay_brick'}
     ])

     event.replaceInput({output: 'primalstage:dark_oak_drying_rack'}, 'dark_oak_planks', '#minecraft:planks')
     
     event.shapeless('minecraft:clay_ball', ['#forge:ash', 'minecraft:bone_meal'])
     funcs.insertAll(insertion => insertion.vanilla(), [
          generate('4x primalstage:sandy_clay_compound', ['#forge:sand', 'minecraft:clay']).rollingSquare(1, 2),
          generate(custom.fire_brick_block, custom.fire_brick).flatSquare(2),
          generate(custom.cement_compound, ['#forge:dusts/redstone', 'primalstage:sandy_clay_compound', '#forge:gems/lapis']).rollingSquare(1, 2),
          generate('2x minecraft:clay', ['#forge:sand', funcs.def('|jelly_blocks')]).rollingSquare(1, 2),
          generate('2x minecraft:clay', ['#forge:sand', funcs.def('|wart_blocks')]).rollingSquare(1, 2),
          generate('2x minecraft:clay', ['aether_redux:holysilt', funcs.def('|mud')]).rollingSquare(1, 2),
     ])
     /*event.campfireCooking('primalstage:kiln_brick', 'primalstage:sandy_clay_compound').xp(0.05)
     event.smelting('primalstage:kiln_brick', 'primalstage:sandy_clay_compound').xp(0.05)
     event.blasting('primalstage:kiln_brick', 'primalstage:sandy_clay_compound').xp(0.05)
     event.campfireCooking(custom.fire_brick, custom.cement_compound).xp(0.05)
     event.smelting(custom.fire_brick,custom.cement_compound).xp(0.05)
     event.blasting(custom.fire_brick, custom.cement_compound).xp(0.05)*/
})

itemTags((event, funcs) => {
     funcs.unifiedAdd([
          ['|mud', ['minecraft:mud', 'deep_aether:aether_mud']],
          ['|jelly_blocks', [
              'aether_redux:jellyshroom_jelly_block', 
              'betterend:jellyshroom_cap_purple', 
              'betterend:umbrella_tree_membrane', 
              'edenring:volvox_block'
          ]]
     ])
})

LootJS.modifiers(event => {
     var clayLike = (block, item) => {
          event.addBlockLootModifier(block).removeLoot(block)
          .addAlternativesLoot(
               LootEntry.of(block).when(c => c.customCondition(conditionSilkTouch())),
               LootEntry.of(block).when(c => c.customCondition(conditionMatchTool('minecraft:trowels'))),
               LootEntry.of(Item.of(item, 4))
          )
     }

     clayLike(custom.packed_mortar, 'primalstage:sandy_clay_compound')
     clayLike(custom.packed_cement, custom.cement_compound)
})

addBrickDrop('minecraft:clay', 'notreepunching:clay_brick')
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




