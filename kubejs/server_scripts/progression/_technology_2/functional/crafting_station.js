recipes((event, funcs) => {
     funcs.toolDamagingInsert(funcs.removeByOutput('tconstruct:crafting_station'), [['tconstruct:pattern', [0, 1]], [dataTag + 'tools/saws', 2], [dataTag + 'workbenches', 3]])
})