recipes((event, funcs) => {
     funcs.replaceOutputRecipe('projecte:transmutation_table', r => funcs.generate(r, ['projecte:red_matter_block', 'bedrockium_awaken:compressed_bedrockium_block']).rollingSquare(1, 3).override(['projecte:philosophers_stone', 4]).next().toolDamaging())
     funcs.replaceOutputRecipe('projecte:transmutation_tablet', r => funcs.generate(r, ['#forge:storage_blocks/enderium', '#forge:storage_blocks/gravitium_alloy']).rollingSquare(1, 3).override(['projecte:transmutation_table', 4]).next().vanilla())
})