recipes((event, funcs) => {
     event.recipes.create.mixing(['primalstage:pelt', ofFluid('biomesoplenty:blood', 100)], ['minecraft:rotten_flesh', ofFluid('minecraft:water', 100)])
     event.recipes.thermal.centrifuge(['primalstage:pelt', ofFluid('biomesoplenty:blood', 25)], 'minecraft:rotten_flesh')
     funcs.squeezing(['primalstage:pelt', ofFluid('biomesoplenty:blood', 25)], 'minecraft:rotten_flesh')
     event.recipes.create.splashing('primalstage:pelt', 'minecraft:rotten_flesh')
})