const woodSet = [
    '${}_sapling',
    'potted_${}_sapling',
    '${}_leaves',
    '${}_leaf_pile',
    '${}_hanging_leaves',
    '${}_planks',
    '${}_slab',
    '${}_stairs',
    '${}_log',
    'stripped_${}_log',
    '${}_wood',
    'stripped_${}_wood',
    '${}_door',
    '${}_bookshelf',
    '${}_crafting_table',
    '${}_sign',
    '${}_hanging_sign',
    '${}_pressure_plate',
    '${}_trapdoor',
    '${}_button',
    '${}_fence_gate',
    '${}_fence',
    '${}_boat',
    '${}_chest_boat'
]

const stoneSet = [ 
    '${}',
    '${}_stairs',
    '${}_slab',
    '${}_vertical_slab',
    '${}_wall',
    '${}_button',
    '${}_pressure_plate',
    '${}s',
    '${}s_stairs',
    '${}s_slab',
    '${}s_vertical_slab',
    '${}s_wall',
    '${}s_button',
    '${}s_pressure_plate'
]

function getStandardStoneCategory(modid, expType, newExpType, extraExps) {
    let exps = [
        [expType, newExpType], 
        [expType + '_brick', newExpType + '_brick'],
        [expType + '_tile', newExpType +'_tile'],
        [expType + '_pillar', newExpType + '_pillar'],
        ['cut_' + expType, 'cut_' + newExpType], 
        ['small_' + expType +'_brick', 'small_' + newExpType + '_brick'], 
        ['polished_' + expType, 'polished_' + newExpType], 
        ['chiseled_' + expType, 'chiseled_' + newExpType]
    ]
    if (extraExps != null)
        common.unifyArrays([exps, extraExps])
    return getCategory(modid, stoneSet, exps)
}

function getCategory(modid, strings, exps) {
    let storage = []
    exps.forEach(exp => regexInwithParent(storage, modid, exp, strings))
    return storage
}

function regexIn (modid, exp, strings) {
    return regexInwithParent([], modid, exp, strings)
}

function regexInwithParent(parent, modid, exp, strings) {
    //return comdef.incorpHandledProperties(parent, strings, string => [modid + ':' + string.replace('${}', exp[0]), firstCaseUpper(string.replace('${}', exp[1]))])
    strings.forEach(string => {
        parent.push([modid + ':' + string.replace('${}', exp[0]), firstCaseUpper(string.replace('${}', exp[1]))])
    });
    return parent
}

function firstCaseUpper(string) {
    let split = ' '
    string.split('_').forEach(word => split = split + ' ' + (word.charAt(0).toUpperCase() + word.slice(1)))
    return split.replace('  ', '')
}

function concatSeries(objects, subjectsSeries) {
    subjectsSeries.forEach(subjects => objects = objects.concat(subjects))
    return objects
}