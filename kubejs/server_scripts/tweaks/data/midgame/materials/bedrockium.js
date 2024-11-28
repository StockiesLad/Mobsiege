recipes((event, funcs) => {
     funcs.replaceOutputRecipe('bedrockium_awaken:bedrockium_ingot', r => funcs.generate(r, 'bedrockium_awaken:compressed_cobblestone_20').flatSquare(3).override(['projecte:philosophers_stone', 4]).next().toolDamaging()) 
})