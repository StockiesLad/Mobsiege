comfuncs.hide('betterend:crystalline_sulphur')

recipes((event, funcs) => {
     event.remove({id: 'alexscaves:gunpowder_from_sulfur'})

     event.replaceInput({id: 'thermal:gunpowder_4'}, 'minecraft:charcoal', '#forge:coal')
     event.replaceInput({id: 'minecraft:gunpowder'}, 'minecraft:coal', '#forge:coal')
     event.replaceInput({id: 'betterend:sulphur_gunpowder'}, '#minecraft:coals', '#forge:coal')
     event.replaceInput({id: 'immersiveengineering:crafting/gunpowder_from_dusts'}, 'minecraft:charcoal', '#forge:coal')
})

complexLootTables((event, funcs) => {
     var tag = (mat) => `#gravelores:ore_drops/${mat}`
     funcs.replaceBlockDrops([
          ['betterend:crystalline_sulphur', funcs.preferredItem('forge:gems/sulfur'), [
               'betterend:sulphur_crystal'
          ]],
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
     event.add('forge:ores', [
          'gravelores:coal_gravel_ore',
          'gravelores:iron_gravel_ore',
          'gravelores:redstone_gravel_ore',
          'gravelores:lapis_gravel_ore',
          'gravelores:gold_gravel_ore',
          'gravelores:emerald_gravel_ore',
          'gravelores:diamond_gravel_ore',
          'gravelores:quartz_gravel_ore',
          'gravelores:zinc_gravel_ore',
          'gravelores:nickel_gravel_ore',
          'gravelores:osmium_gravel_ore',
          'gravelores:tin_gravel_ore',
          'gravelores:lead_gravel_ore',
          'gravelores:copper_gravel_ore',
          'gravelores:uranium_gravel_ore',
          'gravelores:silver_gravel_ore',
          'gravelores:aluminum_gravel_ore',
          'gravelores:cobalt_gravel_ore'
     ])
     event.add('minecraft:needs_iron_tool', event.get('forge:ores').getObjectIds().filter(ore => {
          ore = ore.toString()
          return !(ore.includes('sulfur') || ore.includes('niter'))
     }))
     event.add('forge:storage_blocks/sulfur', 'cinderscapes:sulfur_block')
})