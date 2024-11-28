recipes((event, funcs) => {
     funcs.replaceOutputRecipe('enderio:redstone_alloy_ingot', r => funcs.globalAlloySmelting(r, ['#forge:silicon', '#forge:ingots/electrotine_alloy', '#forge:ingots/red_alloy']))
})