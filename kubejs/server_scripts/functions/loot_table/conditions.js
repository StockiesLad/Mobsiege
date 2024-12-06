function conditionRandomChance(chance) {
     return {
          condition: "minecraft:random_chance",
          chance: chance
     }
}

function conditionInverted (condition) {
     return {
          condition: "minecraft:inverted",
          term: condition
     }
}