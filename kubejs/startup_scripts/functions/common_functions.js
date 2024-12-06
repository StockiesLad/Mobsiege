const ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')

function getCommonFunctions(storage) {
    if (storage == null)
        storage = global.storage
    if (storage['signedCalls'] == null)
        storage.signedCalls = []

    var identifier = (mod, path) => {
        return mod + ':' + path
    }

    var packDef = (path) => {
        return identifier(global.modpackId, path)
    }

    var def = (path) => {
        if (!path.includes(':')) {
            if (path.includes('|')) 
                return packDef(path.replace('|', ''))
            if (path.includes('%'))
                return identifier('forge', path.replace('%', ''))
        }
        return path
    }

    var ensureArray = (possibleArray) => Array.isArray(possibleArray) ? possibleArray : [possibleArray]

    var ensureArraySuper = (possibleArray, child) => Array.isArray(child) ? possibleArray : [possibleArray]

    var unifiedCall = (call, arrayInvokeParams) => {
        arrayInvokeParams.forEach(invokeParams => call(invokeParams))
    }

    var addSignedCalls = (ids, calls) => {
        var callArray = ensureArray(calls)
        ensureArray(ids).forEach(id => {
            if (!storage.signedCalls.includes(id))
                storage.signedCalls.push({id: id, calls: callArray})
            else {
                storage.signedCalls.get(id).calls = storage.signedCalls.get(id).calls.concat(callArray)
            }
        })
        
    }
    
    var invokeSignedCalls = (ids, context) => {
        storage.signedCalls.forEach(signedCalls => {
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
        ensureArray(interlaces).forEach(interlace => string = string.replace('${' + interlace.name + '}', interlace.value))
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
        ensureArray(interlaces).map(strings).forEach(interlace => interlace.forEach(str => execute(str)))
        /*ensureArray(interlaces).forEach(str => {
            regexAIO(strings, interlace('entry', str), execute)
        })*/
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
                for (var key in child) {
                    if (key != null)
                        defineProperty(parent, key, handle(child[key]))
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

    var expand = (event, struct) => {
        struct = struct(event)
        if (event != null) 
            struct = comfuncs.incorpProperties(struct, event)
        return struct
    }

    var functionalIf = (condition, call, elseCall) => {
        if (condition)
            return call()
        else if (elseCall != null)
            return elseCall()
   }

   var functionalTryCatch = (run, def, insure) => {
        try {
            return run()
        }
        catch (err) {
            if (insure != null)
                return insure()
        }
        return def
   }

   var functionalObject = (object) => object

   var functionalVar = (object, handle) => handle(object)

   var notNull = (object, insuredValue) => {
        if (object == null)
            object = insuredValue
        return object
   }

   var resourceLocation = (namespace, path) => {
        if (path == null) {
            namespace = namespace.split(':', '')
            return new ResourceLocation(namespace[0], namespace[1])
        } return new ResourceLocation(namespace, path)

    }

    var packLocation = (path) => resourceLocation(global.modpackId, path)

    return {
        storage: storage,
        identifier: identifier,
        packDef: packDef,
        def: def,
        ensureArray: ensureArray,
        ensureArraySuper: ensureArraySuper,
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
        hide: hide,
        emptyFunc: emptyFunc,
        invoker: invoker,
        expand: expand,
        functionalIf: functionalIf,
        functionalTryCatch: functionalTryCatch,
        functionalObject: functionalObject,
        functionalVar: functionalVar,
        notNull: notNull,
        resourceLocation: resourceLocation,
        packLocation: packLocation
    }
}