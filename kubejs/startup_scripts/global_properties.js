global.debug = true
global.modpackId = 'mobsiege'
global.hiddenItems = []
global.storage = {}

const commaths = getMathFunctions()
const comfuncs = getCommonFunctions()

//Function groups that require params can be accessed with null but you have to be careful to not invoke any functions that require them.
global.functions = {
    math: commaths,
    sound: getSoundFunctions(),
    common: getCommonFunctions
}

global.customImpl = addModpackId({
    thermoregulator: 'orb_of_thermoregulation',
    gravitium: 'gravitium_alloy',
    gravitium_block: 'gravitium_alloy_block',

    pointed_flint: 'pointed_flint',
    flint_sword: 'flint_sword',
    flint_saw: 'flint_saw',

    campfire_rock: 'campfire_rock',

    poor_grade_charcoal: "poor_grade_charcoal",
    low_grade_charcoal: "low_grade_charcoal",
    good_grade_charcoal: "good_grade_charcoal",
    high_grade_charcoal: "high_grade_charcoal",

    packed_ash: 'packed_ash',
    ash_clay: 'ash_clay',
    ash_clay_ball: 'ash_clay_ball',
    wet_ash_clay_brick: 'wet_ash_clay_brick',
    dry_ash_clay_brick: 'dry_ash_clay_brick',

    dry_clay_brick: 'dry_clay_brick',

    wet_silt_brick: 'wet_silt_brick',
    dry_silt_brick: 'dry_silt_brick',

    packed_mortar: 'packed_mortar',
    wet_mortar_brick: 'wet_mortar_brick',
    dry_mortar_brick: 'dry_mortar_brick',

    cement_compound: 'cement_mixture',
    packed_cement: 'packed_cement',
    wet_cement_brick: 'wet_cement_brick',
    dry_cement_brick: 'dry_cement_brick',
    fire_brick: 'fire_brick',
    fire_brick_block: 'fire_bricks',

    corpstone: 'corpstone',
    decapitated_debris: 'decapitated_debris'

})

function addModpackId(entries) {
    return comfuncs.handleProperties(entries, entry => comfuncs.packDef(entry))
}