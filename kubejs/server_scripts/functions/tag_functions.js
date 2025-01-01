function getTagFunctions(event) {
    var funcs = {}
    funcs.add = (tag, entries) => comfuncs.performSideEffect(funcs, () => event.add(tag, entries))
    funcs.remove = (tag, entries) => comfuncs.performSideEffect(funcs, () => event.remove(tag, entries))
    funcs.getEntriesOfTags = (tags) => getEntriesOfTags(event, tags)
    funcs.getIdsOfTags = (tags) => getIdsOfTags(event, tags)
    funcs.switchTagsUniformly = (entry, oldTag, newTag) => comfuncs.performSideEffect(funcs, () => switchTagsUniformly(event, entry, oldTag, newTag))
    funcs.modifyTagsUniformly = (tag, oldEntries, newEntries) => comfuncs.performSideEffect(funcs, () => modifyTagsUniformly(event, tag, oldEntries, newEntries))

    funcs.addEntriesRespectively = (compressedParams) => comfuncs.performSideEffect(funcs, () => addEntriesRespectively(event, compressedParams))
    funcs.removeEntriesRespectively = (compressedParams) => comfuncs.performSideEffect(funcs, () => removeEntriesRespectively(event, compressedParams))
    funcs.switchTagsRespectively = (compressedParams) => comfuncs.performSideEffect(funcs, () => switchTagsRespectively(event, compressedParams))
    funcs.modifyTagsRespectively = (compressedParams) => comfuncs.performSideEffect(funcs, () => modifyTagsRespectively(event, compressedParams))

    return funcs
}

function tag(id) {
    return '#' + id
}

function def(path) {
    return comfuncs.def(path)
}

function defTag(path) {
    return tag(def(path))
}

function pack(path) {
    return comfuncs.packDef(path)
}

function packTag(path) {
    return tag(pack(path))
}

function preferredItemId(tag) {
    return preferredStack(tag).getIdLocation().toString()
}

function preferredStack(tag) {
    return AlmostUnified.getPreferredItemForTag(tag)
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