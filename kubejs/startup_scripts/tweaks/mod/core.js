Platform.mods.kubejs.name = 'Mobsiege'

const SoundType = Java.loadClass('net.minecraft.world.level.block.SoundType')
const SoundEvents = Java.loadClass('net.minecraft.sounds.SoundEvents')

const Monster = Java.loadClass('net.minecraft.world.entity.monster.Monster')
const TrialsMobs = Java.loadClass('net.salju.trialstowers.init.TrialsMobs')
const TCoreEntities = Java.loadClass('cofh.thermal.core.init.registries.TCoreEntities')
const Blitz = Java.loadClass('cofh.thermal.core.common.entity.monster.Blitz')

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
	event.create(comfuncs.modpack('orb_of_thermoregulation')).unstackable();
});

StartupEvents.modifyCreativeTab('minecraft:tools_and_utilities', event => {
    comfuncs.regexEach(
        ['minecraft:{name}_sword', 'minecraft:{name}_pickaxe', 'minecraft:{name}_axe', 'minecraft:{name}_shovel', 'minecraft:{name}_hoe'],
        ['wooden', 'stone'], 
        output => {
            event.remove({output: output})
            comfuncs.hide(output)
        }
    )
})

BlockEvents.modification(event => {
    global.functions.sound.invoke('setSoundType', {event: event})
    event.modify('aether:cold_aercloud', block => block.properties.isValidSpawn((state, blockGetter, blockPos, spacePlacement, entityType) => true))
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

EntityJSEvents.spawnPlacement(event => {
    var handle = (entity, overworldArgs) => event.replace(entity, "on_ground", "motion_blocking_no_leaves", (entityType, levelAccessor, spawntype, blockPos, randomSource) => {
        var level = levelAccessor.level
        var blockId = level.getBlock(blockPos.below())
        if (level.dimension == 'aether:the_aether') {
            return blockPos.getY() >= 100 && !(blockId == 'aether:golden_aercloud'|| blockId == 'aether_genesis:green_aercloud' || 
                blockId == 'aether_genesis:purple_aercloud' || blockId == 'aether_redux:blighted_aercloud', blockId == 'deep_aether:chromatic_aercloud')
        } else if (overworldArgs != null && level.dimension == 'minecraft:overworld') {
            return overworldArgs(entityType, levelAccessor, spawntype, blockPos, randomSource)
        } else return false
    })

    handle(TrialsMobs.BREEZE.get(), (entityType, levelAccessor, spawntype, blockPos, randomSource) => Monster.checkMonsterSpawnRules(entityType, levelAccessor, spawntype, blockPos, randomSource))
    handle(TCoreEntities.BLITZ.get(), (entityType, levelAccessor, spawntype, blockPos, randomSource) => Blitz.canSpawn(entityType, levelAccessor, spawntype, blockPos, randomSource))
})
  
