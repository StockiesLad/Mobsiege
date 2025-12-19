recipes((event, funcs) => {
     event.replaceInput({output: 'alexscaves:nuclear_bomb'}, preferredItemId('forge:storage_blocks/lead'), 'minecraft:tnt')
     funcs.globalPressing(funcs.removeByOutput('4x alexscaves:uranium_rod'), [preferredStack('forge:storage_blocks/uranium'), preferredStack('forge:rods/lead', 4)])
     funcs.globalPressing(funcs.removeByOutput('alexscaves:fissile_core'), [preferredStack('forge:storage_blocks/uranium'), preferredStack('forge:plates/lead', 4)])
})