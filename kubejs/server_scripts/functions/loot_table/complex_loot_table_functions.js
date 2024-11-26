function getComplexLootTableFunctions(event) {
     var replaceBlockDrop = (oldDrop, newDrop, blocks) => comfuncs.ensureArray(blocks).forEach(block => event.addBlockLootModifier(block).replaceLoot(oldDrop, newDrop))

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