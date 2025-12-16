recipes((event, funcs) => {
    funcs.remove([
        {output: 'minecraft:charcoal', type: 'minecraft:campfire_cooking'},
        {output: 'minecraft:charcoal', type: 'minecraft:smelting'},
        {output: 'minecraft:charcoal', type: 'minecraft:blasting'},
        {id: 'betterend:charcoal_block'}
    ])

    //Making variants of charcoal more unique and useful
    event.replaceInput({input: content.medium_grade_charcoal, output: 'minecraft:black_dye'}, content.medium_grade_charcoal, tags.all_coal)
    event.replaceInput({input: '#minecraft:coals', output: 'blockus:asphalt'}, '#minecraft:coals', tags.all_coal)

    event.replaceInput({output: 'toughasnails:charc_os'}, content.medium_grade_charcoal, tags.atleast_good_grade_coal)
    event.replaceInput({output: 'thermal:ice_charge'}, content.medium_grade_charcoal, tags.at_most_low_grade_coal)
    event.replaceInput({output: 'thermal:lightning_charge'}, content.medium_grade_charcoal, tags.atleast_good_grade_coal)
    event.replaceInput({output: 'decorative_blocks:brazier'}, content.medium_grade_charcoal, tags.atleast_good_grade_coal)
    event.replaceInput({output: 'valhesia_structures:brazier'}, content.medium_grade_charcoal, tags.atleast_good_grade_coal)

    event.replaceInput({input: dataTag + 'coal'}, dataTag + 'coal', tags.medium_grade_coal)

    funcs.globalCooking(Item.of(content.poor_grade_charcoal, 2), '#minecraft:planks', 0.1)
    funcs.globalCooking(Item.of(content.low_grade_charcoal, 2), '#minecraft:logs', 0.2)

    event.shapeless(content.low_grade_charcoal, Item.of(content.poor_grade_charcoal, 4))
    event.shapeless(content.medium_grade_charcoal, Item.of(content.low_grade_charcoal, 4))
    event.shapeless(content.good_grade_charcoal, Item.of(content.medium_grade_charcoal, 4))
    event.shapeless(content.high_grade_charcoal, Item.of(content.good_grade_charcoal, 4))

    funcs.threeSquare('unearthed:lignite_briquettes', 'unearthed:lignite').vanilla()
    funcs.slab('6x unearthed:lignite_slab', 'unearthed:lignite').vanilla()
    funcs.stairs('4x unearthed:lignite_stairs', 'unearthed:lignite').vanilla()
    funcs.wall('6x unearthed:lignite_wall', 'unearthed:lignite').vanilla()
})

lootTables((event, funcs) => {
    /**
     * @param {Internal.Block} block 
     * @param {Internal.Item} item 
     * @param {Number} chance
     * @param {Boolean} isSlab
     */
    function entry (block, item, chance, isSlab) {
        var entry = LootEntry.of(Item.of(item).withChance(chance * 1000)).when(c => {
            c.customCondition(conditionInverted(conditionSilkTouch()))
        })
        if (isSlab) entry.customFunction(functionSlab(block))

        return entry
    }
    /**
     * 
     * @param {Internal.Block} block 
     * @param {Number} quality 
     * @param {Number} volume 
     * @param {Boolean} isSlab 
     */
    var configuredDrop = (block, quality, volume, isSlab) => {
        isSlab = common.insure(isSlab, false)

        var silkTouchEntry = LootEntry.of(block).when(c => c.customCondition(conditionSilkTouch()))
        if (isSlab) silkTouchEntry.customFunction(functionSlab(block))
            
        event.addBlockLootModifier(block).removeLoot(Ingredient.all).addWeightedLoot(
            isSlab ? volume / 2 : volume,
            [
                entry(block, content.alchemical_coal, Math.pow(quality, 8), isSlab),
                entry(block, content.high_grade_charcoal, Math.pow(quality, 4), isSlab),
                entry(block, content.good_grade_charcoal, Math.pow(quality, 2), isSlab),
                entry(block, content.medium_grade_charcoal, quality, isSlab),
                entry(block, content.low_grade_charcoal, 1 - quality, isSlab),
                entry(block, content.poor_grade_charcoal, Math.pow(1 - quality, 2), isSlab),
                entry(block, content.poor_grade_charcoal, Math.pow(1 - quality, 4), isSlab)
            ]
        ).addLoot(silkTouchEntry)
    }

    configuredDrop('carbonize:charcoal_stack', 0.5, 8)
    configuredDrop('carbonize:charcoal_log', 0.3, 6)
    configuredDrop('carbonize:charcoal_planks', 0.3, 4)
    configuredDrop('carbonize:charcoal_fence', 0.2, 3)
    configuredDrop('carbonize:charcoal_fence_gate', 0.2, 3)
    configuredDrop('carbonize:charcoal_stairs', 0.3, 3)
    configuredDrop('carbonize:charcoal_slab', 0.3, 2, true)
})

itemTags((event, funcs) => {
    var coal_coke = event.get(data + 'coal_coke').getObjectIds()

    event.add(ids.poor_grade_coal, content.poor_grade_charcoal)
    event.add(ids.low_grade_coal, content.low_grade_charcoal)
    event.add(ids.medium_grade_coal, event.get(data + 'coal').getObjectIds().filter(id => !coal_coke.contains(id)).concat(content.medium_grade_charcoal))
    event.add(ids.good_grade_coal, [dataTag + 'coal_coke', content.good_grade_charcoal])
    event.add(ids.good_grade_coal, [content.high_grade_charcoal])

    event.add(ids.atleast_good_grade_coal, [tags.good_grade_coal, tags.high_grade_coal])
    event.add(ids.at_most_low_grade_coal, [tags.poor_grade_coal, tags.low_grade_coal])

    event.add(ids.all_coal, [tags.at_most_low_grade_coal, tags.medium_grade_coal, tags.atleast_good_grade_coal])

    event.add(data + 'coal', [tags.medium_grade_coal, tags.atleast_good_grade_coal])

    event.remove(data + 'storage_block/charcoal', 'betterend:charcoal_block')
    event.add(data + 'storage_blocks/charcoal', ['carbonize:charcoal_block','quark:charcoal_block','blockus:charcoal_block',])
    event.add(data + 'storage_blocks/coals', event.get(data + 'coal').getObjectIds().map(entry => preferredItemId(data + 'storage_blocks/' + entry.toString().split(':')[1])))
    event.add(data + 'tiny/coal', ['utilitix:tiny_coal', 'actuallyadditions:tiny_coal'])
    event.add(data + 'tiny/charcoal', ['utilitix:tiny_charcoal', 'actuallyadditions:tiny_charcoal'])

})

blockTags((event, funcs) => {
    event.remove('minecraft:mineable/pickaxe', 'betterend:charcoal_block')
    event.add(tags.extra_flammability, ['unearthed:lignite_briquettes', 'betterend:charcoal_block', 'thermal:charcoal_block','minecraft:coal_block', 'thermal:coal_coke_block'])
    event.add(tags.leaves_extra_flammability, ['unearthed:lignite', 'unearthed:lignite_slab', 'unearthed:lignite_stairs', 'unearthed:lignite_wall'])
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