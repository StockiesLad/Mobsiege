global.debug = true
global.modpackId = 'mobsiege'
global.hiddenItems = []
//global.signedCalls = []

const commaths = getMathFunctions()
const comfuncs = getCommonFunctions()

//Function groups that require params can be accessed with null but you have to be careful to not invoke any functions that require them.
global.functions = {
    math: commaths,
    sound: getSoundFunctions(),
    common: getCommonFunctions
}