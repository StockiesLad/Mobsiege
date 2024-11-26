function getComplexLootTableFunctions(event) {
     var replaceBlockDrop = (block, oldDrop, newDrop) => {
          event.addBlockLootModifier(block).replaceLoot(oldDrop, newDrop)
     }

     var replaceBlockDrops = (arrayVariables) => {
          arrayVariables.forEach(vars => {
               replaceBlockDrop(vars[0], vars[1], vars[2])
          })
     }

     return {
          replaceBlockDrop: replaceBlockDrop,
          replaceBlockDrops: replaceBlockDrops
     }
}