Mobsiege2BuildCraft.ENGINE_RELIEF_CHANCE = 0.1
Mobsiege2BuildCraft.ENGINE_BASE_EXPLOSION = 4
Mobsiege2BuildCraft.ENGINE_EXPLOSION_GROWTH = 4

recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeInsurely({output: 'buildcraftcore:engine_wood'}), [
          ['#minecraft:planks', [0, 1, 2]],
          ['minecraft:redstone_block', [3, 5, 7]],
          ['#forge:gears/wood', [6, 8]],
          ['minecraft:piston', 4]
     ])

     funcs.vanillaInsert(funcs.removeInsurely({output: 'buildcraftcore:engine_stone'}), [
          ['#forge:cobblestone', [0, 1, 2]],
          ['projectred_exploration:electrotine_block', [3, 5, 7]],
          ['#forge:gears/stone', [6, 8]],
          ['buildcraftcore:engine_wood', 4]
     ])
})