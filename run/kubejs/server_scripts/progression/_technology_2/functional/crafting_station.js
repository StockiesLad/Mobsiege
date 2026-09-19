recipes((event, funcs) => {
     funcs.toolDamagingInsert(funcs.removeByOutput('tconstruct:crafting_station'), [['tconstruct:pattern', [0, 1]], [`#${main}:tools/saws`, 2], [`#${main}:workbenches`, 3]])
})