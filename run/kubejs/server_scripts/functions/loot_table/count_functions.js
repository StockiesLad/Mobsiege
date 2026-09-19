//Formulas
function formulaUniformBonus(bonusMultiplier) {
     return {
          formula: 'minecraft:uniform_bonus_count', 
          parameters: {bonusMultiplier: bonusMultiplier}
     }
}

function formulaBinomialBonus(extra, probability) {
     return {
          formula: 'minecraft:binomial_with_bonus_count', 
          parameters: {extra: extra, probability: probability}
     }
}

//Counts
function setCount(count, shouldAdd) {
     shouldAdd = common.insure(shouldAdd, false)
     return {
          function: "minecraft:set_count",
          count: count,
          add: shouldAdd
     }
}
 
function countUniform(min, max) {
     return {type: "minecraft:uniform", min: min, max: max}
}

function countBinomial(tries, probability) {
     return {
          type: "minecraft:binomial",
          n: tries,
          p: probability
     }
}
 
function countConstant(value) {
     return {
          type: "minecraft:constant", 
          value: value
     }
}
 
function countLimit(min, max) {
     return {
          function: "minecraft:limit_count",
          limit: {
               min: min,
               max: max
          }
     }
 }