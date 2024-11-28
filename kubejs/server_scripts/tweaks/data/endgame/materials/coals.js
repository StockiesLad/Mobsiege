recipes((event, funcs) => {
     var fuelRecipe = (result, oldIngredient, ingredient) => {
          funcs.replace({output: result, input: oldIngredient}, () => funcs.generate(result, [oldIngredient, ingredient]).rollingSquare(1, 3).override(['projecte:philosophers_stone', 4]).next().toolDamaging())
          funcs.replace({output: oldIngredient, input: result}, () => funcs.toolDamagingShapeless('40x ' + ingredient, result, 'projecte:philosophers_stone'))
     }

     fuelRecipe('projecte:alchemical_coal', '#forge:coal', funcs.def('|storage_blocks/coals'))
     fuelRecipe('projecte:mobius_fuel', 'projecte:alchemical_coal', 'projecte:alchemical_coal_block')
     fuelRecipe('projecte:aeternalis_fuel', 'projecte:mobius_fuel', 'projecte:mobius_fuel_block')
})