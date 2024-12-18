comfuncs.hide('betterend:crystalline_sulphur')

recipes((event, funcs) => {
     event.remove({id: 'alexscaves:gunpowder_from_sulfur'})

     event.replaceInput({id: 'thermal:gunpowder_4'}, 'minecraft:charcoal', '#forge:coal')
     event.replaceInput({id: 'minecraft:gunpowder'}, 'minecraft:coal', '#forge:coal')
     event.replaceInput({id: 'betterend:sulphur_gunpowder'}, '#minecraft:coals', '#forge:coal')
     event.replaceInput({id: 'immersiveengineering:crafting/gunpowder_from_dusts'}, 'minecraft:charcoal', '#forge:coal')
})

basicLootTables((event, funcs) => {
     funcs.replaceBasiclt(funcs.createBasicLt(
          () => funcs.preferredItem('forge:gems/sulfur'), 
          [funcFortune(formulaUniformBonus(1)), funcExplosionDecay()], 
          [
              funcs.blockEntry({functions: countSet(countUniform(3, 4), false)}, 'alexscaves:sulfur_cluster'),
              funcs.blockEntry({functions: countSet(countUniform(2, 3), false)}, 'alexscaves:sulfur_bud_large'),
              funcs.blockEntry({functions: countSet(countUniform(1, 2), false)}, 'alexscaves:sulfur_bud_medium'),
              funcs.blockEntry({functions: countSet(countUniform(0, 1), false)}, 'alexscaves:sulfur_bud_small'),
              funcs.blockEntry({functions: countSet(countUniform(0, 1), false)}, 'betterend:sulphur_crystal')
          ]
     ))
})

complexLootTables((event, funcs) => {
     var tag = (mat) => `#gravelores:ore_drops/${mat}`
     funcs.replaceBlockDrops([
          [tag('aluminum'), funcs.preferredItem('forge:raw_materials/aluminum'), [
               'gravelores:aluminum_gravel_ore', 
               'bno:nether_aluminum_ore', 
               'beo:end_aluminum_ore'
          ]],
          [tag('copper'), funcs.preferredItem('forge:raw_materials/copper'), [
               'gravelores:copper_gravel_ore'
          ]],
          [tag('lead'), funcs.preferredItem('forge:raw_materials/lead'), [
               'gravelores:lead_gravel_ore', 
               'bno:nether_lead_ore', 
               'beo:end_lead_ore'
          ]],
          [tag('nickel'), funcs.preferredItem('forge:raw_materials/nickel'), [
               'gravelores:nickel_gravel_ore', 
               'bno:nether_nickel_ore', 
               'beo:end_nickel_ore'
          ]],
          [tag('osmium'), funcs.preferredItem('forge:raw_materials/osmium'), [
               'gravelores:osmium_gravel_ore', 
               'bno:nether_osmium_ore', 
               'beo:end_osmium_ore'
          ]],
          [tag('silver'), funcs.preferredItem('forge:raw_materials/silver'), [
               'gravelores:silver_gravel_ore', 
               'bno:nether_silver_ore', 
               'beo:end_silver_ore'
          ]],
          [tag('tin'), funcs.preferredItem('forge:raw_materials/tin'), [
               'gravelores:tin_gravel_ore', 
               'bno:nether_tin_ore', 
               'beo:end_tin_ore'
          ]],
          [tag('uranium'), funcs.preferredItem('forge:raw_materials/uranium'), [
               'gravelores:uranium_gravel_ore', 
               'bno:nether_uranium_ore', 
               'beo:end_uranium_ore', 
               'mekanism:uranium_ore',
               'mekanism:deepslate_uranium_ore',
               'mekanismaaa:glacio_uranium_ore',
               'mekanismaaa:mars_uranium_ore',
               'mekanismaaa:mercury_uranium_ore',
               'mekanismaaa:venus_uranium_ore'
          ]],
          [tag('zinc'), funcs.preferredItem('forge:raw_materials/zinc'), [
               'gravelores:zinc_gravel_ore', 
               'bno:nether_zinc_ore', 
               'beo:end_zinc_ore'
          ]]
     ])
})

blockTags((event, funcs) => {
     event.add('minecraft:needs_iron_tool', '#forge:ores')
})

commonTags((event, funcs) => {
     comfuncs.iterate([
          'gravelores:emerald_gravel_ore',
          'gravelores:coal_gravel_ore',
          'gravelores:redstone_gravel_ore',
          'gravelores:silver_gravel_ore',
          'gravelores:aluminum_gravel_ore',
          'gravelores:copper_gravel_ore',
          'gravelores:cobalt_gravel_ore',
          'gravelores:iron_gravel_ore',
          'gravelores:osmium_gravel_ore',
          'gravelores:quartz_gravel_ore',
          'gravelores:nickel_gravel_ore',
          'gravelores:zinc_gravel_ore',
          'gravelores:coal_gravel_ore',
          'gravelores:uranium_gravel_ore',
          'gravelores:lead_gravel_ore',
          'gravelores:diamond_gravel_ore',
          'gravelores:tin_gravel_ore',
          'gravelores:lapis_gravel_ore',
          'gravelores:gold_gravel_ore'
     ], ore => event.add('forge:ores/' + ore.split(':')[1].replace('_gravel_ore', ''), ore))
     event.add('forge:ores/oil', ['thermal_and_space:oil_mars_sand', 'thermal_and_space:oil_moon_sand', 'thermal_and_space:oil_venus_sand', 'thermal:oil_sand', 'thermal:oil_red_sand'])
})