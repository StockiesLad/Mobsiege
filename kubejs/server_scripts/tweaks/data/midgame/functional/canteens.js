recipes((event, funcs) => {

     var canteenRecipe = (item, ingredient, binder) => {
          item = Item.of(item, '{Damage:0}')
          funcs.replace({output: item}, () => funcs.componentAssembly(item, [ofFluid('#forge:molten_iron', 100), funcs.preferredItemOf(ingredient).withCount(4), funcs.preferredItemOf(binder).withCount(4)]))
     }

     canteenRecipe('toughasnails:empty_copper_canteen', 'forge:ingots/copper', 'forge:ingots/prismalium')
     canteenRecipe('toughasnails:empty_iron_canteen', 'forge:ingots/iron', 'forge:ingots/prismalium')
     canteenRecipe('toughasnails:empty_gold_canteen', 'forge:ingots/gold', 'forge:ingots/enderium')
     canteenRecipe('toughasnails:empty_diamond_canteen', 'forge:gems/diamond', 'forge:ingots/enderium')
})