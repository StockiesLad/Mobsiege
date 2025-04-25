/**
 * @class StackHelper
 * @constructor
 */
function StackHelper() {
     return this
}

StackHelper.prototype = {
     /**
      * @param {String} mod 
      * @param {String} path 
      * @returns {String}
      */
     identifier: function(mod, path) {
          return mod + ':' + path
     },

     /**
      * @param {String} namespace 
      * @param {?String} path 
      * @returns {String}
      */
     resource: function(namespace, path) {
          return path != null ? new ResourceLocation(namespace, path) : new ResourceLocation(namespace)
     },
  
     /**
      * @param {String} path 
      * @returns {String}
      */
     packId: function(path) {
          return this.identifier(global.modpackId, path)
     },

     /**
      * @param {String} path 
      * @returns {ResourceLocation}
      */
     packRes: function(path) {
          return this.resource(global.modpackId, path)
     },

     /**
      * @param {String} path 
      * @returns {String}
      */
     autoId: function(path) {
          if (!path.includes(':')) {
              if (path.includes('|')) 
                  return this.packId(path.replace('|', ''))
              if (path.includes('%'))
                  return this.identifier('forge', path.replace('%', ''))
          }
          return path
     },

     /**
      * @param {String} path 
      * @returns {String}
      */
     autoRes: function(path) {
          return this.resource(this.autoId(path))
     },

     /**
      * 
      * @param {(String|Internal.ItemStack)[]} items 
      */
     hide: function(items) {
          common.alwaysArray(items).forEach(item => {
               global.hiddenItems.push(item)
          })
     },

     soundMap: function(funcName, cxt) {
          return global.soundMap.forEach(handle => handle.invoke(funcName)(cxt))
     }
}