recipes((event, funcs) => {
     event.remove({id: 'immersiveengineering:crafting/gunpowder_from_dusts'})

     event.shapeless('2x minecraft:gunpowder', [tags.at_most_low_grade_coal, `#${main}:dusts/niter`, `#${main}:dusts/sulfur`])
     event.replaceInput({output: 'minecraft:gunpowder'}, `#${main}:coal`, tags.medium_grade_coal)
     event.shapeless('6x minecraft:gunpowder', [tags.good_grade_coal, ingr(`#${main}:dusts/niter`, 2), `#${main}:dusts/sulfur`])
     event.shapeless('8x minecraft:gunpowder', [content.high_grade_charcoal, Ingredient.of(`#${main}:dusts/niter`, 3), Ingredient.of(`#${main}:dusts/sulfur`, 2)])
     event.shapeless('12x minecraft:gunpowder', [content.alchemical_coal, Ingredient.of(`#${main}:dusts/niter`, 4), Ingredient.of(`#${main}:dusts/sulfur`, 2)])
     event.shapeless('20x minecraft:gunpowder', ['projecte:mobius_fuel', Ingredient.of(`#${main}:dusts/niter`, 5), Ingredient.of(`#${main}:dusts/sulfur`, 2)])
     event.shapeless('30x minecraft:gunpowder', ['projecte:aeternalis_fuel', Ingredient.of(`#${main}:dusts/niter`, 5), Ingredient.of(`#${main}:dusts/sulfur`, 3)])
})