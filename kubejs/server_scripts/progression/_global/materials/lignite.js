recipes((event, funcs) => {
     funcs.globalCrushing(['2x twigs:pebble', preferredStack('forge:tiny/coal').withChance(0.5), Item.of('minecraft:coal').withChance(0.1)], 'unearthed:lignite')
     funcs.globalCrushing(['minecraft:coal', preferredStack('forge:tiny/coal').withChance(0.5), Item.of('twigs:pebble').withChance(0.5)], 'unearthed:lignite_briquettes')
})