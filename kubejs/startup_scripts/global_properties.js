global.debug = true
global.modpackId = 'mobsiege'
global.hiddenItems = []
global.signedCalls = []

const comfuncs = getCommonFunctions()
const commaths = getMathFunctions()

//Function groups that require params can be accessed with null but you have to be careful to not invoke any functions that require them.
global.functions = {
    common: comfuncs,
    math: commaths,
    sound: getSoundFunctions(),
    
    tag: (event) => expand(event, getTagFunctions) ,
    lootTable: (event) => expand(event, getLootTableFunctions),
    recipe: (event) => expand(event, getRecipeFunctions)
}


function expand(event, struct) {
    struct = struct(event)
    if (event != null) 
        struct = comfuncs.incorpProperties(struct, event)
    return struct
}