var wholeOrganic
var partialOrganic = []
var customPartialOrganic = [
	'alexscaves:licoroot_sprout',
	'biomemakeover:mycelium_roots',
	'biomesoplenty:high_grass',
	'biomesoplenty:high_grass_plant',
	'biomesoplenty:dune_grass',
	'biomesoplenty:desert_grass',
	'biomesoplenty:red_maple_leaf_pile',
	'biomesoplenty:orange_maple_leaf_pile',
	'biomesoplenty:yellow_maple_leaf_pile',
	'biomesoplenty:sprout',
	'biomemakeover:reeds',
	'biomeswevegone:tall_beach_grass',
	'biomeswevegone:beach_grass',
	'biomeswevegone:tall_prairie_grass',
	'biomeswevegone:prairie_grass',
	'biomeswevegone:leaf_pile',
	'biomeswevegone:skyris_vine',
	'biomesoplenty:willow_vine',
	'betterend:bulb_vine',
	'betterend:jungle_vine',
	'betterend:twisted_vine',
	'betterend:dense_vine',
	'betternether:neon_equisetum',
	'betternether:blooming_vine',
	'betternether:golden_vine',
	'betternether:black_vine',
	//'blue_skies:lucentroot',
	'cinderscapes:twilight_fescues',
	'cinderscapes:tall_photofern',
	'cinderscapes:twilight_tendrils',
	'cinderscapes:ghastly_ectoplasm',
	'cinderscapes:luminous_pod',
	'cinderscapes:photofern',
	'cinderscapes:twilight_fescues',
	'deeperdarker:sculk_tendrils',
	'deeperdarker:sculk_vines',
	'edenring:tall_mycotic_grass',
	'edenring:golden_grass',
	'edenring:copper_grass',
	'edenring:iron_grass',
	'edenring:gold_grass',
	'edenring:tall_copper_grass',
	'edenring:tall_iron_grass',
	'edenring:tall_gold_grass',
	'edenring:eden_vine',
	'edenring:mycotic_grass',
	'galosphere:lichen_roots',
	'geologicexpansion:overgrowth',
	'minecraft:big_dripleaf',
	'minecraft:big_dripleaf_stem',
	'minecraft:fern',
	'minecraft:grass',
	'minecraft:tall_grass',
	'minecraft:large_fern',
	'minecraft:seagrass',
	'minecraft:tall_seagrass',
	'minecraft:crimson_roots',
	'minecraft:warped_roots',
	'minecraft:sculk_vein',
	'minecraft:glow_lichen',
	'minecraft:weeping_vines',
	'minecraft:twisting_vines',
	'minecraft:vine',
	'promenade:dark_amaranth_fungus',
	'promenade:dark_amaranth_roots',
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
	'terrestria:sakura_leaf_pile',
	'twigs:petrified_lichen',
	'upgrade_aquatic:river_leaf_pile',
	'upgrade_aquatic:beachgrass',
	'upgrade_aquatic:tall_beachgrass',
	'quark:glow_lichen_growth',
	'yungscavebiomes:prickly_vines',
	'biomemakeover:water_lily',
	'biomemakeover:small_lily_pad',
	'deeperdarker:lily_flower',
	'deeperdarker:ice_lily',
	'twilightforest:huge_lily_pad',
	'twilightforest:huge_water_lily',
	'biomeswevegone:flowering_tiny_lily_pads',
	'biomeswevegone:tiny_lily_pads',
	'biomeswevegone:incan_lily',
	'biomesoplenty:waterlily',
	'biomesoplenty:huge_lily_pad',
	'biomesoplenty:wilted_lily',
	'botania:floating_thermalily',
	'botania:thermalily',
	'yungscavebiomes:frost_lily',
	'betterend:end_lily_seed',
	'betterend:end_lily_leaf_dried',
	'betterend:end_lily_leaf',
	'betternether:soul_lily_sapling',
	'minecraft:lily_pad',
	'promenade:lily_of_the_valley_pile',
	'minecraft:lily_of_the_valley',
]

var partialOrganicAether = [
     'aether_redux:avelium_roots', 
     'aether_redux:short_aether_grass',
     'aether_redux:golden_leaf_pile', 
     'aether_redux:gilded_leaf_pile', 
     'aether_redux:blightwillow_leaf_pile',
     'aether_redux:corrupted_vines',
     'aether_redux:golden_vines',
     'aether_redux:gilded_vines',
     'deep_aether:short_golden_grass',
     'deep_aether:tall_golden_grass', 
     'deep_aether:medium_golden_grass', 
     'deep_aether:feather_grass', 
     'deep_aether:tall_feather_grass',
     'deep_aether:yagroot_vine'
]

recipes((event, funcs) => {
     funcs.removeAll([
          {input: 'minecraft:vine', output: 'notreepunching:plant_fiber'},
          {id: 'notreepunching:plant_fiber_from_leaves_with_knife'}
     ])

     event.replaceInput({input: 'primalstage:plant_twine'}, 'primalstage:plant_twine', funcs.def('|primitive_string'))
     //event.replaceInput({input: 'minecraft:string'}, 'minecraft:string', '#forge:string')
     /*funcs.replace({input: 'minecraft:vine', output: 'notreepunching:plant_fiber'}, result => 
          funcs.toolDamagingShapeless('3x ' + result, [funcs.def('|vines'), '#notreepunching:knives'])
     )*/
     funcs.replaceOutputRecipe('notreepunching:plant_string', r => event.shapeless(r, Item.of('primalstage:plant_twine').withCount(3)))
     event.shapeless('primalstage:plant_twine', Item.of('notreepunching:plant_fiber').withCount(2))
     event.shapeless('minecraft:bone_meal', ['minecraft:rotten_flesh', '#forge:ash'])

     funcs.generate('2x betterend:neon_cactus', ['betternether:nether_cactus', 'betternether:neon_equisetum']).rollingSquare(1, 2).next().vanilla()
     funcs.toolDamagingShapeless('2x notreepunching:plant_fiber', ['#minecraft:wart_blocks', '#notreepunching:knives'])
     //funcs.toolDamagingShapeless('notreepunching:plant_fiber', ['#forge:plant', '#notreepunching:knives'])
     //funcs.toolDamagingShapeless('minecraft:stick', ['#forge:plant', '#forge:plant', '#notreepunching:knives'])
     //funcs.vanillaInsert('2x minecraft:stick', [[funcs.def('|vines'), [0, 2]]])
     //funcs.vanillaInsert('2x aether:skyroot_stick', [[funcs.def('|aether_vines'), [0, 2]]])

     funcs.globalPrimitiveCooking('minecraft:string', 'notreepunching:plant_string', 0.1)

})

itemTags((event, funcs) => {
     //partialOrganic.push('#minecraft:saplings')
     //partialOrganic.push('#minecraft:flowers')


     funcs.unifiedRemove([
          ['minecraft:nylium', ['edenring:eden_grass', 'edenring:eden_mycelium']],
          ['notreepunching:h/string', 'notreepunching:plant_string']
     ])

     funcs.unifiedAdd([
          [comfuncs.packDef('primitive_string'), ['notreepunching:plant_string', '#forge:string']],
          [comfuncs.packDef('partial_organic_aether'), partialOrganicAether],
		[comfuncs.packDef('partial_organic'), customPartialOrganic.concat(['#supplementaries:flower_box_plantable', '#createaddition:plants', '#forge:plant'])],
          [comfuncs.packDef('whole_organic'), '#minecraft:leaves']
     ])

     wholeOrganic = event.get(comfuncs.packDef('whole_organic')).getObjectIds()
     partialOrganic = event.get(comfuncs.packDef('partial_organic')).getObjectIds()
})

blockTags((event, funcs) => {
	var partialOrganicUnified = partialOrganic.concat(partialOrganicAether).concat(['minecraft:dead_bush'])
     funcs.unifiedAdd([
          ['twilightforest:portal/decoration', 'cinderscapes:umbral_fungus'],
          ['notreepunching:always_breaks', partialOrganicUnified],
          ['notreepunching:always_drops', partialOrganicUnified],
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

     wholeOrganic.forEach(block =>  event.addBlockLootModifier(block).removeLoot('notreepunching:plant_fiber')
     .addAlternativesLoot(
          LootEntry.of('notreepunching:plant_fiber').when(c => c.randomChance(0.25))
          .customFunction(countSet(countUniform(0, 2), false)),
          LootEntry.of('notreepunching:plant_fiber').when(c => c.customCondition(conditionMatchTool('forge:tools/knives')))
               .customFunction(countSet(countUniform(1, 3), false))
               .customFunction(funcFortune(formulaUniformBonus(1)))
     ))
     addOrganicDrops(event, partialOrganic, 'minecraft:stick')
     addOrganicDrops(event, partialOrganicAether, 'aether:skyroot_stick')

	wholeOrganic = null
	partialOrganic = null
	partialOrganicAether = null
})

function addOrganicDrops(event, blocks, stick)  {
     blocks.forEach(block => event.addBlockLootModifier(block)
          .removeLoot(block)
          .addAlternativesLoot(
               LootEntry.of(block).when(c => c.customCondition(conditionSilkTouch())),
               LootEntry.of(block).when(c => c.customCondition(conditionMatchTool('forge:shears'))),
               LootEntry.of(stick).when(c => c.randomChance(0.125)),
               LootEntry.of(stick).when(c => c.randomChance(0.5).customCondition(conditionMatchTool('forge:tools/knives'))),
               LootEntry.of('notreepunching:plant_fiber').when(c => c.randomChance(0.25)),
               LootEntry.of('notreepunching:plant_fiber').when(c => c.customCondition(conditionMatchTool('forge:tools/knives'))),
          )
     )
}