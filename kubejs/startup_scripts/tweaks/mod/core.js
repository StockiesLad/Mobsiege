//Includes 'the_limit', 'forge' & 'minecraft'

Platform.mods.kubejs.name = 'The Limit'

const SoundType = Java.loadClass('net.minecraft.world.level.block.SoundType')
const SoundEvents = Java.loadClass('net.minecraft.sounds.SoundEvents')

const WART_COVERED_STONE = coveredStone(SoundEvents.WART_BLOCK_STEP)
const GRASS_COVERED_STONE = coveredStone(SoundEvents.GRASS_STEP)
const GRASS_COVERED_NETHERRACK = new SoundType(
    1.0,
    1.0,
    SoundEvents.NETHERRACK_BREAK,
    SoundEvents.GRASS_STEP,
    SoundEvents.NETHERRACK_PLACE,
    SoundEvents.NETHERRACK_HIT,
    SoundEvents.NETHERRACK_FALL
);

function coveredStone(step) {
    return new SoundType(
        1.0,
        1.0,
        SoundEvents.STONE_BREAK,
        step,
        SoundEvents.STONE_PLACE,
        SoundEvents.STONE_HIT,
        SoundEvents.STONE_FALL
    );
}

StartupEvents.registry('item', event => {
	event.create(global.REGULATOR).unstackable();
});

StartupEvents.modifyCreativeTab('minecraft:tools_and_utilities', event => {
    global.TOOLS.forEach(tool => {
        ['minecraft:wooden_', 'minecraft:stone_'].forEach(material => {
            var id = material + tool
            event.remove(id)
            global.HIDDEN_ITEMS.push(id)
        })
    })
})

BlockEvents.modification(event => {
    global.accessSoundMap(handle => handle.invoke('setSoundType', {event: event}))
})

WorldgenEvents.remove(event => {
    event.removeOres(props => {
        props.worldgenLayer = 'underground_ores'
        props.blocks = [
            'betternether:nether_redstone_ore', 
            'betternether:nether_lapis_ore',
            'cinderscapes:sulfur_ore',
            'mekanismaaa:glacio_tin_ore', 
            'mekanismaaa:mars_tin_ore', 
            'mekanismaaa:moon_tin_ore', 
            'mekanismaaa:glacio_lead_ore',
            'mekanismaaa:mercury_lead_ore',
            'mekanismaaa:venus_lead_ore',
            'biggerreactors:deepslate_uranium_ore',
            'biggerreactors:uranium_ore',
            'galosphere:deepslate_silver_ore',
            'galosphere:silver_ore',
            'silentgems:deepslate_silver_ore',
            'silentgems:raw_silver',
            'silentgems:silver_ore',
            'silentgems:deepslate_sapphire_ore',
            'silentgems:sapphire_end_ore',
            'silentgems:sapphire_nether_ore',
            'silentgems:sapphire_ore',
            'silentgems:deepslate_ruby_ore',
            'silentgems:ruby_end_ore',
            'silentgems:ruby_nether_ore',
            'silentgems:ruby_ore',

            //Removed in config
            'immersiveengineering:deepslate_ore_uranium', 
            'immersiveengineering:ore_uranium',
            'immersiveengineering:deepslate_ore_silver',
            'immersiveengineering:ore_silver',
            'immersiveengineering:deepslate_ore_nickel', 
            'immersiveengineering:ore_nickel',
            'immersiveengineering:deepslate_ore_lead',
            'immersiveengineering:ore_lead',
            'mekanism:deepslate_tin_ore', 
            'mekanism:tin_ore', 
            'mekanism:deepslate_lead_ore',
            'mekanism:lead_ore',
            'projectred_exploration:peridot_ore',
            'projectred_exploration:deepslate_peridot_ore',
            'projectred_exploration:deepslate_silver_ore',
            'projectred_exploration:silver_ore',
            'projectred_exploration:deepslate_sapphire_ore',
            'projectred_exploration:sapphire_ore',
            'projectred_exploration:deepslate_ruby_ore',
            'projectred_exploration:ruby_ore',
            'projectred_exploration:deepslate_tin_ore',
            'projectred_exploration:tin_ore',

            //Deprecated
            //'bluepower:zinc_deepslate',
            //'bluepower:zinc_ore',
            //'bluepower:silver_deepslate',
            //'bluepower:silver_ore',
            //'bluepower:sapphire_deepslate',
            //'bluepower:sapphire_ore',
            //'bluepower:ruby_deepslate',
            //'bluepower:ruby_ore',
        ]
    })
})
  
