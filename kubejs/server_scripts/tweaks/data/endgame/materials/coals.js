recipes((event, funcs) => {
     event.remove({id: 'projecte:conversions/coal_to_charcoal'})
     event.remove({id: 'projecte:conversions/charcoal_to_coal'})
     var fuelRecipe = (result, oldIngredient, ingredient) => {
          event.remove({output: oldIngredient, input: result})
          funcs.planetAlt(funcs.removeInsurely({output: result, input: oldIngredient}), [oldIngredient, ingredient], 'projecte:philosophers_stone').toolDamaging()
     }
     funcs.plus('projecte:alchemical_coal', custom.high_grade_charcoal).append(['projecte:philosophers_stone', 4]).toolDamaging()
     fuelRecipe('projecte:alchemical_coal', packTag('coal/grade/medium'), '#forge:storage_blocks/coal')
     fuelRecipe('projecte:mobius_fuel', 'projecte:alchemical_coal', 'projecte:alchemical_coal_block')
     fuelRecipe('projecte:aeternalis_fuel', 'projecte:mobius_fuel', 'projecte:mobius_fuel_block')
})