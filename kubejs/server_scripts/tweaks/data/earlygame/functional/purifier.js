const Mobsiege2ToughAsNails = Java.loadClass('com.stockieslad.mobsiege.Mobsiege2ToughAsNails')
const LinkedList = Java.loadClass('java.util.LinkedList')

Mobsiege2ToughAsNails.PURIFIER_FILTER_ADD_MAP = new HashMap();
Mobsiege2ToughAsNails.PURIFIER_FILTER_REMOVE_LIST = new LinkedList();

Mobsiege2ToughAsNails.removePurifyingFilterStack(Item.of('minecraft:charcoal'))
Mobsiege2ToughAsNails.addPurifyingFilterStack(Item.of(custom.poor_grade_charcoal), 400)
Mobsiege2ToughAsNails.addPurifyingFilterStack(Item.of(custom.low_grade_charcoal), 600)
Mobsiege2ToughAsNails.addPurifyingFilterStack(Item.of('minecraft:charcoal'), 800)
Mobsiege2ToughAsNails.addPurifyingFilterStack(Item.of(custom.good_grade_charcoal), 1200)
Mobsiege2ToughAsNails.addPurifyingFilterStack(Item.of(custom.high_grade_charcoal), 1800)