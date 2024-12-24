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

    event.shapeless(custom.low_grade_charcoal, Item.of(custom.poor_grade_charcoal, 4))
    event.shapeless('minecraft:charcoal', Item.of(custom.low_grade_charcoal, 4))
    event.shapeless(custom.good_grade_charcoal, Item.of('minecraft:charcoal', 4))
    event.shapeless(custom.high_grade_charcoal, Item.of(custom.good_grade_charcoal, 4))
})

basicLootTables((event, funcs) => {
    function item(item, weight) {
        return {
            type: "minecraft:item",
            name: item,
            weight: weight * 10000
        }
    }
    var charcoal = (block, quality, volume) => {
        quality = quality

        funcs.raw('block', block, {
            pools: [
                {
                    conditions: comfuncs.ensureArray(conditionInverted(conditionSilkTouch())),
                    functions: comfuncs.ensureArray(funcFortune(formulaUniformBonus(1))),
                    rolls: volume,
                    entries: [{
                        type: "minecraft:group",
                        children: [
                            item('projecte:alchemical_coal', Math.pow(quality, 8)),
                            item(custom.high_grade_charcoal, Math.pow(quality, 4)),
                            item(custom.good_grade_charcoal, Math.pow(quality, 2)),
                            item('minecraft:charcoal', quality),
                            item(custom.low_grade_charcoal, 1 - quality),
                            item(custom.poor_grade_charcoal, Math.pow(1 - quality, 2)),
                            item('supplementaries:ash', Math.pow(1 - quality, 4))
                        ]
                    }]
                },
                {
                    rolls: 1,
                    entries: [{
                        type: "minecraft:item",
                        name: block,
                        conditions: comfuncs.ensureArray(conditionSilkTouch())
                    }]
                }
            ]
        }) 
    }

    charcoal('carbonize:charcoal_stack', 0.5, 8)
    charcoal('carbonize:charcoal_log', 0.3, 6)
    charcoal('carbonize:charcoal_planks', 0.2, 3)
    charcoal('carbonize:charcoal_fence', 0.2, 3)
    charcoal('carbonize:charcoal_fence_gate', 0.2, 3)
    charcoal('carbonize:charcoal_stairs', 0.1, 2)
    charcoal('carbonize:charcoal_slab', 0.1, 1)
})

itemTags((event, funcs) => {
    event.remove('forge:storage_block/charcoal', 'betterend:charcoal_block')
    event.add('forge:coal', 'minecraft:charcoal')
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
})