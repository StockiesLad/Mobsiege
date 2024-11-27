function funcFortune(bonusFormula) {
     return {
         function: "minecraft:apply_bonus",
         enchantment: "minecraft:fortune",
         formula: bonusFormula.formula,
         parameters: bonusFormula.parameters
     }
 }

 function funcExplosionDecay() {
     return {function: "minecraft:explosion_decay"}
 }

 function conditionMatchTool(toolTag) {
    return {
      condition: "minecraft:match_tool",
      predicate: {
        tag: toolTag
      }
    }
}

function conditionSilkTouch() {
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