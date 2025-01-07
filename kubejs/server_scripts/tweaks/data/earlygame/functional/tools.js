const Mobsiege2Minecraft = Java.loadClass('com.stockieslad.mobsiege.Mobsiege2Minecraft')

recipes((event, funcs) => {
     funcs.nuke([
          'aether:skyroot_sword', 'aether:skyroot_pickaxe', 'aether:skyroot_axe', 'aether:skyroot_shovel', 'aether:skyroot_hoe',
          'aether:holystone_sword', 'aether:holystone_pickaxe', 'aether:holystone_axe', 'aether:holystone_shovel', 'aether:holystone_hoe',
          'minecraft:wooden_sword', 'minecraft:wooden_pickaxe', 'minecraft:wooden_axe', 'minecraft:wooden_shovel', 'minecraft:wooden_hoe',
          'minecraft:stone_sword', 'minecraft:stone_pickaxe', 'minecraft:stone_axe', 'minecraft:stone_shovel', 'minecraft:stone_hoe',
          'mekanismtools:stone_paxel', 'immersivegeology:ig_toolkit_2', 'projectred_exploration:stone_sickle',
          'primalstage:flint_pickaxe', 'primalstage:flint_shovel', 'primalstage:plant_fiber', 'farmersdelight:flint_knife',
          'notreepunching:iron_knife', 'notreepunching:gold_knife', 'notreepunching:gold_knife', 'notreepunching:diamond_knife',
          'notreepunching:netherite_knife'
     ])

     event.replaceInput({output: 'notreepunching:flint_shovel'}, 'notreepunching:flint_shard', custom.pointed_flint)
     funcs.vanillaInsert(funcs.removeByOutput('hardcore_torches:fire_starter'), [[packTag('primitive_string'), 0], ['#forge:rods/wooden', [1, 2]]])
     funcs.vanillaInsert(funcs.removeByOutput('notreepunching:fire_starter'), [[packTag('primitive_string'), 0], ['hardcore_torches:fire_starter', [1, 2]], ['notreepunching:flint_shard', 3]])
     funcs.vanillaInsert(funcs.removeByOutput('notreepunching:flint_knife'), [[custom.pointed_flint, 1], ['#forge:rods/wooden', 2], [packTag('primitive_string'), 0]])
     funcs.vanillaInsert(custom.flint_sword, [['notreepunching:flint_shard', [1, 3, 5, 7]], ['#forge:rods/wooden', 6], ['#forge:string', 4], [custom.pointed_flint, 2]])
     funcs.vanillaInsert(custom.flint_saw, [['minecraft:flint', [1, 4]], ['#forge:rods/wooden', [0, 3, 6]], ['#forge:string', 7]])

     funcs.vanillaInsert(funcs.removeByOutput('primalstage:flint_hatchet'), [['notreepunching:flint_shard', 1], [custom.pointed_flint, 0], ['#forge:rods/wooden', 3], [packTag('primitive_string'), 2]])
     funcs.vanillaInsert(funcs.removeByOutput('notreepunching:flint_axe'), [['#forge:string', 0], ['#forge:rods/wooden', [3, 6]], [custom.pointed_flint, [2]], ['notreepunching:flint_shard', [1, 4]]])
     funcs.vanillaInsert(funcs.removeByOutput('notreepunching:flint_pickaxe'), [['notreepunching:flint_shard', [0, 2]], ['#forge:string', 1], [custom.pointed_flint, [3, 5]], ['#forge:rods/wooden', [4, 7]]])
})

itemTags((event, funcs) => {
     funcs.addEntriesRespectively([
          ['minecraft:axes', ['notreepunching:flint_axe', 'primalstage:flint_hatchet']],
          ['minecraft:clubs', 'primalstage:stone_club'],
          ['minecraft:shovels', 'notreepunching:flint_shovel'],
          ['notreepunching:weak_saws', '#minecraft:axes'],
          ['minecraft:saws', ['#notreepunching:saws', '#cb_microblock:tools/saws']],
          ['forge:tools/saws', '#minecraft:saws'],
          ['minecraft:trowels', 'notreepunching:clay_tool'],
          ['|breaks_randomly', [
               'primalstage:flint_hatchet',
               'primalstage:flint_mallet',
               custom.flint_sword,
               custom.flint_saw,
               'notreepunching:flint_knife',
               'notreepunching:flint_shovel',
               'notreepunching:flint_hoe',
               'notreepunching:flint_pickaxe',
               'notreepunching:flint_axe'
          ]],
          ['forge:tools/knives', '#notreepunching:knives'],
          ['forge:tools/hammers', [
               '#primalstage:mallets',
               'thermal_extra:signalum_hammer',
               'thermal_extra:lumium_hammer',
               'thermal_extra:enderium_hammer',
               'thermal_extra:soul_infused_hammer',
               'thermal_extra:shellite_hammer',
               'thermal_extra:twinite_hammer',
               'thermal_extra:dragonsteel_hammer',
               'thermal_extra:abyssal_hammer'
          ]]
     ])
})

ServerEvents.tags('item', event => {
     
})

Mobsiege2Minecraft.onBreaksRandomly = (itemStack, damage, random) => {
     if (itemStack != null && itemStack.hasTag(pack('breaks_randomly')) && random.nextInt(5) == 0) {
          return Math.min(damage + random.nextInt(5), itemStack.getMaxDamage())
     } else return damage
}
