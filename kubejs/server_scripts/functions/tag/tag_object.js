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
     /**
      * Checks the insertions to see if that have been registered as a recipe. Makes debugging missing recipes way easier!
      * @param {Internal.TagEventJS} event
      */
     start: function(event) {
          this.event = event
     },

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

/**
 * @param {Internal.TagEventJS} event 
 * @param {(String, Internal.ResourceLocation)[]} tags 
 */
function getEntriesOfTags(event, tags) {
     var entries = []
     common.alwaysArray(tags).forEach(tag => entries = entries.concat(event.get(tag).getObjectIds().toArray()))
     return entries
 }
 
 /**
  * 
  * @param {Internal.TagEventJS} event 
  * @param {Array<String>} tags 
  * @returns {Array<String>}
  */
function getIdsOfTags(event, tags) {
     return getEntriesOfTags(event, tags).map(loc => loc.toString())
}

/**
 * @param {Internal.TagEventJS} event 
 * @param {(Internal.Item|String)[]} entries 
 * @param {String[]} oldTags 
 * @param {String[]} newTags 
 */
function switchTagsUniformly(event, entries, oldTags, newTags) {
     common.alwaysArray(entries).forEach(entry => {
         common.alwaysArray(oldTags).forEach(oldTag => event.remove(oldTag, entry))
         common.alwaysArray(newTags).forEach(newTag => event.remove(newTag, entry))
     })
}

/**
 * @param {Internal.TagEventJS} event 
 * @param {String[]} tags 
 * @param {(Internal.Item|String)[]} oldEntries 
 * @param {(Internal.Item|String)[]} newEntries 
 */
function modifyTagsUniformly(event, tags, oldEntries, newEntries) {
     common.alwaysArray(tags).forEach(tag => {
         event.remove(tag, oldEntries)
         event.add(tag, newEntries)
     })
}

/**
 * @param {Internal.TagEventJS} event 
 * @param {Object[][]} compressedParams 
 */
function addEntriesRespectively(event, compressedParams) {
     common.alwaysArray(compressedParams).forEach(params => event.add(def(params[0]), params[1]))
}

/**
 * @param {Internal.TagEventJS} event 
 * @param {Object[][]} compressedParams 
 */
function removeEntriesRespectively(event, compressedParams) {
     common.alwaysArray(compressedParams).forEach(params => event.remove(def(params[0]), params[1]))
}

/**
 * @param {Internal.TagEventJS} event 
 * @param {Object[][]} compressedParams 
 */
function switchTagsRespectively(event, compressedParams) {
     common.alwaysArray(compressedParams).forEach(params => switchTagsUniformly(event, params[0], params[1], params[2]))
}
 
/**
 * @param {Internal.TagEventJS} event 
 * @param {Object[][]} compressedParams 
 */
function modifyTagsRespectively(event, compressedParams) {
     common.alwaysArray(compressedParams).forEach(params => modifyTagsUniformly(event, params[0], params[1], params[2]))
}