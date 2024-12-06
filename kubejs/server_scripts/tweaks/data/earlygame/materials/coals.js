const ForgeRegistries = Java.loadClass('net.minecraftforge.registries.ForgeRegistries')
const Shapes = Java.loadClass('net.minecraft.world.phys.shapes.Shapes')
const Blocks = Java.loadClass('net.minecraft.world.level.block.Blocks')

var coalStorageBlocks

recipes((event, funcs) => {
    funcs.removeAll([
        {output: 'minecraft:charcoal', type: 'minecraft:campfire_cooking'},
        {output: 'minecraft:charcoal', type: 'minecraft:smelting'},
        {output: 'minecraft:charcoal', type: 'minecraft:blasting'},
        {id: 'betterend:charcoal_block'}
    ])
    funcs.globalCooking(Item.of(custom.poor_grade_charcoal, 2), '#minecraft:planks', 0.1)
    funcs.globalCooking(Item.of(custom.low_grade_charcoal, 2), '#minecraft:logs', 0.2)
    funcs.generate('2x betterend:charcoal_block', ['#forge:storage_blocks/charcoal', 'minecraft:soul_sand']).rollingSquare(1, 2).next().vanilla()
    funcs.charring(custom.charcoal_stack, comfuncs.packDef('log_stacks'))

    event.shapeless(custom.low_grade_charcoal, Item.of(custom.poor_grade_charcoal, 4))
    event.shapeless('minecraft:charcoal', Item.of(custom.low_grade_charcoal, 4))
    event.shapeless(custom.good_grade_charcoal, Item.of('minecraft:charcoal', 4))
    event.shapeless(custom.high_grade_charcoal, Item.of(custom.good_grade_charcoal, 4))
})

complexLootTables((event, funcs) => {
    var charcoalEntry = (type, multiplier, amount) => LootEntry.of(type)
            .when(c => c.randomChance(multiplier).customCondition(conditionInverted(conditionSilkTouch())))
            .customFunction(countSet(countUniform(0, amount), false))
            .customFunction(funcFortune(formulaBinomialBonus(Math.ceil(amount * multiplier), multiplier)))

    var charcoal = (block, quality, volume) => {
        event.addBlockLootModifier(block)
            .removeLoot(Ingredient.all)
            .addLoot(
                LootEntry.of(block).when(c => c.customCondition(conditionSilkTouch())),
                charcoalEntry('projecte:alchemical_coal', Math.pow(quality, 5), volume / 5),
                charcoalEntry(custom.high_grade_charcoal, Math.pow(quality, 4), volume / 4),
                charcoalEntry(custom.good_grade_charcoal, Math.pow(quality, 3), volume / 3),
                charcoalEntry('minecraft:charcoal', Math.pow(quality, 2), volume / 2),
                charcoalEntry(custom.low_grade_charcoal, quality, volume),
                charcoalEntry(custom.poor_grade_charcoal, 1, 3),
                charcoalEntry('supplementaries:ash', 1 - quality, Math.max(0, 3 - volume))
            )
    }

    charcoal(custom.charcoal_stack, 0.5, 5)
    charcoal('carbonize:charcoal_log', 0.4, 3)
    charcoal('carbonize:charcoal_planks', 0.3, 2)
    charcoal('carbonize:charcoal_stairs', 0.2, 1)
    charcoal('carbonize:charcoal_slab', 0.1, 1)
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