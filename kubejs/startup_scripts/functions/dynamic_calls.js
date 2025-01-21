/**
 * @typedef CallObject
 * @property {String} id
 * @property {Function[]} calls
 */

/**
 * @class DynamicCalls
 * @constructor
 */
function DynamicCalls() {
     
     /** @type {CallObject[]} */ this.signedCalls = []
     return this
}

DynamicCalls.prototype = {
     /**
      * Will overwrite any existing calls. Use carefully
      * @param {String[]|String} ids 
      * @param {?Function[]|Function} calls 
      */
     mutate: function(ids, calls) {
          var callArray = common.alwaysArray(calls)
          common.alwaysArray(ids).forEach(id => {
               this.signedCalls.filter(callObject => callObject.id != id)
               if (calls != null) this.signedCalls.push({id: id, calls: callArray})
          }) 
     },
     
     /**
      * Invokes all calls under any of the given ids
      * @param {String[]|String} ids 
      * @param {?} context 
      */
     invoke: function(ids, context) {
          this.signedCalls.forEach(signedCalls => {
              common.alwaysArray(ids).forEach(id => {
                  if (signedCalls.id == id) {
                      signedCalls.calls.forEach(call => call(context))
                  }
              })
          })
      }
}