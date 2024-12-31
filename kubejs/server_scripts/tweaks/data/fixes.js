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

comfuncs.hide([
     'primalstage:diamond_plate',
     'primalstage:charcoal_log'
     /*'biomeswevegone:tall_prairie_grass', 
     'biomeswevegone:prairie_grass'*/
])

comfuncs.hide(woodSet('traverse', 'fir'))
comfuncs.hide(woodSet('biomeswevegone', 'cypress'))
comfuncs.hide(woodSet('biomeswevegone', 'fir'))
comfuncs.hide(woodSet('biomeswevegone', 'mahogany'))
comfuncs.hide(woodSet('biomesoplenty', 'redwood'))

recipes((event, funcs) => {
     comfuncs.iterate([
          {id: 'quark:tweaks/crafting/slab_to_block'},
          {id: 'create_confectionery:chocolate_recipe_6'},
          {id: 'create_confectionery:white_chocolate_recipe_6'},
          {id: 'create_confectionery:ruby_chocolate_recipe_6'},
          {id: 'create_confectionery:black_chocolate_recipe_6'},
          {id: 'ancient_aether:stripped_sakura_wood_wall'},
          //Why the hell aint this working?
          {id: 'deeperdarker:resonarium_helmet_smithing'},
          {id: 'deeperdarker:resonarium_chestplate_smithing'},
          {id: 'deeperdarker:resonarium_leggings_smithing'},
          {id: 'deeperdarker:resonarium_boots_smithing'},
          {id: 'deeperdarker:resonarium_sword_smithing'},
          {id: 'deeperdarker:resonarium_pickaxe_smithing'},
          {id: 'deeperdarker:resonarium_axe_smithing'},
          {id: 'deeperdarker:resonarium_shovel_smithing'},
          {id: 'deeperdarker:resonarium_hoe_smithing'}
     ], (o) => event.remove(o))

     comfuncs.iterate([
          'aetherdelight:quickroot_crate',
          'aetherdelight:chromaberry_crate',
          'aetherdelight:luxbuds_salad'
     ], o => funcs.removeAndHide(o))

     funcs.replaceOutputRecipe('aetherdelight:strange_root_salad', r => event.shapeless(r, ['aether_redux:zanberry', 'aether_redux:lightroot_clump', 'minecraft:bowl']))
     funcs.replaceOutputRecipe('aetherdelight:oat_cookie', r => event.shapeless(r, ['aether:swet_ball', Item.of('aether_redux:wynd_oats', 2)]))
     funcs.replaceOutputRecipe('aetherdelight:aether_grass_bale', r => funcs.generate(r, 'aether_redux:short_aether_grass').flatSquare(3).next().vanilla())
     funcs.replaceOutputRecipe('otbwgdelight:puffball_sandwich', r => event.shapeless(r, ['biomeswevegone:cooked_white_puffball_cap', Item.of('minecraft:bread', 2)]))

     var wardenSmithing = (result, base, addon) => event.smithing(result, 'quark:smithing_template_rune', base, addon)
     funcs.replaceOutputRecipe('deeperdarker:resonarium_helmet', r => wardenSmithing(r, 'minecraft:iron_helmet', 'deeperdarker:resonarium_plate'))
     funcs.replaceOutputRecipe('deeperdarker:resonarium_chestplate', r => wardenSmithing(r, 'minecraft:iron_chestplate', 'deeperdarker:resonarium_plate'))
     funcs.replaceOutputRecipe('deeperdarker:resonarium_leggings', r => wardenSmithing(r, 'minecraft:iron_leggings', 'deeperdarker:resonarium_plate'))
     funcs.replaceOutputRecipe('deeperdarker:resonarium_boots', r => wardenSmithing(r, 'minecraft:iron_boots', 'deeperdarker:resonarium_plate'))
     funcs.replaceOutputRecipe('deeperdarker:resonarium_sword', r => wardenSmithing(r, 'minecraft:iron_sword', 'deeperdarker:resonarium_plate'))
     funcs.replaceOutputRecipe('deeperdarker:resonarium_pickaxe', r => wardenSmithing(r, 'minecraft:iron_pickaxe', 'deeperdarker:resonarium_plate'))
     funcs.replaceOutputRecipe('deeperdarker:resonarium_axe', r => wardenSmithing(r, 'minecraft:iron_axe', 'deeperdarker:resonarium_plate'))
     funcs.replaceOutputRecipe('deeperdarker:resonarium_shovel', r => wardenSmithing(r, 'minecraft:iron_shovel', 'deeperdarker:resonarium_plate'))
     funcs.replaceOutputRecipe('deeperdarker:resonarium_hoe', r => wardenSmithing(r, 'minecraft:iron_hoe', 'deeperdarker:resonarium_plate'))

     funcs.wall('ancient_aether:stripped_sakura_wood_wall', 'ancient_aether:stripped_sakura_log')
     
})

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
                    if ((ingredients.length == 1 || (ingredients.length == 2 && comfuncs.functionalVar(ingredients[1]['item'], i => i != null && Item.of(i).getTags().contains('thermal:crafting/dies'))) && result.length == 1)) {
                         console.info(`PASSED: ${recipe.getId()}`)
                         event.recipes.create.pressing(result[0], ingredients[0])
               }
     })
})*/

ServerEvents.tags('item', event => {
     event.add('forge:storage_blocks/sulfur', 'cinderscapes:sulfur_block')
     event.add('forge:sandstone/venus_sandstone', ['ad_astra:venus_sandstone'])
     event.add('ad_astra:venus_sandstone', ['ad_astra:venus_sandstone'])
     addEntriesRespectively(event, [
          ['%plates/copper', 'primalstage:copper_plate'],
          ['%plates/iron', 'primalstage:iron_plate'],
          ['%plates/diamond', 'primalstage:diamond_plate'],
          ['%storage_blocks/raw_elementium', 'mythicbotany:raw_elementium_block']
     ])
})

ServerEvents.tags('block', event => [
     global.functions.sound.invoke('setSoundTag', {event: event})
])