recipes((event, funcs) => {
     var canteenRecipe = (item, ingredient, binder) => {
          funcs.componentAssembly(funcs.removeByOutput(Item.of(item, '{Damage:0}')), [ofFluid('#forge:molten_iron', 100), preferredStack(ingredient).withCount(4), preferredStack(binder).withCount(4)])
     }

     canteenRecipe('toughasnails:empty_copper_canteen', 'forge:ingots/copper', 'forge:ingots/prismalium')
     canteenRecipe('toughasnails:empty_iron_canteen', 'forge:ingots/iron', 'forge:ingots/prismalium')
     canteenRecipe('toughasnails:empty_gold_canteen', 'forge:ingots/gold', 'forge:ingots/enderium')
     canteenRecipe('toughasnails:empty_diamond_canteen', 'forge:gems/diamond', 'forge:ingots/enderium')
})