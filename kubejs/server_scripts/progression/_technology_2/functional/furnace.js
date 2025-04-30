recipes((event, funcs) => {
     funcs.removeById('tconstruct:common/basalt_blast_furnace')
     //event.replaceInput({output: 'minecraft:blast_furnace'}, 'primalstage:diamond_plate', preferredItemId('forge:plates/iron'))
     /*event.forEachRecipe({output: '#forge:blast_furnaces'}, recipe => {
          console.info(recipe.json)
          recipe.replaceIngredient('#forge:ingots/iron', '#forge:plates/iron')
     })*/

     event.replaceInput('minecraft:blast_furnace', '#forge:ingots/iron', '#forge:plates/iron')
     event.replaceInput('nethersdelight:blackstone_blast_furnace', '#forge:ingots/iron', '#forge:plates/iron')

})

itemTags((event, funcs) => {
     event.add('forge:blast_furnaces', ['minecraft:blast_furnace', 'nethersdelight:blackstone_blast_furnace'])
})