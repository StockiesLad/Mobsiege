var woodSet = (modid, type) => {
     return [
          `${modid}:${type}_leaves`, 
          `${modid}:${type}_sapling`, 
          `${modid}:potted_${type}_sapling`, 
          `${modid}:${type}_log`, 
          `${modid}:${type}_wood`, 
          `${modid}:stripped_${type}_log`, 
          `${modid}:stripped_${type}_wood`, 
          `${modid}:${type}_planks`, 
          `${modid}:${type}_slab`, 
          `${modid}:${type}_bookshelf`, 
          `${modid}:${type}_crafting_table`,
          `${modid}:${type}_pressure_plate`, 
          `${modid}:${type}_fence`, 
          `${modid}:${type}_trapdoor`, 
          `${modid}:${type}_fence_gate`, 
          `${modid}:${type}_stairs`, 
          `${modid}:${type}_button`, 
          `${modid}:${type}_door`, 
          `${modid}:${type}_sign`, 
          `${modid}:${type}_hanging_sign`, 
          `${modid}:${type}_boat`, 
          `${modid}:${type}_chest_boat`,
     ]
}

stacks.hide([
     'primalstage:diamond_plate',
     'primalstage:charcoal_log'
     /*'biomeswevegone:tall_prairie_grass', 
     'biomeswevegone:prairie_grass'*/
])

stacks.hide(woodSet('traverse', 'fir'))
stacks.hide(woodSet('biomeswevegone', 'cypress'))
stacks.hide(woodSet('biomeswevegone', 'fir'))
stacks.hide(woodSet('biomeswevegone', 'mahogany'))
stacks.hide(woodSet('biomesoplenty', 'redwood'))

recipes((event, funcs) => {
     common.alwaysArray([
          {id: 'quark:tweaks/crafting/slab_to_block'},
          {id: 'create_confectionery:chocolate_recipe_6'},
          {id: 'create_confectionery:white_chocolate_recipe_6'},
          {id: 'create_confectionery:ruby_chocolate_recipe_6'},
          {id: 'create_confectionery:black_chocolate_recipe_6'},
          {id: 'ancient_aether:stripped_sakura_wood_wall'},
          /*
          //Why the hell aint this working?
          {id: 'deeperdarker:resonarium_helmet_smithing'},
          {id: 'deeperdarker:resonarium_chestplate_smithing'},
          {id: 'deeperdarker:resonarium_leggings_smithing'},
          {id: 'deeperdarker:resonarium_boots_smithing'},
          {id: 'deeperdarker:resonarium_sword_smithing'},
          {id: 'deeperdarker:resonarium_pickaxe_smithing'},
          {id: 'deeperdarker:resonarium_axe_smithing'},
          {id: 'deeperdarker:resonarium_shovel_smithing'},
          {id: 'deeperdarker:resonarium_hoe_smithing'}*/
          {id: 'thermal:compat/tconstruct/press_tconstruct_blood_slime_2x2_unpacking'},
          {id: 'thermal:compat/tconstruct/bottler_tconstruct_lavawood'},
          {id: 'thermal:compat/tconstruct/press_tconstruct_blood_slime_3x3_packing'},
          {id: 'thermal:compat/tconstruct/press_tconstruct_blood_slime_2x2_packing'},
          {id: 'thermal:compat/tconstruct/press_tconstruct_blood_slime_3x3_unpacking'}
     ]).forEach((o) => event.remove(o))

     common.alwaysArray([
          'aetherdelight:quickroot_crate',
          'aetherdelight:chromaberry_crate',
          'aetherdelight:luxbuds_salad'
     ]).forEach(o => funcs.nuke(o))

     event.shapeless(funcs.removeByOutput('aetherdelight:strange_root_salad'), ['aether_redux:zanberry', 'aether_redux:lightroot_clump', 'minecraft:bowl'])
     event.shapeless(funcs.removeByOutput('aetherdelight:oat_cookie'), ['aether:swet_ball', Item.of('aether_redux:wynd_oats', 2)])
     funcs.threeSquare(funcs.removeByOutput('aetherdelight:aether_grass_bale'), 'aether_redux:short_aether_grass').vanilla()
     event.shapeless(funcs.removeByOutput('otbwgdelight:puffball_sandwich'), ['biomeswevegone:cooked_white_puffball_cap', Item.of('minecraft:bread', 2)])

     var wardenSmithing = (result, base, addon) => event.smithing(result, 'quark:smithing_template_rune', base, addon)
     /*
     wardenSmithing(funcs.removeByOutput('deeperdarker:resonarium_helmet'), 'minecraft:iron_helmet', 'deeperdarker:resonarium_plate')
     wardenSmithing(funcs.removeByOutput('deeperdarker:resonarium_chestplate'), 'minecraft:iron_chestplate', 'deeperdarker:resonarium_plate')
     wardenSmithing(funcs.removeByOutput('deeperdarker:resonarium_leggings'), 'minecraft:iron_leggings', 'deeperdarker:resonarium_plate')
     wardenSmithing(funcs.removeByOutput('deeperdarker:resonarium_boots'), 'minecraft:iron_boots', 'deeperdarker:resonarium_plate')
     wardenSmithing(funcs.removeByOutput('deeperdarker:resonarium_sword'), 'minecraft:iron_sword', 'deeperdarker:resonarium_plate')
     wardenSmithing(funcs.removeByOutput('deeperdarker:resonarium_pickaxe'), 'minecraft:iron_pickaxe', 'deeperdarker:resonarium_plate')
     wardenSmithing(funcs.removeByOutput('deeperdarker:resonarium_axe'), 'minecraft:iron_axe', 'deeperdarker:resonarium_plate')
     wardenSmithing(funcs.removeByOutput('deeperdarker:resonarium_shovel'), 'minecraft:iron_shovel', 'deeperdarker:resonarium_plate')
     wardenSmithing(funcs.removeByOutput('deeperdarker:resonarium_hoe'), 'minecraft:iron_hoe', 'deeperdarker:resonarium_plate')
     */

     event.replaceInput({input: '#forge:raw_materials/iron', output: 'minecraft:iron_ingot'}, '#forge:raw_materials/iron', 'minecraft:raw_iron')
     event.replaceInput({input: '#forge:raw_materials/iron', output: 'minecraft:raw_iron_block'}, '#forge:raw_materials/iron', 'minecraft:raw_iron')

     funcs.wall('ancient_aether:stripped_sakura_wood_wall', 'ancient_aether:stripped_sakura_log').vanilla()

     funcs.threeSquare(funcs.removeInsurely({output: 'betternether:cincinnasite_block'}), 'betternether:cincinnasite').vanilla()
     funcs.threeSquare(funcs.removeInsurely({output: 'betternether:cincinnasite_forged'}), 'betternether:cincinnasite_ingot').vanilla()

     funcs.forEachRemovedRecipe({output: packTag('valhesia_curtains')}, recipe => {
          funcs.vanillaInsert(recipe.getOriginalRecipeResult(), [
               ['#forge:rods/wooden', [0, 1]],
               [getCraftingIngredients(recipe, false)[0], [3, 4, 6, 7]]
          ])
     })
})

//Failed attempt at syncing recipes for the same concept (e.g. pulverising, crushing) between different mods.
/*
ServerEvents.recipes(event => {
     
     event.forEachRecipe({type: 'thermal:press'}, recipe => {
          var json  = recipe.json
          var ingredients = json.get('ingredients')
          var result = json.get('result')
          var fail = false
          console.info(json)
          console.info(ingredients)
          console.info(typeof(ingredients))
          if (ingredients instanceof Array)
               ingredients = [ingredients]
          console.info(ingredients)
          console.info(result)
          ingredients.forEach(i => {
               if (i.has('fluid'))
                    fail = true

          })

          result.forEach(r => {
               if (r.has('fluid'))
                    fail = true
          })
          if (!fail)
               if (!event.containsRecipe({input: ingredients, output: result, type: 'create:pressing'}))
                    if ((ingredients.length == 1 || (ingredients.length == 2 && ${comfuncs}.functionalVar(ingredients[1]['item'], i => i != null && Item.of(i).getTags().contains('thermal:crafting/dies'))) && result.length == 1)) {
                         console.info(`PASSED: ${recipe.getId()}`)
                         event.recipes.create.pressing(result[0], ingredients[0])
               }
     })
})*/

ServerEvents.tags('item', event => {
     event.add('forge:storage_blocks/sulfur', 'cinderscapes:sulfur_block')
     event.add('forge:sandstone/venus_sandstone', ['ad_astra:venus_sandstone'])
     event.add('ad_astra:venus_sandstone', ['ad_astra:venus_sandstone'])
     event.add('forge:storage_blocks/raw_iron', 'betternether:cincinnasite_forged_block')
     event.add('forge:storage_blocks/iron', ['betterend:thallasium_block', 'betternether:cincinnasite_forged'])
     event.add('forge:raw_materials/iron', ['betternether:cincinnasite', 'betterend:thallasium_raw'])
     addEntriesRespectively(event, [
          ['%plates/copper', 'primalstage:copper_plate'],
          ['%plates/iron', 'primalstage:iron_plate'],
          ['%plates/diamond', 'primalstage:diamond_plate'],
          ['%storage_blocks/raw_elementium', 'mythicbotany:raw_elementium_block']
     ])
     event.add(pack('valhesia_curtains'), ['valhelsia_furniture:white_curtain', 'valhelsia_furniture:orange_curtain', 'valhelsia_furniture:magenta_curtain', 'valhelsia_furniture:light_blue_curtain', 'valhelsia_furniture:yellow_curtain', 'valhelsia_furniture:lime_curtain', 'valhelsia_furniture:pink_curtain', 'valhelsia_furniture:gray_curtain', 'valhelsia_furniture:light_gray_curtain', 'valhelsia_furniture:cyan_curtain', 'valhelsia_furniture:purple_curtain', 'valhelsia_furniture:blue_curtain', 'valhelsia_furniture:brown_curtain', 'valhelsia_furniture:green_curtain', 'valhelsia_furniture:red_curtain', 'valhelsia_furniture:black_curtain'])
})

ServerEvents.tags('block', event => {
     stacks.soundMap('setSoundTag', {event: event})
     event.add('mineable/pickaxe', 'minecraft:glowstone')
})