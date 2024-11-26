comfuncs.hide('betterend:crystalline_sulphur')

recipes((event, funcs) => {
     event.replaceInput({id: 'thermal:gunpowder_4'}, 'minecraft:charcoal', '#forge:coal')
     event.replaceInput({id: 'minecraft:gunpowder'}, 'minecraft:coal', '#forge:coal')
     event.replaceInput({id: 'betterend:sulphur_gunpowder'}, '#minecraft:coals', '#forge:coal')
     event.replaceInput({id: 'immersiveengineering:crafting/gunpowder_from_dusts'}, 'minecraft:charcoal', '#forge:coal')
     funcs.replaceOutputRecipe('minecraft:tnt', result => funcs.generate(result, ['minecraft:gunpowder', 'primalstage:sandy_clay_compound']).rollingSquare(1, 3).next().vanilla())

})

complexLootTables((event, funcs) => {
     var tag = (mat) => `#gravelores:ore_drops/${mat}`
     funcs.replaceBlockDrops([
          ['gravelores:zinc_gravel_ore', tag('zinc'), funcs.preferredItem('forge:raw_materials/zinc')],
          ['gravelores:nickel_gravel_ore', tag('nickel'), funcs.preferredItem('forge:raw_materials/nickel')],
          ['gravelores:osmium_gravel_ore', tag('osmium'), funcs.preferredItem('forge:raw_materials/osmium')],
          ['gravelores:tin_gravel_ore', tag('tin'), funcs.preferredItem('forge:raw_materials/tin')],
          ['gravelores:lead_gravel_ore', tag('lead'), funcs.preferredItem('forge:raw_materials/lead')],
          ['gravelores:copper_gravel_ore', tag('copper'), funcs.preferredItem('forge:raw_materials/copper')],
          ['gravelores:uranium_gravel_ore', tag('uranium'), funcs.preferredItem('forge:raw_materials/uranium')],
          ['gravelores:aluminum_gravel_ore', tag('aluminum'), funcs.preferredItem('forge:raw_materials/aluminum')],
          ['betterend:sulphur_crystal', 'betterend:crystalline_sulphur', funcs.preferredItem('forge:gems/sulfur')]
     ])
})

blockTags((event, funcs) => {
     event.add('forge:ores', ['gravelores:silver_gravel_ore',
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
          'gravelores:aluminum_gravel_ore',
          'gravelores:cobalt_gravel_ore'
     ])
     event.add('minecraft:needs_iron_tool', event.get('forge:ores').getObjectIds().filter(ore => {
          ore = ore.toString()
          return !(ore.includes('sulfur') || ore.includes('niter'))
     }))
     event.add('forge:storage_blocks/sulfur', 'cinderscapes:sulfur_block')
})