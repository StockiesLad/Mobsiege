var coalStorageBlocks

recipes((event, funcs) => {
    funcs.remove([
        {output: 'minecraft:charcoal', type: 'minecraft:campfire_cooking'},
        {output: 'minecraft:charcoal', type: 'minecraft:smelting'},
        {output: 'minecraft:charcoal', type: 'minecraft:blasting'},
        {id: 'betterend:charcoal_block'}
    ])

    //Making variants of charcoal more unique and useful
    event.replaceInput({input: custom.medium_grade_charcoal, output: 'minecraft:black_dye'}, custom.medium_grade_charcoal, packTag('coal/all'))
    event.replaceInput({output: 'toughasnails:charc_os'}, custom.medium_grade_charcoal, packTag('coal/grade/atleast_good'))
    event.replaceInput({output: 'thermal:ice_charge'}, custom.medium_grade_charcoal, packTag('coal/grade/at_most_low'))
    event.replaceInput({output: 'thermal:lightning_charge'}, custom.medium_grade_charcoal, packTag('coal/grade/atleast_good'))
    event.replaceInput({output: 'decorative_blocks:brazier'}, custom.medium_grade_charcoal, packTag('coal/grade/atleast_good'))
    event.replaceInput({output: 'valhesia_structures:brazier'}, custom.medium_grade_charcoal, packTag('coal/grade/atleast_good'))

    event.replaceInput({input: 'forge:coal'}, 'forge:coal', packTag('coal/grade/medium'))

    funcs.globalCooking(Item.of(custom.poor_grade_charcoal, 2), '#minecraft:planks', 0.1)
    funcs.globalCooking(Item.of(custom.low_grade_charcoal, 2), '#minecraft:logs', 0.2)
    funcs.twoSquare('2x betterend:charcoal_block', ['#forge:storage_blocks/charcoal', 'minecraft:soul_sand']).vanilla()

    event.shapeless(custom.low_grade_charcoal, Item.of(custom.poor_grade_charcoal, 4))
    event.shapeless(custom.medium_grade_charcoal, Item.of(custom.low_grade_charcoal, 4))
    event.shapeless(custom.good_grade_charcoal, Item.of(custom.medium_grade_charcoal, 4))
    event.shapeless(custom.high_grade_charcoal, Item.of(custom.good_grade_charcoal, 4))
})

lootTables((event, funcs) => {
    var entry = (item, chance, amount) => {
        return ltItemEntry(item, ofFuncConds(
            conditionRandomChance(chance), 
            setCount(countUniform(1, amount), false)
        ))
    }

    var configuredDrop = (block, quality, volume) => {
        event.addBlockLootModifier(block).removeLoot(Ingredient.all).addAlternativesLoot(
            LootEntry.of(block).when(c => c.customCondition(conditionSilkTouch())),
            LootEntry.ofJson(childGroupPool([
                entry(custom.alchemical_coal, Math.pow(quality, 8), Math.min(1, volume / 4)),
                entry(custom.high_grade_charcoal, Math.pow(quality, 4), Math.min(1, volume / 3)),
                entry(custom.good_grade_charcoal, Math.pow(quality, 2), Math.min(1, volume / 2)),
                entry(custom.medium_grade_charcoal, quality, Math.min(1, volume)),
                entry(custom.low_grade_charcoal, 1 - quality, Math.min(1, volume)),
                entry(custom.poor_grade_charcoal, Math.pow(1 - quality, 2), Math.min(1, volume / 2)),
                entry(custom.poor_grade_charcoal, Math.pow(1 - quality, 4), Math.min(1, volume / 3))
           ]))
        )
    }

    configuredDrop('carbonize:charcoal_stack', 0.5, 8)
    configuredDrop('carbonize:charcoal_log', 0.3, 6)
    configuredDrop('carbonize:charcoal_planks', 0.2, 3)
    configuredDrop('carbonize:charcoal_fence', 0.2, 3)
    configuredDrop('carbonize:charcoal_fence_gate', 0.2, 3)
    configuredDrop('carbonize:charcoal_stairs', 0.1, 2)
    configuredDrop('carbonize:charcoal_slab', 0.1, 1)
})

/*
basicLootTables((event, funcs) => {
    var item = (item, weight) => weightedItem(item, weight * 10000)
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
                            item(custom.alchemical_coal, Math.pow(quality, 8)),
                            item(custom.high_grade_charcoal, Math.pow(quality, 4)),
                            item(custom.good_grade_charcoal, Math.pow(quality, 2)),
                            item(custom.medium_grade_charcoal, quality),
                            item(custom.low_grade_charcoal, 1 - quality),
                            item(custom.poor_grade_charcoal, Math.pow(1 - quality, 2)),
                            item(custom.fine_ash, Math.pow(1 - quality, 4))
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
}) */

itemTags((event, funcs) => {
    var coal_coke = event.get('forge:coal_coke').getObjectIds()

    event.add(pack('coal/grade/poor'), custom.poor_grade_charcoal)
    event.add(pack('coal/grade/low'), custom.low_grade_charcoal)
    event.add(pack('coal/grade/medium'), event.get('forge:coal').getObjectIds().filter(id => !coal_coke.contains(id)).concat(custom.medium_grade_charcoal))
    event.add(pack('coal/grade/good'), ['#forge:coal_coke', custom.good_grade_charcoal])
    event.add(pack('coal/grade/high'), [custom.high_grade_charcoal])

    event.add(pack('coal/grade/atleast_good'), [packTag('coal/grade/good'), packTag('coal/grade/high')])
    event.add(pack('coal/grade/at_most_low'), [packTag('coal/grade/poor'), packTag('coal/grade/low')])

    event.add(pack('coal/all'), [packTag('coal/grade/poor'), packTag('coal/grade/low'),packTag('coal/grade/medium'), packTag('coal/grade/good'), packTag('coal/grade/high')])

    event.add('forge:coal', [packTag('coal/medium_grade'), packTag('coal/good_grade'), packTag('coal/high_grade')])

    event.remove('forge:storage_block/charcoal', 'betterend:charcoal_block')
    event.add('forge:storage_blocks/charcoal', ['carbonize:charcoal_block','quark:charcoal_block','blockus:charcoal_block',])
    event.add(pack('storage_blocks/coals'), event.get('forge:coal').getObjectIds().map(entry => preferredItemId('forge:storage_blocks/' + entry.toString().split(':')[1])))
})

blockTags((event, funcs) => {
    event.remove('minecraft:mineable/pickaxe', 'betterend:charcoal_block')
    addEntriesRespectively(event, [
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