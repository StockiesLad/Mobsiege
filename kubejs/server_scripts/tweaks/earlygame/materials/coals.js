var coalStorageBlocks

recipes((event, funcs) => {
    funcs.remove([
        {output: 'minecraft:charcoal', type: 'minecraft:campfire_cooking'},
        {output: 'minecraft:charcoal', type: 'minecraft:smelting'},
        {output: 'minecraft:charcoal', type: 'minecraft:blasting'},
        {id: 'betterend:charcoal_block'}
    ])

    //Making variants of charcoal more unique and useful
    event.replaceInput({input: content.medium_grade_charcoal, output: 'minecraft:black_dye'}, content.medium_grade_charcoal, packTag('coal/all'))
    event.replaceInput({input: '#minecraft:coals', output: 'blockus:asphalt'}, '#minecraft:coals', packTag('coal/all'))

    event.replaceInput({output: 'toughasnails:charc_os'}, content.medium_grade_charcoal, packTag('coal/grade/atleast_good'))
    event.replaceInput({output: 'thermal:ice_charge'}, content.medium_grade_charcoal, packTag('coal/grade/at_most_low'))
    event.replaceInput({output: 'thermal:lightning_charge'}, content.medium_grade_charcoal, packTag('coal/grade/atleast_good'))
    event.replaceInput({output: 'decorative_blocks:brazier'}, content.medium_grade_charcoal, packTag('coal/grade/atleast_good'))
    event.replaceInput({output: 'valhesia_structures:brazier'}, content.medium_grade_charcoal, packTag('coal/grade/atleast_good'))

    event.replaceInput({input: 'forge:coal'}, 'forge:coal', packTag('coal/grade/medium'))

    funcs.globalCooking(Item.of(content.poor_grade_charcoal, 2), '#minecraft:planks', 0.1)
    funcs.globalCooking(Item.of(content.low_grade_charcoal, 2), '#minecraft:logs', 0.2)

    event.shapeless(content.low_grade_charcoal, Item.of(content.poor_grade_charcoal, 4))
    event.shapeless(content.medium_grade_charcoal, Item.of(content.low_grade_charcoal, 4))
    event.shapeless(content.good_grade_charcoal, Item.of(content.medium_grade_charcoal, 4))
    event.shapeless(content.high_grade_charcoal, Item.of(content.good_grade_charcoal, 4))
})

lootTables((event, funcs) => {
    var entry = (item, chance, amount) => {
        return ltItemEntry(item, ofFuncConds(
            conditionRandomChance(chance), 
            setCount(countConstant(amount), false)
        ))
    }

    var configuredDrop = (block, quality, volume) => {
        event.addBlockLootModifier(block).removeLoot(Ingredient.all).addAlternativesLoot(
            LootEntry.of(block).when(c => c.customCondition(conditionSilkTouch())),
            LootEntry.ofJson(childGroupPool([
                entry(content.alchemical_coal, Math.pow(quality, 8), Math.min(1, volume / 4)),
                entry(content.high_grade_charcoal, Math.pow(quality, 4), Math.min(1, volume / 3)),
                entry(content.good_grade_charcoal, Math.pow(quality, 2), Math.min(1, volume / 2)),
                entry(content.medium_grade_charcoal, quality, Math.min(1, volume)),
                entry(content.low_grade_charcoal, 1 - quality, Math.min(1, volume)),
                entry(content.poor_grade_charcoal, Math.pow(1 - quality, 2), Math.min(1, volume / 2)),
                entry(content.poor_grade_charcoal, Math.pow(1 - quality, 4), Math.min(1, volume / 3))
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

itemTags((event, funcs) => {
    var coal_coke = event.get('forge:coal_coke').getObjectIds()

    event.add(pack('coal/grade/poor'), content.poor_grade_charcoal)
    event.add(pack('coal/grade/low'), content.low_grade_charcoal)
    event.add(pack('coal/grade/medium'), event.get('forge:coal').getObjectIds().filter(id => !coal_coke.contains(id)).concat(content.medium_grade_charcoal))
    event.add(pack('coal/grade/good'), ['#forge:coal_coke', content.good_grade_charcoal])
    event.add(pack('coal/grade/high'), [content.high_grade_charcoal])

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