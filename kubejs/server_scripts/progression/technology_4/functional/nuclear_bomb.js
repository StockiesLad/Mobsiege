recipes((event, funcs) => {
     event.replaceInput({output: `alexscaves:nuclear_bomb`}, preferredItemId(`${main}:storage_blocks/lead`), `minecraft:tnt`)
     funcs.globalPressing(funcs.removeByOutput(`4x alexscaves:uranium_rod`), [preferredStack(`${main}:storage_blocks/uranium`), preferredStack(`${main}:rods/lead`, 4)])
     funcs.globalPressing(funcs.removeByOutput(`alexscaves:fissile_core`), [preferredStack(`${main}:storage_blocks/uranium`), preferredStack(`${main}:plates/lead`, 4)])
})