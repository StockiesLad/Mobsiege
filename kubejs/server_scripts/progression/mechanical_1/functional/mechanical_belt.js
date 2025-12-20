recipes((event, funcs) => {
     event.recipes.create.mixing(funcs.removeByOutput('2x create:belt_connector'), [`2x #${main}:slimeballs`, `2x #${main}:raw_rubber`, '6x minecraft:dried_kelp']).heated()
})