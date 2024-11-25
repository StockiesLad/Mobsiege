recipes((event, funcs) => {
     comfuncs.unifiedCall(funcs.removeAndHide, [
          'aether:skyroot_sword', 'aether:skyroot_pickaxe', 'aether:skyroot_axe', 'aether:skyroot_shovel', 'aether:skyroot_hoe',
          'aether:holystone_sword', 'aether:holystone_pickaxe', 'aether:holystone_axe', 'aether:holystone_shovel', 'aether:holystone_hoe',
          'minecraft:wooden_sword', 'minecraft:wooden_pickaxe', 'minecraft:wooden_axe', 'minecraft:wooden_shovel', 'minecraft:wooden_hoe',
          'minecraft:stone_sword', 'minecraft:stone_pickaxe', 'minecraft:stone_axe', 'minecraft:stone_shovel', 'minecraft:stone_hoe',
          'primalstage:flint_pickaxe', 'primalstage:flint_shovel', 'primalstage:plant_fiber'
     ])

     funcs.replaceOutputRecipe('primalstage:flint_hatchet', result => funcs.vanillaInsert(result, [['notreepunching:flint_shard', [0, 1]], ['#forge:rods/wooden', 2], ['#forge:string', 3]]))
     funcs.replaceOutputRecipe('notreepunching:flint_axe', result => funcs.vanillaInsert(result, [['#notreepunching:string', 0], ['#forge:rods/wooden', [3, 6]], ['notreepunching:flint_shard', [1, 4]]]))
})

itemTags((event, funcs) => {
     funcs.unifiedAdd([
          ['minecraft:axes', ['notreepunching:flint_axe', 'primalstage:flint_hatchet']],
          ['notreepunching:weak_saws', '#minecraft:axes'],
          ['minecraft:saws', '#notreepunching:saws'],
          ['minecraft:trowels', 'notreepunching:clay_tool'],
          //['notreepunching:knives', '#minecraft:axes']
      ])
})