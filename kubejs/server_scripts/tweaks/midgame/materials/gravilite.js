recipes((event, funcs) => {
     funcs.threeSquare(funcs.removeByOutput('edenring:gravilite_block'), 'edenring:gravilite_shards').vanilla()
     event.shapeless(funcs.removeByOutput('9x edenring:gravilite_shards'), 'edenring:gravilite_block')

     funcs.planetAlt('5x edenring:gravilite_shards', ['edenring:gravilite_shards', '#forge:dusts/prismarine'], 'reliquary:alkahestry_tome').toolDamaging()
})