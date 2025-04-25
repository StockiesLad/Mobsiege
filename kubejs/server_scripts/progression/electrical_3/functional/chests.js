recipes((event, funcs) => {
     iterateESChest((mat, ingr, matBefore) => {
          event.recipes.thermal.press(`expandedstorage:${mat}_barrel`, ['8x ' + ingr, `expandedstorage:${matBefore}_barrel`])
          event.recipes.thermal.press(`expandedstorage:${mat}_chest`, ['8x ' + ingr, `expandedstorage:${matBefore}_chest`])
     })
})