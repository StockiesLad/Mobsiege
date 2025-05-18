recipes((event, funcs) => {
     iterateESChest((mat, ingr, matBefore) => {
          event.recipes.create.compacting(funcs.removeByOutput(`expandedstorage:${mat}_barrel`), ['8x ' + ingr, `expandedstorage:${matBefore}_barrel`])
          event.recipes.create.compacting(funcs.removeByOutput(`expandedstorage:${mat}_chest`), ['8x ' + ingr, `expandedstorage:${matBefore}_chest`])
     })
})