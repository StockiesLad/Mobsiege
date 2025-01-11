/**
 * @class CommonHelper
 * @constructor
 */
function CommonHelper() {
     return this
}

CommonHelper.prototype = {
     //Imports
     /**
      * @param {String} clazz 
      */
     loadLocal: function(clazz) {
          return Java.loadClass(`com.stockieslad.mobsiege.${clazz}`)
     },

     //Method
     /**
      * @returns {DynamicCalls}
      */
     createDynamicCalls: function() {
          return new DynamicCalls()
     },

     //String
     /**
      * @param {String[]|String} strings
      * @param {Array.<String, Object>[]} interlaces 
      * @returns {String[]|String}
      */
     interlaceString: function(strings, interlaces) {
          strings.map(string => {
               this.alwaysSquareArray(interlaces).forEach(interlace => string = string.replace('${' + interlace[0] + '}', interlace[1]))
               return string
          }) 
          return strings.length == 1 ? strings[0] : strings
     },

     //Arrays
     /**
      * @template T
      * @param {T[]} possibleArray 
      * @returns {T[]}
      */
     alwaysArray: function(possibleArray) {
          return Array.isArray(possibleArray) ? possibleArray : [possibleArray]
     },

     /**
      * @template T
      * @param {T[][]} possibleArray 
      * @returns {T[][]}
      */
     alwaysSquareArray: function(possibleArray) {
          return Array.isArray(possibleArray[0]) ? possibleArray : [possibleArray]
     },
 
     /**
      * @template T
      * @param {T[][]} arrays 
      * @returns {T[]}
      */
     unifyArrays: function(arrays) {
         var parent = []
         this.alwaysSquareArray(arrays).forEach(array => parent = parent.concat(array))
         return parent
     },

     //Object
     /**
      * @param {String[]} keys 
      * @param {Object[]} values 
      * @returns {Object} The original struct
      */
     addProperties: function(struct, keys, values) {
          keys = this.alwaysArray(keys)
          values = this.alwaysArray(values)
  
          if (keys.length == 1 && values.length > 1)
              values.forEach(value => struct[keys[0]] = value)
          else if (keys.length > 1 && values.length == 1)
              keys.forEach(key => struct[key] = values[0])
          else if (keys.length == values.length) for (var i = 0; i < keys.length; i++) {
               struct[keys[i]] = values[i]
          }
  
          return struct
     },

     /**
      * @template T
      * @param {T} structs 
      * @param {Function} handle 
      * @returns {T} A new object with different values
      */
     mapProperties: function(struct, handle) {
          var parent = {}
          if (struct != null) {
               for (var key in struct) {
                    if (key != null)
                         parent[key] = handle(struct[key])
                    else if (global.debug) console.info(`Unable to define property: parent=${parent}, object=${struct}, key=${key}, value=${oldValue}`)
               }
          } else if (global.debug) console.info(`Unable to access property: parent=${parent}, object=${struct}`)
          return parent
     },

     /**
      * @template T
      * @param {Object[]} structs 
      * @return {T} An concatenated object
      */
     unifyStructs: function(structs) {
          var parent
          this.alwaysArray(structs).forEach(struct => {
               for (var key in struct)
                    parent[key] = struct[key]
          })
          return 
     },

     //Functional
     /**
      * @template T
      * @param {T} object 
      * @param {T} insuredValue 
      * @returns {T}
      */
     insure: function(object, insuredValue) {
          return object != null ? object : insuredValue
     },

     /**
      * @template T
      * @param {T} object 
      * @returns {T}
      */
     self: function(object) {
          return object
     },

     /**
      * @template T
      * @param {T} instance 
      * @param {Function} sideEffect 
      * @returns {T}
      */
     step: function(instance, sideEffect) {
          sideEffect()
          return instance;
     },
   
     /**
      * @param {Boolean} condition 
      * @param {Function} call 
      * @param {Function} elseCall 
      */
     inlinedIf: function(condition, call, elseCall) {
          return condition ? call() : elseCall()
     },
 
     inlinedTryCatch: function(run, def, insure) {
         try {
             return run()
         }
         catch (err) {
             if (insure != null)
                 return insure()
         }
         return def
     },

     /**
      * This is to substitute optional chaining as it is not supported by KubeJS
      * @param {Object} calls A struct containing all calls. NOT AN ARRAY!
      * @returns {Function} A function that will search for a call by string.
      */
     maybe: function(calls)  {
          return (funcName) => {
               var called  = false
               for (var key in calls) if (key == funcName) {
                    called = true
                    return calls[key]
               }                
               if (!called && global.debug) console.info(`Function "${funcName}" is not present in "${calls}"`)
               return this.maybe({})
          }
     }

}