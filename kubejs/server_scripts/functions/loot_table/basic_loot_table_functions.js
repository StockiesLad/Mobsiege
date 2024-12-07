function getBasicLootTableFunctions(event) {
    var raw = (type, id, json) => {
        var splitId = id.split(':')
        event.addJson(splitId[0] + ':loot_tables/' + type + 's/' + splitId[1] + '.json', json)
    }

    var lootTable = (event, identifier, type, pools) => {
        var splitId = identifier.split(':')
        var json = {type: type, pools:  comfuncs.ensureArray(pools)}
        event.addJson(splitId[0] + ':loot_tables/' + type + 's/' + splitId[1] + '.json', json)
        return json
    }
    
    var ltPools = (rolls, bonus_rolls, entries) => {
        return {
            rolls: rolls,
            bonus_rolls: bonus_rolls,
            entries: comfuncs.ensureArray(entries)
        }
    }
    
    var ltEntries = (type, entryChildren) => {
        return {
            type: type,
            children: comfuncs.ensureArray(entryChildren)
        }
    }
    
    var ltEntryChild = (type, drops, modifiers) => {
        var baseChild = {
            type: type,
            name: drops,
        }
        if (modifiers.conditions != null)
            baseChild.conditions = comfuncs.ensureArray(modifiers.conditions)
        if (modifiers.functions != null)
            baseChild.functions = comfuncs.ensureArray(modifiers.functions)
        return baseChild;
    }

    var functionsAsModifier = (functions) => {
        return {functions: functions}
    }
    
    var silkTouchLtCondition = () => {
        return {
            condition: "minecraft:match_tool",
            predicate: {
            enchantments: [{
                enchantment: "minecraft:silk_touch",
                levels: {min: 1}
                }]
            }
        }
    }
    
    var silkTouchLtEntryChild = (drops) => {
        return {
            type: "minecraft:item",
            conditions: [
            {
                condition: "minecraft:match_tool",
                predicate: {
                enchantments: [
                    {
                    enchantment: "minecraft:silk_touch",
                    levels: {
                        "min": 1
                    }
                    }
                ]
                }
            }
            ],
            name: drops
        }
    }
    
    var basicBlockLt = (event, identifier, entryChildren) => {
        return lootTable(
            event, 
            identifier, 
            'block', 
            ltPools(
                1, 
                0, 
                ltEntries(
                    'minecraft:alternatives', 
                    entryChildren(identifier)
                )
            )
        )
    }

    var blockEntry = (overrides, blocks) => {
        return {
            overrides: overrides,
            blocks: comfuncs.ensureArray(blocks)
        }
    }
    var simpleBlockEntry = (blocks) => blockEntry({}, blocks)

    var replaceBasiclt = (lootTables) => {
        comfuncs.ensureArray(lootTables).forEach(ltObject => {
            comfuncs.ensureArray(ltObject.blocks).forEach(blockEntry => {
                let overrides = blockEntry.overrides
                blockEntry.blocks.forEach(block => {
                    var functions = comfuncs.ensureArray(ltObject.functions)
                    var materialTag = 'forge:raw_materials/'
                    var dropMaterial
    
                    if (Object.getOwnPropertyDescriptor(overrides, "functions") != null)
                        comfuncs.incorp(functions, overrides.functions)
                    if (Object.getOwnPropertyDescriptor(overrides, "materialTag") != null)
                        materialTag = overrides.materialTag
                    if (Object.getOwnPropertyDescriptor(overrides, "literalDrop") != null)
                        dropMaterial = overrides.literalDrop
                    else dropMaterial = ltObject.dropMaterial(materialTag, block)
    
                    basicBlockLt(event, block, identifier => [
                        silkTouchLtEntryChild(identifier), 
                        ltEntryChild(
                            'minecraft:item',  
                            dropMaterial, 
                            functionsAsModifier(functions)
                        )
                    ])
                })
            })
        })
    }

    var createBasicLt = (dropMaterial, commonFunctions, dropEntries) => {
        return {
            dropMaterial: dropMaterial,
            functions: commonFunctions,
            blocks: dropEntries
        }
    }

    return {
        raw: raw,
        lootTable: lootTable,
        ltPools: ltPools,
        ltEntries: ltEntries,
        ltEntryChild: ltEntryChild,
        functionsAsModifier: functionsAsModifier,
        silkTouchLtCondition: silkTouchLtCondition,
        silkTouchLtEntryChild: silkTouchLtEntryChild,
        /*fortuneLtFunction: fortuneLtFunction,
        basicFortuneLtFunction: basicFortuneLtFunction,
        binomialFortuneBonus: binomialFortuneBonus,
        setCountFunction: setCountFunction,
        rangeCount: rangeCount,
        binomialCount: binomialCount,
        constantCount: constantCount,
        limitCountFunction: limitCountFunction,
        explosionDecay: explosionDecay,*/
        basicBlockLt: basicBlockLt,
        blockEntry: blockEntry,
        simpleBlockEntry: simpleBlockEntry,
        replaceBasiclt: replaceBasiclt,
        createBasicLt: createBasicLt
    }
}

function ofOverride(overrides) {
    return {conditions: [], functions: [], overrides: overrides}
}

function ofConditions(conditions, overrides) {
    return {conditions: comfuncs.ensureArray(conditions), functions: [],  overrides: overrides}
}

function ofFunctions(functions, overrides) {
    return {conditions: [], functions: comfuncs.ensureArray(functions), overrides: overrides}
}

function ofFuncConds(conditions, functions, overrides) {
    return {conditions: comfuncs.ensureArray(conditions), functions: comfuncs.ensureArray(functions),  overrides: overrides}
}

function ofChild(item, modifiers) {
    var json = {
        type: "minecraft:item",
        name: item
    }

    if (modifiers != null) {
        json.conditions = modifiers.conditions
        json.functions = modifiers.functions
        if (modifiers['overrides'] != null)
            modifiers.overrides(json)
    }

    return json
}

function groupPool(children) {
    return {
        rolls: 1,
        type: "minecraft:group",
        children: comfuncs.ensureArray(children)
   }
}

function alternativesPool(entries, modifiers) {
    var json = {
        rolls: 1,
        type: "minecraft:alternatives",
        entries: comfuncs.ensureArray(entries)
    }

    if (modifiers != null) {
        json.conditions = modifiers.conditions
        json.functions = modifiers.functions
    }

    return json
}

function childAlternativesPool(children, modifiers) {
    var json = {
        type: "minecraft:alternatives",
        children: comfuncs.ensureArray(children)
    }

    if (modifiers != null) {
        json.conditions = modifiers.conditions
        json.functions = modifiers.functions
    }

    return json
}

function nonSilkTouchPool(entries, rolls, bonus_rolls) {
    return {
        conditions: comfuncs.ensureArray(conditionInverted(conditionSilkTouch())),
        rolls: comfuncs.notNull(rolls, 1),
        bonus_rolls: comfuncs.notNull(bonus_rolls, 0),
        entries: comfuncs.ensureArray(entries)
   }
}

function silkTouchPool(item) {
    return {
        rolls: 1,
        entries: [{
             type: 'minecraft:item',
             name: item,
             conditions: comfuncs.ensureArray(conditionSilkTouch())
        }]
   }
}