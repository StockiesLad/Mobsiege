recipes((event, funcs) => {
     funcs.insert(funcs.removeByOutput('pointblank:printer'), [
          ['ae2:controller', 12], 
          ['immersiveengineering:conveyor_basic', [11, 13]], 
          ['create_dd:hydraulic_press', 7], 
          ['thermal:machine_sawmill', 17], 
          ['projecte:dark_matter_block', [6, 8, 16, 18]], 
          ['ad_astra:nasa_workbench', [10, 14]], 
          ['rftoolscontrol:cpu_core_2000', 2], 
          ['create_new_age:generator_coil', 22], 
          ['ae2:engineering_processor', [5, 9, 15, 19]],
          ['#forge:storage_blocks/enderium', [1, 3, 21, 23]],
          ['#forge:storage_blocks/redstone_alloy', [0, 4, 20, 24]]
     ]).mechanical()
})