function getSoundFunctions() {
     var accessMap = (call) => {
         global.soundMap.forEach(handle => call(handle))
     }

     return {
         accessMap: accessMap
     }
 }