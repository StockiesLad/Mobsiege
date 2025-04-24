var niter = pack('niter')
var tNiter = tag(niter)
var sulfur = pack('sulfur')
var tSulfur = tag(sulfur)

recipes((event, funcs) => {
     event.remove({id: 'immersiveengineering:crafting/gunpowder_from_dusts'})

     event.shapeless('2x minecraft:gunpowder', [packTag('coal/grade/at_most_low'), tNiter, tSulfur])
     event.replaceInput({output: 'minecraft:gunpowder'}, '#forge:coal', packTag('coal/grade/medium'))
     event.shapeless('6x minecraft:gunpowder', [packTag('coal/grade/good'), ingr(tNiter, 2), tSulfur])
     event.shapeless('8x minecraft:gunpowder', [content.high_grade_charcoal, Ingredient.of(tNiter, 3), Ingredient.of(tSulfur, 2)])
     event.shapeless('12x minecraft:gunpowder', [content.alchemical_coal, Ingredient.of(tNiter, 4), Ingredient.of(tSulfur, 2)])
     event.shapeless('20x minecraft:gunpowder', ['projecte:mobius_fuel', Ingredient.of(tNiter, 5), Ingredient.of(tSulfur, 2)])
     event.shapeless('30x minecraft:gunpowder', ['projecte:aeternalis_fuel', Ingredient.of(tNiter, 5), Ingredient.of(tSulfur, 3)])
})

itemTags((event, funcs) => {
     event.add(niter, ['#forge:dusts/niter', '#forge:gems/niter'])
     event.add(sulfur, ['#forge:dusts/sulfur', '#forge:gems/sulfur'])
})