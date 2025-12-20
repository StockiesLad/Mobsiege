recipes((event, funcs) => {
     var canteenRecipe = (item, ingredient, binder) => {
          funcs.componentAssembly(funcs.removeByOutput(Item.of(item, `{Damage:0}`)), [ofFluid(`#${main}:molten_iron`, 100), preferredStack(ingredient).withCount(4), preferredStack(binder).withCount(4)])
     }

     canteenRecipe(`toughasnails:empty_copper_canteen`, `#${main}:ingots/copper`, `#${main}:ingots/prismalium`)
     canteenRecipe(`toughasnails:empty_iron_canteen`, `#${main}:ingots/iron`, `#${main}:ingots/prismalium`)
     canteenRecipe(`toughasnails:empty_gold_canteen`, `#${main}:ingots/gold`, `#${main}:ingots/enderium`)
     canteenRecipe(`toughasnails:empty_diamond_canteen`, `#${main}:gems/diamond`, `#${main}:ingots/enderium`)
})