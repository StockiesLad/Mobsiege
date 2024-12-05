const ForgeRegistries = Java.loadClass('net.minecraftforge.registries.ForgeRegistries')
const Shapes = Java.loadClass('net.minecraft.world.phys.shapes.Shapes')
const Blocks = Java.loadClass('net.minecraft.world.level.block.Blocks')

var coalStorageBlocks

recipes((event, funcs) => {
    funcs.removeAll([
        {output: 'minecraft:charcoal', type: 'minecraft:smelting'},
        {output: 'minecraft:charcoal', type: 'minecraft:blasting'},
        {id: 'utilitarian:utility/charcoal_from_campfire'},
        {id: 'betterend:charcoal_block'}
    ])

    funcs.generate('2x betterend:charcoal_block', ['#forge:storage_blocks/charcoal', 'minecraft:soul_sand']).rollingSquare(1, 2).next().vanilla()
    funcs.charring(custom.charcoal_stack, comfuncs.packDef('log_stacks'))

    event.shapeless(custom.low_grade_charcoal, Item.of(custom.poor_grade_charcoal, 4))
    event.shapeless('minecraft:charcoal', Item.of(custom.low_grade_charcoal, 4))
    event.shapeless(Item.of('minecraft:charcoal', 4),custom.high_grade_charcoal)
    event.shapeless(custom.high_grade_charcoal,  Item.of('minecraft:charcoal', 4))
})
/*
basicLootTables((event, funcs) => { 
    funcs.replaceBasiclt(
        funcs.createBasicLt(
            (materialTag, block) => 'minecraft:charcoal', 
            funcExplosionDecay(), 
            [
                funcs.blockEntry({functions: [countSet(countUniform(4, 6), false), funcFortune(formulaUniformBonus(1))]}, 'carbonize:charcoal_log'),
                funcs.blockEntry({functions: [countSet(countConstant(1), false), funcFortune(formulaBinomialBonus(1, 0.75))]}, 'carbonize:charcoal_planks'),
                funcs.blockEntry({functions: [countSet(countBinomial(1, 0.75), false), funcFortune(formulaBinomialBonus(1, 0.56))]}, 'carbonize:charcoal_stairs'),
                funcs.blockEntry({functions: [countSet(countBinomial(1, 0.5), false), funcFortune(formulaBinomialBonus(1, 0.28))]}, 'carbonize:charcoal_slab')
            ]
        )
    )
})*/

complexLootTables((event, funcs) => {
    var charcoalEntry = (type, multiplier) => LootEntry.of(type)
            .when(c => c.randomChance(multiplier))
            .customFunction(countSet(countUniform(1, 2), false))
            .customFunction(funcFortune(formulaBinomialBonus(1, multiplier)))

    var charcoal = (block, quality) => {
        event.addBlockLootModifier(block)
            .removeLoot(block)
            .removeLoot('minecraft:charcoal')
            .addAlternativesLoot(
                LootEntry.of(block).when(c => c.customCondition(conditionSilkTouch())),
                charcoalEntry('projecte:alchemical_coal', Math.pow(quality, 4)),
                charcoalEntry(custom.high_grade_charcoal, Math.pow(quality, 3)),
                charcoalEntry('minecraft:charcoal', Math.pow(quality, 2)),
                charcoalEntry(custom.low_grade_charcoal, quality),
                charcoalEntry(custom.poor_grade_charcoal, 1)
            )
    }

    charcoal(custom.charcoal_stack, 0.6)
    charcoal('carbonize:charcoal_log', 0.4)
    charcoal('carbonize:charcoal_planks', 0.1)
    charcoal('carbonize:charcoal_stairs', 0.05)
    charcoal('carbonize:charcoal_slab', 0.025)
})

itemTags((event, funcs) => {
    event.remove('forge:storage_block/charcoal', 'betterend:charcoal_block')
    event.add('forge:storage_blocks/charcoal', [
        'carbonize:charcoal_block',
        'quark:charcoal_block',
        'blockus:charcoal_block',
    ])
    coalStorageBlocks = event.get('forge:coal').getObjectIds().map(entry => funcs.preferredItem('forge:storage_blocks/' + entry.toString().split(':')[1]))
    event.add(comfuncs.packDef('storage_blocks/coals'), coalStorageBlocks)
})

blockTags((event, funcs) => {
    event.remove('minecraft:mineable/pickaxe', 'betterend:charcoal_block')
    event.add(comfuncs.packDef('log_stacks'), custom.log_stack)
    event.add(comfuncs.packDef('charcoal_stacks'), custom.charcoal_stack)
    event.add('carbonize:charcoal_pile_valid_fuel',  funcs.def('|log_stacks'))

    funcs.unifiedAdd([
        ['carbonize:charcoal_block', ['minecraft:mineable/pickaxe']],
        ['minecraft:needs_stone_tool', [
            'carbonize:charcoal_block', 
            'carbonize:charcoal_log', 
            'carbonize:charcoal_planks', 
            'carbonize:charcoal_stairs', 
            'carbonize:charcoal_slab', 
        ]]
    ])

    var logStacks = [custom.log_stack, custom.charred_log_stack]
    var parsedBlocks = []
    ForgeRegistries.BLOCKS.getEntries().forEach(blockEntry => {
        try {
            let blockState = blockEntry.getValue().defaultBlockState()
            let fabricfbr = Blocks.FIRE.fabric_getVanillaEntry(blockState)
            if (Shapes.block().equals(blockState.getCollisionShape(null, null, null)))
                if (!blockState.isFlammable(null, null, null) && !(fabricfbr.getBurnChance() > 0)){
                    parsedBlocks.push(blockEntry.getKey().location().toString())
                }
        } catch (err) {}
    })

    event.add('carbonize:charcoal_pile_valid_wall', parsedBlocks.filter(block => !logStacks.some(stack => stack == block)))
})