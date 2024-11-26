recipes((event, funcs) => {
     funcs.vanillaInsert('3x carbonize:ash_layer', ['carbonize:ash_block', [0, 1]])
     funcs.generate('carbonize:ash_block', 'carbonize:ash').flatSquare(2).next().vanilla()
})

commonTags((event, funcs) => {
     event.add('forge:ash', ['carbonize:ash', 'cinderscapes:ash_pile'])
})