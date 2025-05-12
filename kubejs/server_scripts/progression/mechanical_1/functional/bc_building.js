recipes((event, funcs) => {
     var create = event.recipes.create

     create.compacting(funcs.removeByOutput('buildcraftbuilders:snapshot_blueprint'), ['4x minecraft:paper', '2x #forge:dyes/blue'])
     create.compacting(funcs.removeByOutput('buildcraftbuilders:snapshot_template'), ['4x minecraft:paper', '2x #forge:dyes/black'])

     funcs.replaceCrafting('buildcraftbuilders:library', [
          ['immersiveengineering:sheetmetal_iron', [0, 2, 6, 8]],
          ['buildcraftsilicon:chipset_diamond', [1, 7]],
          ['projectred_core:energized_silicon', [3]],
          ['create:electron_tube', [4]],
          ['projectred_illumination:black_illumar_lamp', [5]]
     ]);

     funcs.replaceCrafting('buildcraftbuilders:architect', [
          ['immersiveengineering:sheetmetal_iron', [0, 2, 6, 8]],
          ['projectred_core:energized_silicon', [1]],
          ['buildcraftsilicon:chipset_diamond', [3]],
          ['buildcraftsilicon:laser', [4]],
          ['projectred_illumination:black_illumar_lamp', [5]],
          ['buildcraftsilicon:assembly_table', [7]]
     ]);

     funcs.replaceCrafting('buildcraftbuilders:filler', [
          ['immersiveengineering:sheetmetal_iron', [0, 2, 6, 8]],
          [content.lapis_lazuli_chipset, [1, 7]],
          ['thermal:gold_gear', [3]],
          ['buildcraftfactory:chute', [4]],
          ['magical_utilities:chaos_cloud', [5]]
     ]);

     funcs.replaceCrafting('buildcraftbuilders:builder', [
          ['thermal:diamond_gear', [0, 6]],
          ['buildcraftsilicon:chipset_diamond', 3],
          [content.emerald_chipset, [1, 7]],
          ['magical_utilities:indigo_cloud', [2, 8]],
          ['buildcraftbuilders:filler', [4]],
          ['magical_utilities:chaos_cloud', [5]]
     ]);
})