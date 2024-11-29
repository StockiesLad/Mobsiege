function getTagFunctions(event) {
    var of = (resourceLocation) => {
        return '#' + resourceLocation
    }

    var def = (path) => {
        return of(comfuncs.def(path))
    }

    var preferredItem = (tag) => {
        return AlmostUnified.getPreferredItemForTag(tag).getIdLocation().toString()
    }

    var replaceTag = (item, removedTag, addedTag) => {
        event.remove(removedTag, item)
        event.add(addedTag, item)
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
        preferredItem: preferredItem,
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

function ofFluid(fluid, amount) {
    var stack
    if (fluid.includes('#'))
        stack = {fluid_tag: fluid.replace('#', '')}
    else stack = {fluid: fluid}
    if (amount != null)
        stack.amount = amount
    return stack
}