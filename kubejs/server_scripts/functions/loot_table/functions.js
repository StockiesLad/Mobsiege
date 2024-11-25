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