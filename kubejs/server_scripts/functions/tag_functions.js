function getTagFunctions(event) {
    var of = (resourceLocation) => {
        return '#' + resourceLocation
    }

    var def = (path) => {
        return of(comfuncs.def(path))
    }

    var replaceTag = (item, removedTag, addedTag) => {
        event.remove(item, removedTag)
        event.add(item, addedTag)
    }

    var replaceItem = (tag, removeItem, addedItem) => {
        event.remove(tag, removeItem)
        event.add(tag, addedItem)
    }

    var handle = (tag, addArray, removeArray) => {
        if (addArray != null)
            event.add(tag, addArray)
        if (removeArray != null)
            event.remove(tag, removeArray)
    }

    var unifiedHandle = (arrayInvokeParams) => {
        comfuncs.unifiedCall(
            invokeParams => handle(comfuncs.def(invokeParams[0]), invokeParams[1], invokeParams[2]), 
            arrayInvokeParams
        )
    }

    var unifiedAdd = (arrayInvokeParams) => {
        comfuncs.unifiedCall(
            invokeParams => event.add(comfuncs.def(invokeParams[0]), invokeParams[1]), 
            arrayInvokeParams
        )
    }

    var unifiedRemove = (arrayInvokeParams) => {
        comfuncs.unifiedCall(
            invokeParams => event.remove(comfuncs.def(invokeParams[0]), invokeParams[1]), 
            arrayInvokeParams
        )
    }

    var unifiedReplaceTag = (arrayInvokeParams) => {
        comfuncs.unifiedCall(
            invokeParams => replaceTag(invokeParams[0], invokeParams[1], invokeParams[2]), 
            arrayInvokeParams
        )
    }

    var unifiedReplaceItem = (arrayInvokeParams) => {
        comfuncs.unifiedCall(
            invokeParams => replaceItem(comfuncs.def(invokeParams[0]), invokeParams[1], invokeParams[2]), 
            arrayInvokeParams
        )
    }

    return {
        of: of,
        def: def,
        replaceTag: replaceTag,
        replaceItem: replaceItem,
        handle: handle,
        unifiedHandle: unifiedHandle,
        unifiedAdd: unifiedAdd,
        unifiedRemove: unifiedRemove,
        unifiedReplaceTag: unifiedReplaceTag,
        unifiedReplaceItem: unifiedReplaceItem
    }
}