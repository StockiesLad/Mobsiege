const tags = convert2tag({
     breaks_randomly: 'breaks_randomly',
     extra_flammability: 'carbonize/extra_flammability',
     leaves_extra_flammability: 'carbonize/extra_flammability_leaves',

     primitive_furnaces: '',
     soul_torches: '',
     temp_torches: 'torches/temp',

     consumable_igniters: 'igniters/consumable',
     damageable_igniters: 'igniters/consumable',

     string_primitive: 'string/primitive',

     planks : '&',
     fences : '&',
     walls: '&',
     
     bark: '',
     raw_logs: '',
     stripped_logs: '',
     hollow_logs: '',
     aether_logs: '',
     aether_planks: '',
     non_aether_logs: '',
     non_aether_planks: '',

     poor_grade_coal: 'coal/poor_grade',
     low_grade_coal: 'coal/low_grade',
     medium_grade_coal: 'coal/medium_grade',
     good_grade_coal: 'coal/good_grade',
     high_grade_coal: 'coal/high_grade',
     
     all_coal: 'coal/all',
     atleast_good_grade_coal: 'coal/atleast_good_grade',
     at_most_low_grade_coal: 'coal/at_most_low_grade',

     overworld_rocks: 'rocks/overworld',
     aether_rocks: 'rocks/aether',
     crying_obsidian: 'obsidian/crying',

     partial_organic: '',
     whole_organic: '',
     weak_stones: '%',
     mossy_stone: '%stone/mossy',
     mossy_cobblestone: '%cobblestone/mossy',

});

if (global.debug)
     console.info(tags)

/**
 * @template T
 * @param {T} ids 
 * @return {T}
 */
function convert2tag(ids) {
     var tags = {}
     for (var key in ids) {
          /** @type {string} */ let id = ids[key];
          id = id === '' ? key : id;

          tags[key] = tag(stacks.autoId(stacks.isInAutoForm(id) ? (id.length === 1 ? id + key : id) : `@${id}`));
     }
     return tags;
}


