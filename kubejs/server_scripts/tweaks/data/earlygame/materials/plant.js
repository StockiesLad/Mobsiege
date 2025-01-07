//Ahhhh... WAY BETTER!

var wholeOrganic = []
var partialOrganic = [
	'aether_redux:avelium_roots', 
     'aether_redux:short_aether_grass',
     'aether_redux:golden_leaf_pile', 
     'aether_redux:gilded_leaf_pile', 
     'aether_redux:blightwillow_leaf_pile',
     'aether_redux:corrupted_vines',
     'aether_redux:golden_vines',
     'aether_redux:gilded_vines',
	'alexscaves:licoroot_sprout',
	'ancient_aether:sky_grass',
	'biomemakeover:mycelium_roots',
	'biomesoplenty:high_grass',
	'biomesoplenty:high_grass_plant',
	'biomesoplenty:dune_grass',
	'biomesoplenty:desert_grass',
	'biomesoplenty:red_maple_leaf_pile',
	'biomesoplenty:orange_maple_leaf_pile',
	'biomesoplenty:yellow_maple_leaf_pile',
	'biomesoplenty:sprout',
	'biomemakeover:reed',
	'biomeswevegone:clover_patch',
	'biomeswevegone:tall_beach_grass',
	'biomeswevegone:beach_grass',
	'biomeswevegone:tall_prairie_grass',
	'biomeswevegone:prairie_grass',
	'biomeswevegone:leaf_pile',
	'biomeswevegone:skyris_vine',
	'biomeswevegone:flowering_tiny_lily_pads',
	'biomeswevegone:tiny_lily_pads',
	'biomeswevegone:incan_lily',
	'biomesoplenty:waterlily',
	'biomesoplenty:huge_lily_pad',
	'biomesoplenty:wilted_lily',
	'biomesoplenty:willow_vine',
	'biomemakeover:water_lily',
	'biomemakeover:small_lily_pad',
	'botania:floating_thermalily',
	'botania:thermalily',
	'betterend:bulb_vine',
	'betterend:jungle_vine',
	'betterend:twisted_vine',
	'betterend:dense_vine',
	'betterend:end_lily_seed',
	'betterend:end_lily_leaf_dried',
	'betterend:end_lily_leaf',
	'betternether:neon_equisetum',
	'betternether:blooming_vine',
	'betternether:golden_vine',
	'betternether:black_vine',
	'betternether:soul_lily_sapling',
	'cinderscapes:twilight_fescues',
	'cinderscapes:tall_photofern',
	'cinderscapes:twilight_tendrils',
	'cinderscapes:ghastly_ectoplasm',
	'cinderscapes:luminous_pod',
	'cinderscapes:photofern',
	'cinderscapes:twilight_fescues',
	'deep_aether:short_golden_grass',
     'deep_aether:tall_golden_grass', 
     'deep_aether:medium_golden_grass', 
     'deep_aether:feather_grass', 
     'deep_aether:tall_feather_grass',
     'deep_aether:yagroot_vine',
	'deeperdarker:sculk_tendrils',
	'deeperdarker:sculk_vines',
	'deeperdarker:lily_flower',
	'deeperdarker:ice_lily',
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
	//'minecraft:big_dripleaf_stem',
	'minecraft:fern',
	'minecraft:grass',
	'minecraft:tall_grass',
	'minecraft:large_fern',
	'minecraft:seagrass',
	'minecraft:crimson_roots',
	'minecraft:warped_roots',
	'minecraft:sculk_vein',
	'minecraft:glow_lichen',
	'minecraft:weeping_vines',
	'minecraft:twisting_vines',
	'minecraft:vine',
	'minecraft:lily_pad',
	'minecraft:lily_of_the_valley',
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
	'promenade:lily_of_the_valley_pile',
	'quark:glow_lichen_growth',
	'terrestria:sakura_leaf_pile',
	'twigs:petrified_lichen',
	'twilightforest:huge_lily_pad',
	'twilightforest:huge_water_lily',
	'upgrade_aquatic:river_leaf_pile',
	'upgrade_aquatic:beachgrass',
	'upgrade_aquatic:tall_beachgrass',
	'yungscavebiomes:prickly_vines',
	'yungscavebiomes:frost_lily',     
]

var missingTallFlowers = ['biomeswevegone:allium_flower_bush', 'biomeswevegone:pink_allium_flower_bush', 'biomeswevegone:white_allium_flower_bush']
var missingFlowers = missingTallFlowers.concat([])

recipes((event, funcs) => {
     funcs.remove([
          {input: 'minecraft:vine', output: 'notreepunching:plant_fiber'},
          {id: 'notreepunching:plant_fiber_from_leaves_with_knife'}
     ])

     event.replaceInput({input: 'primalstage:plant_twine'}, 'primalstage:plant_twine', packTag('primitive_string'))

     event.shapeless(funcs.removeByOutput('notreepunching:plant_string'), Item.of('primalstage:plant_twine').withCount(3))
     event.shapeless('primalstage:plant_twine', Item.of('notreepunching:plant_fiber').withCount(2))
	event.shapeless('notreepunching:plant_fiber', '2x twigs:bamboo_leaves')
	funcs.twoSquareAlt('2x betterend:neon_cactus', ['betternether:nether_cactus', 'betternether:neon_equisetum']).vanilla()
     funcs.toolDamagingShapeless('2x notreepunching:plant_fiber', ['#minecraft:wart_blocks', '#notreepunching:knives'])
     funcs.globalPrimitiveCooking('minecraft:string', 'notreepunching:plant_string', 0.1)
})

commonTags((event) => {
	event.add('minecraft:flowers', missingFlowers)
	event.add('minecraft:tall_flowers', missingTallFlowers)
})

itemTags((event, funcs) => {
	funcs.removeEntriesRespectively([
          ['minecraft:nylium', ['edenring:eden_grass', 'edenring:eden_mycelium']],
          ['notreepunching:h/string', 'notreepunching:plant_string']
     ])

	event.add(pack('primitive_string'), ['notreepunching:plant_string', '#forge:string'])

	var subtractPartialOrganic = getIdsOfTags(event, 'quark:hedges', 'blockus:small_hedges', 'forge:seed', 'forge:seeds').concat(['betterend:umbrella_tree_membrane', 'betternether:nether_cactus', 'betternether:wart_seed', 'betternether:egg_plant', 'betternether:stalagnate_stem', 'betterend:cave_bush', 'betternether:hook_mushroom', 'minecraft:bamboo', 'betternether:agave', 'betternether:barrel_cactus', 'betternether:mushroom_fir_stem'])
	
     wholeOrganic = getIdsOfTags(event, 'minecraft:leaves')
     partialOrganic = partialOrganic.concat(getIdsOfTags(event, ['supplementaries:flower_box_plantable', 'forge:plant', 'minecraft:flowers', 'forge:compostable', 'biomeswevegone:flowers'])).concat(missingFlowers).filter((element, index, self) => self.indexOf(element) == index).filter(element => !element.includes('leaves')).filter(element => !subtractPartialOrganic.includes(element))
})

blockTags((event, funcs) => {
	funcs.addEntriesRespectively([
          ['twilightforest:portal/decoration', 'cinderscapes:umbral_fungus'],
		['|partial_organic', partialOrganic],
          ['|whole_organic', wholeOrganic],
          ['notreepunching:always_breaks', packTag('partial_organic')],
          ['notreepunching:always_drops', packTag('partial_organic')],
          ['minecraft:mineable/hoe', 'betterend:glowing_pillar_luminophor'],
          ['minecraft:mineable/shovel', 'betterend:charcoal_block']
     ])
})

commonTags((event, funcs) => {
     funcs.addEntriesRespectively([
          ['wart_blocks', 'voidscape:thuder_wart'],     
          ['mycelium', ['betterend:end_mycelium', 'betterend:end_mycelium_path', 'betternether:nether_mycelium', 'edenring:eden_mycelium']],
          ['nylium', ['betterend:mossy_obsidian', 'betternether:netherrack_moss']],
          ['%soil/grass', ['edenring:eden_grass', 'edenring:mossy_stone']]
     ])
})

lootTables((event, funcs) => {
	funcs.removeBlockDrop('primalstage:plant_fiber', 'minecraft:grass')
     funcs.removeBlockDrop('notreepunching:plant_fiber', ['minecraft:grass', 'minecraft:tall_grass'])

	var wholeOrganicAether = []
	wholeOrganic = wholeOrganic.filter(id => {
		if (!id.includes('aether')) return true

		wholeOrganicAether.push(id)
		return false
	})

	var partialOrganicAether = []
	partialOrganic = partialOrganic.filter(id => {
		if (!id.includes('aether')) return true

		partialOrganicAether.push(id)
		return false
	})

	function addWholeOrganicDrops(blocks, stick) {
		blocks.forEach(block => {
			event.addBlockLootModifier(block).addAlternativesLoot(
				LootEntry.of(stick).when(c => c.randomChance(0.25).customCondition(conditionMatchTool('forge:tools/knives'))).customFunction(setCount(countUniform(1, 2), false)),
				LootEntry.of('notreepunching:plant_fiber').when(c => c.customCondition(conditionMatchTool('forge:tools/knives'))).customFunction(setCount(countUniform(1, 3), false)),
				LootEntry.of(stick).when(c => c.randomChance(0.25).customCondition(conditionInverted(conditionSilkTouch()))).customFunction(funcFortune(formulaUniformBonus(1))),
				LootEntry.of('notreepunching:plant_fiber').when(c => c.randomChance(0.5).customCondition(conditionInverted(conditionSilkTouch()))).customFunction(setCount(countUniform(1, 2), false)).customFunction(funcFortune(formulaUniformBonus(1)))
			)
		})
	}

	function addOrganicDrops(blocks, stick) {
		blocks.forEach(block => {
			event.addBlockLootModifier(block).removeLoot(block).addAlternativesLoot(
				LootEntry.of(block).when(c => c.customCondition(conditionSilkTouch())),
				LootEntry.of(block).when(c => c.customCondition(conditionMatchTool('forge:shears'))),

				LootEntry.of(stick).when(c => c.randomChance(0.05).customCondition(conditionMatchTool('forge:tools/knives'))),
				LootEntry.of('notreepunching:plant_fiber').when(c => c.customCondition(conditionMatchTool('forge:tools/knives'))).customFunction(setCount(countUniform(1, 2), false)),
				LootEntry.of(stick).when(c => c.customCondition(conditionTableBonus([0.025, 0.5, 0.1, 0.25], "minecraft:fortune"))),
				LootEntry.of('notreepunching:plant_fiber').when(c => c.customCondition(conditionTableBonus([0.25, 0.5, 0.75, 1.0], "minecraft:fortune")))
			)
		})
	}

	addWholeOrganicDrops(wholeOrganic, 'minecraft:stick')
	addWholeOrganicDrops(wholeOrganicAether, 'aether:skyroot_stick')
     addOrganicDrops(partialOrganic, 'minecraft:stick')
     addOrganicDrops(partialOrganicAether, 'aether:skyroot_stick')

	delete wholeOrganic; wholeOrganic = null
	delete partialOrganic; partialOrganic = null
})