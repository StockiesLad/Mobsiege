/**
 * An object wrapper to extend the loot table event with further functions
 * @class LootTableObject
 * @constructor
 * @param {Internal.LootModificationEventJS} event The original event
 */
function LootTableObject(event) {
     this.event = event
     return this
}

LootTableObject.prototype = {
    /**
      * Checks the insertions to see if that have been registered as a recipe. Makes debugging missing recipes way easier!
      * @param {Internal.LootModificationEventJS} event
      */
    start: function(event) {
        this.event = event
    },

    blockDropsItself: function(block) {
        this.event.addBlockLootModifier(block).addLoot(block)
        return this
    },

    replaceBlockDrop: function(oldDrop, newDrop, blocks) {
        common.alwaysArray(blocks).forEach(block => this.event.addBlockLootModifier(block).replaceLoot(oldDrop, newDrop, true))
        return this
    },

    removeBlockDrop: function(drop, blocks) {
        common.alwaysArray(blocks).forEach(block => this.event.addBlockLootModifier(block).removeLoot(drop))
        return this
    },

    replaceBlockDrops: function(arrayVariables) {
        arrayVariables.forEach(vars => {
            this.replaceBlockDrop(vars[0], vars[1], vars[2])
        })
        return this
    },

    removeBlockDrops: function(arrayVariables) {
        arrayVariables.forEach(vars => {
            this.removeBlockDrop(vars[0], vars[1])
        })
        return this
    }
}

//Json stuff that LootJs cannot do on it's own
function ofOverride(overrides) {
     return {conditions: [], functions: [], overrides: overrides}
 }
 
 function ofConditions(conditions, overrides) {
     return {conditions: common.alwaysArray(conditions), functions: [],  overrides: overrides}
 }
 
 function ofFunctions(functions, overrides) {
     return {conditions: [], functions: common.alwaysArray(functions), overrides: overrides}
 }
 
 function ofFuncConds(conditions, functions, overrides) {
     return {conditions: common.alwaysArray(conditions), functions: common.alwaysArray(functions),  overrides: overrides}
 }
 
 function ltItemEntry(item, modifiers) {
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
         children: common.alwaysArray(children)
    }
 }
 
 function alternativesPool(entries, modifiers) {
     var json = {
         rolls: 1,
         type: "minecraft:alternatives",
         entries: common.alwaysArray(entries)
     }
 
     if (modifiers != null) {
         json.conditions = modifiers.conditions
         json.functions = modifiers.functions
     }
 
     return json
 }
 
 function childGroupPool(children, modifiers) {
     var json = {
         type: "minecraft:group",
         children: common.alwaysArray(children)
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
        children: common.alwaysArray(children)
     }
 
     if (modifiers != null) {
         json.conditions = common.alwaysArray(modifiers.conditions)
         json.functions = common.alwaysArray(modifiers.functions)
     }
 
     return json
 }
 
 function nonSilkTouchPool(entries, rolls, bonus_rolls) {
     return {
         conditions: common.alwaysArray(conditionInverted(conditionSilkTouch())),
         rolls: common.insure(rolls, 1),
         bonus_rolls: common.insure(bonus_rolls, 0),
         entries: common.alwaysArray(entries)
    }
 }
 
 function silkTouchPool(item) {
     return {
         rolls: 1,
         entries: [{
              type: 'minecraft:item',
              name: item,
              conditions: common.alwaysArray(conditionSilkTouch())
         }]
    }
 }