function funcFortune(bonusFormula) {
     return {
         function: "minecraft:apply_bonus",
         enchantment: "minecraft:fortune",
         formula: bonusFormula.formula,
         parameters: bonusFormula.parameters
     }
 }

function functionSlab(block) {
  return {
    add: false,
    conditions: [
      {
        block: block,
        condition: "minecraft:block_state_property",
        properties: {
          type: "double"
        }
      }
    ],
    count: 2.0,
    function: "minecraft:set_count"
  }
}

 function funcExplosionDecay() {
     return {function: "minecraft:explosion_decay"}
 }