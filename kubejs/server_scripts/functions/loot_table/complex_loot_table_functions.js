function getComplexLootTableFunctions(event) {
     var replaceBlockDrop = (oldDrop, newDrop, blocks) => comfuncs.ensureArray(blocks).forEach(block => event.addBlockLootModifier(block).replaceLoot(oldDrop, newDrop))
     var removeBlockDrop = (drop, blocks) => comfuncs.ensureArray(blocks).forEach(block => event.addBlockLootModifier(block).removeLoot(drop))

     var replaceBlockDrops = (arrayVariables) => {
          arrayVariables.forEach(vars => {
               replaceBlockDrop(vars[0], vars[1], vars[2])
          })
     }

     var removeBlockDrops = (arrayVariables) => {
          arrayVariables.forEach(vars => {
               replaceBlockDrop(vars[0], vars[1])
          })
     }

     return {
          replaceBlockDrop: replaceBlockDrop,
          removeBlockDrop: removeBlockDrop,
          replaceBlockDrops: replaceBlockDrops,
          removeBlockDrops: removeBlockDrops
     }
}