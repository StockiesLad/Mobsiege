function getCommonFunctions() {
    var identifier = (mod, path) => {
        return mod + ':' + path
    }

    var modpack = (path) => {
        return identifier(global.modpackId, path)
    }

    var defaultNamespace = (path) => {
        if (!path.includes(':')) {
            if (path.includes('|')) 
                return comfuncs.modpack(path.replace('|', ''))
            if (path.includes('%'))
                return comfuncs.identifier('forge', path.replace('%', ''))
        }
        return path
    }

    var ensureArray = (possibleArray) => Array.isArray(possibleArray) ? possibleArray : [possibleArray]

    var ensureArraySuper = (possibleArray, child) => Array.isArray(child) ? possibleArray : [possibleArray]

    var isEven = (number) => number % 2 == 0
    var isOdd = (number) => !isEven(number)

    var unifiedCall = (call, arrayInvokeParams) => {
        arrayInvokeParams.forEach(invokeParams => call(invokeParams))
    }

    var addSignedCalls = (ids, calls) => {
        var callArray = ensureArray(calls)
        ensureArray(ids).forEach(id => {
            if (!global.signedCalls.includes(id))
                global.signedCalls.push({id: id, calls: callArray})
            else {
                global.signedCalls.get(id).calls = global.signedCalls.get(id).calls.concat(callArray)
            }
        })
        
    }
    
    var invokeSignedCalls = (ids, context) => {
        global.signedCalls.forEach(signedCalls => {
            ensureArray(ids).forEach(id => {
                if (signedCalls.id == id) {
                    signedCalls.calls.forEach(call => {
                        if (context != null)
                            call(context)
                        else call()
                    })
                }
            })
           
        })
    }

    var interlaceString = (string, interlaces) => {
        ensureArray(interlaces).forEach(interlace => string = string = string.replace('${' + interlace.name + '}', interlace.value))
        return string
    }

    var interlace = (name, value) => {
        return {name: name, value: value}
    }

    var regexAIO = (strings, interlaces, execute) => {
        ensureArray(strings).forEach(string => {
            execute(interlaceString(string, interlaces))
        })
    }

    // default interlace is ${entry}
    var regexEach = (strings, interlaces, execute) => {
        interlaces.forEach(strInterlace => {
            regexAIO(strings, interlace('entry', strInterlace), execute)
        })
    }

    var forEasy = (max, call) => {
        for (var i = 0; i < max; i++)
            call(i)
    }

    var iterate = (objects, call) => {
        objects.forEach(object => call(object))
    }

    var quickerate = (array, call) => {
       forEasy(array.length, i => call(array[i], i))
    }

    var diff = (a, b) => {
        return a > b ? a - b : b - a
    }

    var merge = (arrays) => {
        var parent = []
        arrays.forEach(array => parent = parent.concat(array))
        return parent
    }

    var incorpHandledValues = (parent, children, handle) => {
        ensureArray(children).forEach(child => parent.push(handle(child)))
        return parent
    }

    var incorp = (parent, children) => {
        return incorpHandledValues(parent, children, value => value)
    }

    var handleValues = (values, handle) => {
        return incorpHandledValues([], values, handle)
    }

    var defineProperty = (struct, key, value) => {
        //Object.defineProperty(struct, key, {value: value, writable: true, enumerable: true})
        struct[key] = value
        return struct
    }

    var defineProperties = (struct, keys, values) => {
        keys = ensureArray(keys)
        values = ensureArray(values)

        if (keys.length == 1 && values.length > 1)
            values.forEach(value => defineProperty(struct, keys[0], value))
        else if (keys.length > 1 && values.length == 1)
            keys.for(key => defineProperty(struct, key, values[0]))
        else if (keys.length == values.length)
            forEasy(keys.length, i => defineProperty(struct, keys[i], values[i]))

        return struct
    }
    
    var incorpHandledProperties = (parent, children, handle) => {
        ensureArray(children).forEach(child => {
            if (child != null) {
                for (var key in children) {
                    if (key != null)
                        defineProperty(parent, key, handle(children[key]))
                    else if (global.debug) console.info(`[Mobsiege@incorpHandledProperties]: Unable to define property: parent=${parent}, object=${child}, key=${key}, value=${oldValue}`)
                }
            } else if (global.debug) console.info(`[Mobsiege@incorpHandledProperties]: Unable to access property: parent=${parent}, object=${child}`)
        })
        return parent
    }

    var incorpProperties = (parent, children) => {
        return incorpHandledProperties(parent, children, oldValue => oldValue)
    }

    var handleProperties = (struct, handle) => {
        return incorpHandledProperties({}, struct, handle)
    }

    var dummify = (functions) => {
        return handleProperties(functions, value => () => {})
    }

    var rotate = (num, size) => {
        var index = num
        while (index >= size)
            index = index - size
        return index
    }

    var hide = (items) => {
        incorp(global.hiddenItems, ensureArray(items))
    }

    var emptyFunc = () => {}

    var invoker = (calls) => {
        return (funcName) => {
            var called  = false
            for (var key in calls)
                if (key == funcName) {
                    called = true
                    return calls[key]
                }                
            if (!called && global.debug) console.info(`[comfuncs.abstractFunc]: Function "${funcName}" is not present in "${calls}"`)
            return invoker({})
        }
    }
    
    return {
        identifier: identifier,
        modpack: modpack,
        defaultNamespace: defaultNamespace,
        ensureArray: ensureArray,
        ensureArraySuper: ensureArraySuper,
        isEven: isEven,
        isOdd: isOdd,
        unifiedCall: unifiedCall,
        addSignedCalls: addSignedCalls,
        invokeSignedCalls: invokeSignedCalls,
        interlaceString: interlaceString,
        interlace: interlace,
        regexAIO: regexAIO,
        regexEach: regexEach,
        forEasy: forEasy,
        iterate: iterate,
        quickerate: quickerate,
        diff: diff,
        merge: merge,
        incorpHandledValues: incorpHandledValues,
        incorp: incorp,
        handleValues: handleValues,
        defineProperty: defineProperty,
        defineProperties: defineProperties,
        incorpHandledProperties: incorpHandledProperties,
        incorpProperties: incorpProperties,
        handleProperties: handleProperties,
        dummify: dummify,
        rotate: rotate,
        hide: hide,
        emptyFunc: emptyFunc,
        invoker: invoker
    }
}