recipes((event, funcs) => {
     event.remove({id: 'immersiveengineering:crafting/gunpowder_from_dusts'})

     event.shapeless('2x minecraft:gunpowder', [tags.at_most_low_grade_coal, `#${main}:niter`, `#${main}:sulfur`])
     event.replaceInput({output: 'minecraft:gunpowder'}, `#${main}:coal`, tags.medium_grade_coal)
     event.shapeless('6x minecraft:gunpowder', [tags.good_grade_coal, ingr(`#${main}:niter`, 2), `#${main}:sulfur`])
     event.shapeless('8x minecraft:gunpowder', [content.high_grade_charcoal, Ingredient.of(`#${main}:niter`, 3), Ingredient.of(`#${main}:sulfur`, 2)])
     event.shapeless('12x minecraft:gunpowder', [content.alchemical_coal, Ingredient.of(`#${main}:niter`, 4), Ingredient.of(`#${main}:sulfur`, 2)])
     event.shapeless('20x minecraft:gunpowder', ['projecte:mobius_fuel', Ingredient.of(`#${main}:niter`, 5), Ingredient.of(`#${main}:sulfur`, 2)])
     event.shapeless('30x minecraft:gunpowder', ['projecte:aeternalis_fuel', Ingredient.of(`#${main}:niter`, 5), Ingredient.of(`#${main}:sulfur`, 3)])
})

itemTags((event, funcs) => {
     funcs.add('%niter', [`#${main}:dusts/niter`, `#${main}:gems/niter`])
     funcs.add('%sulfur', [`#${main}dusts/sulfur`, `#${main}:gems/sulfur`])
})