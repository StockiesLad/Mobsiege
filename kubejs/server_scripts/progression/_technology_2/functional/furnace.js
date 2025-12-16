recipes((event, funcs) => {
     funcs.removeById('tconstruct:common/basalt_blast_furnace')
     //event.replaceInput({output: 'minecraft:blast_furnace'}, 'primalstage:diamond_plate', preferredItemId(dataTag + 'plates/iron'))
     /*event.forEachRecipe({output: dataTag + 'blast_furnaces'}, recipe => {
          console.info(recipe.json)
          recipe.replaceIngredient(dataTag + 'ingots/iron', dataTag + 'plates/iron')
     })*/

     event.replaceInput('minecraft:blast_furnace', dataTag + 'ingots/iron', dataTag + 'plates/iron')
     event.replaceInput('nethersdelight:blackstone_blast_furnace', dataTag + 'ingots/iron', dataTag + 'plates/iron')

})

itemTags((event, funcs) => {
     event.add(data + 'blast_furnaces', ['minecraft:blast_furnace', 'nethersdelight:blackstone_blast_furnace'])
})