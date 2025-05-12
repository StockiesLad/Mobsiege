recipes((event, funcs) => {
     funcs.removeByOutput('blockus:bluestone')
     funcs.globalCrushing(['3x twigs:pebble', Item.of('projectred_core:electrotine_dust').withChance(0.25)], 'blockus:bluestone')
})