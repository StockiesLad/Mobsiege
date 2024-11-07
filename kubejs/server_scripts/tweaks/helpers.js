function planetRecipe(event, result, outterMaterial, innerMaterial) {
    event.shaped(result, [
        'OOO',
        'OIO',
        'OOO'
    ], {
            O: outterMaterial,
            I: innerMaterial
    })
}

function square2x2Recipe(event, result, ingredient) {
    event.shaped(result, [
        'II',
        'II'
    ], {
        I: ingredient
    })
}

function alternate2x2Recipe(event, result, i0, i1) {
    event.shaped(result, [
        'AB',
        'BA'
    ], {
        A: i0,
        B: i1
    })
}

function vertical2x1Recipe(event, result, ingredient) {
    event.shaped(result, [
        'I',
        'I'
    ], {
        I: ingredient
    })
}

function horizontal2x1Recipe(event, result, ingredient) {
    event.shaped(result, [
        'II'
    ], {
        I: ingredient
    })
}

function smallTriangleABCRecipe(event, result, a0, a1, a2) {
    event.shaped(result, [
        'AC',
        'B'
    ], {
        A: a0,
        B: a1,
        C: a2
    })
}

function smallTriangleABBRecipe(event, result, top, bottom) {
    smallTriangleABCRecipe(event, result, top, bottom, bottom)
}

function verticalABRecipe(event, result, top, bottom) {
    event.shaped(result, [
        'A',
        'B'
    ], {
        A: top,
        B: bottom
    })
}

function verticalABCRecipe(event, result, top, mid, bottom) {
    event.shaped(result, [
        'A',
        'B',
        'C'
    ], {
        A: top,
        B: mid,
        C: bottom
    })
}

function verticalABARecipe(event, result, inner, outter) {
    return verticalABCRecipe(event, result, outter, inner, outter)
}

function functionsAsModifier(functions)  {
    return {functions: functions}
}

function silkTouchLtCondition() {
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

function silkTouchLtEntryChild(drops) {
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

function fortuneLtFunction(formula, parameters) {
    return {
        function: "minecraft:apply_bonus",
        enchantment: "minecraft:fortune",
        formula: formula,
        parameters: parameters
    }
}

function basicFortuneLtFunction(bonusMultiplier) {
    return fortuneLtFunction('minecraft:uniform_bonus_count', {bonusMultiplier: bonusMultiplier})
}
function setCountFunction(count, add) {
    return {
        function: "minecraft:set_count",
        count: count,
        add: add
    }
}

function rangeCount(min, max) {
    return {type: "minecraft:uniform", min: min, max: max}
}

function constantCount(value) {
    return {type: "minecraft:constant", value: value}
}

function limitCountFunction(min, max) {
    return {
        function: "minecraft:limit_count",
        limit: {
            min: min,
            max: max
        }
    }
}

function BasicBlockLt(event, identifier, entryChildren) {
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