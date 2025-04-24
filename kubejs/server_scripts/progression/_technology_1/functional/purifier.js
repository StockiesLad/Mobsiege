Mobsiege2ToughAsNails.PURIFIER_FILTER_ADD_MAP = new HashMap();
Mobsiege2ToughAsNails.PURIFIER_FILTER_REMOVE_LIST = new LinkedList();

Mobsiege2ToughAsNails.removePurifyingFilterStack(Item.of('minecraft:charcoal'))
Mobsiege2ToughAsNails.addPurifyingFilterStack(Item.of(content.poor_grade_charcoal), 400)
Mobsiege2ToughAsNails.addPurifyingFilterStack(Item.of(content.low_grade_charcoal), 600)
Mobsiege2ToughAsNails.addPurifyingFilterStack(Item.of('minecraft:charcoal'), 800)
Mobsiege2ToughAsNails.addPurifyingFilterStack(Item.of(content.good_grade_charcoal), 1200)
Mobsiege2ToughAsNails.addPurifyingFilterStack(Item.of(content.high_grade_charcoal), 1800)

recipes((event, funcs) => {
    funcs.vanillaInsert(funcs.removeByOutput('toughasnails:water_purifier'), [['minecraft:glass', [0, 2]], ['minecraft:copper_ingot', [3, 1, 5]], ['decorative_blocks:lattice', 4], ['#minecraft:planks', [6, 7, 8]]])
})