global.debug = true
global.modpackId = 'mobsiege'
global.hiddenItems = []

const maths = new MathHelper()
const common = new CommonHelper()
const stacks = new StackHelper()

/** @type {MathHelper} */ global.mathHelper = maths
/** @type {CommonHelper} */ global.commonHelper = common
/** @type {StackHelper} */ global.stackHelper = stacks

/**
 * @typedef {Object} TypedEntry
 * @property {string} id
 * @property {string} type
 * @property {boolean} registerable
 * @property {boolean} [unstackable]
 * @property {number} [maxDamage]
 * @property {number} [burnTime]
 * @property {hardness} [hardness]
 * @property {resistance} [resistance]
 * @property {string} [toolType]
 * @property {string} [sound]
 * @property {string[]} [tags]
 * 
 * @property {any} [extra]
 */

const ITEM = '{ITEM}';
const BLOCK = '{BLOCK}';

const typedContent = formatContent({
    thermoregulator: {id: 'orb_of_thermoregulation', unstackable: true},
    gravitium: 'gravitium_alloy',
    gravitium_block: simpleBlock('gravitium_alloy_block', 'METAL', 5, 6, ['mineable/pickaxe', 'needs_diamond_tool']),

    pointed_flint: 'pointed_flint',
    flint_sword: {toolType: 'sword', maxDamage: 50, tags: 'forge:tools/swords'},
    flint_saw: {toolType: 'axe', maxDamage: 30, tags: 'notreepunching:saws'},

    campfire_rock: simpleBlock('', 'STONE', 1, 1, ['mineable/pickaxe', 'needs_stone_tool']),

    fine_ash: 'supplementaries:ash',
    poor_grade_charcoal: {burnTime: 400},
    low_grade_charcoal: {burnTime: 800},
    medium_grade_charcoal: 'minecraft:charcoal',
    good_grade_charcoal: {burnTime: 3200},
    high_grade_charcoal: {burnTime: 6400},

    coal: 'minecraft:coal',
    alchemical_coal: 'projecte:alchemical_coal',

    holy_pebble: unregistered('holy_pebble'),
    sand_dust: 'primalstage:sand_dust',
    end_dust: 'end_dust',
    quicksoil_dust: 'quicksoil_dust',
    soulsand_dust: 'thermal_extra:soul_sand_dust',

    mud_ball: 'mud_ball',
    wet_mud_brick: 'wet_mud_brick',
    dry_mud_brick: 'dry_mud_brick',
    mud_brick: 'mud_brick',

    aether_mud_ball: 'aether_mud_ball',
    wet_aether_mud_brick: 'wet_aether_mud_brick',
    dry_aether_mud_brick: 'dry_aether_mud_brick',
    aether_mud_brick: 'aether_mud_brick',

    packed_ash: unregistered('packed_ash'),
    ash_clay: unregistered('ash_clay'),
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
    holysilt_bricks: simpleBlock('', 'STONE', 2, 6, ['mineable/pickaxe', 'needs_stone_tool']),
    holysilt_brick_stairs: unregistered('holysilt_brick_stairs'),
    holysilt_brick_slab: unregistered('holysilt_brick_slab'),
    holysilt_brick_wall: unregistered('holysilt_brick_wall'),

    mortar: 'primalstage:sandy_clay_compound',
    packed_mortar: simpleBlock('', 'GRAVEL', 0.6, 0.6, ['mineable/shovel', 'needs_stone_tool']),
    wet_mortar_brick: 'wet_mortar_brick',
    dry_mortar_brick: 'dry_mortar_brick',

    cement_compound: 'cement_mixture',
    packed_cement: simpleBlock('', 'GRAVEL', 0.8, 0.8, ['mineable/shovel', 'needs_iron_tool']),
    wet_cement_brick: 'wet_cement_brick',
    dry_cement_brick: 'dry_cement_brick',
    fire_brick: '',
    fire_brick_block: simpleBlock('fire_bricks', 'STONE', 1.5, 5, ['mineable/pickaxe', 'needs_iron_tool']),

    corpstone: simpleBlock('', 'NETHERRACK', 0.4, 0.4, ['mineable/pickaxe', 'needs_stone_tool']),
    decapitated_debris: simpleBlock('', 'SCULK', 0.5, 0.5, ['mineable/axe', 'needs_stone_tool'], [1, 0, 1, 15, 12, 15]),

    glowstone_chipset: 'glowstone_chipset',
    infernal_chipset: 'infernal_chipset',
    pulsating_chipset: 'pulsating_chipset',
    lapis_lazuli_chipset: 'lapis_lazuli_chipset',
    emerald_chipset: 'emerald_chipset',
    netherite_chipset: 'netherite_chipset',
    void_chipset: 'void_chipset',

    //Add aether ores here

    heavy_obsidian_ingot: '',

    osmium_ore: defBlock('boo/{}'),
    deepslate_osmium_ore: defBlock('boo/{}'),

    deepslate_cobalt_ore: defBlock('tconstruct/{}'),
    end_cobalt_ore: defBlock('tconstruct/{}'),

    /*raw_tungsten: '',
    tungsten_ingot: '',
    tungsten_ore: defBlock(),
    deepslate_tungsten_ore: defBlock(),
    nether_tungsten_ore: defBlock(),
    end_tungsten_ore: defBlock(),

    raw_magnesium: '',
    magnesium_ingot: '',
    magnesium_ore: defBlock(),
    deepslate_magnesium_ore: defBlock(),
    nether_magnesium_ore: defBlock(),
    end_magnesium_ore: defBlock(),

    raw_boron: '',
    boron_ingot: '',
    boron_ore: defBlock(),
    deepslate_boron_ore: defBlock(),
    nether_boron_ore: defBlock(),
    end_boron_ore: defBlock(),

    raw_titanium: '',
    titanium_ingot: '',
    titanium_ore: defBlock(),
    deepslate_titanium_ore: defBlock(),
    nether_titanium_ore: defBlock(),
    end_titanium_ore: defBlock(),

    raw_vanadium: '',
    vanadium_ingot: '',
    vanadium_ore: defBlock(),
    deepslate_vanadium_ore: defBlock(),
    nether_vanadium_ore: defBlock(),
    end_vanadium_ore: defBlock(),

    raw_antimony: '',
    antimony_ingot: '',
    antimony_ore: defBlock(),
    deepslate_antimony_ore: defBlock(),
    nether_antimony_ore: defBlock(),
    end_antimony_ore: defBlock(),

    raw_tellarium: '',
    tellarium_ingot: '',
    tellarium_ore: defBlock(),
    deepslate_tellarium_ore: defBlock(),
    nether_tellarium_ore: defBlock(),
    end_tellarium_ore: defBlock(),

    fluorite_chunk: '',
    fluorite_powder: '',
    fluorite_ore: defBlock(),
    deepslate_fluorite_ore: defBlock(),
    nether_fluorite_ore: defBlock(),
    end_fluorite_ore: defBlock(),

    phosphorite_chunk: '',
    phosphorite_powder: '',
    phosphorite_ore: defBlock(),
    deepslate_phosphorite_ore: defBlock(),
    nether_phosphorite_ore: defBlock(),
    end_phosphorite_ore: defBlock(),*/
})

global.content = typedContent.map(v => v.id);
const content = global.content;


Object.freeze(typedContent);
Object.freeze(content);

/**
 * @param {String} id 
 */
function isType(id) {
    return id.includes('{') && id.includes('}');
}

/**
 * @param {String} id 
 */
function getType(id) {
    var type = ITEM;
    if (typeof id === 'string') {
        const parts = id.split('@');
        if (!(parts.length < 2 || !isType(parts[1])))
            type = parts[1].trim();
    }
    return type.replace(/[{}]/g, '').toLowerCase();
}

/**
 * @param {String} entry 
 * @param {String} type
 * @returns 
 */
function typedId(entry, type) {
    entry = common.insure(entry, '');
    if (typeof entry === 'string')
        return {type: type, id: entry, registerable: true};
    else {
        entry.type = type;
        entry.id = common.insure(entry.id, '');
        entry.registerable = common.insure(entry.registerable, true);
        return entry;
    }
        
}

/**
 * @param {String} id 
 * @returns 
 */
function block(id) {
    return typedId(id, 'block');
}

/**
 * @param {String} id 
 * @param {String} sound
 * @param {Number} hardness
 * @param {Number} resistance
 * @param {String} blockTags
 * @param {Number[]} [hitbox]
 * @returns 
 */
function simpleBlock(id, sound, hardness, resistance, blockTags, hitbox) {
    var value = typedId({id: id, sound: sound, hardness: hardness, resistance: resistance, tags: common.alwaysArray(blockTags)}, 'block');
    if (hitbox)
        value.hitbox = hitbox;
    return value;
}

/**
 * @param {String} id 
 * @returns 
 */
function defBlock(id) {
    return typedId({id: id, sound: 'STONE', hardness: 1, resistance: 1, tags: ['mineable/pickaxe', 'needs_stone_tool']}, 'block');
}

/**
 * @param {String} id 
 * @returns 
 */
function item(id) {
    return typedId(id, 'item');
}

/**
 * @param {string} id 
 * @returns 
 */
function unregistered(id) {
    return {id: id, registerable: false}
}

/**
 * @template T
 * @param {T} entries
 * @returns {FunctionalObject<Record<keyof T, TypedEntry>> & Record<keyof T, TypedEntry>}
 */
function formatContent(entries) {
    for (var key in entries) {
        var val = entries[key];
        /** @type {TypedEntry} */ var entry;

        if (typeof val === 'string')
            entry = typedId(val, getType(val));
        else if (typeof val === 'object' && val !== null && !val.type)
            entry = typedId(val, getType(val.id));
        else entry = val;

        if (entry['id'] == null || entry.id === '')
            entry.id = key
        if (entry.id.includes('{}'))
            entry.id = entry.id.replace('{}', key)
        if (entry.id.includes(':'))
            entry.registerable = false;
        else entry.id = stacks.packId(entry.id);
        entries[key] = entry;
    }

    let typed = /** @type {Record<string, TypedEntry>} */ (entries);
    return common.functionalObject(typed);
}