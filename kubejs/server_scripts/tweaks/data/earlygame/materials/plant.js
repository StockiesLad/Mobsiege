var wholeOrganic
var partialOrganic = [
     'biomemakeover:mycelium_roots', 
     'biomesoplenty:high_grass', 
     'biomesoplenty:high_grass_plant', 
     'biomesoplenty:dune_grass',  
     'biomesoplenty:desert_grass', 
     'alexscaves:licoroot_sprout', 
     'biomesoplenty:sprout',
     'biomeswevegone:tall_beach_grass', 
     'biomeswevegone:beach_grass',
     'blue_skies:lucentroot',
     'cinderscapes:twilight_fescues',
     'cinderscapes:photofern', 
     'cinderscapes:tall_photofern',  
     'cinderscapes:twilight_tendrils',
     'edenring:tall_mycotic_grass', 
     'edenring:golden_grass', 
     'edenring:copper_grass', 
     'edenring:iron_grass', 
     'edenring:gold_grass', 
     'edenring:tall_copper_grass', 
     'edenring:tall_iron_grass', 
     'edenring:tall_gold_grass',
     'galosphere:lichen_roots', 
     'minecraft:fern', 
     'minecraft:grass',
     'minecraft:tall_grass',
     'minecraft:large_fern', 
     'minecraft:seagrass',
     'minecraft:crimson_roots', 
     'minecraft:warped_roots',
     'promenade:dark_amaranth_roots',
     'terrestria:sakura_leaf_pile', 
     'promenade:oak_leaf_pile', 
     'promenade:spruce_leaf_pile', 
     'promenade:birch_leaf_pile', 
     'promenade:jungle_leaf_pile', 
     'promenade:acacia_leaf_pile', 
     'promenade:dark_oak_leaf_pile', 
     'promenade:mangrove_leaf_pile', 
     'promenade:azalea_leaf_pile', 
     'promenade:flowering_azalea_leaf_pile', 
     'promenade:sap_maple_leaf_pile', 
     'promenade:vermilion_maple_leaf_pile', 
     'promenade:fulvous_maple_leaf_pile', 
     'promenade:mikado_maple_leaf_pile', 
     'promenade:palm_leaf_pile', 
     'biomesoplenty:red_maple_leaf_pile', 
     'biomesoplenty:orange_maple_leaf_pile', 
     'biomesoplenty:yellow_maple_leaf_pile', 
     'biomeswevegone:leaf_pile', 
     'upgrade_aquatic:river_leaf_pile',
     //funcs.def('|aether_vines'),
     'betterend:bulb_vine',
     'betterend:jungle_vine',
     'betterend:twisted_vine',
     'betterend:dense_vine',
     'betternether:neon_equisetum',
     'betternether:blooming_vine',
     'betternether:golden_vine',
     'betternether:black_vine',
     'edenring:eden_vine',
     'minecraft:weeping_vines',
     'minecraft:twisting_vines',
     'minecraft:vine'
]

var partialOrganicAether = [
     'aether_redux:avelium_roots', 
     'aether_redux:short_aether_grass',
     'deep_aether:short_golden_grass',
     'deep_aether:tall_golden_grass', 
     'deep_aether:medium_golden_grass', 
     'deep_aether:feather_grass', 
     'deep_aether:tall_feather_grass',
     'edenring:mycotic_grass', 
     'aether_redux:golden_leaf_pile', 
     'aether_redux:gilded_leaf_pile', 
     'aether_redux:blightwillow_leaf_pile',
     'aether_redux:corrupted_vines',
     'aether_redux:golden_vines',
     'aether_redux:gilded_vines',
     'deep_aether:yagroot_vine'
]

recipes((event, funcs) => {
     comfuncs.hide('primalstage:plant_twine')

     funcs.removeAll([
          {input: 'minecraft:vine', output: 'notreepunching:plant_fiber'},
          {id: 'notreepunching:plant_fiber_from_leaves_with_knife'}
     ])

     event.replaceInput({input: 'primalstage:plant_twine'}, 'primalstage:plant_twine', funcs.def('|primitive_string'))
     //event.replaceInput({input: 'minecraft:string'}, 'minecraft:string', '#forge:string')
     /*funcs.replace({input: 'minecraft:vine', output: 'notreepunching:plant_fiber'}, result => 
          funcs.toolDamagingShapeless('3x ' + result, [funcs.def('|vines'), '#notreepunching:knives'])
     )*/

     funcs.generate('2x betterend:neon_cactus', ['betternether:nether_cactus', 'betternether:neon_equisetum']).rollingSquare(1, 2).next().vanilla()
     funcs.toolDamagingShapeless('2x notreepunching:plant_fiber', ['#minecraft:wart_blocks', '#notreepunching:knives'])
     funcs.toolDamagingShapeless('notreepunching:plant_fiber', ['#forge:plant', '#notreepunching:knives'])
     funcs.toolDamagingShapeless('minecraft:stick', ['#forge:plant', '#forge:plant', '#notreepunching:knives'])
     //funcs.vanillaInsert('2x minecraft:stick', [[funcs.def('|vines'), [0, 2]]])
     //funcs.vanillaInsert('2x aether:skyroot_stick', [[funcs.def('|aether_vines'), [0, 2]]])

     event.campfireCooking('minecraft:string', 'notreepunching:plant_string')
})

itemTags((event, funcs) => {
     funcs.unifiedRemove([
          ['minecraft:nylium', ['edenring:eden_grass', 'edenring:eden_mycelium']],
          ['notreepunching:h/string', 'notreepunching:plant_string']
     ])
     funcs.unifiedAdd([
          [comfuncs.packDef('primitive_string'), ['notreepunching:plant_string', '#forge:string']],
          [comfuncs.packDef('partial_organic'), partialOrganic.concat(partialOrganicAether)],
          [comfuncs.packDef('whole_organic'), wholeOrganic]
     ])

     wholeOrganic = event.get('minecraft:leaves').getObjectIds()
})

blockTags((event, funcs) => {
     funcs.unifiedAdd([
          ['notreepunching:always_breaks', partialOrganic.concat(partialOrganicAether)],
          ['notreepunching:always_drops', partialOrganic.concat(partialOrganicAether)],
          ['minecraft:mineable/hoe', 'betterend:glowing_pillar_luminophor'],
          ['minecraft:mineable/shovel', 'betterend:charcoal_block']
     ])
}) 

commonTags((event, funcs) => {
     funcs.unifiedAdd([
          ['wart_blocks', 'voidscape:thuder_wart'],     
          ['mycelium', [
               'betterend:end_mycelium', 
               'betterend:end_mycelium_path',
               'betternether:nether_mycelium', 
               'edenring:eden_mycelium'
          ]],
          ['nylium', [
               'betterend:mossy_obsidian', 
               'betternether:netherrack_moss'
          ]],
          ['%soil/grass', [
               'edenring:eden_grass', 
               'edenring:mossy_stone'
          ]]
     ])
})

complexLootTables((event, funcs) => {
     funcs.removeBlockDrop('primalstage:plant_fiber', 'minecraft:grass')
     funcs.removeBlockDrop('notreepunching:plant_fiber', ['minecraft:grass', 'minecraft:tall_grass'])

     wholeOrganic.forEach(block =>  event.addBlockLootModifier(block).customCondition(conditionMatchTool('notreepunching:knives')).addLoot('notreepunching:plant_fiber'))
     addOrganicDrops(event, partialOrganic, 'minecraft:stick')
     addOrganicDrops(event, partialOrganicAether, 'aether:skyroot_stick')

})

function addOrganicDrops(event, blocks, stick)  {
     blocks.forEach(block => event.addBlockLootModifier(block)
          .removeLoot(block)
          .addAlternativesLoot(
               LootEntry.of(block).when(c => c.customCondition(conditionSilkTouch())),
               LootEntry.of(block).when(c => c.customCondition(conditionMatchTool('forge:shears'))),
               LootEntry.of(stick).when(c => c.randomChance(0.05)),
               LootEntry.of(stick).when(c => c.randomChance(0.25).customCondition(conditionMatchTool('notreepunching:knives'))),
               LootEntry.of('notreepunching:plant_fiber').when(c => c.randomChance(0.1)),
               LootEntry.of('notreepunching:plant_fiber').when(c => c.randomChance(0.5).customCondition(conditionMatchTool('notreepunching:knives'))),
          )
     )
}