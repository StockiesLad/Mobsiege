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
    funcs.charring(custom.charred_log_stack, comfuncs.packDef('log_stacks'))

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

LootJS.modifiers(event => {
    var charcoalEntry = (type, multiplier) => {
        var formula
        if (multiplier > 1)
            formula = formulaUniformBonus(multiplier)
        else formula = formulaBinomialBonus(1, multiplier)



        return LootEntry.of(type)
            .customFunction(countSet(countUniform(Math.floor(4 * multiplier), Math.ceil(10 * multiplier)), false))
            .customFunction(funcFortune(formula))
    }

    var charcoal = (block, lowQualityMultiplier, midQualityMultiplier, highQualityMultiplier) => {
        event.addBlockLootModifier(block).removeLoot(block).removeLoot('minecraft:charcoal')
        .addSequenceLoot(
            charcoalEntry(custom.low_grade_charcoal, lowQualityMultiplier),
            charcoalEntry('minecraft:charcoal', midQualityMultiplier),
            charcoalEntry(custom.high_grade_charcoal, highQualityMultiplier)
        )
    }

    charcoal(custom.charred_log_stack, 0.5, 0.75, 0.2)
    charcoal('carbonize:charcoal_log', 0.5, 0.5, 0.1)
    charcoal('carbonize:charcoal_planks', 0.5, 0.25, 0.05)
    charcoal('carbonize:charcoal_stairs', 0.5, 0.1, 0.03)
    charcoal('carbonize:charcoal_slab', 0.3, 0.1, 0.02)
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
    event.add(comfuncs.packDef('charred_log_stacks'), custom.charred_log_stack)
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