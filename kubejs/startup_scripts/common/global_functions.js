global.ensureArray = (objects) => {
	return Array.isArray(objects) ? objects : [objects]
}

global.pushAll = (objects, subjects) => {
    objects = global.ensureArray(objects)
    global.ensureArray(subjects).forEach(subject => objects.push(subject))
    return objects;
}

global.compileArray = (objects, execute) => {
    return global.compileArrayWithParent([], objects, execute)
}

global.compileArrayWithParent = (parent, objects, execute) => {
    global.ensureArray(objects).forEach(element => parent.push(execute(element)))
    return parent
}

global.mutableValue = (value) => {
    return {value: value, writable: true, enumerable: true}
}

global.compileObject = (properties, execute) => {
    return compileObjectWithParent({}, properties, execute)
}

global.compileObjectWithParent = (parent, properties, execute) => {
    for (const [key, oldValue] of Object.entries(properties)) {
        Object.defineProperty(parent, key, global.mutableValue(execute(oldValue)))
    }
    return parent
}

global.compileOfObjects = (objects, execute) => {
    var primary = {}
    global.ensureArray(objects).forEach(object => global.compileObjectWithParent(primary, object, execute))
    return primary
}

global.appendResourceLocation = (mod, id) => {
    return mod + ':' + id
}

global.asModpackId = (id) => {
    return appendResourceLocation(global.MODPACK_ID, id)
}

global.iterateWithIndex = (objects, action) => {
    for (let i = 0; i < objects.length; i++)
        action(objects[i], i)
}

global.lambdaIf = (condition, actionIfTrue, actionIfFalse) => {
    if (condition)
        actionIfTrue()
    else if (actionIfFalse != null)
        actionIfFalse()
}

global.signedCall = (execute) => {
    execute(global.SIGNED_FUNCTIONS)
}