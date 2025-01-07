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
     blockDropsItself: function(block) {
          this.event.addBlockLootModifier(block).addLoot(block)
          return this
     },

     replaceBlockDrop: function(oldDrop, newDrop, blocks) {
          comfuncs.ensureArray(blocks).forEach(block => this.event.addBlockLootModifier(block).replaceLoot(oldDrop, newDrop, true))
          return this
     },

     removeBlockDrop: function(drop, blocks) {
          comfuncs.ensureArray(blocks).forEach(block => this.event.addBlockLootModifier(block).removeLoot(drop))
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
     return {conditions: comfuncs.ensureArray(conditions), functions: [],  overrides: overrides}
 }
 
 function ofFunctions(functions, overrides) {
     return {conditions: [], functions: comfuncs.ensureArray(functions), overrides: overrides}
 }
 
 function ofFuncConds(conditions, functions, overrides) {
     return {conditions: comfuncs.ensureArray(conditions), functions: comfuncs.ensureArray(functions),  overrides: overrides}
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
 
 function childGroupPool(children, modifiers) {
     var json = {
         type: "minecraft:group",
         children: comfuncs.ensureArray(children)
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
         json.conditions = comfuncs.ensureArray(modifiers.conditions)
         json.functions = comfuncs.ensureArray(modifiers.functions)
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