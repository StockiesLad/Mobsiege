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
	event.create(comfuncs.packDef('orb_of_thermoregulation')).unstackable();
    event.create(comfuncs.packDef('advanced_fire_brick'))
    event.create(comfuncs.packDef('advanced_clay_compound'))
    event.create(comfuncs.packDef('gravitium_alloy'))
})

StartupEvents.registry("block", (event) => {
    event.create(comfuncs.packDef('advanced_fire_bricks'))
        //.material("stone")
        .soundType('STONE')
        .hardness(0.5)
        .resistance(0.2)
        .requiresTool(true)
        .tagBlock("mineable/pickaxe")
    event.create(comfuncs.packDef('gravitium_alloy_block'))
        .soundType('STONE')
        .hardness(2)
        .resistance(1)
        .requiresTool(true)
        .tagBlock("mineable/pickaxe")
        .tagBlock('needs_iron_tool')

})

BlockEvents.modification(event => {
    global.functions.sound.invoke('setSoundType', {event: event})
    event.modify('aether:cold_aercloud', block => block.properties.isValidSpawn((state, blockGetter, blockPos, spacePlacement, entityType) => true))
})

ItemEvents.modification(event => {
    var singleToBlockEfficiencyConst = 10/9

    var coal = 1600
    var coal_block = coal * 9 * singleToBlockEfficiencyConst

    var alchemical_coal = Math.floor((coal + coal_block) * 4 * singleToBlockEfficiencyConst)
    var alchemical_coal_block = Math.floor(alchemical_coal * 9 * singleToBlockEfficiencyConst)

    var mobius_fuel = Math.floor((alchemical_coal + alchemical_coal_block) * 4 * singleToBlockEfficiencyConst)
    var mobius_fuel_block = Math.floor(mobius_fuel * 9 * singleToBlockEfficiencyConst)

    var aeternalis_fuel = Math.floor((mobius_fuel + mobius_fuel_block) * 4 * singleToBlockEfficiencyConst)
    var aeternalis_fuel_block = Math.floor(aeternalis_fuel * 9 * singleToBlockEfficiencyConst)

    comfuncs.iterate([
        ['projecte:alchemical_coal', alchemical_coal],
        ['projecte:alchemical_coal_block', alchemical_coal_block],
        ['projecte:mobius_fuel', mobius_fuel],
        ['projecte:mobius_fuel_block', mobius_fuel_block],
        ['projecte:aeternalis_fuel', aeternalis_fuel],
        ['projecte:aeternalis_fuel_block', aeternalis_fuel_block]
    ], val => event.modify(val[0], item => item.burnTime = val[1]))

    comfuncs.iterate([
        ['notreepunching:flint_knife', 10],
        ['primalstage:flint_hatchet', 15],
        ['notreepunching:flint_shovel', 25],
        ['notreepunching:flint_hoe', 25],
        ['notreepunching:flint_pickaxe', 25],
        ['notreepunching:flint_axe', 25],
        ['primalstage:flint_mallet', 25]
    ], vals =>  event.modify(vals[0], item => item.maxDamage = vals[1]))
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
            'embers:deepslate_lead_ore', 
            'embers:lead_ore',
            'embers:deepslate_silver_ore', 
            'embers:silver_ore',

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
            return blockPos.getY() >= 35 && blockId == 'aether:cold_aercloud'
        } else if (overworldArgs != null && level.dimension == 'minecraft:overworld') {
            return overworldArgs(entityType, levelAccessor, spawntype, blockPos, randomSource)
        } else return false
    })

    handle(TrialsMobs.BREEZE.get(), (entityType, levelAccessor, spawntype, blockPos, randomSource) => Monster.checkMonsterSpawnRules(entityType, levelAccessor, spawntype, blockPos, randomSource))
    handle(TCoreEntities.BLITZ.get(), (entityType, levelAccessor, spawntype, blockPos, randomSource) => Blitz.canSpawn(entityType, levelAccessor, spawntype, blockPos, randomSource))
})