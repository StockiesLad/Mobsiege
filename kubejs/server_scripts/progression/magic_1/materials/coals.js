recipes((event, funcs) => {
     event.remove({id: 'projecte:conversions/coal_to_charcoal'})
     event.remove({id: 'projecte:conversions/charcoal_to_coal'})
     var fuelRecipe = (result, oldIngredient) => {
          event.remove({output: oldIngredient, input: result})
          funcs.planet(funcs.removeInsurely({output: result, input: oldIngredient}), oldIngredient, 'projecte:philosophers_stone').toolDamaging()
     }
     funcs.toolDamagingShapeless('2x aether:ambrosium_shard', [packTag('charcoal/grade/atleast_good'), 'projecte:philosophers_stone'])
     funcs.toolDamagingShapeless('projecte:alchemical_coal', [Item.of(content.high_grade_charcoal, 2), 'projecte:philosophers_stone'])

     fuelRecipe('projecte:alchemical_coal', packTag('coal/grade/good'))
     fuelRecipe('projecte:mobius_fuel', 'projecte:alchemical_coal')
     fuelRecipe('projecte:aeternalis_fuel', 'projecte:mobius_fuel')
})