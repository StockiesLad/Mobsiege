recipes((event, funcs) => {
     funcs.replaceOutputRecipe('projecte:dark_matter', r => funcs.generate(r, ['bedrockium_awaken:bedrockium_block', 'projecte:aeternalis_fuel_block'])
          .rollingSquare(1, 3).override(['projecte:philosophers_stone', 4]).next().toolDamaging())

     funcs.replaceOutputRecipe('projecte:red_matter', r => funcs.planetOrbit(r, 
          ['thermal:enderium_block', 'minecraft:netherite_block', '#forge:storage_blocks/gravitium_alloy', 'projecte:dark_matter_block', 'projecte:philosophers_stone']).toolDamaging())

})