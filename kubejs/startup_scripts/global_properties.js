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

    fine_ash: 'supplementaries:ash',
    poor_grade_charcoal: "poor_grade_charcoal",
    low_grade_charcoal: "low_grade_charcoal",
    medium_grade_charcoal: 'minecraft:charcoal',
    coal: 'minecraft:coal',
    good_grade_charcoal: "good_grade_charcoal",
    high_grade_charcoal: "high_grade_charcoal",
    alchemical_coal: 'projecte:alchemical_coal',

    mud_ball: 'mud_ball',
    wet_mud_brick: 'wet_mud_brick',
    dry_mud_brick: 'dry_mud_brick',
    mud_brick: 'mud_brick',

    aether_mud_ball: 'aether_mud_ball',
    wet_aether_mud_brick: 'wet_aether_mud_brick',
    dry_aether_mud_brick: 'dry_aether_mud_brick',
    aether_mud_brick: 'aether_mud_brick',

    packed_ash: 'packed_ash',
    ash_clay: 'ash_clay',
    ash_clay_ball: 'ash_clay_ball',
    wet_ash_clay_brick: 'wet_ash_clay_brick',
    dry_ash_clay_brick: 'dry_ash_clay_brick',

    clay_ball: 'minecraft:clay_ball',
    wet_clay_brick: 'notreepunching:clay_brick',
    dry_clay_brick: 'dry_clay_brick',

    silt_ball: 'twigs:silt_ball',
    wet_silt_brick: 'wet_silt_brick',
    dry_silt_brick: 'dry_silt_brick',

    holysilt_ball: 'holysilt_ball',
    wet_holysilt_brick: 'wet_holysilt_brick',
    dry_holysilt_brick: 'dry_holysilt_brick',
    holysilt_brick: 'holysilt_brick',
    holysilt_bricks: 'holysilt_bricks',
    holysilt_brick_stairs: 'holysilt_brick_stairs',
    holysilt_brick_slab: 'holysilt_brick_slab',
    holysilt_brick_wall: 'holysilt_brick_wall',

    mortar: 'primalstage:sandy_clay_compound',
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
    return comfuncs.handleProperties(entries, entry => {
        if (!entry.includes(':'))
            return comfuncs.packDef(entry)
        else return entry
    })
}