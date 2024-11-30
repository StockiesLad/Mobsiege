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
})

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

    ForgeRegistries.BLOCKS.getEntries().forEach(blockEntry => {
        try {
            let blockState = blockEntry.getValue().defaultBlockState()
            let fabricfbr = Blocks.FIRE.fabric_getVanillaEntry(blockState)
            if (Shapes.block().equals(blockState.getCollisionShape(null, null, null)))
                if (!blockState.isFlammable(null, null, null) && !(fabricfbr.getSpreadChance() > 0 || fabricfbr.getSpreadChance() > 0)) 
                    event.add('carbonize:charcoal_pile_valid_wall', blockEntry.getKey().location().toString())
        } catch (err) {}
    })
})