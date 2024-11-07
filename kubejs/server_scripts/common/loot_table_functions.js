function lootTable(event, identifier, type, pools) {
    var splitId = identifier.split(':')
    var json = {type: type, pools:  global.ensureArray(pools)}
    event.addJson(splitId[0] + ':loot_tables/' + type + 's/' + splitId[1] + '.json', json)
    return json
}

function ltPools(rolls, bonus_rolls, entries) {
    return {
        rolls: rolls,
        bonus_rolls: bonus_rolls,
        entries: global.ensureArray(entries)
    }
}

function ltEntries(type, entryChildren) {
    return {
        type: type,
        children: global.ensureArray(entryChildren)
    }
}

function ltEntryChild(type, drops, modifiers) {
    var baseChild = {
        type: type,
        name: drops,
    }
    if (modifiers.conditions != null)
        baseChild.conditions = global.ensureArray(modifiers.conditions)
    if (modifiers.functions != null)
        baseChild.functions = global.ensureArray(modifiers.functions)
    return baseChild;
}