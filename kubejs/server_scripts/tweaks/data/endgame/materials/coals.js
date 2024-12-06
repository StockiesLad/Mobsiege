recipes((event, funcs) => {
     event.remove({id: 'projecte:conversions/coal_to_charcoal'})
     event.remove({id: 'projecte:conversions/charcoal_to_coal'})
     var fuelRecipe = (result, oldIngredient, ingredient) => {
          event.remove({output: oldIngredient, input: result})
          funcs.replace({output: result, input: oldIngredient}, () => funcs.generate(result, [oldIngredient, ingredient]).rollingSquare(1, 3).override(['projecte:philosophers_stone', 4]).next().toolDamaging())
          //funcs.replace({output: oldIngredient, input: result}, () => funcs.toolDamagingShapeless('40x ' + oldIngredient, result, 'projecte:philosophers_stone'))
     }
     funcs.generate('projecte:alchemical_coal', custom.high_grade_charcoal).plus().override(['projecte:philosophers_stone', 4]).next().toolDamaging()
     fuelRecipe('projecte:alchemical_coal', '#forge:coal', '#forge:storage_blocks/coal')
     fuelRecipe('projecte:mobius_fuel', 'projecte:alchemical_coal', 'projecte:alchemical_coal_block')
     fuelRecipe('projecte:aeternalis_fuel', 'projecte:mobius_fuel', 'projecte:mobius_fuel_block')
})