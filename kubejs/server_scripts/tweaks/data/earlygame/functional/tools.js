const CustomHacks = Java.loadClass("com.stockieslad.custom_hacks.CustomHacks")

recipes((event, funcs) => {
     comfuncs.unifiedCall(funcs.removeAndHide, [
          'aether:skyroot_sword', 'aether:skyroot_pickaxe', 'aether:skyroot_axe', 'aether:skyroot_shovel', 'aether:skyroot_hoe',
          'aether:holystone_sword', 'aether:holystone_pickaxe', 'aether:holystone_axe', 'aether:holystone_shovel', 'aether:holystone_hoe',
          'minecraft:wooden_sword', 'minecraft:wooden_pickaxe', 'minecraft:wooden_axe', 'minecraft:wooden_shovel', 'minecraft:wooden_hoe',
          'minecraft:stone_sword', 'minecraft:stone_pickaxe', 'minecraft:stone_axe', 'minecraft:stone_shovel', 'minecraft:stone_hoe',
          'primalstage:flint_pickaxe', 'primalstage:flint_shovel', 'primalstage:plant_fiber'
     ])

     funcs.replaceOutputRecipe('hardcore_torches:fire_starter', result => funcs.vanillaInsert(result, [[funcs.def('|primitive_string'), 0], ['#forge:rods/wooden', [1, 2]]]))
     funcs.replaceOutputRecipe('notreepunching:fire_starter', result => funcs.vanillaInsert(result, [[funcs.def('|primitive_string'), 0], ['hardcore_torches:fire_starter', [1, 2]], ['notreepunching:flint_shard', 3]]))
     funcs.replaceOutputRecipe('notreepunching:flint_knife', result => funcs.vanillaInsert(result, [['notreepunching:flint_shard', 1], ['#forge:rods/wooden', 2], [funcs.def('|primitive_string'), 0]]))
     funcs.replaceOutputRecipe('primalstage:flint_hatchet', result => funcs.vanillaInsert(result, [['notreepunching:flint_shard', [0, 1]], ['#forge:rods/wooden', 2], [funcs.def('|primitive_string'), 3]]))
     funcs.replaceOutputRecipe('notreepunching:flint_axe', result => funcs.vanillaInsert(result, [['#notreepunching:string', 0], ['#forge:rods/wooden', [3, 6]], ['notreepunching:flint_shard', [1, 4]]]))
})

itemTags((event, funcs) => {
     funcs.unifiedAdd([
          ['minecraft:axes', ['notreepunching:flint_axe', 'primalstage:flint_hatchet']],
          ['minecraft:shovels', 'notreepunching:flint_shovel'],
          ['notreepunching:weak_saws', '#minecraft:axes'],
          ['minecraft:saws', '#notreepunching:saws'],
          ['minecraft:trowels', 'notreepunching:clay_tool'],
          ['|breaks_randomly', [
               'primalstage:flint_hatchet',
               'primalstage:flint_mallet',
               'notreepunching:flint_knife',
               'notreepunching:flint_shovel',
               'notreepunching:flint_hoe',
               'notreepunching:flint_pickaxe',
               'notreepunching:flint_axe'
          ]],
          ['forge:tools/knives', '#notreepunching:knives'],
          ['forge:tools/hammers', '#primalstage:mallets']
          //['notreepunching:knives', '#minecraft:axes']
      ])
})

CustomHacks.hook = (item, itemStack, damage, random) => {
     if (itemStack != null && itemStack.hasTag(comfuncs.packDef('breaks_randomly')) && random.nextInt(5) == 0) {
          return Math.min(damage + random.nextInt(5), itemStack.getMaxDamage())
     } else return damage
}