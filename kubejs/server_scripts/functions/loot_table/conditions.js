function conditionRandomChance(chance) {
     return {
          condition: "minecraft:random_chance",
          chance: chance
     }
}

function conditionTableBonus(table, enchantment) {
     enchantment = comfuncs.notNull(enchantment, 'minecraft:fortune')
     return {
          chances: table,
          condition: "minecraft:table_bonus",
          enchantment: enchantment
     }
}

function conditionInverted(condition) {
     return {
          condition: "minecraft:inverted",
          term: condition
     }
}

function condSurvivesExplosion() {
     return {
          condition: "minecraft:survives_explosion"
     }
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

