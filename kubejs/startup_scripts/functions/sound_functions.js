function getSoundFunctions() {
     var invoke = (funcName, cxt) => {
        return global.soundMap.forEach(handle => handle.invoke(funcName)(cxt))
     }

     return {
         invoke: invoke
     }
 }