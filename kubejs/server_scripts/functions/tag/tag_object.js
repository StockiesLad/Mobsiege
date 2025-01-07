/**
 * An object wrapper to extend the tag event with further functions
 * @class TagObject
 * @constructor
 * @param {Internal.TagEventJS} event
 */
function TagObject(event) {
     this.event = event
     return this
}

TagObject.prototype = {
     add: function(tag, entries) {
          this.event.add(tag, entries)
          return this
     },

     remove: function(tag, entries) {
          this.event.remove(tag, entries)
          return this
     },

     getEntriesOfTags: function(tags) {
          return getEntriesOfTags(this.event, tags)
     },

     getIdsOfTags: function(tags) {
          return getIdsOfTags(this.event, tags)
     },

     switchTagsUniformly: function(entry, oldTag, newTag) {
          switchTagsUniformly(this.event, entry, oldTag, newTag)
          return this
     },

     modifyTagsUniformly: function(tag, oldEntries, newEntries) {
          modifyTagsUniformly(this.event, tag, oldEntries, newEntries)
          return this
     },

     addEntriesRespectively: function(compressedParams) {
          addEntriesRespectively(this.event, compressedParams)
          return this
     },

     removeEntriesRespectively: function(compressedParams) {
          removeEntriesRespectively(this.event, compressedParams)
          return this
     },

     switchTagsRespectively: function(compressedParams) {
          switchTagsRespectively(this.event, compressedParams)
          return this
     },

     modifyTagsRespectively: function(compressedParams) {
          modifyTagsRespectively(this.event, compressedParams)
          return this
     }
}

////////REQUIRES EVENT////////

function getEntriesOfTags(event, tags) {
     var entries = []
     comfuncs.ensureArray(tags).forEach(tag => {
         entries = entries.concat(event.get(tag).getObjectIds().toArray())
     })
 
     return entries
 }
 
function getIdsOfTags(event, tags) {
     return getEntriesOfTags(event, tags).map(loc => loc.toString())
}
 
function switchTagsUniformly(event, entries, oldTags, newTags) {
     comfuncs.ensureArray(entries).forEach(entry => {
         comfuncs.ensureArray(oldTags).forEach(oldTag => event.remove(oldTag, entry))
         comfuncs.ensureArray(newTags).forEach(newTag => event.remove(newTag, entry))
     })
}
 
function modifyTagsUniformly(event, tags, oldEntries, newEntries) {
     comfuncs.ensureArray(tags).forEach(tag => {
         event.remove(tag, oldEntries)
         event.add(tag, newEntries)
     })
}
 
function addEntriesRespectively(event, compressedParams) {
     comfuncs.unifiedCall(
         individualParams => event.add(comfuncs.def(individualParams[0]), individualParams[1]), 
         compressedParams
     )
}
 
function removeEntriesRespectively(event, compressedParams) {
     comfuncs.unifiedCall(
         individualParams => event.remove(comfuncs.def(individualParams[0]), individualParams[1]), 
         compressedParams
     )
}
 
function switchTagsRespectively(event, compressedParams) {
     comfuncs.unifiedCall(
         individualParams => switchTagsUniformly(event, individualParams[0], individualParams[1], individualParams[2]), 
         compressedParams
     )
}
 
 
function modifyTagsRespectively(event, compressedParams) {
     comfuncs.unifiedCall(
         individualParams => modifyTagsUniformly(event, individualParams[0], individualParams[1], individualParams[2]), 
         compressedParams
     )
}